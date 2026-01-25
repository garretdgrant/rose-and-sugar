// app/api/shopify/checkout/route.ts
import { NextResponse } from "next/server";
import { createShopifyCart } from "@/lib/shopify";

type CheckoutItem = {
  variantId: string;
  quantity: number;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
};

const isValidItem = (item: unknown): item is CheckoutItem => {
  if (!item || typeof item !== "object") return false;
  const record = item as { variantId?: unknown; quantity?: unknown };
  const hasVariantId =
    typeof record.variantId === "string" && record.variantId.trim().length > 0;
  const hasQuantity =
    Number.isInteger(record.quantity) && (record.quantity as number) > 0;
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

  const items = (payload as { items?: unknown }).items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Checkout items are required." },
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
      return {
        variantId: validItem.variantId.trim(),
        quantity: validItem.quantity,
      };
    });
    const checkoutUrl = await createShopifyCart(normalizedItems);
    return NextResponse.json({ ok: true, checkoutUrl });
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
