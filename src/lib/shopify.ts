// lib/shopify.ts

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_TOKEN = process.env.SHOPIFY_PRIVATE_TOKEN!;

if (!SHOPIFY_DOMAIN) {
  throw new Error("Missing SHOPIFY_STORE_DOMAIN env");
}

if (!SHOPIFY_TOKEN) {
  throw new Error("Missing SHOPIFY_PRIVATE_TOKEN env");
}

const GRAPHQL_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`;

type CartLineInput = {
  quantity: number;
  merchandiseId: string;
  attributes?: Array<{
    key: string;
    value: string;
  }>;
};

type CartCreateResponse = {
  cartCreate: {
    cart: {
      checkoutUrl: string | null;
    } | null;
    userErrors: Array<{
      message: string;
    }>;
  };
};

type ShopifyGraphQLError = {
  message?: string;
};

type ShopifyGraphQLResponse<T> = {
  data: T;
  errors?: ShopifyGraphQLError[];
};

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as ShopifyGraphQLResponse<T>;

  if (json.errors?.length) {
    const message = json.errors
      .map((error) => error.message)
      .filter((errorMessage): errorMessage is string => Boolean(errorMessage))
      .join(", ");
    const errorMessage = message || "Shopify GraphQL returned errors";
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error(errorMessage);
  }

  return json.data;
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        checkoutUrl
      }
      userErrors {
        message
      }
    }
  }
`;

export async function createShopifyCart(
  items: Array<{
    variantId: string;
    quantity: number;
    attributes?: Array<{ key: string; value: string }>;
  }>,
) {
  const lines: CartLineInput[] = items.map((item) => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
    attributes: item.attributes,
  }));

  const data = await shopifyFetch<CartCreateResponse>(CART_CREATE_MUTATION, {
    lines,
  });

  const errors = data.cartCreate.userErrors;
  if (errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(", "));
  }

  const checkoutUrl = data.cartCreate.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("Missing checkout URL from Shopify");
  }

  return checkoutUrl;
}
