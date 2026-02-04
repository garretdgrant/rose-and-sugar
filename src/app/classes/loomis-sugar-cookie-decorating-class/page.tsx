import Script from "next/script";
import ClassLocationPage from "@/components/classes/ClassLocationPage";
import { buildPageMetadata } from "@/lib/metadata";
import { buildClassLocationFaqs } from "@/data/classLocationFaqs";
import { buildClassLocationBreadcrumbJsonLd } from "@/data/classLocationBreadcrumbs";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Custom Cookie Decorating Classes in Loomis, CA | Rose & Sugar",
    description:
      "Join sugar cookie decorating classes near Loomis, CA with Rose & Sugar. Small-group instruction, all supplies included, and custom cookie options.",
    path: "/classes/loomis-sugar-cookie-decorating-class",
  });
}

const city = "Loomis";
const heroDescription = `Hands-on cookie decorating for ${city} guests. Learn royal icing techniques in a welcoming, beginner-friendly setting.`;

const LoomisClassesPage = () => {
  const faqs = buildClassLocationFaqs(city);
  const breadcrumbJsonLd = buildClassLocationBreadcrumbJsonLd(
    "Loomis",
    "/classes/loomis-sugar-cookie-decorating-class",
  );
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
        id="breadcrumbs-jsonld-loomis"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="faq-jsonld-loomis"
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

export default LoomisClassesPage;
