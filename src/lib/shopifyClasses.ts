import { buildCanonicalUrl } from "@/lib/metadata";
import type { ShopifyProduct, ShopifyProductNode } from "@/types/shopify";

export type ClassesApiLocation = {
  name?: string | null;
  address?: {
    address1?: string | null;
    city?: string | null;
    zip?: string | null;
  } | null;
};

export type ClassesApiProduct = {
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
  variantId?: string | null;
  quantityAvailable?: number | null;
  location?: ClassesApiLocation | null;
  eventStartDateTime?: string | null;
  eventEndDateTime?: string | null;
  price?: string;
  image?: {
    url: string;
    altText?: string | null;
  } | null;
};

type ClassesListResponse = {
  ok: boolean;
  collectionTitle?: string;
  products?: ClassesApiProduct[];
  error?: string;
};

export const classesListQueryKey = ["products", "classes"] as const;

const getApiUrl = (path: string) => {
  return typeof window === "undefined" ? buildCanonicalUrl(path) : path;
};

export const fetchClassesList = async () => {
  const response = await fetch(getApiUrl("/api/shopify/classes"), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to load classes");
  }

  const data = (await response.json()) as ClassesListResponse;
  if (!data.ok) {
    throw new Error(data.error || "Failed to load classes");
  }

  return data.products || [];
};

export const fetchClassByHandle = async (handle: string) => {
  const classes = await fetchClassesList();
  const normalizedHandle = handle.toLowerCase();
  return (
    classes.find(
      (classItem) => classItem.handle.toLowerCase() === normalizedHandle,
    ) || null
  );
};

export const buildClassNode = (
  product: ClassesApiProduct,
): ShopifyProductNode => {
  const amount = product.price || "0";
  const imageUrl = product.image?.url;
  const imageAlt = product.image?.altText || product.title;
  const fallbackVariantId = `${product.id}-variant`;
  const variantId = product.variantId || fallbackVariantId;
  const seatsLeft = product.quantityAvailable ?? null;
  const hasVariantId = Boolean(product.variantId);
  const isAvailable =
    hasVariantId && (seatsLeft === null ? true : seatsLeft > 0);

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
      edges: [
        {
          node: {
            id: variantId,
            title: "Class Seat",
            price: {
              amount,
              currencyCode: "USD",
            },
            availableForSale: isAvailable,
            selectedOptions: [{ name: "Seat", value: "Class" }],
          },
        },
      ],
    },
    options: [{ name: "Seat", values: ["Class"] }],
    eventStartDateTime: product.eventStartDateTime ?? null,
    eventEndDateTime: product.eventEndDateTime ?? null,
    location: product.location ?? null,
    quantityAvailable: seatsLeft,
  };
};

export const mapClassToShopifyProduct = (
  product: ClassesApiProduct,
): ShopifyProduct => {
  return { node: buildClassNode(product) };
};
