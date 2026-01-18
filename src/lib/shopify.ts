// Shopify Storefront API helpers for client-side product/catalog use.
const SHOPIFY_API_VERSION =
  process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2025-07";
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";

const SHOPIFY_STOREFRONT_URL = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`
  : "";

const isShopifyConfigured = Boolean(
  SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_TOKEN,
);

export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType: string;
    tags: string[];
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: ShopifyVariant;
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      productType
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function assertShopifyConfig() {
  if (!isShopifyConfigured) {
    throw new Error(
      "Missing Shopify configuration. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN.",
    );
  }
}

const mockProducts: ShopifyProduct[] = [
  {
    node: {
      id: "gid://shopify/Product/9001",
      title: "Spring Cookie Decorating Class - April 12",
      description:
        "Hands-on cookie decorating class with seasonal designs and all supplies included.",
      handle: "spring-cookie-class-april-12",
      productType: "Cookie Decorating Class",
      tags: ["class", "spring"],
      priceRange: {
        minVariantPrice: { amount: "55.00", currencyCode: "USD" },
      },
      images: {
        edges: [
          {
            node: {
              url: "/openDefault.webp",
              altText: "Cookie decorating class",
            },
          },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/9001",
              title: "General Admission",
              price: { amount: "55.00", currencyCode: "USD" },
              availableForSale: true,
              selectedOptions: [],
            },
          },
        ],
      },
      options: [],
    },
  },
  {
    node: {
      id: "gid://shopify/Product/9002",
      title: "Summer Cookie Decorating Class - June 21",
      description:
        "Relaxed summer-themed decorating session with guided instruction.",
      handle: "summer-cookie-class-june-21",
      productType: "Cookie Decorating Class",
      tags: ["class", "summer"],
      priceRange: {
        minVariantPrice: { amount: "60.00", currencyCode: "USD" },
      },
      images: {
        edges: [
          {
            node: {
              url: "/roseSugarClassCropped.webp",
              altText: "Summer class",
            },
          },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/9002",
              title: "General Admission",
              price: { amount: "60.00", currencyCode: "USD" },
              availableForSale: true,
              selectedOptions: [],
            },
          },
        ],
      },
      options: [],
    },
  },
  {
    node: {
      id: "gid://shopify/Product/8001",
      title: "Birthday Cookie Box",
      description: "A colorful set of birthday-themed sugar cookies.",
      handle: "birthday-cookie-box",
      productType: "Pre-Designed Cookies",
      tags: ["birthday", "celebration"],
      priceRange: {
        minVariantPrice: { amount: "42.00", currencyCode: "USD" },
      },
      images: {
        edges: [
          {
            node: {
              url: "/predesigned/one-in-melon.webp",
              altText: "Birthday cookies",
            },
          },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/8001",
              title: "Default",
              price: { amount: "42.00", currencyCode: "USD" },
              availableForSale: true,
              selectedOptions: [],
            },
          },
        ],
      },
      options: [],
    },
  },
  {
    node: {
      id: "gid://shopify/Product/8002",
      title: "Floral Cookie Bundle",
      description: "Soft pastel florals perfect for showers and brunches.",
      handle: "floral-cookie-bundle",
      productType: "Pre-Designed Cookies",
      tags: ["floral", "thank-you"],
      priceRange: {
        minVariantPrice: { amount: "45.00", currencyCode: "USD" },
      },
      images: {
        edges: [
          {
            node: {
              url: "/predesigned/floral-bundle.webp",
              altText: "Floral cookie bundle",
            },
          },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/8002",
              title: "Default",
              price: { amount: "45.00", currencyCode: "USD" },
              availableForSale: true,
              selectedOptions: [],
            },
          },
        ],
      },
      options: [],
    },
  },
  {
    node: {
      id: "gid://shopify/Product/8003",
      title: "Housewarming Cookie Set",
      description: "Celebrate new homes with a cozy cookie set.",
      handle: "housewarming-cookie-set",
      productType: "Pre-Designed Cookies",
      tags: ["housewarming", "corporate"],
      priceRange: {
        minVariantPrice: { amount: "48.00", currencyCode: "USD" },
      },
      images: {
        edges: [
          {
            node: {
              url: "/predesigned/welcome-home.webp",
              altText: "Housewarming cookies",
            },
          },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/8003",
              title: "Default",
              price: { amount: "48.00", currencyCode: "USD" },
              availableForSale: true,
              selectedOptions: [],
            },
          },
        ],
      },
      options: [],
    },
  },
];

function parseProductTypeQuery(query?: string) {
  if (!query) return null;
  const match = query.match(/product_type:\s*"([^"]+)"/i);
  if (match?.[1]) return match[1];
  const looseMatch = query.match(/product_type:([^\s]+)/i);
  if (looseMatch?.[1]) return looseMatch[1];
  const lowered = query.toLowerCase();
  if (lowered.includes("cookie decorating class")) {
    return "Cookie Decorating Class";
  }
  if (lowered.includes("pre-designed cookies")) {
    return "Pre-Designed Cookies";
  }
  return null;
}

export async function storefrontApiRequest(
  query: string,
  variables: Record<string, unknown> = {},
) {
  assertShopifyConfig();
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shopify error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(
      `Shopify error: ${data.errors
        .map((e: { message: string }) => e.message)
        .join(", ")}`,
    );
  }

  return data;
}

export async function fetchProducts(
  first: number = 20,
  query?: string,
): Promise<ShopifyProduct[]> {
  if (!isShopifyConfigured) {
    const productType = parseProductTypeQuery(query);
    const normalizedType = productType?.toLowerCase() ?? null;
    const filtered = normalizedType
      ? mockProducts.filter(
          (product) =>
            product.node.productType.toLowerCase() === normalizedType,
        )
      : mockProducts;
    return filtered.slice(0, first);
  }

  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query });
  return data.data.products.edges;
}

export async function fetchProductByHandle(
  handle: string,
): Promise<ShopifyProduct["node"] | null> {
  if (!isShopifyConfigured) {
    const match = mockProducts.find(
      (product) => product.node.handle === handle,
    );
    return match?.node ?? null;
  }

  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.data.productByHandle;
}

export async function createStorefrontCheckout(
  items: Array<{ variantId: string; quantity: number }>,
): Promise<string> {
  if (!isShopifyConfigured) {
    const serialized = encodeURIComponent(JSON.stringify(items));
    return `https://example.com/mock-checkout?items=${serialized}`;
  }

  const lines = items.map((item) => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines },
  });

  if (cartData.data.cartCreate.userErrors.length > 0) {
    throw new Error(
      `Cart creation failed: ${cartData.data.cartCreate.userErrors
        .map((e: { message: string }) => e.message)
        .join(", ")}`,
    );
  }

  const cart = cartData.data.cartCreate.cart;

  if (!cart.checkoutUrl) {
    throw new Error("No checkout URL returned from Shopify");
  }

  const url = new URL(cart.checkoutUrl);
  url.searchParams.set("channel", "online_store");
  return url.toString();
}
