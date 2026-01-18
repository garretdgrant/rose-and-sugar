import Script from "next/script";
import ClassLocationPage from "@/components/classes/ClassLocationPage";
import { buildPageMetadata } from "@/lib/metadata";
import { buildClassLocationFaqs } from "@/data/classLocationFaqs";
import { buildClassLocationBreadcrumbJsonLd } from "@/data/classLocationBreadcrumbs";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Custom Cookie Decorating Classes in Roseville, CA | Rose & Sugar",
    description:
      "Join sugar cookie decorating classes near Roseville, CA with Rose & Sugar. Small-group instruction, all supplies included, and custom cookie options.",
    path: "/classes/roseville-sugar-cookie-decorating-class",
  });
}

const city = "Roseville";
const heroDescription = `Hands-on cookie decorating for ${city} guests. Learn royal icing techniques in a welcoming, beginner-friendly setting.`;

const RosevilleClassesPage = () => {
  const faqs = buildClassLocationFaqs(city);
  const breadcrumbJsonLd = buildClassLocationBreadcrumbJsonLd("Roseville", "/classes/roseville-sugar-cookie-decorating-class");
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerText,
      },
    })),
  };

  return (
    <>
      <Script
        id="breadcrumbs-jsonld-roseville"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="faq-jsonld-roseville"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ClassLocationPage
        city={city}
        heroDescription={heroDescription}
        faqs={faqs}
      />
    </>
  );
};

export default RosevilleClassesPage;
