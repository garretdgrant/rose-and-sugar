# Sitemap Guide (General)

Blueprint for implementing an XML sitemap API route similar to this repo’s `sitemap.xml` handler.

## Goals

- Serve an XML sitemap at `/api/sitemap.xml` with correct `<urlset>` entries.
- Keep canonical URLs in sync with your site structure: static pages, dynamic pages, and optional collections.
- Avoid hard-coded origins; support local and production via environment-aware base URLs.

## Recommended structure

- Location: `src/app/api/sitemap.xml/route.ts` (App Router, Edge runtime recommended).
- Helper imports:
  - `getMetadataBase()` (or equivalent) to compute the absolute base URL.
  - Any data providers needed for dynamic routes (e.g., slug lists, IDs, database queries).
- Data buckets:
  - `staticPaths`: array of canonical route strings (e.g., `/`, `/services`, `/pricing`, `/contact`).
  - `dynamicPaths`: build arrays from your data sources (e.g., `/products/{id}`, `/docs/{slug}`).
- Entry builder: small function that outputs a `<url>` block with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>`.
- XML assembly: join static and dynamic entries, wrap in the XML prolog + `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`.

## Implementation sketch

```ts
import { getMetadataBase } from "@/lib/metadata";
import { type NextRequest } from "next/server";

export const runtime = "edge";

const staticPaths = ["/", "/about", "/contact", "/pricing"];
const lastModDate = new Date().toISOString().split("T")[0];

const buildEntry = (loc: string, priority = "0.7") => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;

export async function GET(_req: NextRequest) {
  const metadataBase = getMetadataBase();
  const baseUrl = metadataBase.toString().replace(/\/$/, "");

  const staticEntries = staticPaths
    .map((path) =>
      buildEntry(`${baseUrl}${path}`, path === "/" ? "1.0" : "0.7"),
    )
    .join("");

  // Example dynamic section: replace with your data fetch
  const items = await getDynamicSlugs(); // e.g., [{ slug: "product-1" }]
  const dynamicEntries = items
    .map((item) => buildEntry(`${baseUrl}/items/${item.slug}`, "0.8"))
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticEntries}
  ${dynamicEntries}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
```

## When to update

- New static page or renamed route: add/update the path in `staticPaths`.
- New dynamic content: ensure your data source (DB query, CMS fetch, or local array) returns the new slug/ID and the sitemap maps it to the correct route.
- Removing content: remove the path/slug from the relevant source so the sitemap stops advertising it.
- Priority/frequency tuning: adjust the `priority` argument per entry group if some sections deserve higher/lower crawl emphasis.

## Validation steps

- Run `pnpm dev` (or your dev command) and open `/api/sitemap.xml` to verify:
  - URLs are absolute and match the current routes.
  - `<lastmod>`, `<changefreq>`, and `<priority>` look correct.
- Test with production-like env vars so `getMetadataBase()` resolves the real domain before shipping.
