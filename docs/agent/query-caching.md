# TanStack Query Caching Strategy for Predesigned Cookies

This guide explains how to implement **query caching** with **TanStack Query** for the **Predesigned Cookies** collection. The goal is:

- Fetch all predesigned cookies once.
- Reuse that data for list and detail views.
- Only fetch a specific cookie if the user lands directly on its detail URL and it isn’t in cache.
- 404 if the cookie still isn’t found after a detail fetch.

We’ll later reuse this exact pattern for **classes**.

---

## 1. Overall Flow

**Data path**

Browser → TanStack Query cache → Next.js `/api` routes → Shopify Storefront API (private token).

**Behavior**

- Navigating from **Predesigned list → Cookie detail**:
  - Should **not** require a new network call.
  - Detail page renders from the cached list data.

- Going directly to a cookie URL (deep link):
  - Check cache first.
  - If missing:
    - Fetch the **individual cookie**.
    - If still not found → render a **404**.

---

## 2. Query Keys (Critical)

Use stable, consistent keys:

- Predesigned list query:  
  `["products", "predesigned"]`

- Predesigned detail query:  
  `["product", cookieHandle]`  
  Example: `["product", "love-bugs-gift-box"]`

These keys must be used everywhere: list page, detail page, any prefetch/seed logic.

---

## 3. Global Query Client Provider

Create a **single TanStack QueryClient** for the Rose & Sugar frontend and wrap the site with it.

**Requirements**

- Lives in a single provider component (for example: `QueryProvider`).
- `QueryProvider` is mounted once in the app’s root layout (for example: `app/(site)/layout.tsx`).
- QueryClient is created once per browser session (not per render).

**Recommended defaults**

- `refetchOnWindowFocus`: false
- `refetchOnReconnect`: true
- `staleTime`: between 60 and 300 seconds for products
- `cacheTime`: between 10 and 30 minutes
- Retry: at most 1–2 times on failure

---

## 4. API Layer Expectations

All Shopify calls must go through a **single server-side helper** that knows about:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_PRIVATE_TOKEN`

On top of that helper, expose two `/api` routes for predesigned cookies:

1. **List endpoint** – e.g.  
   `/api/shopify/predesigned`  
   Returns the full collection of predesigned cookies with everything the frontend needs for both list and detail pages:
   - id, title, handle
   - description
   - productType or category
   - tags
   - price (normalized)
   - primary image (url + alt)
   - anything needed for SEO/meta if possible (page title, meta description, etc.)

2. **Detail endpoint** – e.g.  
   `/api/shopify/predesigned/[handle]`  
   Returns a single cookie by handle (same shape as above).  
   If Shopify doesn’t have a product with that handle, return a 404-style response the frontend can detect.

All raw Shopify fetch + error handling happens **inside** the helper, not inside React components.

---

## 5. Predesigned List Page Behavior

This is the **Predesigned Cookies index** page.

**Query**

- Use TanStack Query with key: `["products", "predesigned"]`.
- Hit `/api/shopify/predesigned`.

**After successful fetch**

- Seed the cache for each cookie detail entry:
  - For each product from the list data:
    - Put it into the cache under key `["product", handle]`.
  - If a detail entry already exists for that handle, do **not** overwrite it.

**Result**

- From this point on, the detail page can render any cookie from that collection without having to refetch.

**Loading & error behavior**

- Show a lightweight loading state while the list is fetching.
- On error, show a user-friendly message and a retry button.

---

## 6. Predesigned Detail Page Behavior

This is for pages like `/predesigned/[handle]`.

**Step 1 – Read from cache**

- Use TanStack Query with key: `["product", handle]`.
- Before making a network request, check if this key already has data:
  - If yes: render immediately from cache, no “blocking” spinner.

**Step 2 – Fetch if not found**

- If there is **no cached data** for `["product", handle]`:
  - Call the **detail API** route `/api/shopify/predesigned/[handle]` for that handle.
  - If the API returns data:
    - Store it in the cache under `["product", handle]`.
    - Render from that data.
  - If the API responds “not found” or equivalent:
    - Render a **404** (or use Next’s notFound helper).

**Background refetching**

- If there is cached data but it’s stale (older than `staleTime`):
  - Allow TanStack Query to refetch in the background.
  - The page should continue rendering cached data while the refetch happens.
  - Optionally show a subtle “updating…” indicator.

**Key point**

- **List navigation**: no new fetch because the detail is already cached from the list.
- **Direct link**: one detail fetch for that cookie; no need to fetch the entire collection.

---

## 7. Refetch Rules

Global / per-query rules to avoid hammering Shopify:

- Do **not** refetch simply because the route changed.
- `refetchOnWindowFocus`: disabled globally.
- It is okay to refetch when:
  - Data is stale (based on `staleTime`).
  - The user manually triggers a refetch (e.g. “Refresh cookies” button).

This keeps Shopify calls low while giving Megan reasonably fresh data.

---

## 8. 404 Logic for Direct Detail Links

For a user going directly to `/predesigned/[handle]`:

1. Check cache for `["product", handle]`.
2. If missing, call `/api/shopify/predesigned/[handle]`.
3. If the API response is “not found”:
   - Render a **404** page (notFound).
4. If found:
   - Cache the product under `["product", handle]` and render.

This ensures:

- Existing cookies always resolve.
- Mistyped or deleted cookie slugs return a proper 404.

---

## 9. What This Gives Us

- Predesigned cookies list fetched once, cached, and reused.
- Detail pages render instantly when navigated from the list.
- Direct links to cookie pages still work via one detail fetch.
- Great UX with fewer Shopify and API calls.
- A clean pattern we can **copy/paste for classes** later by:
  - Using keys like `["products", "classes"]` and `["class", handle]`.
  - Adding corresponding list and detail `/api` routes.

---

## 10. Cache Invalidation Strategy (New Cookies)

Because Megan does not add new cookies frequently, use a **time-based lazy invalidation** approach:

- Set TanStack Query `staleTime` to ~1 hour for the predesigned list query.
- Set the Next.js API route / Shopify helper `revalidate` to ~1 hour as well.
- New cookies will appear automatically on the index page once stale + refetch occurs.
- Direct links to new cookie detail pages work immediately (detail fetch has no dependency on list cache).
