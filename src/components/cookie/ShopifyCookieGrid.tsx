import { ShopifyProduct } from "@/lib/shopify";
import ShopifyCookieCard from "./ShopifyCookieCard";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg overflow-hidden border border-bakery-pink-light/50"
          >
            <Skeleton className="h-64 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-9 w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-6">{emptyMessage}</p>
        <div className="flex gap-4 justify-center">
          <a
            href="/contact"
            className="px-6 py-2 border border-bakery-pink text-bakery-pink-dark rounded-md hover:bg-bakery-pink-light/20 transition-colors"
          >
            Request Custom Design
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ShopifyCookieCard key={product.node.id} product={product} />
      ))}
    </div>
  );
};

export default ShopifyCookieGrid;
