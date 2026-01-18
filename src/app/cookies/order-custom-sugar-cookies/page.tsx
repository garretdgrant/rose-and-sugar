import Script from "next/script";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/metadata";
import CustomOrderClient from "./CustomOrderClient";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Order Custom Sugar Cookies | Rose & Sugar",
    description:
      "Order custom-designed sugar cookies for your special event. Handcrafted in Folsom, CA with royal icing. Starting at $65/dozen with 2-week lead time.",
    path: "/cookies/order-custom-sugar-cookies",
  });
}

const CustomOrderPage = () => {
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
        name: "Cookies",
        item: buildCanonicalUrl("/cookies"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Custom Orders",
        item: buildCanonicalUrl("/cookies/order-custom-sugar-cookies"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How far in advance should I order custom cookies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend placing your order at least 2-3 weeks in advance. Rush orders may be available for an additional fee, but cannot be guaranteed.",
        },
      },
      {
        "@type": "Question",
        name: "What's included in the base price per dozen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Starting at $65 per dozen, each order includes up to five colors and basic to intermediate detail. Character cookies and logos start at $70 per dozen.",
        },
      },
      {
        "@type": "Question",
        name: "Do you accommodate dietary restrictions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our cookies contain wheat, milk, eggs, and soy (in sprinkles). While we cannot guarantee allergen-free cookies, we're happy to discuss your specific needs.",
        },
      },
      {
        "@type": "Question",
        name: "What are the payment and pickup options?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept Zelle, cash, or Venmo. Payment is required at least two weeks before pickup to confirm your order. Pickup is available in Folsom, with preferred times on Saturdays.",
        },
      },
      {
        "@type": "Question",
        name: "How are the cookies packaged?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cookies come individually heat-sealed for freshness at no additional cost. Ribbon-tied packaging is available for an additional charge per dozen.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumbs-jsonld-custom-orders"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="faq-jsonld-custom-orders"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CustomOrderClient />
    </>
  );
};

export default CustomOrderPage;
