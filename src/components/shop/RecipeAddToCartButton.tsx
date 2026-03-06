"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/types/shopify";

const toPriceLabel = (amount?: string | null) => {
  const parsed = amount ? Number.parseFloat(amount) : Number.NaN;
  if (Number.isNaN(parsed)) return "$0";
  return `$${parsed.toFixed(parsed % 1 === 0 ? 0 : 2)}`;
};

type RecipeAddToCartButtonProps = {
  product: ShopifyProduct | null;
  preferredVariantId?: string;
  className?: string;
  compact?: boolean;
  label?: string;
  compactLabel?: string;
  successLabel?: string;
  compactSuccessLabel?: string;
};

const RecipeAddToCartButton = ({
  product,
  preferredVariantId,
  className,
  compact = false,
  label,
  compactLabel,
  successLabel,
  compactSuccessLabel,
}: RecipeAddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const variants =
    product?.node.variants?.edges?.map((edge) => edge.node) || [];
  const firstAvailableVariant = variants.find(
    (entry) => entry.availableForSale !== false,
  );
  const variant =
    (preferredVariantId
      ? variants.find((entry) => entry.id === preferredVariantId)
      : null) ||
    firstAvailableVariant ||
    variants[0];
  const isUnavailable =
    !product || !variant || variant.availableForSale === false;
  const priceLabel = toPriceLabel(
    variant?.price.amount || product?.node.priceRange?.minVariantPrice?.amount,
  );

  const handleAddToCart = () => {
    if (!product || !variant || isAdded || isUnavailable) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
      imageOverride: "/cookie-class.webp",
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const activeLabel = compact
    ? compactLabel || `Get Recipe - ${priceLabel}`
    : label || `Add to Cart - ${priceLabel}`;
  const activeSuccessLabel = compact
    ? compactSuccessLabel || "Added"
    : successLabel || "Added to Cart";

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isUnavailable || isAdded}
      title={
        isUnavailable
          ? "Recipe is unavailable right now."
          : "Add recipe to cart."
      }
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-poppins font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        isAdded
          ? "bg-emerald-500 shadow-emerald-500/30"
          : isUnavailable
            ? "bg-gray-300 shadow-none"
            : "bg-gradient-to-r from-bakery-pink-dark to-bakery-pink shadow-bakery-pink/35 hover:shadow-xl hover:shadow-bakery-pink/40",
        compact ? "px-5 py-3 text-sm" : "text-base",
        className,
      )}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4" />
          <span>{activeSuccessLabel}</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          <span>{activeLabel}</span>
        </>
      )}
      {!compact && (
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
          {priceLabel}
        </span>
      )}
    </button>
  );
};

export default RecipeAddToCartButton;
