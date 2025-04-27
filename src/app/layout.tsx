import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL("https://www.roseandsugar.com");

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase,
    title:
      "Beautiful Custom Cookies in Folsom | Rose & Sugar Handcrafted Designs",
    description:
      "Order custom sugar cookies in Folsom, CA for birthdays, showers, and celebrations. Handcrafted by Rose & Sugar with love and local flair.",
    alternates: {
      canonical: "https://www.roseandsugar.com",
    },
    openGraph: {
      title: "Handcrafted Custom Cookies in Folsom, CA | Rose & Sugar",
      description:
        "Celebrate with custom cookies that are as beautiful as they are delicious. Serving Folsom, El Dorado Hills, Placerville, and nearby areas.",
      url: "https://www.roseandsugar.com",
      siteName: "Rose & Sugar",
      type: "website",
      images: ["/singleCookie.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rose & Sugar | Custom Sugar Cookies for All Occasions",
      description:
        "Order personalized, handcrafted sugar cookies made with love in Folsom, CA. Perfect for parties, showers, and gifts.",
      images: ["https://www.roseandsugar.com/singleCookie.webp"],
    },
  };
}

function getJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.roseandsugar.com/#localbusiness",
    name: "Rose & Sugar",
    url: "https://www.roseandsugar.com",
    email: "megan@roseandsugar.com",
    telephone: "+1-555-123-4567",
    serviceType: ["Custom Cookies", "Cookie Decorating Classes"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "Customer Support",
      areaServed: ["US"],
      availableLanguage: ["English"],
    },
    hasMap: "https://www.google.com/maps/place/Folsom,+CA",
    founder: {
      "@type": "Person",
      name: "Megan Guerra",
      url: "https://www.roseandsugar.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Folsom",
      addressRegion: "CA",
      postalCode: "95630",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "Place", name: "Folsom" },
      { "@type": "Place", name: "El Dorado Hills" },
      { "@type": "Place", name: "Placerville" },
      { "@type": "Place", name: "Cameron Park" },
      { "@type": "Place", name: "Tahoe" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    description:
      "Rose & Sugar creates handcrafted custom cookies in Folsom, CA for birthdays, showers, holidays, and events. Every cookie is a piece of edible art.",
    sameAs: ["https://instagram.com/roseandsugar"],
    image: "https://www.roseandsugar.com/assets/rose-and-sugar-logo.webp",
    priceRange: "$$",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getJsonLd();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="localbusiness-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive" // ← KEY: SSR-compatible
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
