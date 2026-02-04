// app/api/shopify/checkout/route.ts
import { NextResponse } from "next/server";
import { createShopifyCart } from "@/lib/shopify";

type CheckoutItem = {
  variantId: string;
  quantity: number;
  attributes?: Array<{
    key: string;
    value: string;
  }>;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
};

const isValidItem = (item: unknown): item is CheckoutItem => {
  if (!item || typeof item !== "object") return false;
  const record = item as {
    variantId?: unknown;
    quantity?: unknown;
    attributes?: unknown;
  };
  const hasVariantId =
    typeof record.variantId === "string" && record.variantId.trim().length > 0;
  const hasQuantity =
    Number.isInteger(record.quantity) && (record.quantity as number) > 0;
  if (record.attributes !== undefined) {
    if (!Array.isArray(record.attributes)) return false;
    const validAttributes = record.attributes.every((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const attr = entry as { key?: unknown; value?: unknown };
      return (
        typeof attr.key === "string" &&
        attr.key.trim().length > 0 &&
        typeof attr.value === "string" &&
        attr.value.trim().length > 0
      );
    });
    if (!validAttributes) return false;
  }

  return hasVariantId && hasQuantity;
};

export async function POST(request: Request) {
  let payload: unknown = null;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { ok: false, error: "Checkout items are required." },
      { status: 400 },
    );
  }

  const { items, clientCartId } = payload as {
    items?: unknown;
    clientCartId?: unknown;
  };
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Checkout items are required." },
      { status: 400 },
    );
  }
  if (typeof clientCartId !== "string" || clientCartId.trim().length === 0) {
    return NextResponse.json(
      { ok: false, error: "clientCartId is required." },
      { status: 400 },
    );
  }

  const invalidItemIndex = items.findIndex((item) => !isValidItem(item));
  if (invalidItemIndex !== -1) {
    return NextResponse.json(
      {
        ok: false,
        error: "Each item must include a variantId and a positive quantity.",
      },
      { status: 400 },
    );
  }

  try {
    const normalizedItems = items.map((item) => {
      const validItem = item as CheckoutItem;
      const attributes = validItem.attributes
        ? validItem.attributes.map((attr) => ({
            key: attr.key.trim(),
            value: attr.value.trim(),
          }))
        : undefined;
      return {
        variantId: validItem.variantId.trim(),
        quantity: validItem.quantity,
        attributes,
      };
    });
    const checkout = await createShopifyCart(
      normalizedItems,
      clientCartId.trim(),
    );
    return NextResponse.json({
      ok: true,
      checkoutUrl: checkout.checkoutUrl,
      cartId: checkout.cartId,
    });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("[SHOPIFY_CHECKOUT_ERROR]", error);
    const status =
      errorMessage.toLowerCase().includes("variant") ||
      errorMessage.toLowerCase().includes("quantity") ||
      errorMessage.toLowerCase().includes("missing")
        ? 400
        : 500;
    return NextResponse.json({ ok: false, error: errorMessage }, { status });
  }
}
