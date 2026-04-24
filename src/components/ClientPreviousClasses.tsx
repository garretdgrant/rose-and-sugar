"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, History, Loader2 } from "lucide-react";
import ClassProductCard from "@/components/ClassProductCard";
import {
  classesListQueryKey,
  fetchClassesList,
  mapClassToShopifyProduct,
} from "@/lib/shopifyClasses";

const getEventTimestamp = (value?: string | null) => {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const getGridClassName = (count: number) => {
  if (count === 1) return "grid-cols-1 max-w-md mx-auto";
  if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
};

const ClientPreviousClasses = () => {
  const [cutoffTimestamp] = useState(() => Date.now());
  const {
    data: apiClasses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: classesListQueryKey,
    queryFn: fetchClassesList,
  });

  const loadError =
    isError && (!apiClasses || apiClasses.length === 0)
      ? "We couldn't load classes right now."
      : null;

  const previousClasses = useMemo(() => {
    return [...(apiClasses || [])]
      .filter((classItem) => {
        const eventEnd = getEventTimestamp(classItem.eventEndDateTime);
        const eventStart = getEventTimestamp(classItem.eventStartDateTime);
        const cutoff = eventEnd ?? eventStart;

        if (cutoff === null) return false;
        return cutoff < cutoffTimestamp;
      })
      .sort((a, b) => {
        const aTime =
          getEventTimestamp(a.eventStartDateTime) ?? Number.NEGATIVE_INFINITY;
        const bTime =
          getEventTimestamp(b.eventStartDateTime) ?? Number.NEGATIVE_INFINITY;
        return bTime - aTime;
      })
      .map((classItem) => {
        const product = mapClassToShopifyProduct(classItem);
        const soldOutVariantEdges =
          product.node.variants?.edges.map((edge) => ({
            ...edge,
            node: {
              ...edge.node,
              availableForSale: false,
            },
          })) ?? [];

        return {
          ...product,
          node: {
            ...product.node,
            quantityAvailable: 0,
            variants: {
              edges: soldOutVariantEdges,
            },
          },
        };
      });
  }, [apiClasses, cutoffTimestamp]);

  return (
    <section
      id="previous-classes"
      className="relative overflow-hidden bg-gradient-to-b from-white via-bakery-cream/50 to-bakery-pink-light/40 py-24 md:py-32"
    >
      <div className="absolute top-20 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-bakery-peach/30 to-transparent blur-3xl" />
      <div className="absolute bottom-20 -right-32 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/50 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <History className="h-4 w-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Past Sessions
              </span>
            </div>
            <h2 className="font-bebas text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-gray-800">Previous</span>{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Decorating Classes
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-poppins text-lg text-gray-600">
              Browse through our collection of past cookie decorating classes
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-bakery-pink-dark" />
                <p className="font-poppins text-gray-600">Loading classes...</p>
              </div>
            </div>
          ) : loadError ? (
            <div className="rounded-3xl border border-bakery-pink-light/30 bg-white/70 py-16 text-center shadow-lg backdrop-blur-sm">
              <p className="font-poppins text-gray-600">{loadError}</p>
            </div>
          ) : previousClasses.length === 0 ? (
            <div className="rounded-3xl border border-bakery-pink-light/30 bg-white/70 py-16 text-center shadow-lg backdrop-blur-sm">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-bakery-pink-light" />
              <p className="font-poppins text-lg text-gray-600">
                No previous classes to display yet.
              </p>
              <p className="mt-2 font-poppins text-gray-500">
                Check our upcoming classes to join future sessions!
              </p>
              <div className="mt-6">
                <Link
                  href="/classes"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink px-8 py-4 font-poppins font-semibold text-white shadow-lg shadow-bakery-pink/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-bakery-pink/40"
                >
                  View Upcoming Classes
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ) : (
            <div
              className={`grid gap-6 lg:gap-8 ${getGridClassName(previousClasses.length)}`}
            >
              {previousClasses.map((classItem) => (
                <ClassProductCard key={classItem.node.id} product={classItem} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientPreviousClasses;
