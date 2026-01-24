// app/api/shopify/pre-designed/route.ts
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
  query PreDesignedByCollection(
    $handle: String!
    $first: Int!
    $mediaFirst: Int!
  ) {
    collection(handle: $handle) {
      title
      products(first: $first) {
        edges {
          node {
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
      }
    }
  }
`;

export async function GET() {
  try {
    const data = await shopifyFetch<{
      collection: {
        title: string;
        products: { edges: { node: ProductNode }[] };
      } | null;
    }>(QUERY, {
      handle: "pre-designed",
      first: 50,
      mediaFirst: 1,
    });

    if (!data.collection) {
      return NextResponse.json(
        { ok: false, error: "Collection not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      collectionTitle: data.collection.title,
      products: data.collection.products.edges.map((edge) => {
        const product = edge.node;
        const mediaEdge = product.media?.edges?.[0]?.node;
        const imageUrl = mediaEdge?.image?.url || mediaEdge?.previewImage?.url;
        const altText =
          mediaEdge?.image?.altText ||
          mediaEdge?.previewImage?.altText ||
          product.title;

        const { media: _media, priceRange, ...rest } = product;
        return {
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
        };
      }),
    });
  } catch (err: unknown) {
    console.error("[SHOPIFY_PRE_DESIGNED_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: getErrorMessage(err) },
      { status: 500 },
    );
  }
}
