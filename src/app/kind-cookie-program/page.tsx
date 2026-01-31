import Script from "next/script";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/metadata";
import KindCookieProgramClient from "./KindCookieProgramClient";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Kind Cookie Program | Rose & Sugar",
    description:
      "Nominate community helpers for a free cookie gift box. Recognizing teachers, nurses, postal workers, and everyday heroes making our community better.",
    path: "/kind-cookie-program",
  });
}

const KindCookieProgramPage = () => {
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
        name: "Kind Cookie Program",
        item: buildCanonicalUrl("/kind-cookie-program"),
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumbs-jsonld-kind-cookie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <KindCookieProgramClient />
    </>
  );
};

export default KindCookieProgramPage;
