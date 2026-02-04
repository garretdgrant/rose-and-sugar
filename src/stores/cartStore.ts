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

const generateClientCartId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `cart_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

interface CartStore {
  items: CartItem[];
  clientCartId: string;
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isOpen: boolean;

  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setClientCartId: (clientCartId: string) => void;
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
      clientCartId: generateClientCartId(),
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
        set({
          items: [],
          cartId: null,
          checkoutUrl: null,
          clientCartId: generateClientCartId(),
        });
      },

      setClientCartId: (clientCartId) => set({ clientCartId }),
      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),
      setIsOpen: (isOpen) => set({ isOpen }),

      createCheckout: async () => {
        const {
          items,
          clientCartId,
          setClientCartId,
          setLoading,
          setCheckoutUrl,
          setCartId,
        } = get();
        if (items.length === 0) return;

        setLoading(true);
        setCheckoutUrl(null);
        try {
          const formatEventDate = (value: string | null | undefined) => {
            if (!value) return "";
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return value;
            const time = new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: "America/Los_Angeles",
            }).format(date);
            const datePart = new Intl.DateTimeFormat("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
              timeZone: "America/Los_Angeles",
            }).format(date);
            return `${time} PST ${datePart}`;
          };

          const checkoutItems = items.map((item) => {
            const productType = item.product.node.productType?.toLowerCase();
            const tags =
              item.product.node.tags?.map((tag) => tag.toLowerCase()) || [];
            const isClass = productType === "class" || tags.includes("class");
            const isPredesign = tags.includes("pre-designed");
            const leadDays =
              typeof item.product.node.cookieLeadDays === "number"
                ? item.product.node.cookieLeadDays
                : null;
            const startDate = formatEventDate(
              item.product.node.eventStartDateTime,
            );
            const endDate = formatEventDate(item.product.node.eventEndDateTime);
            const classAttributes = isClass
              ? [
                  {
                    key: "Event Start",
                    value: startDate,
                  },
                  {
                    key: "Event End",
                    value: endDate,
                  },
                  {
                    key: "location",
                    value: item.product.node.location || "",
                  },
                ].filter((attr) => attr.value.trim().length > 0)
              : [];
            const leadTimeAttribute =
              isPredesign && leadDays !== null
                ? [
                    {
                      key: "cookie lead time",
                      value: `${leadDays} days`,
                    },
                  ]
                : [];
            const attributes =
              classAttributes.length > 0 || leadTimeAttribute.length > 0
                ? [...classAttributes, ...leadTimeAttribute]
                : undefined;
            return {
              variantId: item.variantId,
              quantity: item.quantity,
              attributes,
            };
          });
          let activeClientCartId = clientCartId;
          if (!activeClientCartId) {
            activeClientCartId = generateClientCartId();
            setClientCartId(activeClientCartId);
          }
          const response = await fetch("/api/shopify/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: checkoutItems,
              clientCartId: activeClientCartId,
            }),
          });

          const payload = (await response.json()) as {
            ok?: boolean;
            checkoutUrl?: string;
            cartId?: string;
            error?: string;
          };

          if (!response.ok || !payload.ok || !payload.checkoutUrl) {
            const errorMessage =
              payload.error || "Failed to create checkout session.";
            throw new Error(errorMessage);
          }

          setCheckoutUrl(payload.checkoutUrl);
          if (payload.cartId) {
            setCartId(payload.cartId);
          }
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
