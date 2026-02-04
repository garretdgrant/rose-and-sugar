import type { ShopifyProductNode } from "@/types/shopify";

export type ClassDetail = {
  slug: string;
  product: ShopifyProductNode;
  dateLabel: string;
  dateISO: string;
  time: string;
  duration: string;
  location: string;
  level: string;
  includes: string[];
  highlights: string[];
  faq: Array<{ q: string; a: string }>;
};

export const classDetails: ClassDetail[] = [
  {
    slug: "spring-cookie-class-april-12",
    product: {
      id: "gid://shopify/Product/9001",
      title: "Spring Cookie Decorating Class - April 12",
      description:
        "Hands-on cookie decorating class with seasonal designs and all supplies included.",
      handle: "spring-cookie-class-april-12",
      productType: "Cookie Decorating Class",
      tags: ["class", "spring", "beginner"],
      priceRange: {
        minVariantPrice: {
          amount: "55.00",
          currencyCode: "USD",
        },
      },
      images: {
        edges: [
          {
            node: {
              url: "/openDefault.webp",
              altText: "Cookie decorating class",
            },
          },
          {
            node: {
              url: "/roseSugarClassCropped.webp",
              altText: "Cookie decorating class in progress",
            },
          },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/9001",
              title: "General Admission",
              price: { amount: "55.00", currencyCode: "USD" },
              availableForSale: true,
              selectedOptions: [{ name: "Ticket", value: "General Admission" }],
            },
          },
        ],
      },
      options: [{ name: "Ticket", values: ["General Admission"] }],
    },
    dateLabel: "April 12, 2025",
    dateISO: "2025-04-12T18:00:00-07:00",
    time: "6:00 PM - 8:00 PM",
    duration: "2 hours",
    location: "Folsom, CA",
    level: "Beginner-friendly",
    includes: [
      "6 cookies + icing in spring colors",
      "All tools, tips, and take-home box",
      "Practice cookie + piping sheet",
      "Step-by-step instruction with plenty of demos",
    ],
    highlights: [
      "Spring florals and garden textures",
      "Soft palettes and layered details",
      "Polished finishing details",
      "Tips for clean lines and smooth flooding",
    ],
    faq: [
      {
        q: "Do I need any experience?",
        a: "No experience needed. We cover the basics and guide you step-by-step so beginners feel confident.",
      },
      {
        q: "What should I bring?",
        a: "Just yourself and a creative mindset. Everything else is provided.",
      },
      {
        q: "Can I attend with a friend?",
        a: "Absolutely. Each seat is purchased individually, so grab two spots to decorate together.",
      },
    ],
  },
  {
    slug: "summer-cookie-class-june-21",
    product: {
      id: "gid://shopify/Product/9002",
      title: "Summer Cookie Decorating Class - June 21",
      description:
        "Relaxed summer-themed decorating session with guided instruction.",
      handle: "summer-cookie-class-june-21",
      productType: "Cookie Decorating Class",
      tags: ["class", "summer", "seasonal"],
      priceRange: {
        minVariantPrice: {
          amount: "60.00",
          currencyCode: "USD",
        },
      },
      images: {
        edges: [
          {
            node: {
              url: "/roseSugarClassCropped.webp",
              altText: "Summer cookie decorating class",
            },
          },
          {
            node: {
              url: "/gallery/class1.jpg",
              altText: "Cookie decorating class with colorful designs",
            },
          },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/9002",
              title: "General Admission",
              price: { amount: "60.00", currencyCode: "USD" },
              availableForSale: true,
              selectedOptions: [{ name: "Ticket", value: "General Admission" }],
            },
          },
        ],
      },
      options: [{ name: "Ticket", values: ["General Admission"] }],
    },
    dateLabel: "June 21, 2025",
    dateISO: "2025-06-21T14:00:00-07:00",
    time: "2:00 PM - 4:00 PM",
    duration: "2 hours",
    location: "Folsom, CA",
    level: "All levels welcome",
    includes: [
      "6 cookies + icing in summer tones",
      "All tools, tips, and take-home box",
      "Recipe card and care tips",
      "Guided practice and troubleshooting",
    ],
    highlights: [
      "Bright seasonal color palettes",
      "Summery patterns and textures",
      "Clean outlines and wet-on-wet",
      "Polished finishing touches",
    ],
    faq: [
      {
        q: "How long is the class?",
        a: "Classes run about 2 hours, including demos, practice, and time to decorate.",
      },
      {
        q: "Is this kid-friendly?",
        a: "We recommend ages 12+ so everyone can enjoy the pace and tools safely.",
      },
      {
        q: "Can I transfer my seat?",
        a: "Yes, you can transfer your seat to a friend if you let us know ahead of time.",
      },
    ],
  },
];

export function getClassBySlug(slug: string) {
  return classDetails.find((item) => item.slug === slug) ?? null;
}
