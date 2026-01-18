"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ShopifyCookieGrid from "@/components/cookie/ShopifyCookieGrid";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { cookieCategories } from "@/data/cookieCategories";

const ShopifyPreDesignedClient = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const cookieProducts = await fetchProducts(
          50,
          'product_type:"Pre-Designed Cookies"',
        );
        setProducts(cookieProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        setLoadError("We couldn't load the cookie collection right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;

    const slug = selectedCategory.toLowerCase().replace(/\s+/g, "-");
    const slugPhrase = slug.replace(/-/g, " ");

    return products.filter((product) => {
      const title = product.node.title.toLowerCase();
      const tags = (product.node.tags || []).map((tag) => tag.toLowerCase());
      const tagMatches = tags.some(
        (tag) =>
          tag.includes(slugPhrase) ||
          tag.replace(/\s+/g, "-") === slug ||
          tag.includes(slug),
      );

      return tagMatches || title.includes(slugPhrase) || title.includes(slug);
    });
  }, [products, selectedCategory]);

  const showEmptyState = !isLoading && !loadError && filteredProducts.length === 0;

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-bakery-offWhite">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-bebas text-4xl md:text-5xl text-bakery-pink-dark text-center mb-6">
            Pre-Designed Cookie Collection
          </h1>
          <p className="text-center max-w-3xl mx-auto text-gray-700 mb-12">
            Browse our ready-to-order cookie designs and add your favorites to
            the cart. We&apos;ll confirm availability and pickup details after
            checkout.
            <br />
            <br />
            Looking for custom designed cookies?{" "}
            <Link className="text-bakery-pink-dark" href="/cookies/custom-orders">
              Order Here
            </Link>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {["All", ...cookieCategories.map((category) => category.name)].map(
              (category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-bakery-pink-dark bg-bakery-pink-dark text-white"
                        : "border-bakery-pink-light bg-white text-bakery-pink-dark hover:border-bakery-pink-dark/60 hover:bg-bakery-pink-light/30"
                    }`}
                  >
                    {category}
                  </button>
                );
              },
            )}
          </div>

          {loadError ? (
            <div className="text-center text-gray-600 mb-12">{loadError}</div>
          ) : (
            <ShopifyCookieGrid
              products={filteredProducts}
              isLoading={isLoading}
              emptyMessage="No cookie designs found in this category."
            />
          )}

          {showEmptyState && (
            <p className="text-center text-gray-600 mt-10">
              Looking for something custom?{" "}
              <Link className="text-bakery-pink-dark" href="/contact">
                Request a custom set
              </Link>
              .
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShopifyPreDesignedClient;
