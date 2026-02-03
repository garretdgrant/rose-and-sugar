"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import type { ShopifyProduct } from "@/types/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import Link from "next/link";
import { getPredesignedSizeLabel } from "@/lib/predesignedCookies";

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
  const isSoldOut = node.cookieSoldOut === true;
  const isAvailable = !isSoldOut && (firstVariant?.availableForSale ?? true);
  const sizeLabel = getPredesignedSizeLabel(node.tags) || "set";
  const leadDays =
    typeof node.cookieLeadDays === "number" ? node.cookieLeadDays : null;

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!firstVariant || isAdded || !isAvailable) return;

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

        {/* Sold Out Badge - Refined styling */}
        {isSoldOut && (
          <div className="absolute top-3 left-3 bg-gray-800/95 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg border border-white/10">
            Sold Out
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-bakery-pink-light/20">
          <div className="text-bakery-pink-dark font-semibold text-sm leading-tight">
            ${parseFloat(price?.amount || "0").toFixed(2)}
            <span className="ml-1 text-[10px] font-medium text-gray-500">
              per {sizeLabel}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <Link href={`/cookies/signature-sugar-cookie-sets/${node.handle}`}>
          <h3 className="font-bebas text-lg sm:text-xl text-gray-800 mb-2 leading-tight tracking-wide group-hover:text-bakery-pink-dark transition-colors">
            {node.title}
          </h3>
        </Link>

        {leadDays !== null && (
          <div className="inline-flex items-center gap-1.5 bg-bakery-cream/50 px-2.5 py-1 rounded-full mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-bakery-pink-dark animate-pulse" />
            <p className="text-[11px] font-poppins font-medium text-gray-600">
              {leadDays} day{leadDays === 1 ? "" : "s"} lead time
            </p>
          </div>
        )}

        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-poppins">
          {node.description ||
            "Handcrafted decorated sugar cookies, perfect for any celebration."}
        </p>

        {/* Add to Cart Button */}
        <Button
          type="button"
          onClick={(e) => handleAddToCart(e)}
          className={`w-full rounded-xl py-4 sm:py-5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
            !isAvailable
              ? "bg-gray-100 hover:bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
              : isAdded
                ? "bg-green-500 hover:bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "bg-bakery-pink hover:bg-bakery-pink-dark text-white shadow-md shadow-bakery-pink/20 hover:shadow-lg hover:shadow-bakery-pink-dark/30"
          }`}
          disabled={!firstVariant || !isAvailable}
        >
          {!isAvailable ? (
            <span className="flex items-center justify-center">Sold Out</span>
          ) : isAdded ? (
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
