"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";

interface ClassProductCardProps {
  product: ShopifyProduct;
}

const ClassProductCard = ({ product }: ClassProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;

  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const isAvailable = variant?.availableForSale ?? true;

  // Extract date from title (e.g., "Spring Cookie Decorating Class - June 12")
  const dateMatch = node.title.match(/- ([A-Za-z]+ \d+)/);
  const dateStr = dateMatch ? dateMatch[1] : "";

  const handleAddToCart = () => {
    if (!variant || !isAvailable) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    };

    addItem(cartItem);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image?.url || "/openDefault.webp"}
          alt={image?.altText || node.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        {dateStr && (
          <div className="absolute top-3 left-3 bg-bakery-pink-dark text-white px-3 py-1 rounded-full text-sm font-medium">
            {dateStr}
          </div>
        )}
        {!isAvailable && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bebas text-xl text-gray-900 line-clamp-2">
          {node.title.split(" - ")[0]}
        </h3>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {node.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-bakery-pink-dark">
            ${price.toFixed(0)}
          </span>

          <Button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAvailable ? "Book Seat" : "Sold Out"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassProductCard;
