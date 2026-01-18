"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

interface ShopifyCookieCardProps {
  product: ShopifyProduct;
}

const ShopifyCookieCard = ({ product }: ShopifyCookieCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;

  const imageNode = node.images?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const handleAddToCart = () => {
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
  };

  return (
    <Card className="bg-white border border-bakery-pink-light/50 overflow-hidden group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-64 w-full overflow-hidden">
          {imageNode?.url ? (
            <Image
              src={imageNode.url}
              alt={imageNode.altText || node.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-64 w-full bg-bakery-pink-light/20 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bebas text-xl text-bakery-pink-dark mb-2">
            {node.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {node.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-bakery-pink-dark font-semibold text-lg">
              ${parseFloat(price?.amount || "0").toFixed(2)}
            </span>

            <Button
              onClick={handleAddToCart}
              className="bg-bakery-pink hover:bg-bakery-pink-dark text-white"
              size="sm"
              disabled={!firstVariant}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopifyCookieCard;
