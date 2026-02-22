"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/types/shopify";

const recipePrice = "12.00";
const recipePriceLabel = "$12";

const mockRecipeProduct: ShopifyProduct = {
  node: {
    id: "gid://shopify/Product/mock-no-spread-recipe",
    title: "Megan's Secret No-Spread Sugar Cookie Recipe (Digital Download)",
    description:
      "Mock product used for cart testing until Shopify product syncing is connected.",
    handle: "no-spread-sugar-cookie-recipe",
    productType: "Digital Recipe",
    tags: ["recipe", "digital-download", "mock-product"],
    quantityAvailable: 999,
    priceRange: {
      minVariantPrice: {
        amount: recipePrice,
        currencyCode: "USD",
      },
    },
    images: {
      edges: [
        {
          node: {
            url: "/openDefault.webp",
            altText: "PDF digital download for secret sugar cookie recipe",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/mock-no-spread-recipe-default",
            title: "PDF Download",
            price: {
              amount: recipePrice,
              currencyCode: "USD",
            },
            availableForSale: true,
            selectedOptions: [{ name: "Format", value: "PDF Download" }],
          },
        },
      ],
    },
    options: [{ name: "Format", values: ["PDF Download"] }],
  },
};

type RecipeAddToCartButtonProps = {
  className?: string;
  compact?: boolean;
};

const RecipeAddToCartButton = ({
  className,
  compact = false,
}: RecipeAddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const variant = mockRecipeProduct.node.variants?.edges?.[0]?.node;

  const handleAddToCart = () => {
    if (!variant || isAdded) return;

    addItem({
      product: mockRecipeProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={!variant || isAdded}
      title="Adds a mock recipe product to cart. Shopify product wiring comes later."
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-poppins font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        isAdded
          ? "bg-emerald-500 shadow-emerald-500/30"
          : "bg-gradient-to-r from-bakery-pink-dark to-bakery-pink shadow-bakery-pink/35 hover:shadow-xl hover:shadow-bakery-pink/40",
        compact ? "px-5 py-3 text-sm" : "text-base",
        className,
      )}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4" />
          <span>{compact ? "Added" : "Added to Cart"}</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          <span>
            {compact
              ? `Get Recipe - ${recipePriceLabel}`
              : "Add to Cart - Get the Recipe Instantly"}
          </span>
        </>
      )}
      {!compact && (
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
          {recipePriceLabel}
        </span>
      )}
    </button>
  );
};

export default RecipeAddToCartButton;
