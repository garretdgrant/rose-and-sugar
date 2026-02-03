# Headless Shopify Cart Clearing — Steps 5–7 (Upstash Redis REST)

You have already:

- Added `@upstash/redis`
- Added `UPSTASH_REDIS_REST_URL`
- Added `UPSTASH_REDIS_REST_TOKEN`
- Confirmed `client_cart_id` arrives correctly in the `orders/create` webhook

The following steps assume **Upstash Redis REST** (no TCP connections).

---

## Step 5 — Write a “completion flag” to Redis (Upstash REST)

**Goal:** When the `orders/create` webhook fires, persist a short-lived marker that says  
“this `clientCartId` completed an order.”

### 5.1 Redis connection method

- Use **Upstash REST** (not TCP).
- Initialize Redis using environment variables only:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
- Do NOT use a read-only token — this flow requires writes.

This works perfectly in serverless environments (Vercel, edge, etc.).

---

### 5.2 Key namespacing (important)

Because this Redis instance is shared with another project, **namespace your keys**.

Recommended key format:

- `rose-sugar:cart:completed:<clientCartId>`

This prevents collisions and makes debugging easier.

---

### 5.3 What to store

Store only minimal, non-PII metadata:

- orderId
- orderNumber
- completedAt (ISO timestamp)

Do NOT store:

- email
- customer name
- full webhook payload

---

### 5.4 TTL (auto-cleanup)

Set a TTL on every completion key.

Recommended:

- **48 hours**
- Acceptable range: 24–72 hours

Reason:

- Gives buyers time to return to the headless site
- Prevents Redis from growing unbounded
- Requires no cleanup jobs

---

### 5.5 Webhook write behavior

Inside the `orders/create` webhook handler:

- After:
  - HMAC verification
  - topic verification
  - `client_cart_id` extraction
- Write the Redis key with TTL
- Respond **200 immediately**

Important:

- The webhook handler must be **idempotent**
- Writing the same key multiple times must be safe (Upstash SET is fine)

---

## Step 6 — Add a cart-status endpoint (read-only)

**Goal:** Allow the headless frontend to ask  
“has this cart completed an order?”

---

### 6.1 Endpoint contract

Create a GET endpoint with this shape:

- `GET /api/cart-status?clientCartId=<uuid>`

This endpoint is safe to call from the browser.

---

### 6.2 Input validation

- Require `clientCartId`
- If missing or empty:
  - Return 400 with a clear error
- Do NOT infer or generate IDs here

---

### 6.3 Redis lookup logic

- Build the Redis key:
  - `rose-sugar:cart:completed:<clientCartId>`
- Check for existence:
  - If the key exists → `{ completed: true }`
  - If not → `{ completed: false }`

You may optionally return stored metadata, but **a boolean is sufficient**.

---

### 6.4 Security boundaries

This endpoint:

- Must NOT expose secrets
- Must NOT return PII
- Must NOT query Shopify APIs

It should only reflect Redis state.

---

## Step 7 — Clear the cart on the next page load (frontend)

**Goal:** Clear Zustand + localStorage **only after Shopify confirms an order**.

---

### 7.1 Where to run the check

Recommended options (choose one):

- App boot in a top-level client component (best)
- When the cart drawer opens
- Both (safe, but guard against duplicates)

---

### 7.2 When to call `/api/cart-status`

To avoid unnecessary network calls, only check when:

- `clientCartId` exists AND
- (`checkoutUrl` exists OR cart has items)

This prevents calls when the cart is already empty.

---

### 7.3 Clear behavior

If `/api/cart-status` returns `completed: true`:

- Call `clearCart()`
- Confirm `clearCart()`:
  - empties items
  - clears checkoutUrl
  - regenerates a new `clientCartId`

This resets the shopping session cleanly.

---

### 7.4 Prevent repeated calls

Add a simple guard such as:

- `completionCheckedThisSession` boolean, OR
- `lastCompletionCheckAt` timestamp

This ensures the check only runs once per page load/session.

---

## Optional UX improvement (recommended)

If `checkoutUrl` exists in localStorage:

- Show a subtle message in the cart drawer:
  “If you completed checkout, your cart will clear when you return.”

This reduces confusion during rollout.

---

## Final Result

- Cart is NOT cleared on checkout click
- Cart IS cleared after confirmed order (via webhook + Redis)
- Works for guest checkout
- Safe in serverless environments
- No Admin API calls required at runtime
