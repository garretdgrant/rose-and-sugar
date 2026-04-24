import ClientPreviousClasses from "@/components/ClientPreviousClasses";
import ClassesMarketingShell from "@/components/classes/ClassesMarketingShell";
import QueryProvider from "@/components/QueryProvider";
import Script from "next/script";
import { History } from "lucide-react";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      <ClassesMarketingShell
        badgeIcon={History}
        badgeText="Past Cookie Decorating Classes"
        breadcrumb={
          <Breadcrumb className="justify-start">
            <BreadcrumbList className="justify-start">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/classes">Classes</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Previous Classes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        ctaHref="/classes"
        ctaLabel="View Upcoming Classes"
        description={
          <>
            Explore our collection of past cookie decorating classes and the
            creative designs from our small-group workshops led by Megan.
          </>
        }
        titleLead="Previous"
        titleAccent="Classes"
      >
        <QueryProvider>
          <ClientPreviousClasses />
        </QueryProvider>
      </ClassesMarketingShell>
    </>
  );
};

export default PreviousClassesPage;
