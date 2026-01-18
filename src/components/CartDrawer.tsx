"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { items, isLoading, updateQuantity, removeItem, createCheckout } =
    useCartStore();

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
        <Button
          variant="outline"
          size="icon"
          className="relative bg-white/80 backdrop-blur-sm"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-bakery-pink-dark text-white">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Your cart is empty"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add a class or cookie set to get started.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => {
                    const imageNode =
                      item.product.node.images?.edges?.[0]?.node;
                    return (
                      <div
                        key={item.variantId}
                        className="flex gap-4 p-3 bg-secondary/30 rounded-lg"
                      >
                        <div className="relative w-16 h-16 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                          {imageNode?.url ? (
                            <Image
                              src={imageNode.url}
                              alt={imageNode.altText || item.product.node.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {item.product.node.title}
                          </h4>
                          <p className="font-semibold text-bakery-pink-dark mt-1">
                            ${parseFloat(item.price.amount).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeItem(item.variantId)}
                            aria-label={`Remove ${item.product.node.title}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>

                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(
                                  item.variantId,
                                  item.quantity - 1,
                                )
                              }
                              aria-label={`Decrease quantity of ${item.product.node.title}`}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(
                                  item.variantId,
                                  item.quantity + 1,
                                )
                              }
                              aria-label={`Increase quantity of ${item.product.node.title}`}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                {checkoutError && (
                  <p className="text-sm text-red-600">{checkoutError}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-bakery-pink-dark">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Checkout...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
