import { NextResponse } from "next/server";
import crypto from "crypto";

const getHeader = (request: Request, headerName: string) =>
  request.headers.get(headerName) || "";

const verifyShopifyHmac = (rawBody: string, hmacHeader: string) => {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    console.warn(
      "[SHOPIFY_WEBHOOK] Missing SHOPIFY_WEBHOOK_SECRET. Skipping HMAC verification.",
    );
    return true;
  }

  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  if (digest.length !== hmacHeader.length) return false;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
};

const extractClientCartId = (value: unknown) => {
  if (!Array.isArray(value)) return null;
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as { name?: unknown; key?: unknown; value?: unknown };
    const key =
      typeof record.name === "string"
        ? record.name
        : typeof record.key === "string"
          ? record.key
          : null;
    if (key !== "client_cart_id") continue;
    return typeof record.value === "string" ? record.value : null;
  }
  return null;
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const hmacHeader = getHeader(request, "x-shopify-hmac-sha256");

  if (!verifyShopifyHmac(rawBody, hmacHeader)) {
    console.error("[SHOPIFY_WEBHOOK] Invalid HMAC signature.");
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const order = payload as {
    id?: unknown;
    name?: unknown;
    order_number?: unknown;
    email?: unknown;
    cart_token?: unknown;
    note_attributes?: unknown;
    attributes?: unknown;
  };

  const clientCartId =
    extractClientCartId(order.note_attributes) ||
    extractClientCartId(order.attributes);

  console.info("[SHOPIFY_ORDERS_CREATE]", {
    orderId: order.id,
    orderName: order.name,
    orderNumber: order.order_number,
    email: order.email,
    cartToken: order.cart_token,
    clientCartId,
    noteAttributes: order.note_attributes,
  });

  return NextResponse.json({ ok: true });
}
