"use client";
import { useEffect, useMemo, useState } from "react";
import DesignCard from "@/components/cookie/DesignCard";
import OrderForm from "@/components/cookie/OrderForm";
import Link from "next/link";
import { FetchedDesign, transformToDesign } from "@/lib/fetchSanity";

export interface Design {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
  quantity: number;
}

const CATEGORY_ORDER = [
  "Housewarming / Real Estate",
  "Holidays",
  "Florals",
  "Sports",
  "Thank you",
  "Condolences",
  "General Baked Cookies",
] as const;

const PreDesignedClient = ({ predesigns }: { predesigns: FetchedDesign[] }) => {
  const transformedDesigns = useMemo(
    () => predesigns.map((design) => transformToDesign(design)),
    [predesigns],
  );

  const [designs, setDesigns] = useState<Design[]>(transformedDesigns);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setDesigns(transformedDesigns);
  }, [transformedDesigns]);

  const availableCategories = useMemo(() => {
    const presentDefaults = CATEGORY_ORDER.filter((category) =>
      transformedDesigns.some((design) => design.category === category),
    );

    const additionalCategories = Array.from(
      new Set(
        transformedDesigns
          .map((design) => design.category)
          .filter((category): category is string => {
            if (!category) return false;
            return !CATEGORY_ORDER.includes(
              category as (typeof CATEGORY_ORDER)[number],
            );
          }),
      ),
    );

    return [...presentDefaults, ...additionalCategories];
  }, [transformedDesigns]);

  const filteredDesigns = useMemo(() => {
    if (selectedCategory === "All") {
      return designs;
    }
    return designs.filter((design) => design.category === selectedCategory);
  }, [designs, selectedCategory]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setDesigns((prev) =>
      prev.map((design) =>
        design.id === id ? { ...design, quantity } : design,
      ),
    );
  };

  const selectedDesigns = designs.filter((design) => design.quantity > 0);

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-bakery-offWhite">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-bebas text-4xl md:text-5xl text-bakery-pink-dark text-center mb-6">
            Pre-Designed Cookie Collection
          </h1>
          <p className="text-center max-w-3xl mx-auto text-gray-700 mb-12">
            Browse our ready-to-order cookie designs below! These pre-made
            options are perfect for birthdays, thank-yous, and more. Simply
            select the designs you&apos;d like, choose quantities, and send your
            request — we&apos;ll take care of the rest!
            <br />
            <br />
            Looking for custom designed cookies?{" "}
            <Link
              className="text-bakery-pink-dark"
              href="/cookies/custom-orders"
            >
              Order Here
            </Link>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {["All", ...availableCategories].map((category) => {
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
            })}
          </div>

          {filteredDesigns.length === 0 ? (
            <p className="text-center text-gray-600 mb-12">
              No designs found in this category. Try another filter or{" "}
              <Link className="text-bakery-pink-dark" href="/contact">
                request a custom set
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  {...design}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          )}

          <div
            id="order-form"
            className="max-w-2xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md"
          >
            <h2 className="font-bebas text-2xl md:text-3xl text-bakery-pink-dark mb-6 text-center">
              Request Your Order
            </h2>
            <OrderForm selectedDesigns={selectedDesigns} />
            <p className="text-center text-gray-600 mt-6">
              We&apos;ll follow up within 48 hours to confirm availability and
              pricing. Thank you!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreDesignedClient;
