"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ShopifyProduct } from "@/types/shopify";

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  imageOverride?: string;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isOpen: boolean;

  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string | null) => void;
  setLoading: (loading: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isOpen: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.variantId === item.variantId);
        const maxQuantity =
          typeof item.product.node.quantityAvailable === "number"
            ? Math.max(0, item.product.node.quantityAvailable)
            : null;

        if (existingItem) {
          const proposedQuantity = existingItem.quantity + item.quantity;
          const nextQuantity =
            maxQuantity === null
              ? proposedQuantity
              : Math.min(proposedQuantity, maxQuantity);

          if (nextQuantity === existingItem.quantity) {
            set({ isOpen: true });
            return;
          }

          set({
            items: items.map((i) =>
              i.variantId === item.variantId
                ? { ...i, quantity: nextQuantity }
                : i,
            ),
            isOpen: true,
          });
        } else {
          const nextQuantity =
            maxQuantity === null
              ? item.quantity
              : Math.min(item.quantity, maxQuantity);
          if (nextQuantity <= 0) {
            set({ isOpen: true });
            return;
          }

          set({
            items: [...items, { ...item, quantity: nextQuantity }],
            isOpen: true,
          });
        }
      },

      updateQuantity: (variantId, quantity) => {
        const currentItem = get().items.find(
          (item) => item.variantId === variantId,
        );
        if (!currentItem) return;

        const maxQuantity =
          typeof currentItem.product.node.quantityAvailable === "number"
            ? Math.max(0, currentItem.product.node.quantityAvailable)
            : null;
        const nextQuantity =
          maxQuantity === null ? quantity : Math.min(quantity, maxQuantity);

        if (nextQuantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.variantId === variantId
              ? { ...item, quantity: nextQuantity }
              : item,
          ),
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),
      setIsOpen: (isOpen) => set({ isOpen }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        setLoading(true);
        setCheckoutUrl(null);
        try {
          const response = await fetch("/api/shopify/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: items.map((item) => ({
                variantId: item.variantId,
                quantity: item.quantity,
              })),
            }),
          });

          const payload = (await response.json()) as {
            ok?: boolean;
            checkoutUrl?: string;
            error?: string;
          };

          if (!response.ok || !payload.ok || !payload.checkoutUrl) {
            const errorMessage =
              payload.error || "Failed to create checkout session.";
            throw new Error(errorMessage);
          }

          setCheckoutUrl(payload.checkoutUrl);
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: "rose-sugar-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
