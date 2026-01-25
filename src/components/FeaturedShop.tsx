"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  ShoppingCart,
  Check,
  Sparkles,
  Calendar,
  Users,
  Mail,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import WaitlistModal from "@/components/WaitlistModal";
import {
  fetchPredesignedList,
  mapPredesignedToShopifyProduct,
  predesignedListQueryKey,
} from "@/lib/predesignedCookies";
import {
  classesListQueryKey,
  fetchClassesList,
  mapClassToShopifyProduct,
  type ClassesApiProduct,
} from "@/lib/shopifyClasses";
import type { ShopifyProduct } from "@/types/shopify";
import { useCartStore } from "@/stores/cartStore";

const FeaturedClassCard = ({
  product,
  onWaitlist,
}: {
  product: ShopifyProduct;
  onWaitlist?: () => void;
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const { node } = product;

  const variant = node.variants?.edges?.[0]?.node;
  const image = node.images?.edges?.[0]?.node;
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || "0");
  const isAvailable = variant?.availableForSale ?? true;
  const seatsLeft = node.quantityAvailable;
  const isSoldOut =
    typeof seatsLeft === "number" ? seatsLeft <= 0 : !isAvailable;

  // Extract date from title
  const dateMatch = node.title.match(/- ([A-Za-z]+)\s+(\d{1,2})/);
  const month = dateMatch?.[1] || "";
  const day = dateMatch?.[2] || "";

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSoldOut) {
      onWaitlist?.();
      return;
    }
    if (!variant || !isAvailable || isAdded) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <article className="group relative h-full">
      {/* Decorative background blob */}
      <div className="absolute -inset-4 bg-gradient-to-br from-bakery-peach/40 via-bakery-pink-light/30 to-transparent rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        {/* Image Section */}
        <Link
          href={`/classes/${node.handle}`}
          className="relative h-72 md:h-80 overflow-hidden block"
        >
          <Image
            src={image?.url || "/openDefault.webp"}
            alt={image?.altText || node.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          {/* Date badge */}
          {month && day && (
            <div className="absolute top-5 left-5 z-10">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-20 transform group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white text-center py-1.5 font-bebas text-sm tracking-widest uppercase">
                  {month.slice(0, 3)}
                </div>
                <div className="bg-white text-center py-3">
                  <span className="font-bebas text-4xl text-gray-900">
                    {day}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Featured badge */}
          <div className="absolute top-5 right-5 z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-poppins font-semibold shadow-lg bg-bakery-brown text-white">
              <Sparkles className="w-3 h-3" />
              Featured Class
            </span>
          </div>

          {/* Price badge */}
          <div className="absolute bottom-5 right-5 z-10">
            <span className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full font-poppins font-bold text-bakery-pink-dark shadow-lg text-lg">
              ${price.toFixed(0)}
              <span className="text-sm font-medium text-gray-500">/person</span>
            </span>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <Link href={`/classes/${node.handle}`}>
            <h3 className="font-bebas text-2xl md:text-3xl text-gray-900 tracking-wide group-hover:text-bakery-pink-dark transition-colors duration-300 mb-4">
              {node.title.split(" - ")[0]}
            </h3>
          </Link>

          <div className="flex flex-wrap gap-4 mb-5">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-full bg-bakery-pink-light/50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-bakery-pink-dark" />
              </div>
              <span className="text-sm font-poppins font-medium">2 hours</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-full bg-bakery-pink-light/50 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-bakery-pink-dark" />
              </div>
              <span className="text-sm font-poppins font-medium">
                Folsom, CA
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-full bg-bakery-pink-light/50 flex items-center justify-center">
                <Users className="w-4 h-4 text-bakery-pink-dark" />
              </div>
              <span className="text-sm font-poppins font-medium">
                Limited seats
              </span>
            </div>
          </div>

          <p className="text-gray-600 font-poppins leading-relaxed mb-6 flex-1">
            {node.description}
          </p>

          <button
            type="button"
            onClick={handlePrimaryAction}
            disabled={(!isAvailable && !isSoldOut) || isAdded}
            className={`w-full py-4 px-6 rounded-2xl font-poppins font-semibold text-base transition-all duration-300 ${
              isSoldOut
                ? "bg-white text-bakery-pink-dark border border-bakery-pink-light hover:bg-bakery-pink-light/40"
                : isAdded
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white shadow-lg shadow-bakery-pink-dark/30 hover:shadow-xl hover:shadow-bakery-pink-dark/40 hover:-translate-y-0.5"
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart
                </>
              ) : isSoldOut ? (
                <>
                  <Mail className="w-5 h-5" />
                  Join Waitlist
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  Reserve Your Seat
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

const FeaturedCookieCard = ({
  product,
  index,
}: {
  product: ShopifyProduct;
  index: number;
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const { node } = product;

  const imageNode = node.images?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
    <Link
      href={`/cookies/signature-sugar-cookie-sets/${node.handle}`}
      className="group block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <article className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-bakery-pink-light/20 hover:border-bakery-pink/40">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-bakery-offWhite">
          {imageNode?.url ? (
            <Image
              src={imageNode.url}
              alt={imageNode.altText || node.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bakery-pink-light/20 to-bakery-peach/20">
              <span className="text-bakery-pink-dark/40 text-xs font-medium">
                No image
              </span>
            </div>
          )}

          {/* Hover overlay with quick add */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full text-sm font-poppins font-medium ${
                isAdded
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-900 hover:bg-bakery-pink hover:text-white"
              }`}
            >
              {isAdded ? (
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Added
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <ShoppingCart className="w-4 h-4" />
                  Quick Add
                </span>
              )}
            </button>
          </div>

          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <span className="text-bakery-pink-dark font-bold text-sm">
              ${parseFloat(price?.amount || "0").toFixed(0)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bebas text-lg text-gray-800 leading-tight tracking-wide group-hover:text-bakery-pink-dark transition-colors line-clamp-1">
            {node.title}
          </h3>
        </div>
      </article>
    </Link>
  );
};

const FeaturedShop = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const { data: predesignedProducts } = useQuery({
    queryKey: predesignedListQueryKey,
    queryFn: fetchPredesignedList,
  });
  const { data: classProducts } = useQuery({
    queryKey: classesListQueryKey,
    queryFn: fetchClassesList,
  });
  const featuredClass = useMemo(() => {
    if (!classProducts || classProducts.length === 0) return null;
    const toTime = (value?: string | null) => {
      if (!value) return Number.POSITIVE_INFINITY;
      const parsed = Date.parse(value);
      return Number.isNaN(parsed) ? Number.POSITIVE_INFINITY : parsed;
    };
    const now = Date.now();
    const sorted = [...classProducts].sort(
      (a, b) => toTime(a.eventStartDateTime) - toTime(b.eventStartDateTime),
    );
    const upcoming = sorted.filter(
      (item) => toTime(item.eventStartDateTime) >= now,
    );
    const candidates = upcoming.length > 0 ? upcoming : sorted;
    const isSoldOut = (item: ClassesApiProduct) => {
      const seatsLeft = item.quantityAvailable;
      return typeof seatsLeft === "number" ? seatsLeft <= 0 : false;
    };
    const nextAvailable = candidates.find((item) => !isSoldOut(item));
    const fallback = candidates[0] ?? null;
    const selected = nextAvailable ?? fallback;
    return selected ? mapClassToShopifyProduct(selected) : null;
  }, [classProducts]);
  const featuredCookies = useMemo(() => {
    return (predesignedProducts || [])
      .map(mapPredesignedToShopifyProduct)
      .slice(0, 4);
  }, [predesignedProducts]);

  if (!featuredClass && featuredCookies.length === 0) {
    return null;
  }

  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="featured-shop-heading"
    >
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-bakery-cream via-bakery-offWhite to-bakery-peach/30" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bakery-pink-light/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-bakery-peach/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #D286A0 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-bakery-pink-dark font-poppins text-sm font-medium mb-4 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Shop Our Favorites
          </span>
          <h2
            className="font-bebas text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4"
            id="featured-shop-heading"
          >
            Classes & Ready-Made Cookies
          </h2>
          <p className="font-poppins text-gray-600 text-lg max-w-2xl mx-auto">
            Book a hands-on decorating experience or grab a beautifully crafted
            cookie set for your next celebration
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Featured Class - Left Side */}
          {featuredClass && (
            <div className="animate-fade-in h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bebas text-2xl text-gray-800 tracking-wide">
                  Upcoming Class
                </h3>
                <Link
                  href="/classes"
                  className="inline-flex items-center gap-2 text-bakery-pink-dark font-poppins font-medium text-sm hover:gap-3 transition-all duration-300 group"
                >
                  View All Classes
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="h-[calc(100%-2.5rem)]">
                <FeaturedClassCard
                  product={featuredClass}
                  onWaitlist={() => setIsWaitlistOpen(true)}
                />
              </div>
            </div>
          )}

          {/* Featured Cookies - Right Side */}
          {featuredCookies.length > 0 && (
            <div
              className="animate-fade-in h-full flex flex-col"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bebas text-2xl text-gray-800 tracking-wide">
                  Signature Sets
                </h3>
                <Link
                  href="/cookies/signature-sugar-cookie-sets"
                  className="inline-flex items-center gap-2 text-bakery-pink-dark font-poppins font-medium text-sm hover:gap-3 transition-all duration-300 group"
                >
                  Shop All Cookies
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1">
                {featuredCookies.map((cookie, index) => (
                  <FeaturedCookieCard
                    key={cookie.node.id}
                    product={cookie}
                    index={index}
                  />
                ))}
              </div>

              {/* Browse more CTA */}
              <div className="mt-6 text-center">
                <Link
                  href="/cookies/signature-sugar-cookie-sets"
                  className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-white border-2 border-bakery-pink-light hover:border-bakery-pink hover:bg-bakery-pink-light/30 font-poppins font-semibold text-bakery-pink-dark transition-all duration-300 group"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Browse All Cookie Designs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Custom Cookies CTA Banner */}
        <div
          className="mt-12 md:mt-16 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
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
                <h3 className="font-bebas text-2xl md:text-3xl text-white mb-2">
                  Need Something Custom?
                </h3>
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
      </div>
      <WaitlistModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>
  );
};

export default FeaturedShop;
