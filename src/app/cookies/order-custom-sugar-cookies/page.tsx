import type { Metadata } from "next";
import {
  buildCanonicalUrl,
  buildOgImageUrl,
  getMetadataBase,
} from "@/lib/metadata";
import CustomOrderClient from "./CustomOrderClient";
import { customOrderFaqs } from "./content";

const PAGE_PATH = "/cookies/order-custom-sugar-cookies";
const PAGE_TITLE =
  "Order Custom Sugar Cookies in Folsom & Sacramento | Rose & Sugar";
const PAGE_DESCRIPTION =
  "Order custom decorated sugar cookies starting at $65/dozen. Handcrafted in Folsom, CA for birthdays, showers, weddings & events. Request your free quote today!";

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = getMetadataBase();
  const canonical = buildCanonicalUrl(PAGE_PATH, metadataBase);
  const ogImage = buildOgImageUrl("/cookies.webp", metadataBase);

  return {
    metadataBase,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: {
      canonical,
    },
    openGraph: {
      title: "Order Custom Sugar Cookies | Rose & Sugar – Folsom, CA",
      description:
        "Handcrafted custom decorated sugar cookies starting at $65/dozen. Perfect for birthdays, showers, weddings & corporate events. Serving Folsom & Sacramento.",
      url: canonical,
      type: "website",
      siteName: "Rose & Sugar",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "Order Custom Sugar Cookies | Rose & Sugar – Folsom, CA",
      description:
        "Handcrafted custom decorated sugar cookies starting at $65/dozen. Perfect for birthdays, showers, weddings & corporate events. Serving Folsom & Sacramento.",
      images: [ogImage],
    },
  };
}

const CustomOrderPage = () => {
  const metadataBase = getMetadataBase();
  const siteUrl = metadataBase.toString().replace(/\/$/, "");
  const pageUrl = buildCanonicalUrl(PAGE_PATH, metadataBase);
  const logoUrl = buildOgImageUrl("/logo.png", metadataBase);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Rose & Sugar",
    description:
      "Handcrafted custom decorated sugar cookies and cookie decorating classes in Folsom, CA. Serving Sacramento, El Dorado Hills, Roseville, and Granite Bay.",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.678,
      longitude: -121.1761,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Folsom",
        containedInPlace: { "@type": "State", name: "California" },
      },
      {
        "@type": "City",
        name: "Sacramento",
        containedInPlace: { "@type": "State", name: "California" },
      },
      {
        "@type": "City",
        name: "El Dorado Hills",
        containedInPlace: { "@type": "State", name: "California" },
      },
      {
        "@type": "City",
        name: "Roseville",
        containedInPlace: { "@type": "State", name: "California" },
      },
      {
        "@type": "City",
        name: "Granite Bay",
        containedInPlace: { "@type": "State", name: "California" },
      },
    ],
    priceRange: "$65-$90 per dozen",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      description: "Pickup available Saturdays; other days by arrangement",
    },
    sameAs: ["https://www.instagram.com/roseandsugarcookies/"],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Custom Decorated Sugar Cookies",
    description:
      "Hand-decorated custom sugar cookies made to order for birthdays, baby showers, bridal showers, weddings, corporate events, and celebrations. Available for local pickup in Folsom, CA.",
    brand: {
      "@type": "Brand",
      name: "Rose & Sugar",
    },
    image: logoUrl,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "65.00",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "65.00",
        priceCurrency: "USD",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "12",
          unitText: "cookies",
        },
      },
      availability: "https://schema.org/InStock",
      availableDeliveryMethod:
        "http://purl.org/goodrelations/v1#DeliveryModePickUp",
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 38.678,
          longitude: -121.1761,
        },
        geoRadius: "50000",
      },
      seller: {
        "@type": "Organization",
        name: "Rose & Sugar",
      },
    },
    category: "Custom Decorated Sugar Cookies",
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
        name: "Cookies",
        item: buildCanonicalUrl("/cookies"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Order Custom Sugar Cookies",
        item: pageUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntityOfPage: pageUrl,
    mainEntity: customOrderFaqs.map((faq) => ({
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
      <script
        id="localbusiness-jsonld-custom-orders"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <script
        id="product-jsonld-custom-orders"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        id="breadcrumbs-jsonld-custom-orders"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="faq-jsonld-custom-orders"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CustomOrderClient />
    </>
  );
};

export default CustomOrderPage;
