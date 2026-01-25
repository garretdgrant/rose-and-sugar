// app/api/shopify/classes/route.ts
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

type ShopifyImage = {
  url: string;
  altText?: string | null;
};

type MediaNode = {
  previewImage?: ShopifyImage | null;
};

type VariantNode = {
  id: string;
  quantityAvailable?: number | null;
  storeAvailability?: {
    edges?: Array<{
      node: {
        available?: boolean | null;
        quantityAvailable?: number | null;
        pickUpTime?: string | null;
        location?: {
          name?: string | null;
          address?: {
            address1?: string | null;
            city?: string | null;
            zip?: string | null;
          } | null;
        } | null;
      };
    }>;
  };
};

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  productType?: string;
  description?: string;
  tags?: string[];
  variants?: {
    edges?: { node: VariantNode }[];
  };
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
    };
  };
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  eventStartDateTime?: {
    value?: string | null;
  } | null;
  eventEndDateTime?: {
    value?: string | null;
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
  query ClassesByCollection(
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
            variants(first: 1) {
              edges {
                node {
                  id
                  quantityAvailable
                  storeAvailability(first: 5) {
                    edges {
                      node {
                        available
                        quantityAvailable
                        pickUpTime
                        location {
                          name
                          address {
                            address1
                            city
                            zip
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
            seo {
              title
              description
            }
            eventStartDateTime: metafield(namespace: "custom", key: "event_start_datetime") {
              value
            }
            eventEndDateTime: metafield(namespace: "custom", key: "event_end_datetime") {
              value
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
      handle: "classes",
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
        const imageUrl = mediaEdge?.previewImage?.url;
        const altText = mediaEdge?.previewImage?.altText || product.title;
        const firstVariant = product.variants?.edges?.[0]?.node;
        const variantId = firstVariant?.id ?? null;
        const quantityAvailable = firstVariant?.quantityAvailable ?? null;
        const firstAvailability =
          firstVariant?.storeAvailability?.edges?.[0]?.node;
        const location = firstAvailability?.location ?? null;
        const eventStartDateTime = product.eventStartDateTime?.value ?? null;
        const eventEndDateTime = product.eventEndDateTime?.value ?? null;

        const {
          media: _media,
          priceRange,
          variants: _variants,
          eventStartDateTime: _eventStartDateTime,
          eventEndDateTime: _eventEndDateTime,
          ...rest
        } = product;
        return {
          ...rest,
          variantId,
          quantityAvailable,
          location,
          eventStartDateTime,
          eventEndDateTime,
          price: priceRange?.minVariantPrice?.amount ?? "0",
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
    console.error("[SHOPIFY_CLASSES_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: getErrorMessage(err) },
      { status: 500 },
    );
  }
}
