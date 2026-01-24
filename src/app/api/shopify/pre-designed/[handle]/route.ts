// app/api/shopify/pre-designed/[handle]/route.ts
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

type ShopifyImage = {
  url: string;
  altText?: string | null;
};

type MediaNode = {
  previewImage?: ShopifyImage | null;
  image?: ShopifyImage | null;
};

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  productType?: string;
  description?: string;
  tags?: string[];
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
    };
  };
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  media?: {
    edges?: { node: MediaNode }[];
  };
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
};

const QUERY = `
  query PreDesignedByHandle($handle: String!, $mediaFirst: Int!) {
    product(handle: $handle) {
      id
      title
      handle
      productType
      description
      tags
      priceRange {
        minVariantPrice {
          amount
        }
      }
      seo {
        title
        description
      }
      media(first: $mediaFirst) {
        edges {
          node {
            mediaContentType
            previewImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ handle: string }> },
) {
  try {
    const { handle } = await params;
    const data = await shopifyFetch<{
      product: ProductNode | null;
    }>(QUERY, {
      handle,
      mediaFirst: 1,
    });

    if (!data.product) {
      return NextResponse.json(
        { ok: false, error: "Product not found" },
        { status: 404 },
      );
    }

    const product = data.product;
    const mediaEdge = product.media?.edges?.[0]?.node;
    const imageUrl = mediaEdge?.image?.url || mediaEdge?.previewImage?.url;
    const altText =
      mediaEdge?.image?.altText ||
      mediaEdge?.previewImage?.altText ||
      product.title;

    const { media: _media, priceRange, ...rest } = product;
    return NextResponse.json({
      ok: true,
      product: {
        ...rest,
        price: {
          amount: priceRange?.minVariantPrice?.amount ?? "0",
        },
        image: imageUrl
          ? {
              url: imageUrl,
              altText,
            }
          : null,
      },
    });
  } catch (err: unknown) {
    console.error("[SHOPIFY_PRE_DESIGNED_DETAIL_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: getErrorMessage(err) },
      { status: 500 },
    );
  }
}
