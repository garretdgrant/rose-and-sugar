import { classDetails } from "@/data/classDetails";
import { predesignedCookies } from "@/data/predesignedCookies";
import type { ShopifyProduct } from "@/types/shopify";

const classProducts: ShopifyProduct[] = classDetails.map((detail) => ({
  node: detail.product,
}));

const cookieProducts: ShopifyProduct[] = predesignedCookies.map(
  (cookie, index) => {
    const amount = cookie.price.toFixed(2);
    const slugParts = cookie.slug.split("-");
    const nameParts = cookie.name.toLowerCase().split(/\s+/);
    const tags = Array.from(
      new Set([
        "signature",
        "pre-designed",
        "ready-to-order",
        cookie.slug.replace(/-/g, " "),
        ...slugParts,
        ...nameParts,
      ]),
    );

    return {
      node: {
        id: `gid://shopify/Product/mock-cookie-${index + 1}`,
        title: cookie.name,
        description: cookie.shortDescription,
        handle: cookie.slug,
        productType: "Pre-Designed Cookies",
        tags,
        priceRange: {
          minVariantPrice: {
            amount,
            currencyCode: "USD",
          },
        },
        images: {
          edges: cookie.images.map((url) => ({
            node: {
              url,
              altText: `${cookie.name} cookie`,
            },
          })),
        },
        variants: {
          edges: [
            {
              node: {
                id: `gid://shopify/ProductVariant/mock-cookie-${index + 1}`,
                title: "Signature Set",
                price: {
                  amount,
                  currencyCode: "USD",
                },
                availableForSale: true,
                selectedOptions: [{ name: "Set", value: "Signature" }],
              },
            },
          ],
        },
        options: [{ name: "Set", values: ["Signature"] }],
      },
    };
  },
);

export const mockShopifyClasses = classProducts;
export const mockShopifyCookies = cookieProducts;
export const mockShopifyProducts = [...classProducts, ...cookieProducts];

export function getMockProductByHandle(handle: string) {
  const normalizedHandle = handle.toLowerCase();
  return (
    mockShopifyProducts.find(
      (product) => product.node.handle.toLowerCase() === normalizedHandle,
    )?.node ?? null
  );
}
