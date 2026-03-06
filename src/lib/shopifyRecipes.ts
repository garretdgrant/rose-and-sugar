import { shopifyFetch } from "@/lib/shopify";
import type { ShopifyProduct, ShopifyProductNode } from "@/types/shopify";

type ShopifyImage = {
  url: string;
  altText?: string | null;
};

type MediaNode = {
  previewImage?: ShopifyImage | null;
  image?: ShopifyImage | null;
};

type VariantNode = {
  id: string;
  title?: string | null;
  availableForSale?: boolean;
  price?: {
    amount?: string;
    currencyCode?: string;
  };
  selectedOptions?: Array<{
    name?: string | null;
    value?: string | null;
  }>;
};

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  productType?: string;
  description?: string;
  tags?: string[];
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  variants?: {
    edges?: { node: VariantNode }[];
  };
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
      currencyCode?: string;
    };
  };
  media?: {
    edges?: { node: MediaNode }[];
  };
};

type CollectionNode = {
  title: string;
  products: {
    edges: { node: ProductNode }[];
  };
};

export type RecipeApiVariant = {
  id: string;
  title?: string | null;
  availableForSale?: boolean;
  price?: {
    amount?: string;
    currencyCode?: string;
  };
  selectedOptions?: Array<{
    name?: string | null;
    value?: string | null;
  }>;
};

export type RecipeApiProduct = {
  id: string;
  title: string;
  handle: string;
  productType?: string;
  description?: string;
  tags?: string[];
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  price?: {
    amount?: string;
    currencyCode?: string;
  };
  image?: {
    url: string;
    altText?: string | null;
  } | null;
  variants?: RecipeApiVariant[];
};

const RECIPE_BY_HANDLE_QUERY = `
  query RecipeByHandle($handle: String!, $mediaFirst: Int!, $variantsFirst: Int!) {
    product(handle: $handle) {
      id
      title
      handle
      productType
      description
      tags
      seo {
        title
        description
      }
      variants(first: $variantsFirst) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
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

const RECIPES_BY_COLLECTION_QUERY = `
  query RecipesByCollection(
    $handle: String!
    $first: Int!
    $mediaFirst: Int!
    $variantsFirst: Int!
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
            seo {
              title
              description
            }
            variants(first: $variantsFirst) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
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

const normalizeRecipeProduct = (product: ProductNode): RecipeApiProduct => {
  const mediaEdge = product.media?.edges?.[0]?.node;
  const imageUrl = mediaEdge?.image?.url || mediaEdge?.previewImage?.url;
  const altText =
    mediaEdge?.image?.altText || mediaEdge?.previewImage?.altText || null;
  const variants = product.variants?.edges?.map((edge) => edge.node) ?? [];

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    productType: product.productType,
    description: product.description,
    tags: product.tags || [],
    seo: product.seo || null,
    price: {
      amount: product.priceRange?.minVariantPrice?.amount || "0",
      currencyCode: product.priceRange?.minVariantPrice?.currencyCode || "USD",
    },
    image: imageUrl
      ? {
          url: imageUrl,
          altText,
        }
      : null,
    variants,
  };
};

export const isRecipeProduct = (product: RecipeApiProduct) => {
  const isRecipeByType = product.productType?.toLowerCase() === "recipe";
  const isRecipeByTag =
    product.tags?.some((tag) => tag.toLowerCase() === "recipe") ?? false;
  return isRecipeByType || isRecipeByTag;
};

export const fetchRecipeByHandle = async (handle: string) => {
  const normalizedHandle = handle.trim();
  if (!normalizedHandle) return null;

  const data = await shopifyFetch<{
    product: ProductNode | null;
  }>(RECIPE_BY_HANDLE_QUERY, {
    handle: normalizedHandle,
    mediaFirst: 1,
    variantsFirst: 25,
  });

  if (!data.product) return null;

  return normalizeRecipeProduct(data.product);
};

export const fetchRecipesCollection = async (
  collectionHandle = "recipes",
  first = 50,
) => {
  const normalizedCollectionHandle = collectionHandle.trim();
  if (!normalizedCollectionHandle) {
    return { collectionTitle: null as string | null, products: [] };
  }

  const data = await shopifyFetch<{
    collection: CollectionNode | null;
  }>(RECIPES_BY_COLLECTION_QUERY, {
    handle: normalizedCollectionHandle,
    first,
    mediaFirst: 1,
    variantsFirst: 25,
  });

  if (!data.collection) {
    return { collectionTitle: null as string | null, products: [] };
  }

  return {
    collectionTitle: data.collection.title,
    products: data.collection.products.edges
      .map((edge) => normalizeRecipeProduct(edge.node))
      .filter(isRecipeProduct),
  };
};

export const buildRecipeNode = (
  product: RecipeApiProduct,
): ShopifyProductNode => {
  const amount = product.price?.amount || "0";
  const currencyCode = product.price?.currencyCode || "USD";
  const imageUrl = product.image?.url;
  const imageAlt = product.image?.altText || product.title;

  const variantEdges =
    product.variants?.map((variant) => {
      const selectedOptions =
        variant.selectedOptions
          ?.filter((option) => option.name && option.value)
          .map((option) => ({
            name: option.name as string,
            value: option.value as string,
          })) || [];

      return {
        node: {
          id: variant.id,
          title: variant.title || product.title,
          price: {
            amount: variant.price?.amount || amount,
            currencyCode: variant.price?.currencyCode || currencyCode,
          },
          availableForSale: variant.availableForSale ?? true,
          selectedOptions,
        },
      };
    }) || [];

  const optionMap = new Map<string, Set<string>>();
  variantEdges.forEach(({ node }) => {
    node.selectedOptions?.forEach((option) => {
      if (!option.name || !option.value) return;
      if (!optionMap.has(option.name)) {
        optionMap.set(option.name, new Set());
      }
      optionMap.get(option.name)?.add(option.value);
    });
  });

  const options =
    optionMap.size > 0
      ? Array.from(optionMap.entries()).map(([name, values]) => ({
          name,
          values: Array.from(values),
        }))
      : [{ name: "Format", values: ["Digital Download"] }];

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    handle: product.handle,
    productType: product.productType,
    tags: product.tags || [],
    priceRange: {
      minVariantPrice: {
        amount,
        currencyCode,
      },
    },
    images: imageUrl
      ? {
          edges: [
            {
              node: {
                url: imageUrl,
                altText: imageAlt,
              },
            },
          ],
        }
      : { edges: [] },
    variants: {
      edges: variantEdges,
    },
    options,
  };
};

export const mapRecipeToShopifyProduct = (
  product: RecipeApiProduct,
): ShopifyProduct => {
  return { node: buildRecipeNode(product) };
};
