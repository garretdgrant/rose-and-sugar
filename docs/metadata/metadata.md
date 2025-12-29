# Metadata Guide

Authoritative metadata pattern for the App Router build.

## Core helpers

- Location: `src/lib/metadata.ts`
- Use `generateMetadata()` (not a static `metadata` export) on every page.
- Helpers:
  - `getMetadataBase()` — env-aware base URL (localhost vs production).
  - `buildPageMetadata({ title, description, path, imagePath?, type? })` — returns canonical, OG, and Twitter data.
  - `buildCanonicalUrl(path, metadataBase)` / `buildOgImageUrl(path, metadataBase)` — compose URLs safely.
  - JSON-LD builders: `getLocalBusinessJsonLd`, `getAboutJsonLd`, `getServicesJsonLd`, `getPricingJsonLd`, `getPortfolioJsonLd`, `getContactJsonLd`, `getBlogIndexJsonLd`, `getArticleJsonLd`, `getLocationsJsonLd`.
- OG/Twitter image: use real assets (default `/logo.png` lives in `public/`).
- Single injection rule: one JSON-LD per page via `<Script strategy="beforeInteractive">`, no `metadata.other` and no duplicates.

## Current implementations (reference)

- Root layout (`src/app/layout.tsx`): `generateMetadata` sets base title/description, canonical `/`, OG/Twitter, and injects `getLocalBusinessJsonLd()`.
- Static pages using `buildPageMetadata`: home, about, services, pricing, portfolio, contact, checkout, checkout/thank-you, privacy, terms, locations index.
- JSON-LD pages: layout (LocalBusiness), about, services, pricing, portfolio, contact, blog index, locations index, location detail, blog articles.
- Dynamic pages:
  - Blog detail (`src/app/blog/[id]/page.tsx`): `generateStaticParams`, `generateMetadata` from params, `getArticleJsonLd`.
  - Location detail (`src/app/locations/california/[city]/page.tsx`): `generateStaticParams`, `generateMetadata` from params, LocalBusiness JSON-LD with city context.

## How to add metadata

### Static page

```tsx
import { buildPageMetadata, getAboutJsonLd } from "@/lib/metadata";
import Script from "next/script";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Page Title | EDC Web Design",
    description: "Concise 140–160 char summary.",
    path: "/route-segment",
    // imagePath: "/your-image.webp", // optional
  });
}

export default function Page() {
  const jsonLd = getAboutJsonLd(); // pick the right helper or author a new one
  return (
    <>
      <Script
        id="page-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page UI */}
    </>
  );
}
```

### Dynamic page

```tsx
import {
  buildPageMetadata,
  getArticleJsonLd,
  getMetadataBase,
} from "@/lib/metadata";
import Script from "next/script";

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = `Title for ${slug} | EDC Web Design`;
  const description = "Page-specific description here.";

  return buildPageMetadata({
    title,
    description,
    path: `/parent/${slug}`,
    type: "article", // when appropriate
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jsonLd = getArticleJsonLd({
    title: `Title for ${slug}`,
    description: "Description",
    slug: `/parent/${slug}`,
    published: new Date().toISOString(),
    metadataBase: getMetadataBase(),
  });

  return (
    <>
      <Script
        id={`jsonld-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page UI */}
    </>
  );
}
```

### Checklist for any page

- Titles 50–60 chars when possible; descriptions ~140–160 chars.
- Canonical must match the route path exactly; use `buildPageMetadata`.
- Reuse `getMetadataBase()` for any absolute URL; never hard-code production URLs.
- Ensure OG/Twitter images exist and use absolute URLs (helpers handle this).
- JSON-LD matches the page type and is injected once via `<Script strategy="beforeInteractive">`.
- Dynamic routes: derive metadata from params; keep `generateStaticParams` in sync.
