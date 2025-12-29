# Stripe Checkout Integration Guide

This project already wires Stripe Checkout end to end. Follow this guide to understand the flow and adapt it safely.

## Prerequisites

- Stripe account with a one-time price created for the Yenos test.
- Upstash Redis (used for abuse/rate limiting).
- Google reCAPTCHA v2/v3 keys.
- NEXT_PUBLIC_SITE_URL (or VERCEL_PROJECT_PRODUCTION_URL) set to your deployed domain so redirect URLs are correct.

## Required Environment Variables

Set these in `.env` (client-side vars must be prefixed with `NEXT_PUBLIC_`):

- STRIPE_SECRET_KEY: Secret API key for server-side SDK initialization.
- STRIPE_PRICE_ID: Price ID for the product being sold.
- NEXT_PUBLIC_SITE_URL: Base URL for building success/cancel links (fallbacks to Vercel domain or `http://localhost:3000` in dev).
- RECAPTCHA_SECRET_KEY: Server secret used to verify tokens.
- NEXT_PUBLIC_RECAPTCHA_SITE_KEY: Public site key rendered on the checkout form.
- UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN: Credentials for Upstash rate limiting.

## Client Flow (`src/app/checkout/page.tsx`)

- Renders a client component with a checkout form (customer + shipping fields). Uses honeypot fields (`middleName`, `company`) for bot detection.
- Validates inputs on the client (email, phone, ZIP). If valid, ensures reCAPTCHA is completed before POSTing to `/api/checkout`.
- Sends JSON payload `{ form fields..., recaptchaToken }`.
- Handles API responses:
  - On `200`, redirects to `sessionUrl` (Stripe-hosted checkout).
  - On `400/429/5xx`, surfaces field errors, recaptcha errors (resets widget), or generic server errors.

## API Flow (`src/app/api/checkout/route.ts`)

1. Validate payload with Zod (same fields as the form, honeypots must be empty). Returns `400` with field-level errors when invalid.
2. Verify reCAPTCHA using `RECAPTCHA_SECRET_KEY`; rejects when missing or failed.
3. Enforce IP rate limit via Upstash (`enforceIpRateLimit`) using `checkoutLimiterConfig` (5 reqs / day). Returns `429` with rate-limit headers when exceeded.
4. Require `STRIPE_PRICE_ID`; returns `500` if not configured.
5. Create Stripe Checkout Session using `assertStripeClient()` from `src/lib/stripe.ts` (throws if `STRIPE_SECRET_KEY` is absent):
   - `mode: "payment"`, `payment_method_types: ["card"]`
   - `customer_email` and `receipt_email` set to submitted email
   - `line_items`: single item with `price: STRIPE_PRICE_ID`, `quantity: 1`
   - `success_url`: `buildAbsoluteUrl("/payment-confirmation")`
   - `cancel_url`: `buildAbsoluteUrl("/cancel")`
   - `metadata`: all submitted fields except honeypots/recaptcha
   - `payment_intent_data.shipping`: name + shipping address from form
6. Responds with `{ sessionId, sessionUrl }` on success; client redirects to `sessionUrl`.

## Supporting Libraries

- `src/lib/stripe.ts`: Initializes a single Stripe client with `STRIPE_SECRET_KEY`. Uses Stripe API version `2025-11-17.clover` and tags requests with app info.
- `src/lib/rate-limit.ts`: Thin wrapper around `@upstash/ratelimit` + `@upstash/redis`. Shares a Redis client and caches limiter instances. Uses request IP (Next’s `req.ip` or forwarded headers) as identifier.

## How to Enable/Modify

1. Fill in all env vars above. Restart dev server after changes.
2. In Stripe Dashboard, create the Price and paste its ID into `STRIPE_PRICE_ID`.
3. If you change the product or pricing, update:
   - Price ID
   - Static order copy on `src/app/checkout/page.tsx` (name/description/amount shown to users)
4. If deploying to a new domain, update `NEXT_PUBLIC_SITE_URL` so `success_url`/`cancel_url` match the deployed origin (otherwise Stripe rejects the session).
5. To alter rate limiting, edit `checkoutLimiterConfig` in `route.ts` (limit/window/prefix).
6. To collect more metadata, extend `checkoutSchema` and `buildCheckoutMetadata` in `route.ts` and add matching form fields on the client.

## Testing the Flow

- Dev: run `npm run dev`, open `/checkout`, fill the form, complete reCAPTCHA, and submit. You should be redirected to Stripe Checkout.
- Stripe test mode: use Stripe test cards (e.g., `4242 4242 4242 4242`, valid future expiry, any CVC/ZIP) to complete payment.
- Verify:
  - Submissions fail when reCAPTCHA is missing/invalid.
  - Rate limiting returns `429` after 5 rapid attempts from same IP.
  - Missing env vars yield clear errors (500s) in the API response/logs.

## Operational Notes

- No webhooks are configured yet; fulfillment after successful payment still needs to be added (e.g., via `checkout.session.completed`).
- Keep honeypot fields and reCAPTCHA in sync if you redesign the form to avoid false positives.
- Remember to set live keys/price IDs and update allowed domains in Stripe before going to production.
