import { buildPageMetadata } from "@/lib/metadata";
import FolsomClassesClient from "./FolsomClassesClient";
import Script from "next/script";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Custom Cookie Decorating Classes in Folsom, CA | Rose & Sugar",
    description:
      "Join sugar cookie decorating classes in Folsom, CA with Rose & Sugar. Small-group instruction, all supplies included, and custom cookie options.",
    path: "/classes/folsom-sugar-cookie-decorating-class",
  });
}

const faqs = [
  {
    question: "Are there cookie decorating classes in Folsom?",
    answerText:
      "Yes, Rose & Sugar hosts classes for Folsom guests with all supplies included.",
  },
  {
    question: "Is this a good cooking class for beginners?",
    answerText:
      "Yes. Classes are beginner-friendly and include guided instruction.",
  },
  {
    question: "What is included in the class?",
    answerText:
      "You'll receive cookies, icing, tools, packaging, and step-by-step guidance.",
  },
  {
    question: "Do you offer custom cookies in Folsom?",
    answerText:
      "Yes, custom cookie orders are available for Folsom celebrations and events.",
  },
];

const FolsomClassesPage = () => {
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
        id="faq-jsonld-folsom"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FolsomClassesClient />
    </>
  );
};

export default FolsomClassesPage;
