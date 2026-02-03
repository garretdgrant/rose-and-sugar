# Headless Shopify Cart Clearing (Webhook-Based) — Implementation Steps

## Goal

Clear the client-side cart **only after an order is successfully created**, using Shopify webhooks, for a **guest-only headless checkout flow**.

---

## High-Level Strategy

- Generate and persist a **clientCartId** in the headless app
- Attach that ID to the **Shopify cart as a cart-level attribute**
- Listen for **Shopify `orders/create` webhook**
- Mark the cart as completed server-side
- Clear Zustand + localStorage **on the user’s next visit**

---

## Step 1: Persist a `clientCartId` in the cart store

**Location:** `src/stores/cartStore.ts`

- Add a new persisted field: `clientCartId: string`
- On store initialization or first item add:
  - If `clientCartId` does not exist, generate a UUID
- Persist it with the rest of the cart under `rose-sugar-cart`

**Rules**

- One `clientCartId` per shopping session
- Do NOT regenerate unless the cart is cleared

---

## Step 2: Return and store Shopify `cart.id`

**Current issue:** `cartId` exists in state but is never set

### Update Shopify `cartCreate` mutation

- Modify the GraphQL selection set to request:
  - `cart { id checkoutUrl }`

### After checkout creation

- Store the returned `cart.id` using `setCartId(cartId)`

**Result**

- `cartId` is now available for debugging, retries, and observability

---

## Step 3: Attach `clientCartId` to the Shopify cart (CRITICAL)

**Where:** `createShopifyCart()` in `src/lib/shopify.ts`

- Add a **cart-level attribute** (not line attribute):
  - key: `client_cart_id`
  - value: `<clientCartId>`

### Important rules

- Attribute MUST be set **before redirecting to checkout**
- Prefer cart-level attributes over line-level attributes
- This attribute must survive into the Order object

---

## Step 4: Create Shopify webhook subscription

**Webhook topic:** `orders/create`

**How**

- Shopify Admin → Settings → Notifications → Webhooks  
  OR
- Create via Admin API (recommended for prod)

**Webhook endpoint**

- POST `/api/shopify/webhooks/orders-create`

---

## Step 5: Webhook handler logic

**Location:** backend API route

### On webhook receipt:

1. Verify Shopify HMAC signature (mandatory)
2. Parse order payload
3. Extract `client_cart_id` from order attributes / note_attributes
4. Persist completion state:

```
clientCartId -> {
orderId,
completedAt,
status: “completed”
}
```

(Store in DB / Redis / Supabase — any server-side store)

---

## Step 6: Expose cart-status endpoint

**Endpoint:** `GET /api/cart-status?clientCartId=...`

### Response

- `{ completed: true | false }`

---

## Step 7: Clear cart on next app load

**Where:** app bootstrap or cart drawer open

### Flow

1. Read `clientCartId` from Zustand
2. Call `/api/cart-status`
3. If `completed === true`:
   - Clear `items`
   - Clear `checkoutUrl`
   - Clear `cartId`
   - Generate a NEW `clientCartId`

**Result**

- Cart appears empty after purchase
- No premature clearing on checkout click

---

## Step 8 (Optional but Recommended): Thank You Page Link

- Add “Continue shopping” link on Shopify Thank You / Order Status page
- Link back to headless site
- This triggers immediate cart clearing instead of waiting for next visit

---

## What NOT to do

- ❌ Do NOT clear cart on checkout button click
- ❌ Do NOT rely on time-based assumptions alone
- ❌ Do NOT attach correlation ID only to line items

---

## Final Outcome

- Cart clears correctly after successful orders
- Abandoned checkouts retain cart
- Works for guest users
- Fully deterministic and production-safe

---
