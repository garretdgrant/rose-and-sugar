import { NextResponse } from "next/server";
import crypto from "crypto";
import { Redis } from "@upstash/redis";

const TOPIC_ORDERS_CREATE = "orders/create";
const COMPLETION_TTL_SECONDS = 60 * 60 * 48;

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const getHeader = (request: Request, headerName: string) =>
  request.headers.get(headerName) || "";

const verifyShopifyHmac = (
  rawBody: string,
  hmacHeader: string,
  secret: string,
) => {
  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  const headerValue = hmacHeader.trim();
  const digestBuffer = Buffer.from(digest, "base64");
  const headerBuffer = Buffer.from(headerValue, "base64");

  if (digestBuffer.length !== headerBuffer.length) return false;
  return crypto.timingSafeEqual(digestBuffer, headerBuffer);
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
  const topic = getHeader(request, "x-shopify-topic");
  const shopDomain = getHeader(request, "x-shopify-shop-domain");
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  const isProduction = process.env.NODE_ENV === "production";

  if (!secret) {
    if (isProduction) {
      console.error(
        "[SHOPIFY_WEBHOOK] Missing SHOPIFY_WEBHOOK_SECRET in production.",
      );
      return NextResponse.json(
        { ok: false, error: "Webhook secret not configured." },
        { status: 500 },
      );
    }
    console.warn(
      "[SHOPIFY_WEBHOOK] Missing SHOPIFY_WEBHOOK_SECRET. Skipping HMAC verification for non-production.",
    );
  } else {
    if (!hmacHeader.trim()) {
      console.error("[SHOPIFY_WEBHOOK] Missing HMAC header.");
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    if (!verifyShopifyHmac(rawBody, hmacHeader, secret)) {
      console.error("[SHOPIFY_WEBHOOK] Invalid HMAC signature.");
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  if (topic !== TOPIC_ORDERS_CREATE) {
    console.warn("[SHOPIFY_WEBHOOK] Unexpected topic.", {
      topic,
      shopDomain,
    });
    return NextResponse.json({ ok: true });
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

  if (!clientCartId) {
    console.warn("[SHOPIFY_ORDERS_CREATE] Missing client_cart_id.", {
      orderId: order.id,
      orderName: order.name,
      orderNumber: order.order_number,
      shopDomain,
      topic,
    });
    return NextResponse.json({ ok: true });
  }

  if (!redis) {
    console.error("[SHOPIFY_ORDERS_CREATE] Redis is not configured.");
    return NextResponse.json(
      { ok: false, error: "Redis not configured." },
      { status: 500 },
    );
  }

  const completionKey = `rose-sugar:cart:completed:${clientCartId}`;
  const orderId =
    typeof order.id === "string" || typeof order.id === "number"
      ? String(order.id)
      : null;
  const orderNumber =
    typeof order.order_number === "string" ||
    typeof order.order_number === "number"
      ? String(order.order_number)
      : null;
  const completedAt = new Date().toISOString();

  try {
    await redis.set(
      completionKey,
      {
        orderId,
        orderNumber,
        completedAt,
      },
      { ex: COMPLETION_TTL_SECONDS },
    );
  } catch (error) {
    console.error("[SHOPIFY_ORDERS_CREATE] Redis write failed.", error);
    return NextResponse.json(
      { ok: false, error: "Failed to persist cart completion." },
      { status: 500 },
    );
  }

  console.info("[SHOPIFY_ORDERS_CREATE]", {
    orderId: order.id,
    orderName: order.name,
    orderNumber: order.order_number,
    clientCartId,
    shopDomain,
    topic,
  });

  return NextResponse.json({ ok: true });
}
