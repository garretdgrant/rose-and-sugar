"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import type { ShopifyProduct } from "@/types/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import Link from "next/link";

interface ShopifyCookieCardProps {
  product: ShopifyProduct;
}

const ShopifyCookieCard = ({ product }: ShopifyCookieCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const { node } = product;

  const imageNode = node.images?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!firstVariant || isAdded) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-bakery-pink-light/20 hover:border-bakery-pink-light/40">
      {/* Image Container */}
      <Link
        href={`/cookies/signature-sugar-cookie-sets/${node.handle}`}
        className="relative aspect-square overflow-hidden bg-bakery-offWhite block"
      >
        {imageNode?.url ? (
          <Image
            src={imageNode.url}
            alt={imageNode.altText || node.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-bakery-pink-light/30 flex items-center justify-center">
              <span className="text-bakery-pink-dark/60 text-xs font-medium">
                No image
              </span>
            </div>
          </div>
        )}

        {/* Quick Add Overlay - visible on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
          <span className="text-bakery-pink-dark font-semibold text-sm">
            ${parseFloat(price?.amount || "0").toFixed(2)}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <Link href={`/cookies/signature-sugar-cookie-sets/${node.handle}`}>
          <h3 className="font-bebas text-lg sm:text-xl text-gray-800 mb-1.5 leading-tight tracking-wide group-hover:text-bakery-pink-dark transition-colors">
            {node.title}
          </h3>
        </Link>

        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-poppins">
          {node.description ||
            "Handcrafted decorated sugar cookies, perfect for any celebration."}
        </p>

        {/* Add to Cart Button */}
        <Button
          type="button"
          onClick={(e) => handleAddToCart(e)}
          className={`w-full rounded-xl py-4 sm:py-5 text-xs sm:text-sm font-medium transition-all duration-300 ${
            isAdded
              ? "bg-green-500 hover:bg-green-500 text-white"
              : "bg-bakery-pink hover:bg-bakery-pink-dark text-white"
          }`}
          disabled={!firstVariant}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </article>
  );
};

export default ShopifyCookieCard;
