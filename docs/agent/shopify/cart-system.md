# Cart system overview

## Where cart data lives

- Client state is managed by a Zustand store in `src/stores/cartStore.ts`.
- State fields:
  - `items`: array of `CartItem` (variant/product details, quantity, selected options, optional image override).
  - `cartId`: `string | null` (declared but currently unused).
  - `checkoutUrl`: `string | null` (set after Shopify checkout creation).
  - `isLoading`, `isOpen` for UI behavior.
- Store is persisted to `localStorage` under the key `rose-sugar-cart` via `zustand/middleware`.

## What we do with `cartId`

- `cartId` is defined and there is a setter `setCartId`, but it is never called anywhere in the codebase.
- The Shopify cart creation mutation does not return an `id`, only `checkoutUrl`.
- Result: `cartId` stays `null` for the entire lifecycle and is not used in checkout.

## How checkout is triggered

- UI components call `createCheckout()` from the cart store (e.g., in the cart drawer).
- `createCheckout()`:
  1. Validates that there are items.
  2. Maps `items` to `checkoutItems` with:
     - `variantId`
     - `quantity`
     - Optional `attributes` for classes (event start/end, location), derived from product tags/type and date fields.
  3. Sends a POST request to `/api/shopify/checkout` with body:
     ```json
     {
       "items": [
         {
           "variantId": "...",
           "quantity": 1,
           "attributes": [{ "key": "Event Start", "value": "..." }]
         }
       ]
     }
     ```
  4. Receives `{ ok, checkoutUrl }` and stores `checkoutUrl` in the store.

## What the API sends to Shopify

- `src/app/api/shopify/checkout/route.ts` validates items and normalizes them.
- It calls `createShopifyCart()` in `src/lib/shopify.ts`, which:
  - Builds Shopify `CartLineInput[]` with `quantity`, `merchandiseId` (variantId), and optional `attributes`.
  - Executes the `cartCreate` Storefront API mutation.
  - Returns `checkoutUrl` to the API route.

## Shopify mutation payload

- GraphQL mutation:
  - `cartCreate(input: { lines: $lines }) { cart { checkoutUrl } userErrors { message } }`
- `lines` are constructed from the local cart items as:
  - `quantity`
  - `merchandiseId` (variant ID)
  - `attributes` (optional)

## Summary

- The cart is client-only and persisted in `localStorage`.
- We do not store or use Shopify `cartId` currently.
- On checkout, we send line items (variant ID + quantity + optional attributes) to Shopify and only use the returned `checkoutUrl`.
