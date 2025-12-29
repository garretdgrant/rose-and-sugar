# Sitemap Guide

Authoritative reference for the XML sitemap served by the App Router.

## Endpoint overview

- Location: `src/app/api/sitemap.xml/route.ts` (Edge runtime).
- Emits one `<urlset>` containing static pages, location pages, and blog posts.
- Uses `getMetadataBase()` (fed by `NEXT_PUBLIC_SITE_URL`) to derive the absolute base URL for both localhost and production; never hard-code origins in the route.
- Each entry includes `<loc>`, `<lastmod>` (ISO date generated at request time), `<changefreq>` (`monthly`), and `<priority>` (1.0 for `/`, 0.8 for blogs/locations, 0.7 for other static pages).

## How the route builds the sitemap

- Static pages: `staticPaths` holds canonical paths such as `/services`, `/pricing`, `/portfolio`, and `/contact`. The home path uses a `1.0` priority; all other static paths default to `0.7`.
- Location pages: sourced from `locations` in `src/lib/locations-data.ts`. Each `id` becomes `/locations/california/{id}` with a `0.8` priority. Adding a new location in that data file automatically enrolls it in the sitemap.
- Blog posts: `blogSlugs` lists every published article slug. Each slug becomes `/blog/{slug}` with a `0.8` priority.
- The route concatenates the three entry groups, wraps them in the XML prolog + `<urlset>`, and returns an `application/xml` response.

## When to update

- New static page or renamed route: add/update the path in `staticPaths` to keep the sitemap and canonical URLs aligned.
- New blog article: append the slug to `blogSlugs` (also referenced in `docs/agent/blog/blogs.md`).
- New location page: add the location entry in `src/lib/locations-data.ts`; the sitemap will pick it up automatically.
- Removing pages: delete the path or slug from the relevant array so the sitemap stops advertising dead URLs.
- Priority or frequency changes: adjust the optional `priority` argument to `buildEntry` calls if a page deserves higher/lower crawl emphasis.

## Quick validation

- Run `pnpm dev` and visit `/api/sitemap.xml` to confirm the XML renders and includes your new URLs with correct absolute `loc` values.
- For production URLs, deploy or run with `NEXT_PUBLIC_SITE_URL`/equivalent set so `getMetadataBase()` reflects the real domain (edcwebdesign.com, sacramentowebdesigns.com, etc.).
