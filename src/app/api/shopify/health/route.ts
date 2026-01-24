// app/api/shopify/health/route.ts
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

const HEALTH_QUERY = `
  query {
    shop {
      name
    }
  }
`;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
};

export async function GET() {
  try {
    const data = await shopifyFetch<{ shop: { name: string } }>(HEALTH_QUERY);

    return NextResponse.json({
      ok: true,
      shop: data.shop.name,
    });
  } catch (err: unknown) {
    console.error("[SHOPIFY_HEALTH_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: getErrorMessage(err) },
      { status: 500 },
    );
  }
}
