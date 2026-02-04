import { buildCanonicalUrl } from "@/lib/metadata";

export const buildClassLocationBreadcrumbJsonLd = (
  city: string,
  path: string,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: buildCanonicalUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Classes",
      item: buildCanonicalUrl("/classes"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: city,
      item: buildCanonicalUrl(path),
    },
  ],
});
