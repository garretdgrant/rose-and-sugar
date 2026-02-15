import ClientPreviousClasses from "@/components/ClientPreviousClasses";
import Script from "next/script";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Previous Cookie Decorating Classes | Rose & Sugar",
    description:
      "View past cookie decorating classes from Rose & Sugar. Explore our collection of completed sessions and the creative designs from our small-group cookie decorating workshops.",
    path: "/classes/previous-classes",
    imagePath: "/roseSugarClassCropped.webp",
  });
}

const PreviousClassesPage = async () => {
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
        name: "Previous Classes",
        item: buildCanonicalUrl("/classes/previous-classes"),
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumbs-jsonld-previous-classes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ClientPreviousClasses />
    </>
  );
};

export default PreviousClassesPage;
