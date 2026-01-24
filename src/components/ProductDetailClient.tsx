"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import type { ShopifyProduct } from "@/types/shopify";
import { useCartStore } from "@/stores/cartStore";

export default function ProductDetailClient({
  product,
  actionLabel = "Add to Cart",
  addedLabel = "Added to Cart!",
  addedLabelSingular,
  addedLabelPlural,
  helperText = "Checkout opens in a new tab.",
}: {
  product: ShopifyProduct["node"];
  actionLabel?: string;
  addedLabel?: string;
  addedLabelSingular?: string;
  addedLabelPlural?: string;
  helperText?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const firstVariant = product.variants?.edges?.[0]?.node;
  const addedLabelText =
    quantity === 1
      ? addedLabelSingular || addedLabel
      : addedLabelPlural || addedLabel;

  const handleAdd = async () => {
    if (!firstVariant || isAdded) return;

    addItem({
      product: { node: product },
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: quantity,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 2000);
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700 font-poppins">
          Quantity
        </span>
        <div className="flex items-center gap-1 bg-bakery-offWhite rounded-xl p-1">
          <button
            type="button"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-bakery-pink-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-semibold text-gray-800 tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={incrementQuantity}
            disabled={quantity >= 10}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-bakery-pink-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAdd}
        disabled={!firstVariant || isAdded}
        className={`w-full py-6 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg ${
          isAdded
            ? "bg-emerald-500 hover:bg-emerald-500 text-white shadow-emerald-500/30"
            : "bg-bakery-pink-dark hover:bg-bakery-pink-dark/90 text-white shadow-bakery-pink-dark/30 hover:shadow-xl hover:-translate-y-0.5"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            {addedLabelText}
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            {actionLabel}
          </>
        )}
      </Button>

      {/* Helper Text */}
      <p className="text-center text-sm text-gray-500 font-poppins">
        {helperText}
      </p>
    </div>
  );
}
