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
    slug: "pretty-pastel-rose",
    name: "Pretty Pastel Rose",
    shortDescription:
      "Hand-painted rose cookie with pastel watercolor shading.",
    price: 6,
    images: ["/predesigned/pretty-pastel-rose-1.jpg"],
    details:
      "A delicate hand-piped rose with soft pastel gradients. Perfect for showers and spring tablescapes.",
  },
  {
    slug: "sugar-petal-heart",
    name: "Sugar Petal Heart",
    shortDescription: "Layered heart cookie with gold dust accents.",
    price: 7,
    images: ["/predesigned/sugar-petal-heart-1.jpg"],
    details:
      "Sweet heart shape with shimmered edges and a satin finish. Great for gifts and favours.",
  },
];

export function getPredesignedCookieBySlug(slug: string) {
  return predesignedCookies.find((c) => c.slug === slug) ?? null;
}
