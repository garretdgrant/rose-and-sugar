import Script from "next/script";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/metadata";
import ClassLocationsClient from "./ClassLocationsClient";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Cookie Decorating Class Locations | Rose & Sugar",
    description:
      "Find cookie decorating class locations across the Sacramento area, including Folsom, Loomis, Sacramento, El Dorado Hills, and Roseville.",
    path: "/classes/locations",
  });
}

const ClassLocationsPage = () => {
  const breadcrumbJsonLd = {
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
        name: "Locations",
        item: buildCanonicalUrl("/classes/locations"),
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumbs-jsonld-class-locations"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ClassLocationsClient />
    </>
  );
};

export default ClassLocationsPage;
