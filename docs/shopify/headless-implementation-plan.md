# Headless Shopify + Next.js Plan for Rose & Sugar 🍪

This doc outlines how to set up a headless Shopify store for Rose & Sugar using
Next.js, with:

- Shopify as the product/class “CMS”
- Next.js as the front-end
- Dynamic pages for cookies and classes
- Sensible caching on Vercel
- A clear workflow for Megan so she can manage everything from Shopify

No code here, just architecture, concepts, and a practical to-do list.

---

## 1. High-Level Architecture

**Goal:**
Use Shopify only for data (products, inventory, classes, prices, etc.) and let
your Next.js app handle all rendering, UX, and routing.

- Shopify:
  - Source of truth for cookies and classes
  - Manages inventory, price, variants, images
  - Has structured product data and metafields for extra info
- Next.js:
  - Renders all pages (home, cookies, classes, detail pages, cart UI)
  - Calls Shopify’s Storefront API from the server
  - Hosts dynamic routes for things like `/cookies/[handle]` and
    `/classes/[handle]`
- Vercel:
  - Caches rendered pages with incremental static regeneration (ISR)
  - Serves fast HTML to users worldwide

---

## 2. Shopify Setup – Structure and Organization

This is the foundation. Done right, it makes your Next.js side simple and clean.

### 2.1 Create a custom app for Storefront API

In Shopify Admin:

1. Go to “Apps” → “Develop apps.”
2. Create a new app for this site (for example: “Rose and Sugar Headless”).
3. Enable Storefront API for the app.
4. Grant permissions such as:
   - Read products
   - Read product listings
   - Read inventory (if needed)
5. Generate a Storefront API access token.
6. Note the following values for your Next.js env:
   - Store domain (something like `store-name.myshopify.com`)
   - Storefront API token
   - API version (for example: `2024-01` or whatever is current)

You will later put these into your Next.js environment variables.

### 2.2 Define product types and naming conventions

You want Shopify product organization to map cleanly to your Next.js routing.

Suggested product types:

- Product type: “Cookie”
  - Individual cookie designs, cookie sets, seasonal boxes, etc.
- Product type: “Class”
  - Each specific workshop or class date (for example: “Valentine’s Cookie
    Decorating Class – Feb 14, 2025”).

Other possible product types (optional):

- Product type: “Gift Card”
- Product type: “Merch”

Use **product type** and **tags** to filter and display items cleanly in
Next.js.

### 2.3 Collections for grouping

Create collections in Shopify to make it easy to query:

- Collection: “Cookies”
  - Includes all product type “Cookie”
- Collection: “Classes”
  - Includes all product type “Class”
- Optional: Seasonal collections like “Valentine’s”, “Halloween”, “Christmas” if
  you want themed landing pages later.

These collections will power:

- `/cookies` index page
- `/classes` index page
- Potential seasonal landing pages

### 2.4 Inventory strategy

Cookies:

- They are made-to-order.
- You can either:
  - Not track inventory in Shopify and just use text on the site to explain lead
    times.
  - Or track a “safe” high number per design (for example: “25 dozen”) to avoid
    hitting zero.
- If you expect massive volume later, you can tighten rules, but for now a high
  safe inventory or “do not track” is fine.

Classes:

- Each class has real seat constraints.
- Use Shopify inventory as “number of seats.”
  - For example: “Valentine’s Cookie Decorating Class” inventory = 18 seats.
- When inventory hits zero:
  - Shopify shows “sold out”
  - Next.js template should show “Sold Out” instead of “Book Now”
- You can use:
  - Single variant with inventory equal to seats
  - Or variants for different time slots, levels, or age ranges, each with its
    own inventory.

### 2.5 Metafields for class-specific data

Classes need extra structured data that cookies don’t:

- Date
- Time
- Location
- Skill level
- Age range
- What they’ll learn
- What’s included

In Shopify Admin:

1. Go to “Settings” → “Custom data” → “Products.”
2. Create a metafield definition for namespace “class” (or similar) with keys
   such as:
   - class.date (date/time type)
   - class.time (string or time)
   - class.location (string)
   - class.level (string; beginner, intermediate, etc.)
   - class.age_range (string)
   - class.notes or class.description_extra (rich text)
3. For each class product:
   - Fill in these metafields so your Next.js template can render them.

This lets you handle classes as structured data, not one big text blob.

---

## 3. Next.js Routing and Template Strategy

### 3.1 Cookie pages

Routes you’ll want:

- `/cookies`
  - Index page listing all cookie products, likely pulled from the “Cookies”
    collection or product type “Cookie.”
- `/cookies/[handle]`
  - Dynamic detail page that:
    - Receives the `handle` from the URL.
    - Fetches the cookie product from Shopify using the Storefront API.
    - Renders title, description, price, images, and an “add to cart” action.

You only build these two Next.js routes as templates; you do not hand-build
individual cookie pages. Each new cookie product Megan publishes in Shopify
appears automatically.

### 3.2 Class pages (SEO-friendly Option A)

Routes:

- `/classes`
  - Index for all upcoming classes.
  - Filters products where product type is “Class” or included in the “Classes”
    collection.
  - Shows cards for each class with title, date, location, price, seats left,
    and button to view details.
- `/classes/[handle]`
  - Dynamic detail page for each class.
  - Uses the product handle from the URL to fetch a single class product.
  - Renders:
    - Class title
    - Date and time (from metafields)
    - Location
    - Seats left (from inventory)
    - Description and what they’ll learn
    - Images
    - “Book your seat” button (add to cart and then to checkout)

Again, you have one single Next.js file per dynamic route; every new class Megan
adds to Shopify becomes a new live page without you touching code.

### 3.3 How Megan will work day-to-day

For cookies:

- Megan creates or edits cookie products in Shopify:
  - Sets product type to “Cookie.”
  - Adds images, price, description.
  - Optionally sets inventory or marks “do not track.”
- You site automatically shows them:
  - On `/cookies` index.
  - On dynamic detail pages at `/cookies/[handle]`.

For classes:

- Megan creates a new product:
  - Product type: “Class.”
  - Title such as “Valentine’s Cookie Decorating Class – Folsom.”
  - Shopify handle auto-generated; you might enforce a consistent slug style.
  - Sets inventory to the seat count.
  - Fills in class metafields (date, time, location, etc.).
- Your Next.js app automatically:
  - Lists it on `/classes`.
  - Exposes a detail page at `/classes/[handle]` using the same template.
  - Shows correct seats left, date, and other details.

No manual page creation is needed on the Next.js side once the templates and
data fetching are built.

---

## 4. Caching and Performance on Vercel

You want pages to be fast and not spam Shopify with calls.

Concepts:

- Product and class pages change rarely, so they can be cached.
- Cart and checkout flows are dynamic and should not be cached.

### 4.1 What to cache

Cache via incremental static regeneration (ISR) for:

- `/cookies`
- `/cookies/[handle]`
- `/classes`
- `/classes/[handle]`

These pages:

- Can be rendered once and reused.
- Can be refreshed periodically (for example, every 1–5 minutes) to reflect
  minor updates like price or seats left.

Result: most visitors get instant, cached HTML from Vercel’s edge network.

### 4.2 What not to cache

Do not cache:

- Cart creation routes
- Endpoints that update cart contents
- Anything that reflects a specific user’s current basket or checkout state

These should always fetch live data and respond per request.

### 4.3 Trade-off for seat counts

Seats for classes:

- If you cache for 1–5 minutes, seat count might be slightly stale on the page.
- Final enforcement happens at Shopify checkout, where inventory is
  authoritative.
- This trade-off is normal and acceptable for local class booking.

You can tune revalidation times:

- Classes: shorter revalidation (for example, 60–120 seconds) if you want
  fresher seats.
- Cookies: longer revalidation (for example, 300 seconds or more) since
  availability is less time-sensitive.

Later, you can get fancy with webhooks and manual revalidation, but that’s
optional.

---

## 5. SEO Considerations

You are already thinking in an SEO-smart way: more content, more relevant pages.

Key points:

- Each cookie detail page and class detail page has:
  - A unique URL
  - A unique title and meta description
  - Unique on-page content (titles, descriptions, images)
- Class detail pages are excellent for long-tail searches like:
  - “Valentine’s cookie decorating class Folsom”
  - “Cookie decorating workshop near me”
- You can add structured data:
  - For products: Product schema
  - For classes: Event schema (with date, location, and ticket/offer info)
- Your index pages (`/cookies` and `/classes`) act as category pillars that link
  to all the detailed pages.

---

## 6. To-Do List (Step-by-Step)

You can treat this as your checklist.

### Shopify – Setup and Structure

1. Create a custom app in Shopify for Storefront API.
2. Enable Storefront API and grant read permissions for products, product
   listings, and inventory.
3. Copy your Store domain, Storefront API token, and API version.
4. Define product types:
   - “Cookie”
   - “Class”
   - Any others you need (for example, “Gift Card”).
5. Create collections:
   - “Cookies” for cookie products.
   - “Classes” for workshop/class products.
6. Configure product metafields for classes:
   - Namespace “class.”
   - Keys like date, time, location, level, age_range, extra_description.
7. Decide inventory behavior for cookies:
   - Either “do not track” or track a safe high quantity.
8. Decide inventory behavior for classes:
   - Track inventory with one unit equaling one seat.
9. Create a couple of example cookie products and class products to test with:
   - Make sure product type, collection membership, tags, and metafields are set
     as expected.

### Next.js – Environment and Shopify Client

10. Add Shopify environment variables to your Next.js project:
    - Store domain
    - Storefront token
    - API version
11. Create a simple data access layer that can call Shopify’s Storefront API.
12. Plan your routes:
    - `/cookies` and `/cookies/[handle]`
    - `/classes` and `/classes/[handle]`

### Next.js – Pages and Templates

13. Implement the `/cookies` index page:
    - Fetch cookie products by collection or product type.
    - Render a grid of cookie cards with links to detail pages.
14. Implement the `/cookies/[handle]` cookie detail template:
    - Fetch single cookie product by handle.
    - Render full details, images, price, “add to cart” button.
15. Implement the `/classes` index page:
    - Fetch class products by collection or product type.
    - Show upcoming classes (filter out past dates if useful).
    - Display cards with date, location, seats, and “view details” link.
16. Implement the `/classes/[handle]` class detail template:
    - Fetch single class product by handle.
    - Read metafields for date/time/location/etc.
    - Show seats remaining and booking CTA.
    - Handle sold-out state gracefully.

### Caching / ISR

17. Configure ISR for index and detail pages:
    - Set appropriate revalidation times for cookies and classes.
18. Ensure cart and checkout-related endpoints:
    - Do not use caching.
    - Always reflect live data from Shopify.

### Megan’s Workflow and Documentation

19. Document a simple “How Megan adds a new class” workflow:
    - Create product in Shopify with type “Class.”
    - Add to “Classes” collection.
    - Set inventory to number of seats.
    - Fill in all class metafields.
20. Document “How Megan adds a new cookie design”:
    - Create product with type “Cookie.”
    - Add to “Cookies” collection.
    - Set price, description, and image.
21. Validate that:
    - New cookies and classes appear automatically on `/cookies` and `/classes`.
    - New detail pages are automatically accessible via their handles.

### SEO and Polish (Optional Next Pass)

22. Add metadata and Open Graph tags per dynamic page:
    - Use product/class data for title and description.
23. Add structured data:
    - Product schema for cookies.
    - Event schema for classes.
24. Plan internal linking:
    - From home page to cookies, classes, and seasonal collections.
25. Optionally add waitlist option or email capture for sold-out classes.

---

## 7. Mental Model Summary

- Shopify is your **data source and admin UI** for Megan.
- Next.js is your **presentation layer and router**.
- You build only a handful of **templates and dynamic routes**, not one page per
  product or class.
- Vercel caches everything that doesn’t need to be real-time.
- Classes and cookies are just different “shapes” of products with different
  metadata, inventory strategies, and templates.

Once this is wired, most of the “work” is Megan adding cool new offerings in
Shopify and you occasionally sharpening the UX, SEO, and performance on the
Next.js side.
