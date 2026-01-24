"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Cookie,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const CartDrawer = () => {
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const {
    items,
    isLoading,
    updateQuantity,
    removeItem,
    createCheckout,
    isOpen,
    setIsOpen,
  } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    setCheckoutError(null);
    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setCheckoutError(
        "We couldn't create a checkout session. Please try again.",
      );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative p-3 rounded-2xl bg-white border border-bakery-pink-light/50 text-gray-700 hover:bg-bakery-pink-light/30 hover:border-bakery-pink-light shadow-sm hover:shadow-md transition-all duration-300 group"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-bakery-pink-dark to-bakery-pink text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-bakery-pink/30 animate-bounce-soft">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0 border-l border-bakery-pink-light/30">
        {/* Header */}
        <SheetHeader className="flex-shrink-0 p-6 pb-4 border-b border-bakery-pink-light/30 bg-gradient-to-b from-bakery-pink-light/20 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center shadow-lg shadow-bakery-pink/30">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <SheetTitle className="font-bebas text-2xl text-gray-800 tracking-wide">
                Your Cart
              </SheetTitle>
              <p className="font-poppins text-sm text-gray-500">
                {totalItems === 0
                  ? "Your cart is empty"
                  : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                {/* Decorative empty cart illustration */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-bakery-pink-light/50 to-bakery-peach/30 animate-pulse-soft" />
                  <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                    <Cookie className="w-12 h-12 text-bakery-pink-light" />
                  </div>
                  {/* Floating elements */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-bakery-peach/60"
                    style={{ animation: "float 3s ease-in-out infinite" }}
                  />
                  <div
                    className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-bakery-pink-light/80"
                    style={{
                      animation: "float 4s ease-in-out infinite 0.5s",
                    }}
                  />
                </div>

                <h3 className="font-bebas text-xl text-gray-700 mb-2">
                  Your cart is empty
                </h3>
                <p className="font-poppins text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                  Add a class or cookie set to get started on your sweet
                  journey!
                </p>

                <div className="space-y-3">
                  <Link
                    href="/classes"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-medium rounded-xl shadow-md shadow-bakery-pink/20 hover:shadow-lg hover:shadow-bakery-pink/30 hover:-translate-y-0.5 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="w-4 h-4" />
                    Browse Classes
                  </Link>
                  <Link
                    href="/cookies/signature-sugar-cookie-sets"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white text-gray-700 font-poppins font-medium rounded-xl border border-bakery-pink-light hover:bg-bakery-pink-light/30 hover:border-bakery-pink transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Cookie className="w-4 h-4" />
                    Shop Cookies
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item, index) => {
                  const imageNode = item.product.node.images?.edges?.[0]?.node;
                  const cartImageSrc = item.imageOverride || imageNode?.url;
                  const cartImageAlt = item.imageOverride
                    ? item.product.node.title
                    : imageNode?.altText || item.product.node.title;
                  return (
                    <div
                      key={item.variantId}
                      className="group relative bg-white rounded-2xl p-4 border border-gray-100 hover:border-bakery-pink-light shadow-sm hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Delete button - top right */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                        aria-label={`Remove ${item.product.node.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex gap-4">
                        {/* Product image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-bakery-cream/50">
                          {cartImageSrc ? (
                            <Image
                              src={cartImageSrc}
                              alt={cartImageAlt}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Cookie className="w-8 h-8 text-bakery-pink-light" />
                            </div>
                          )}
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-poppins font-medium text-sm text-gray-800 line-clamp-2 leading-snug">
                            {item.product.node.title}
                          </h4>
                          {item.variantTitle &&
                            item.variantTitle !== "Default Title" && (
                              <p className="font-poppins text-xs text-gray-500 mt-0.5">
                                {item.variantTitle}
                              </p>
                            )}
                          <p className="font-bebas text-lg text-bakery-pink-dark mt-2">
                            ${parseFloat(item.price.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <span className="font-poppins text-xs text-gray-500 uppercase tracking-wider">
                          Quantity
                        </span>
                        <div className="flex items-center gap-2 bg-bakery-cream/50 rounded-full px-2 py-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-bakery-pink-dark transition-all duration-200"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-poppins font-semibold text-gray-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-bakery-pink-dark transition-all duration-200"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer - Fixed checkout section */}
              <div className="flex-shrink-0 p-6 bg-white border-t border-bakery-pink-light/30">
                {/* Error message */}
                {checkoutError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200">
                    <p className="font-poppins text-sm text-red-600">
                      {checkoutError}
                    </p>
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-poppins text-gray-600">Subtotal</span>
                  <span className="font-bebas text-2xl text-gray-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Tax note */}
                <p className="font-poppins text-xs text-gray-500 mb-4">
                  Taxes and shipping calculated at checkout
                </p>

                {/* Checkout button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full py-6 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-2xl shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Checkout...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>

                {/* Continue shopping link */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-3 py-2 text-center font-poppins text-sm text-gray-500 hover:text-bakery-pink-dark transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
