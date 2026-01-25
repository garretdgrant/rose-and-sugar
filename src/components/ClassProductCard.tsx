"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Users,
  ShoppingCart,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import type { ShopifyProduct } from "@/types/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";

interface ClassProductCardProps {
  product: ShopifyProduct;
  imageOverride?: string;
}

const ClassProductCard = ({
  product,
  imageOverride,
}: ClassProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const variant = node.variants?.edges?.[0]?.node;
  const image = node.images?.edges?.[0]?.node;
  const imageSrc = imageOverride || image?.url || "/openDefault.webp";
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || "0");
  const isAvailable = variant?.availableForSale ?? true;
  const seatsLeft = node.quantityAvailable ?? null;
  const maxSeats = seatsLeft && seatsLeft > 0 ? Math.min(seatsLeft, 10) : 10;

  // Extract date from title (e.g., "Spring Cookie Decorating Class - June 12")
  const dateMatch = node.title.match(/- ([A-Za-z]+)\s+(\d{1,2})/);
  const month = dateMatch?.[1] || "";
  const day = dateMatch?.[2] || "";
  const startDateTime = node.eventStartDateTime
    ? new Date(node.eventStartDateTime)
    : null;
  const endDateTime = node.eventEndDateTime
    ? new Date(node.eventEndDateTime)
    : null;
  const validStartDate =
    startDateTime && !Number.isNaN(startDateTime.getTime())
      ? startDateTime
      : null;
  const validEndDate =
    endDateTime && !Number.isNaN(endDateTime.getTime()) ? endDateTime : null;
  const startMonth = validStartDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        timeZone: "America/Los_Angeles",
      }).format(validStartDate)
    : month;
  const startDay = validStartDate
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        timeZone: "America/Los_Angeles",
      }).format(validStartDate)
    : day;
  const durationMinutes =
    validStartDate && validEndDate
      ? Math.max(0, (validEndDate.getTime() - validStartDate.getTime()) / 60000)
      : null;
  const durationLabel = durationMinutes
    ? durationMinutes % 60 === 0
      ? `${durationMinutes / 60} hours`
      : `${(durationMinutes / 60).toFixed(1)} hours`
    : "2 hours";
  const formatTime = (date: Date) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Los_Angeles",
    }).formatToParts(date);
    const hour = parts.find((part) => part.type === "hour")?.value;
    const minute = parts.find((part) => part.type === "minute")?.value;
    const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value;
    if (!hour || !dayPeriod) return "";
    if (!minute || minute === "00") return `${hour} ${dayPeriod}`;
    return `${hour}:${minute} ${dayPeriod}`;
  };
  const timeRangeLabel =
    validStartDate && validEndDate
      ? `${formatTime(validStartDate)} - ${formatTime(validEndDate)}`
      : validStartDate
        ? formatTime(validStartDate)
        : null;
  const timeLabel = timeRangeLabel || durationLabel;
  const locationLabel =
    node.location?.name || node.location?.address?.city || "Folsom, CA";
  const seatsLabel =
    seatsLeft !== null
      ? `${seatsLeft} seat${seatsLeft === 1 ? "" : "s"} left`
      : "Limited seats";

  const handleAddToCart = () => {
    if (!variant || !isAvailable || isAdded) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
      imageOverride,
    };

    addItem(cartItem);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 2000);
  };

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-bakery-pink-light">
      <Link
        href={`/classes/${node.handle}`}
        className="relative h-52 overflow-hidden block"
      >
        <Image
          src={imageSrc}
          alt={image?.altText || node.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {startMonth && startDay && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-16">
              <div className="bg-bakery-pink-dark text-white text-center py-1 font-bebas text-sm tracking-widest uppercase">
                {startMonth.slice(0, 3)}
              </div>
              <div className="bg-white text-center py-2">
                <span className="font-bebas text-3xl text-gray-900">
                  {startDay}
                </span>
              </div>
            </div>
          </div>
        )}

        {!isAvailable && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-poppins font-medium shadow-lg bg-gray-900 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Sold Out
            </span>
          </div>
        )}

        <div className="absolute bottom-4 right-4 z-10">
          <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-poppins font-semibold text-bakery-pink-dark shadow-lg">
            ${price.toFixed(0)} per person
          </span>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/classes/${node.handle}`}>
          <h3 className="font-bebas text-2xl text-gray-900 tracking-wide group-hover:text-bakery-pink-dark transition-colors duration-300">
            {node.title.split(" - ")[0]}
          </h3>
        </Link>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-bakery-pink" />
            <span className="text-sm font-poppins">{timeLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-bakery-pink" />
            <span className="text-sm font-poppins">{locationLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-bakery-pink" />
            <span className="text-sm font-poppins">{seatsLabel}</span>
          </div>
        </div>

        <p className="mt-4 text-gray-600 text-sm font-poppins leading-relaxed line-clamp-2">
          {node.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 bg-bakery-offWhite rounded-full px-4 py-2">
          <span className="text-sm font-medium text-gray-700 font-poppins">
            Seats
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              disabled={quantity <= 1 || !isAvailable}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-white hover:text-bakery-pink-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-semibold text-gray-800 tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(q + 1, maxSeats))}
              disabled={quantity >= maxSeats || !isAvailable}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-white hover:text-bakery-pink-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isAvailable || isAdded}
          className={`mt-6 w-full py-3 px-6 rounded-full font-poppins font-medium text-sm transition-all duration-300 ${
            !isAvailable
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : isAdded
                ? "bg-emerald-500 text-white shadow-emerald-500/30"
                : "bg-bakery-pink-dark text-white hover:bg-bakery-pink-dark/90 shadow-md shadow-bakery-pink-dark/20 hover:shadow-lg hover:shadow-bakery-pink-dark/30 hover:-translate-y-0.5"
          }`}
        >
          <span className="inline-flex items-center justify-center gap-2">
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            {!isAvailable
              ? "Sold Out"
              : isAdded
                ? quantity === 1
                  ? "Seat added to cart"
                  : "Seats added to cart"
                : "Book Seat"}
          </span>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-bakery-pink-light via-bakery-pink to-bakery-pink-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </article>
  );
};

export default ClassProductCard;
