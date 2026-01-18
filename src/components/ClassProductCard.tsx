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
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";

interface ClassProductCardProps {
  product: ShopifyProduct;
}

const ClassProductCard = ({ product }: ClassProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const isAvailable = variant?.availableForSale ?? true;

  // Extract date from title (e.g., "Spring Cookie Decorating Class - June 12")
  const dateMatch = node.title.match(/- ([A-Za-z]+)\s+(\d{1,2})/);
  const month = dateMatch?.[1] || "";
  const day = dateMatch?.[2] || "";

  const handleAddToCart = () => {
    if (!variant || !isAvailable || isAdded) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
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
          src={image?.url || "/openDefault.webp"}
          alt={image?.altText || node.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {month && day && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-16">
              <div className="bg-bakery-pink-dark text-white text-center py-1 font-bebas text-sm tracking-widest uppercase">
                {month.slice(0, 3)}
              </div>
              <div className="bg-white text-center py-2">
                <span className="font-bebas text-3xl text-gray-900">{day}</span>
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
            <span className="text-sm font-poppins">2 hours</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-bakery-pink" />
            <span className="text-sm font-poppins">Folsom, CA</span>
          </div>
          {isAvailable && (
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4 text-bakery-pink" />
              <span className="text-sm font-poppins">Limited seats</span>
            </div>
          )}
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
              onClick={() => setQuantity((q) => Math.min(q + 1, 10))}
              disabled={quantity >= 10 || !isAvailable}
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
