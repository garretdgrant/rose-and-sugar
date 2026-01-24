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

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>,
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

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error("Shopify GraphQL returned errors");
  }

  return json.data;
}
