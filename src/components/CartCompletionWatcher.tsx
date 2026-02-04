"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/stores/cartStore";

const CartCompletionWatcher = () => {
  const clientCartId = useCartStore((state) => state.clientCartId);
  const checkoutUrl = useCartStore((state) => state.checkoutUrl);
  const itemsCount = useCartStore((state) => state.items.length);
  const clearCart = useCartStore((state) => state.clearCart);
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    if (!clientCartId) return;
    if (!checkoutUrl && itemsCount === 0) return;

    hasCheckedRef.current = true;

    const controller = new AbortController();
    const checkStatus = async () => {
      try {
        const response = await fetch(
          `/api/cart-status?clientCartId=${encodeURIComponent(clientCartId)}`,
          { signal: controller.signal },
        );
        if (!response.ok) return;
        const payload = (await response.json()) as { completed?: boolean };
        if (payload?.completed) {
          clearCart();
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error("Cart status check failed:", error);
      }
    };

    void checkStatus();
    return () => controller.abort();
  }, [clientCartId, checkoutUrl, itemsCount, clearCart]);

  return null;
};

export default CartCompletionWatcher;
