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

export async function GET() {
  try {
    const data = await shopifyFetch<{ shop: { name: string } }>(HEALTH_QUERY);

    return NextResponse.json({
      ok: true,
      shop: data.shop.name,
    });
  } catch (err: any) {
    console.error("[SHOPIFY_HEALTH_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: err.message ?? "Unknown error" },
      { status: 500 },
    );
  }
}
