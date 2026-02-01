import Script from "next/script";
import { buildPageMetadata } from "@/lib/metadata";
import PrivateCookieClassesClient from "./PrivateCookieClassesClient";

export async function generateMetadata() {
  return buildPageMetadata({
    title:
      "Private Cookie Decorating Classes in Folsom & Sacramento | Rose & Sugar",
    description:
      "Book a private cookie decorating class with Rose & Sugar in Folsom & the greater Sacramento area. Perfect for birthdays, teams, parties, and special events. Classes start at $55 per person.",
    path: "/private-cookie-classes-folsom-sacramento",
  });
}

const PrivateCookieClassesPage = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many people can attend a private class?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Private classes are flexible and can be customized for small or large groups. Share your group size and event details when you reach out.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer kids' cookie decorating classes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Kids' birthday parties and youth groups are some of our most popular private classes.",
        },
      },
      {
        "@type": "Question",
        name: "Can you customize the theme?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Sports teams, birthdays, holidays, colors, and special requests are welcome.",
        },
      },
      {
        "@type": "Question",
        name: "Do you travel to my location?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we offer on-site private classes throughout Folsom and the greater Sacramento area. Location details are discussed during booking.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="faq-jsonld-private-classes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PrivateCookieClassesClient />
    </>
  );
};

export default PrivateCookieClassesPage;
