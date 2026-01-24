import type { ShopifyProduct } from "@/types/shopify";
import ShopifyCookieCard from "./ShopifyCookieCard";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Cookie, Sparkles } from "lucide-react";

interface ShopifyCookieGridProps {
  products: ShopifyProduct[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const ShopifyCookieGrid = ({
  products,
  isLoading = false,
  emptyMessage = "No cookie designs found.",
}: ShopifyCookieGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-bakery-pink-light/20 shadow-sm"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <Skeleton className="aspect-square w-full" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-11 w-full mt-4 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-bakery-pink-light/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-10 h-10 text-bakery-pink-dark" />
          </div>
          <h3 className="font-bebas text-2xl text-gray-800 mb-2">
            No Designs Found
          </h3>
          <p className="text-gray-500 mb-8 font-poppins">{emptyMessage}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cookies/order-custom-sugar-cookies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bakery-pink-dark text-white rounded-full font-medium hover:bg-bakery-pink-dark/90 transition-colors shadow-lg shadow-bakery-pink-dark/20"
            >
              <Sparkles className="w-4 h-4" />
              Request Custom Design
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-bakery-pink text-bakery-pink-dark rounded-full font-medium hover:bg-bakery-pink-light/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
      {products.map((product, index) => (
        <div
          key={product.node.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${Math.min(index * 0.05, 0.3)}s`,
            animationFillMode: "backwards",
          }}
        >
          <ShopifyCookieCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ShopifyCookieGrid;
