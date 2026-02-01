import { buildCanonicalUrl } from "@/lib/metadata";
import type { ShopifyProduct, ShopifyProductNode } from "@/types/shopify";

export type PredesignedApiVariant = {
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

export type PredesignedApiProduct = {
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
  };
  image?: {
    url: string;
    altText?: string | null;
  } | null;
  variants?: PredesignedApiVariant[];
};

type PredesignedListResponse = {
  ok: boolean;
  collectionTitle?: string;
  products?: PredesignedApiProduct[];
  error?: string;
};

type PredesignedDetailResponse = {
  ok: boolean;
  product?: PredesignedApiProduct;
  error?: string;
};

export const predesignedListQueryKey = ["products", "predesigned"] as const;

export const predesignedDetailQueryKey = (handle: string) =>
  ["product", handle] as const;

const getApiUrl = (path: string) => {
  return typeof window === "undefined" ? buildCanonicalUrl(path) : path;
};

export const fetchPredesignedList = async () => {
  const response = await fetch(getApiUrl("/api/shopify/pre-designed"), {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to load predesigned cookies");
  }

  const data = (await response.json()) as PredesignedListResponse;
  if (!data.ok) {
    throw new Error(data.error || "Failed to load predesigned cookies");
  }

  return data.products || [];
};

export const fetchPredesignedByHandle = async (handle: string) => {
  const response = await fetch(
    getApiUrl(`/api/shopify/pre-designed/${handle}`),
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load cookie");
  }

  const data = (await response.json()) as PredesignedDetailResponse;
  if (!data.ok || !data.product) {
    return null;
  }

  return data.product;
};

export const buildPredesignedNode = (
  product: PredesignedApiProduct,
): ShopifyProductNode => {
  const amount = product.price?.amount || "0";
  const imageUrl = product.image?.url;
  const imageAlt = product.image?.altText || product.title;
  const variantEdges =
    product.variants?.map((variant) => {
      const optionValues =
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
            currencyCode: variant.price?.currencyCode || "USD",
          },
          availableForSale: variant.availableForSale ?? true,
          selectedOptions: optionValues,
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
      : [{ name: "Set", values: ["Signature"] }];

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    productType: product.productType,
    description: product.description,
    tags: product.tags || [],
    priceRange: {
      minVariantPrice: {
        amount,
        currencyCode: "USD",
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

export const mapPredesignedToShopifyProduct = (
  product: PredesignedApiProduct,
): ShopifyProduct => {
  return { node: buildPredesignedNode(product) };
};

export const getPredesignedSizeLabel = (tags?: string[] | null) => {
  if (!tags || tags.length === 0) return null;
  const tag = tags.find((item) => item.toLowerCase() !== "pre-designed");
  return tag ? tag.replace(/-/g, " ") : null;
};
