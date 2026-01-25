# Shopify Checkout Integration Guide (Predesigned Cookies)

This guide explains how to connect Rose & Sugar’s **Predesigned Cookies** detail pages to **Shopify’s hosted checkout** using the Storefront API, without exposing any sensitive tokens on the frontend.

The flow is:

Browser → Next.js API route → Shopify Storefront API → `checkoutUrl` → redirect to Shopify.

---

## 1. Assumptions and Current Data Shape

Environment:

- There is a working private Storefront API token configured on the server.
- The Shopify store domain is configured (for example, the `rose-and-sugar-cookies-by-megan.myshopify.com` domain).

Product data:

- The existing product detail API already returns:
  - A product identifier (not used for checkout).
  - Title, handle, description, tags, SEO fields, image, and price.
  - A list of variants, where each variant includes:
    - The variant title (for example “Default Title”).
    - A variant ID of type “ProductVariant” (this is the critical checkout ID).
    - A flag indicating whether the variant is available for sale.
    - The variant price and currency.

For checkout, the **variant ID** is the key value. Shopify requires this to add an item to a cart.

---

## 2. Server-Side Helper: Creating a Shopify Cart

A new server-side helper function is required to create a cart via the Shopify Storefront API.

Responsibilities:

- Accept a list of checkout items, where each item contains:
  - A variant identifier (the ProductVariant ID from Shopify).
  - A quantity (for example, 1 for a single cookie box).
- Construct and send a Storefront “cartCreate” GraphQL request to Shopify using:
  - The store domain.
  - The private Storefront token sent in the appropriate authorization header.
- The request should describe the cart lines as an array of objects containing:
  - Quantity.
  - Merchandise identifier, which must be the variant identifier (not the product identifier).
- Parse the Storefront API response and extract:
  - The cart’s checkout URL.
- On success:
  - Return an object containing the checkout URL.
- On failure:
  - Detect HTTP errors and Shopify user errors.
  - Throw a descriptive error that clearly indicates what went wrong (for example, invalid variant ID, missing token, or network failure).

This helper lives alongside the existing Shopify helper utilities and should be treated as the canonical way to create carts.

---

## 3. Public API Route: Checkout Endpoint

Create a new API route that the browser can call to initiate the checkout flow.

Location:

- A route under the Next.js App Router API directory, for example something like `app/api/shopify/checkout/route.ts` (exact path determined by project conventions).

Purpose:

- Provide a safe interface between client and Shopify:
  - The browser only sends item information.
  - The server handles all Shopify-specific logic and secrets.

Input contract:

- Accept an HTTP POST request.
- The request body should contain an object with a field representing an array of items.
- Each item must include:
  - A variant identifier (string).
  - A quantity (positive integer).
- Validate that:
  - The body is present and well-formed.
  - The items array is not empty.
  - Every item has a variant identifier and quantity.

Output contract:

- On success (when the cart is created successfully):
  - Return a JSON object indicating success and include the checkout URL.
- On failure:
  - Return a non-200 status code (client or server error, depending on the failure).
  - Include a JSON object with a flag indicating failure and a human-readable error message.

Behavior:

- Parse and validate the incoming payload.
- Call the server-side helper that creates the Shopify cart using the provided items.
- If the helper returns a checkout URL:
  - Send it back to the client as part of the success response.
- If the helper throws an error:
  - Map that error to an appropriate HTTP status.
  - Return a clear, user-friendly error string in the response body.

This endpoint must not expose the private token or other sensitive configuration.

---

## 4. Detail Page Integration: Predesigned Cookie Detail

The Predesigned Cookies detail page (for example under a route like “pre-designed / [handle]”) must integrate with the checkout endpoint.

Available data:

- The page already has access to:
  - The product data returned from the product detail API.
  - A list of variants for that product.
- For now, each predesigned cookie is modeled as a single-variant product, so:
  - The first (and only) variant in the list can be treated as the one to order.
  - The variant ID from that entry is the identifier to use.
  - The quantity for a single order can default to 1.

Button behavior:

- Attach this behavior to the “Order Now” or similar call-to-action button on the detail page:
  - When clicked:
    - Construct a payload containing a single item with:
      - The variant ID from the first variant of the product.
      - A quantity of 1.
    - Send a POST request to the checkout API endpoint with this payload and the appropriate JSON headers.
    - Wait for the response.
    - If the response indicates success and includes a checkout URL:
      - Redirect the browser to that URL (for example by assigning it to `window.location`).
    - If the response indicates an error:
      - Show a user-visible error (for example via a toast, dialog, or inline message).
      - Optionally log error details for debugging.
  - While the request is pending:
    - Optionally disable the button and show a “Processing…” state to prevent duplicate submissions.

Availability check:

- Before enabling the “Order Now” button:
  - Inspect the variant’s availability flag.
  - If the variant is not available for sale:
    - Disable or hide the button.
    - Optionally display a message such as “Sold out” or “Not currently available”.

---

## 5. Future Extension: Full Cart Support

The same checkout API endpoint and server-side helper can be reused to support a more complex cart flow later.

Conceptual flow:

- Maintain a client-side cart structure containing multiple items, each with:
  - A variant identifier.
  - A quantity.
  - Supporting metadata such as title and price for display purposes.
- When the user clicks a “Checkout” button from a cart page:
  - Send the entire array of cart items to the same checkout endpoint.
  - The server helper will create a Shopify cart with multiple lines.
  - The endpoint will return a single checkout URL.
  - Redirect the user to that checkout URL.

No changes in Shopify-side logic are required; the helper already supports multiple items.

---

## 6. Testing Scenarios

To verify the implementation, perform the following tests:

1. **Single product happy path**
   - Open any Predesigned Cookie detail page.
   - Confirm that the variant information is present and shows as available for sale.
   - Click the “Order Now” button.
   - Confirm:
     - The browser sends a POST request to the checkout API route with a single item.
     - The response contains a checkout URL.
     - The browser redirects to Shopify’s checkout page.
     - The checkout page shows the correct product and quantity with the expected price.

2. **Unavailable product behavior**
   - Temporarily set a variant to be unavailable for sale in Shopify.
   - Reload the same detail page.
   - Confirm:
     - The “Order Now” button is disabled or hidden.
     - A clear indication is shown that the item is sold out or unavailable.

3. **Error handling**
   - Intentionally misconfigure the Storefront token or Store domain (for a controlled test) to simulate a failure.
   - Attempt checkout from a product detail page.
   - Confirm:
     - The API responds with an error status and message.
     - The UI surfaces the error message to the user instead of failing silently.
     - The button becomes re-enabled after the failure so the user can try again once the issue is resolved.

---

## 7. Summary of Responsibilities

- **Server helper**
  - Knows how to talk to the Shopify Storefront API.
  - Creates carts using variant identifiers and quantities.
  - Returns checkout URLs or throws clear errors.

- **Checkout API route**
  - Validates input from the browser.
  - Calls the server helper.
  - Returns either a checkout URL or a structured error.

- **Predesigned Cookie detail page**
  - Identifies the correct variant for each product.
  - Sends a request with that variant and quantity to the checkout API route.
  - Redirects to the returned checkout URL on success.
  - Handles sold-out cases and error scenarios gracefully.

Once implemented, this gives Rose & Sugar a clean, secure, and extensible path from headless product pages into fully functional Shopify checkout.
