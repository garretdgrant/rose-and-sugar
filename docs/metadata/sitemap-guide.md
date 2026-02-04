# Sitemap Guide for Rose & Sugar (Headless Shopify)

Authoritative reference for implementing and maintaining the XML sitemap for the Rose & Sugar site.

This sitemap must:

- Include **static pages** (home, about, contact, classes, pre-designed index, etc.).
- Include **dynamic cookie detail pages** generated from Shopify (Predesigned Cookies collection).
- Use the correct **absolute URLs** based on environment (local vs production).
- Update automatically when Megan adds new predesigned cookies.

---

## 1. Endpoint Overview

- **Location:** `src/app/api/sitemap.xml/route.ts` (Next.js App Router).
- **Response:** XML `urlset` (classic sitemap format).
- **Runtime:** Edge is recommended (`export const runtime = "edge";`) for speed, but Node is also acceptable.
- **Base URL:** Derived from a shared helper like `getMetadataBase()` using `NEXT_PUBLIC_SITE_URL` so **no hard-coded origins** in the route.

---

## 2. What Goes in the Sitemap

### 2.1 Static Pages

Include core, non-dynamic routes, for example:

- `/` (home)
- `/about`
- `/contact`
- `/classes`
- `/pre-designed` (Predesigned Cookies index)
- Any other static marketing/FAQ pages Megan has.

These are maintained in a `staticPaths` array.

**Priority suggestion:**

- `/` → `priority = 1.0`
- Other static pages → `priority = 0.7`
- `changefreq` can be `monthly` for all static pages.

---

### 2.2 Dynamic Cookie Detail Pages (Predesigned)

These are the pages like:

- `/pre-designed/love-bugs-gift-box`
- `/pre-designed/housewarming-cookie-set`
- etc.

They are sourced from **Shopify**, specifically:

- The **Predesigned Cookies** collection (by collection handle, e.g. `pre-designed`).
- For each product in that collection, use the `handle` to build:
  - Path: `/pre-designed/{handle}`
  - `<loc>`: `{baseUrl}/pre-designed/{handle}`

Optional but recommended:

- Include `updatedAt` from Shopify, if available, as `<lastmod>` for each product.
- Use `priority` ~ `0.8` for these product detail pages.

These dynamic paths are generated at request time by calling your **server-side Shopify helper**, not from the browser.

---

## 3. Data Sources & Responsibilities

### 3.1 Base URL

- Implement a single helper, e.g. `getMetadataBase()`, that:
  - Looks at `NEXT_PUBLIC_SITE_URL` (or equivalent).
  - Returns a `URL` object representing the canonical base.
- The sitemap route calls `getMetadataBase()` and converts it to a string, stripping any trailing slash.

This ensures:

- Local dev: `http://localhost:3000`
- Production: `https://roseandsugar.com` (or whatever the live domain is)
- All sitemap `<loc>` values are correct and absolute.

---

### 3.2 Static Paths

- Maintain an array of strings like `["/", "/about", "/contact", "/classes", "/pre-designed"]`.
- When you add or rename a static route:
  - Update this array so the sitemap remains in sync with the actual site routes.

---

### 3.3 Predesigned Cookies (Dynamic Paths)

- Use the existing **Shopify server helper** to fetch all products in the Predesigned collection:
  - Query: `collectionByHandle(handle: "pre-designed") { products { … } }`
  - Only run this **on the server** inside the sitemap route.
- For each product returned:
  - Expect at least: `handle`, `updatedAt` (if you add it to the query), and `title`.
  - Build the path: `/pre-designed/{handle}`.

These become the dynamic entries in the sitemap.

---

## 4. Entry Builder & XML Assembly

### 4.1 Entry Builder

Implement a small helper that takes:

- `loc`: absolute URL (string)
- `priority`: string, e.g. `"1.0"`, `"0.8"`, `"0.7"`
- Optional `lastmod`: ISO date string (e.g. `2026-01-24`)

and returns a `<url>` block containing:

- `<loc>`
- `<lastmod>` (either a shared date for static pages or per-product date for cookies)
- `<changefreq>` (e.g. `monthly` for all entries)
- `<priority>`

### 4.2 XML Response

The route should:

1. Build **static entries** from `staticPaths`.
2. Fetch **predesigned cookies** from Shopify and build dynamic entries.
3. Concatenate all entries into one `<urlset>` with the standard sitemap XML prolog.
4. Return a `Response` with `Content-Type: application/xml`.

---

## 5. Cache & Freshness (Dynamic Cookies)

Megan does **not** add cookies constantly, so a **time-based lazy updating** strategy is sufficient:

- Shopify helper (used by the sitemap route):
  - Use a `revalidate` window of about **1 hour** for the underlying fetch.
- Practically:
  - When Megan adds a new predesigned cookie:
    - Its detail page works immediately (your `[handle]` route fetches by handle).
    - The sitemap shows the new URL **after the next revalidation window** (up to ~1 hour).

This avoids hitting Shopify on every sitemap request while still keeping it reasonably fresh.

---

## 6. When to Update This Sitemap Logic

Update the sitemap implementation when:

- You add/rename **static pages**:
  - Adjust entries in `staticPaths`.
- You change the URL structure for **Predesigned Cookies**:
  - For example, from `/pre-designed/{handle}` to `/cookies/{handle}`.
- You add **new dynamic sections**:
  - E.g. future **classes** with their own dynamic detail pages; you can add:
    - Another collection fetch from Shopify.
    - Paths like `/classes/{handle}`.
- You change domains:
  - Ensure `NEXT_PUBLIC_SITE_URL` (or equivalent) is updated so `getMetadataBase()` produces the correct origin.

---

## 7. Validation Checklist

Before shipping changes:

1. Run `pnpm dev` (or equivalent) and open `/api/sitemap.xml`.
2. Verify:
   - All `<loc>` values are **absolute URLs** (with the correct domain).
   - Static routes (home, contact, classes, pre-designed index) are present.
   - Predesigned cookie URLs (e.g. `/pre-designed/love-bugs-gift-box`) are present when cookies exist in Shopify.
3. Confirm `<lastmod>`, `<changefreq>`, and `<priority>` values align with expectations:
   - `/` priority higher than other static pages.
   - Predesigned cookie pages have consistent priority (e.g. `0.8`).
4. In production-like env:
   - Ensure `NEXT_PUBLIC_SITE_URL` is set so `getMetadataBase()` reflects `https://roseandsugar.com`.

---

## 8. Future Extension: Classes

Once the pattern is working for Predesigned Cookies, you can repeat it for **classes**:

- Create a **Classes** collection in Shopify.
- Fetch that collection’s products in the sitemap route.
- Map each `handle` to `/classes/{handle}`.
- Add them to the same `<urlset>` with an appropriate priority (e.g. `0.8`).

The overall architecture remains identical; only the data source and path prefix differ.
