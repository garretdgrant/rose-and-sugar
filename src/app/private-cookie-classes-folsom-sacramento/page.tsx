import type { Metadata } from "next";
import {
  buildCanonicalUrl,
  buildOgImageUrl,
  getMetadataBase,
} from "@/lib/metadata";
import PrivateCookieClassesClient from "./PrivateCookieClassesClient";

const PAGE_PATH = "/private-cookie-classes-folsom-sacramento";
const PAGE_TITLE =
  "Private Cookie Decorating Classes in Folsom & Sacramento | Rose & Sugar";
const PAGE_DESCRIPTION =
  "Book a private cookie decorating class in Folsom & Sacramento. Perfect for birthdays, showers & team events. All supplies included. Starting at $55/person.";

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = getMetadataBase();
  const canonical = buildCanonicalUrl(PAGE_PATH, metadataBase);
  const ogImage = buildOgImageUrl(
    "/og-images/private-class-og.jpg",
    metadataBase,
  );

  return {
    metadataBase,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: {
      canonical,
    },
    openGraph: {
      title: PAGE_TITLE,
      description:
        "Book a private cookie decorating class for birthdays, showers, team events & more. All supplies included. Starting at $55/person in the greater Sacramento area.",
      url: canonical,
      type: "website",
      siteName: "Rose & Sugar",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: PAGE_TITLE,
      description:
        "Book a private cookie decorating class for birthdays, showers, team events & more. All supplies included. Starting at $55/person.",
      images: [ogImage],
    },
  };
}

const PrivateCookieClassesPage = () => {
  const metadataBase = getMetadataBase();
  const siteUrl = metadataBase.toString().replace(/\/$/, "");
  const pageUrl = buildCanonicalUrl(PAGE_PATH, metadataBase);
  const logoUrl = buildOgImageUrl("/logo.png", metadataBase);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rose & Sugar",
    description:
      "Handcrafted custom cookies and private cookie decorating classes in Folsom, Sacramento, and the surrounding area.",
    url: siteUrl,
    telephone: "+1-916-337-8880",
    email: "roseandsugarcookies@gmail.com",
    image: logoUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Folsom",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Folsom" },
      { "@type": "City", name: "Sacramento" },
      { "@type": "City", name: "El Dorado Hills" },
      { "@type": "City", name: "Roseville" },
      { "@type": "City", name: "Granite Bay" },
    ],
    priceRange: "$$",
    sameAs: ["https://www.instagram.com/roseandsugarcookies/"],
  };

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Private Cookie Decorating Class",
    description:
      "Hands-on private sugar cookie decorating class with professional instruction. Learn outlining, flooding, and wet-on-wet royal icing techniques. All supplies included. Available for birthdays, showers, team building, and special events in Folsom, Sacramento, and surrounding areas.",
    mainEntityOfPage: pageUrl,
    provider: {
      "@type": "Organization",
      name: "Rose & Sugar",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "55",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "55",
        priceCurrency: "USD",
        unitText: "per person",
      },
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      duration: "PT2H",
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Folsom",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Private Cookie Classes",
        item: pageUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntityOfPage: pageUrl,
    mainEntity: [
      {
        "@type": "Question",
        name: "How many people can attend a private cookie decorating class?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Private classes are flexible and can accommodate small groups of 4-6 friends or larger parties of 20+. Share your group size when you request a class and we'll tailor the experience to fit.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer kids' cookie decorating birthday parties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Kids' birthday parties and youth group events are some of our most popular private classes. We design age-appropriate themes and provide simple, fun techniques that kids love.",
        },
      },
      {
        "@type": "Question",
        name: "What ages are best for a cookie decorating class?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kids as young as 5 can participate with a parent or guardian's help. Our classes are designed to be fun for all ages; we regularly host mixed groups of kids and adults together.",
        },
      },
      {
        "@type": "Question",
        name: "Can you customize the cookie theme for my event?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Sports teams, birthday themes, holiday designs, brand logos, wedding colors, baby shower motifs - you name it. Custom themes are one of our specialties.",
        },
      },
      {
        "@type": "Question",
        name: "Do you travel to my location for private classes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes - we offer on-site private cookie decorating classes throughout Folsom, Sacramento, El Dorado Hills, Roseville, Granite Bay, and the surrounding area. We bring all the supplies; you just provide the space and the guests.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a private cookie class take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most classes run about 1.5 to 2 hours, including practice time and step-by-step instruction on each design. We'll adjust timing based on your group's needs and the number of cookies in your set.",
        },
      },
      {
        "@type": "Question",
        name: "What cookie decorating techniques will we learn?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Guests learn royal icing fundamentals including outlining, flooding, wet-on-wet designs, and detail piping. Every class starts with a practice cookie so everyone feels comfortable before decorating their set.",
        },
      },
      {
        "@type": "Question",
        name: "How far in advance should I book a private cookie class?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend booking at least 2-3 weeks in advance, especially for weekends and holiday seasons. Popular dates fill up quickly, so reach out early to secure your spot.",
        },
      },
    ],
  };

  return (
    <>
      <script
        id="localbusiness-jsonld-private-classes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <script
        id="course-jsonld-private-classes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        id="breadcrumb-jsonld-private-classes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="faq-jsonld-private-classes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PrivateCookieClassesClient />
    </>
  );
};

export default PrivateCookieClassesPage;
