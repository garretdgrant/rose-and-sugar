export type PredesignedCookie = {
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  images: string[];
  details: string;
};

export const predesignedCookies: PredesignedCookie[] = [
  {
    slug: "buttercream-dreams",
    name: "Buttercream Dreams",
    shortDescription:
      "Pastel blooms with whipped buttercream textures and gilded accents.",
    price: 6.5,
    images: ["/predesigned/buttercream-dreams.webp"],
    details:
      "A light and airy set featuring buttercream flowers, delicate ruffles, and a touch of shimmer for spring celebrations.",
  },
  {
    slug: "floral-bundle",
    name: "Floral Bundle",
    shortDescription: "Garden-inspired roses, vines, and watercolor blooms.",
    price: 7,
    images: ["/predesigned/floral-bundle.webp"],
    details:
      "A romantic collection with layered petals, textured vines, and blush-to-berry gradients ideal for weddings or bridal showers.",
  },
  {
    slug: "welcome-home",
    name: "Welcome Home",
    shortDescription:
      "Warm neutrals and cheerful greetings for new homeowners.",
    price: 8,
    images: ["/predesigned/welcome-home.webp"],
    details:
      "Modern lettering, mini houses, and tiny florals come together in this feel-good bundle made for housewarmings.",
  },
  {
    slug: "gift-for-mom",
    name: "Gift for Mom",
    shortDescription: "Soft pinks, gold foil, and heartfelt details.",
    price: 7.25,
    images: ["/predesigned/gift-for-mom.webp"],
    details:
      "Elegant blooms and meaningful messages mix with gold-dusted edges in this sentimental set curated for Mother's Day and beyond.",
  },
];

export function getPredesignedCookieBySlug(slug: string) {
  return predesignedCookies.find((c) => c.slug === slug) ?? null;
}
