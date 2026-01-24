"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import ShopifyCookieGrid from "@/components/cookie/ShopifyCookieGrid";
import FAQAccordion from "@/components/FAQAccordion";
import type { ShopifyProduct } from "@/types/shopify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPredesignedList,
  mapPredesignedToShopifyProduct,
  predesignedDetailQueryKey,
  predesignedListQueryKey,
  type PredesignedApiProduct,
} from "@/lib/predesignedCookies";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type SortOption = "featured" | "price-low" | "price-high" | "name-az";

const ShopifyPreDesignedClient = () => {
  const queryClient = useQueryClient();
  const {
    data: apiProducts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: predesignedListQueryKey,
    queryFn: fetchPredesignedList,
  });
  const loadError =
    isError && (!apiProducts || apiProducts.length === 0)
      ? "We couldn't load the cookie collection right now."
      : null;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const products = useMemo<ShopifyProduct[]>(() => {
    return (apiProducts || []).map(mapPredesignedToShopifyProduct);
  }, [apiProducts]);

  useEffect(() => {
    if (!apiProducts) return;
    apiProducts.forEach((product: PredesignedApiProduct) => {
      const key = predesignedDetailQueryKey(product.handle);
      if (queryClient.getQueryData(key)) return;
      queryClient.setQueryData(key, product);
    });
  }, [apiProducts, queryClient]);

  const productTypeCategories = useMemo(() => {
    const seen = new Set<string>();
    const categories: string[] = [];

    products.forEach((product) => {
      const type = product.node.productType?.trim();
      if (!type) return;
      const key = type.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      categories.push(type);
    });

    return categories;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      const selectedType = selectedCategory.toLowerCase();
      result = result.filter(
        (product) => product.node.productType?.toLowerCase() === selectedType,
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((product) => {
        const title = product.node.title.toLowerCase();
        const description = product.node.description?.toLowerCase() || "";
        return title.includes(query) || description.includes(query);
      });
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => {
          const priceA = parseFloat(
            a.node.priceRange?.minVariantPrice?.amount || "0",
          );
          const priceB = parseFloat(
            b.node.priceRange?.minVariantPrice?.amount || "0",
          );
          return priceA - priceB;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const priceA = parseFloat(
            a.node.priceRange?.minVariantPrice?.amount || "0",
          );
          const priceB = parseFloat(
            b.node.priceRange?.minVariantPrice?.amount || "0",
          );
          return priceB - priceA;
        });
        break;
      case "name-az":
        result.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const showEmptyState =
    !isLoading && !loadError && filteredAndSortedProducts.length === 0;
  const productCount = filteredAndSortedProducts.length;

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" || searchQuery.trim() || sortBy !== "featured";

  const faqs = [
    {
      question: "What are Signature Sets?",
      answer: (
        <>
          Signature Sets are ready-to-order cookie collections with curated
          designs and color palettes. If you need something tailored,{" "}
          <Link
            className="text-bakery-pink-dark"
            href="/cookies/order-custom-sugar-cookies"
          >
            request a custom order
          </Link>
          .
        </>
      ),
    },
    {
      question: "Can I change colors or designs?",
      answer: (
        <>
          Signature Sets are pre-designed, but we can create a custom set for
          you. Use the{" "}
          <Link
            className="text-bakery-pink-dark"
            href="/cookies/order-custom-sugar-cookies"
          >
            Custom Cookie Orders
          </Link>{" "}
          form to request changes.
        </>
      ),
    },
    {
      question: "How far in advance should I order?",
      answer: (
        <>
          We typically book one month out. Ordering early helps secure your
          preferred pickup date. For timing questions,{" "}
          <Link className="text-bakery-pink-dark" href="/contact">
            contact us
          </Link>
          .
        </>
      ),
    },
    {
      question: "Do you ship Signature Sets?",
      answer: (
        <>
          At this time we do not ship. Pickup details are shared after your
          order is confirmed. For pickup info,{" "}
          <Link className="text-bakery-pink-dark" href="/contact">
            contact us
          </Link>
          .
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bakery-pink-light/20 via-white to-bakery-cream/30">
      {/* Hero Section */}
      <div className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-bakery-peach/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-bakery-pink-light/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-32 bg-bakery-pink/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-bakery-pink-light/50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-medium text-bakery-pink-dark tracking-wide">
                Handcrafted with Love
              </span>
            </div>

            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-gray-800 tracking-wide mb-4">
              Signature Sets
            </h1>

            <p className="font-poppins text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Browse our curated collection of ready-to-order cookie designs.
              Perfect for any celebration.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Search and Filter Bar */}
          <div
            className="mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-bakery-pink-light/30 p-4 md:p-5">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cookie designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-bakery-offWhite rounded-xl border-0 focus:ring-2 focus:ring-bakery-pink/50 focus:bg-white transition-all text-gray-700 placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sort & Filter Controls */}
                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-3 bg-bakery-offWhite rounded-xl border-0 focus:ring-2 focus:ring-bakery-pink/50 text-gray-700 text-sm font-medium cursor-pointer min-w-[140px]"
                  >
                    <option value="featured">Featured</option>
                    <option value="name-az">Name: A to Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      showFilters || hasActiveFilters
                        ? "bg-bakery-pink-dark text-white"
                        : "bg-bakery-offWhite text-gray-700 hover:bg-bakery-pink-light/50"
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Filters</span>
                    {hasActiveFilters && (
                      <span className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                </div>
              </div>

              {/* Category Pills - Always visible on desktop, collapsible on mobile */}
              {mounted && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    showFilters || window.innerWidth >= 768
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 md:max-h-[500px] md:opacity-100"
                  }`}
                >
                  <div className="pt-4 mt-4 border-t border-bakery-pink-light/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">
                        Categories
                      </span>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-bakery-pink-dark hover:text-bakery-pink-dark/80 font-medium transition-colors"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    <div
                      ref={categoryScrollRef}
                      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {["All", ...productTypeCategories].map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                              isActive
                                ? "bg-bakery-pink-dark text-white shadow-md shadow-bakery-pink-dark/20"
                                : "bg-bakery-offWhite text-gray-600 hover:bg-bakery-pink-light/50 hover:text-bakery-pink-dark"
                            }`}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div
            className="flex items-center justify-between mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-gray-600 font-poppins">
              {isLoading ? (
                <span className="inline-block w-32 h-5 bg-gray-200 rounded animate-pulse" />
              ) : (
                <>
                  <span className="font-semibold text-gray-800">
                    {productCount}
                  </span>{" "}
                  {productCount === 1 ? "design" : "designs"} available
                  {selectedCategory !== "All" && (
                    <span className="text-bakery-pink-dark">
                      {" "}
                      in {selectedCategory}
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Product Grid */}
          {loadError ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-bakery-pink-light/30 animate-fade-in">
              <div className="w-16 h-16 bg-bakery-pink-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-bakery-pink-dark" />
              </div>
              <p className="text-gray-700 font-medium mb-2">{loadError}</p>
              <button
                onClick={() => refetch()}
                className="text-bakery-pink-dark hover:underline text-sm"
              >
                Try again
              </button>
            </div>
          ) : (
            <ShopifyCookieGrid
              products={filteredAndSortedProducts}
              isLoading={isLoading}
              emptyMessage="No cookie designs match your search."
            />
          )}

          {/* Empty State with CTA */}
          {showEmptyState && (
            <div className="text-center py-8 animate-fade-in">
              <p className="text-gray-600 mb-4">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <Link
                href="/cookies/order-custom-sugar-cookies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-bakery-pink-dark text-white rounded-full font-medium hover:bg-bakery-pink-dark/90 transition-colors shadow-lg shadow-bakery-pink-dark/20"
              >
                <Sparkles className="w-4 h-4" />
                Request a Custom Design
              </Link>
            </div>
          )}

          {/* Custom Order CTA Banner */}
          {!showEmptyState && !isLoading && products.length > 0 && (
            <div
              className="mt-16 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown rounded-3xl overflow-hidden shadow-xl">
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
                  <div className="text-center md:text-left">
                    <h2 className="font-bebas text-2xl md:text-3xl text-white mb-2">
                      Need Something Custom?
                    </h2>
                    <p className="font-poppins text-white/90 text-sm md:text-base max-w-lg">
                      Design your dream cookies for any occasion. Weddings,
                      birthdays, corporate events—we bring your vision to life.
                    </p>
                  </div>
                  <Link
                    href="/cookies/order-custom-sugar-cookies"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl font-poppins font-bold text-bakery-pink-dark hover:bg-bakery-cream hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap"
                  >
                    Start Custom Order
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {!isLoading && !loadError && (
            <section className="mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/5 border border-bakery-pink-light/20 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="font-bebas text-3xl md:text-4xl text-gray-800">
                    Signature Sets FAQ
                  </h2>
                  <p className="mt-3 text-gray-600 font-poppins">
                    Quick answers about ordering, timing, and customization.
                  </p>
                </div>
                <FAQAccordion faqs={faqs} />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShopifyPreDesignedClient;
