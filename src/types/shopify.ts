export type ShopifyImageNode = {
  url: string;
  altText?: string;
};

export type ShopifyImageEdge = {
  node: ShopifyImageNode;
};

export type ShopifyImageConnection = {
  edges: ShopifyImageEdge[];
};

export type ShopifyLocation = {
  name?: string | null;
  address?: {
    address1?: string | null;
    city?: string | null;
    zip?: string | null;
  } | null;
};

export type ShopifyVariantNode = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale?: boolean;
  selectedOptions?: Array<{
    name: string;
    value: string;
  }>;
};

export type ShopifyVariantEdge = {
  node: ShopifyVariantNode;
};

export type ShopifyVariantConnection = {
  edges: ShopifyVariantEdge[];
};

export type ShopifyProductNode = {
  id: string;
  title: string;
  description?: string;
  handle: string;
  productType?: string;
  tags?: string[];
  eventStartDateTime?: string | null;
  eventEndDateTime?: string | null;
  location?: ShopifyLocation | null;
  quantityAvailable?: number | null;
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images?: ShopifyImageConnection;
  variants?: ShopifyVariantConnection;
  options?: Array<{
    name: string;
    values: string[];
  }>;
};

export type ShopifyProduct = {
  node: ShopifyProductNode;
};
