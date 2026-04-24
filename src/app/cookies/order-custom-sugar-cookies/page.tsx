import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import {
  buildCanonicalUrl,
  buildOgImageUrl,
  getMetadataBase,
} from "@/lib/metadata";
import {
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  DollarSign,
  MapPin,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import CustomOrderClient from "./CustomOrderClient";
import { customOrderFaqs } from "./content";

const PAGE_PATH = "/cookies/order-custom-sugar-cookies";
const PAGE_TITLE =
  "Order Custom Sugar Cookies in Folsom & Sacramento | Rose & Sugar";
const PAGE_DESCRIPTION =
  "Order custom decorated sugar cookies starting at $65/dozen. Handcrafted in Folsom, CA for birthdays, showers, weddings & events. Request your free quote today!";

const featureHighlights = [
  {
    icon: DollarSign,
    title: "Starting at $65/dz",
    desc: "Custom cookies with up to 5 colors",
  },
  {
    icon: Clock,
    title: "2 Week Lead Time",
    desc: "Rush orders available on request",
  },
  {
    icon: MapPin,
    title: "Folsom Pickup",
    desc: "Shipping available on request",
  },
  {
    icon: CreditCard,
    title: "Easy Payment",
    desc: "Venmo, Zelle, and credit cards accepted",
  },
];

const customCookieGallery = [
  {
    src: "/gallery/catCookies.jpg",
    alt: "Custom cat-themed sugar cookies by Rose & Sugar",
    label: "Playful custom themes",
  },
  {
    src: "/gallery/weddingCookies.jpg",
    alt: "Custom wedding sugar cookies by Rose & Sugar",
    label: "Wedding details",
  },
  {
    src: "/gallery/wedding3.jpg",
    alt: "Decorated wedding sugar cookies by Rose & Sugar",
    label: "Elegant florals",
  },
  {
    src: "/gallery/insects.jpg",
    alt: "Custom insect-themed sugar cookies by Rose & Sugar",
    label: "Detailed custom designs",
  },
  {
    src: "/cookies.webp",
    alt: "Assorted decorated sugar cookies by Rose & Sugar",
    label: "Signature assortment",
  },
];

const occasionCards = [
  {
    title: "Birthday Parties",
    body: (
      <>
        From whimsical themes for kids to elegant designs for milestone
        birthdays, custom birthday cookies make the perfect party addition or
        take-home favor. Choose from our variety of flavors including vanilla,
        lemon, almond, confetti, chocolate chip, and maple. If you want an
        interactive celebration too, a{" "}
        <Link
          href="/private-cookie-classes-folsom-sacramento"
          className="text-bakery-pink-dark underline-offset-4 hover:underline"
        >
          private cookie decorating class
        </Link>{" "}
        is a fun add-on for birthdays and showers.
      </>
    ),
  },
  {
    title: "Baby Showers",
    body: (
      <>
        Celebrate the mom-to-be with delicate designs featuring soft pastels,
        woodland themes, or personalized details like the baby&apos;s name and
        due date. We offer dye-free icing options for a more natural look.
      </>
    ),
  },
  {
    title: "Bridal Showers & Weddings",
    body: (
      <>
        Impress your guests with beautifully decorated cookies that complement
        your wedding colors and theme. Custom cookies make memorable bridal
        shower favors, dessert table accents, or rehearsal dinner treats.
      </>
    ),
  },
  {
    title: "Corporate Events & Client Gifts",
    body: (
      <>
        Make a lasting impression with logo cookies, branded packaging, or
        themed sets for team celebrations, product launches, and client
        appreciation. We also support{" "}
        <Link
          href="/corporate-team-building"
          className="text-bakery-pink-dark underline-offset-4 hover:underline"
        >
          corporate team building events
        </Link>{" "}
        throughout the Sacramento region with polished cookie experiences and
        branded gifting.
      </>
    ),
  },
];

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
        item: buildCanonicalUrl("/cookies", metadataBase),
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

      <main className="relative overflow-hidden">
        <section className="relative flex min-h-[55vh] items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-bakery-cream via-white to-bakery-peach/30" />

          <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-bakery-pink-light/60 to-bakery-peach/40 opacity-0 blur-3xl animate-scale-in" />
          <div
            className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-bakery-peach/50 to-bakery-pink-light/30 opacity-0 blur-2xl animate-scale-in"
            style={{ animationDelay: "200ms" }}
          />

          <div
            className="absolute right-1/4 top-1/4 h-4 w-4 rounded-full bg-bakery-pink-dark/60"
            style={{ animation: "float 4s ease-in-out infinite" }}
          />
          <div
            className="absolute left-1/4 top-1/3 h-3 w-3 rounded-full bg-bakery-brown/50"
            style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 h-2 w-2 rounded-full bg-bakery-pink/70"
            style={{ animation: "float 3.5s ease-in-out infinite 1s" }}
          />

          <div className="container-custom relative z-10 py-28 md:py-36">
            <div
              className="mb-8 mt-2 opacity-0 animate-fade-in-up md:mt-0"
              style={{ animationDelay: "100ms" }}
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/cookies">Cookies</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Order Custom Sugar Cookies</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="mx-auto max-w-4xl text-center">
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/50 bg-white/80 px-4 py-2 opacity-0 shadow-sm backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <Sparkles className="h-4 w-4 text-bakery-pink-dark" />
                <span className="text-sm font-medium text-gray-700 font-poppins">
                  Custom Orders
                </span>
              </div>

              <h1
                className="mb-6 font-bebas text-5xl leading-[0.9] tracking-tight text-gray-800 opacity-0 animate-fade-in-up sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ animationDelay: "300ms" }}
              >
                <span className="block">Custom</span>
                <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Cookie Orders
                </span>
              </h1>

              <p
                className="mx-auto mb-8 max-w-2xl font-poppins text-lg leading-relaxed text-gray-600 opacity-0 animate-fade-in-up md:text-xl"
                style={{ animationDelay: "400ms" }}
              >
                Make your celebration unforgettable with custom-designed sugar
                cookies from Rose & Sugar. Every set is handcrafted by Megan in
                Folsom, CA and tailored to your vision, whether you&apos;re
                planning a birthday party, baby shower, bridal shower, wedding,
                graduation, or corporate event. With over five years of
                experience and hundreds of happy customers across the Sacramento
                area, we bring artistry, flavor, and care to every cookie we
                create.
              </p>

              <div
                className="flex flex-col justify-center gap-4 opacity-0 animate-fade-in-up sm:flex-row"
                style={{ animationDelay: "500ms" }}
              >
                <Link
                  href="/cookies/signature-sugar-cookie-sets"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-bakery-pink-light bg-white/80 px-8 py-4 font-poppins font-semibold text-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-bakery-pink hover:bg-bakery-pink-light/30"
                >
                  Looking for Signature Sets?
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg
              className="relative block h-16 w-full md:h-24"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/40 to-bakery-pink-light/30" />
          <div className="absolute -left-32 top-20 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-bakery-pink-light/30 to-transparent blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/30 to-transparent blur-3xl" />

          <div className="absolute left-0 right-0 top-0 overflow-hidden leading-none rotate-180">
            <svg
              className="relative block h-16 w-full md:h-24"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="container-custom relative z-10 pt-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <h2 className="font-bebas text-4xl tracking-tight text-gray-800 opacity-0 animate-fade-in-up md:text-5xl">
                  Request a{" "}
                  <span className="bg-gradient-to-r from-bakery-pink-dark to-bakery-pink bg-clip-text text-transparent">
                    Custom Order
                  </span>
                </h2>
                <p
                  className="mt-3 font-poppins text-gray-600 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "100ms" }}
                >
                  Tell us about your event and we&apos;ll follow up within 48
                  hours.
                </p>
              </div>

              <CustomOrderClient />

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {featureHighlights.map((item, idx) => (
                  <div
                    key={item.title}
                    className="group relative h-full opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${400 + idx * 100}ms` }}
                  >
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-bakery-pink-light via-bakery-peach to-bakery-pink-light opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col rounded-2xl border border-bakery-pink-light/20 bg-white p-6 text-center shadow-sm transition-all duration-300 group-hover:border-transparent group-hover:shadow-lg">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-bakery-pink-light/50 to-bakery-peach/30 transition-all duration-300 group-hover:scale-110 group-hover:from-bakery-pink-dark group-hover:to-bakery-pink">
                        <item.icon className="h-6 w-6 text-bakery-pink-dark transition-colors duration-300 group-hover:text-white" />
                      </div>
                      <h3 className="font-bebas text-xl tracking-wide text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-poppins text-sm text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(232,173,193,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(253,225,211,0.18),_transparent_35%)]" />
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-5xl">
              <div className="max-w-3xl">
                <h2 className="font-bebas text-4xl tracking-tight text-gray-800 md:text-5xl">
                  Why Choose Rose & Sugar for Your Custom Cookies?
                </h2>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_0.6fr]">
                <div className="space-y-5 rounded-[2rem] border border-bakery-pink-light/20 bg-white p-8 shadow-lg shadow-bakery-pink/5">
                  <p className="font-poppins text-base leading-relaxed text-gray-700">
                    When you order custom decorated sugar cookies from Rose &
                    Sugar, you&apos;re getting more than a sweet treat.
                    You&apos;re getting edible art made with intention. Each
                    cookie is hand-rolled, hand-cut, and decorated with royal
                    icing using a floral-inspired style that&apos;s become our
                    signature. We use real butter, pure vanilla, and
                    high-quality ingredients because we believe every detail
                    matters.
                  </p>
                  <p className="font-poppins text-base leading-relaxed text-gray-700">
                    Our custom cookie process is simple: tell us about your
                    event, share your color palette or theme inspiration, and
                    we&apos;ll design a set that brings your vision to life.
                    From elegant bridal shower favors with hand-painted florals
                    to playful birthday party cookies in bold colors, we treat
                    every order as a collaboration. You&apos;ll receive a
                    personalized quote within 48 hours of submitting your
                    request.
                  </p>
                  <p className="font-poppins text-base leading-relaxed text-gray-700">
                    Rose & Sugar proudly serves Folsom, Sacramento, El Dorado
                    Hills, Roseville, Granite Bay, and surrounding communities.
                    All custom orders are available for local pickup in Folsom,
                    typically on Saturdays, with flexible scheduling available
                    upon request. If you want to learn the techniques behind the
                    details, Megan also offers{" "}
                    <Link
                      href="/classes#book-class"
                      className="text-bakery-pink-dark underline-offset-4 hover:underline"
                    >
                      cookie decorating classes
                    </Link>
                    . You can also learn more{" "}
                    <Link
                      href="/about"
                      className="text-bakery-pink-dark underline-offset-4 hover:underline"
                    >
                      about Megan
                    </Link>{" "}
                    and the story behind Rose & Sugar.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-bakery-pink-light/20 bg-gradient-to-br from-bakery-pink-light/20 via-white to-bakery-peach/20 p-6 shadow-lg shadow-bakery-pink/5">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <span className="inline-flex rounded-full bg-white/80 px-3 py-1 font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-bakery-pink-dark">
                        Local Pickup
                      </span>
                      <h3 className="mt-4 font-bebas text-3xl text-gray-800">
                        Folsom-Made, Sacramento-Area Loved
                      </h3>
                      <p className="mt-4 font-poppins text-sm leading-relaxed text-gray-600">
                        Custom cookie orders are created in Folsom, CA for
                        celebrations across Sacramento, El Dorado Hills,
                        Roseville, Granite Bay, and nearby communities.
                      </p>
                    </div>
                    <div className="mt-6 space-y-3">
                      {[
                        "Starting at $65 per dozen",
                        "Minimum order: 2 dozen",
                        "Preferred pickup on Saturdays",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3"
                        >
                          <Check className="h-4 w-4 text-bakery-pink-dark" />
                          <span className="font-poppins text-sm text-gray-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-bakery-cream/40 py-16 md:py-24">
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-5xl">
              <h2 className="font-bebas text-4xl tracking-tight text-gray-800 md:text-5xl">
                Custom Cookies for Every Occasion
              </h2>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {occasionCards.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[2rem] border border-bakery-pink-light/30 bg-white p-8 shadow-lg shadow-bakery-pink/5"
                  >
                    <h3 className="font-bebas text-3xl text-gray-800">
                      {item.title}
                    </h3>
                    <p className="mt-4 font-poppins text-base leading-relaxed text-gray-700">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-[2rem] border border-bakery-pink-light/30 bg-white p-8 shadow-lg shadow-bakery-pink/5">
                <h3 className="font-bebas text-3xl text-gray-800">
                  Graduations, Holidays & More
                </h3>
                <p className="mt-4 font-poppins text-base leading-relaxed text-gray-700">
                  Whatever the milestone, we&apos;ll design a cookie set to
                  match. Just share your vision in our order form above and
                  we&apos;ll take care of the rest.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <div className="rounded-[2rem] border border-bakery-pink-light/30 bg-gradient-to-br from-white via-white to-bakery-peach/10 p-8 shadow-lg shadow-bakery-pink/5">
                  <h2 className="font-bebas text-4xl tracking-tight text-gray-800 md:text-5xl">
                    Custom Cookie Pricing & What&apos;s Included
                  </h2>
                  <div className="mt-6 space-y-5 font-poppins text-base leading-relaxed text-gray-700">
                    <p>
                      Our custom decorated sugar cookies start at{" "}
                      <strong>$65 per dozen</strong> and include up to five
                      icing colors with basic to intermediate detail. Character
                      cookies and logo designs start at{" "}
                      <strong>$70 per dozen</strong>. Additional complexity,
                      airbrushing, or extra colors may adjust pricing and
                      we&apos;ll always provide a clear quote before you commit.
                    </p>
                    <p>
                      Every order requires a{" "}
                      <strong>minimum of two dozen</strong> cookies and a{" "}
                      <strong>two-week lead time</strong> to ensure we deliver
                      our best work. Rush orders may be available for an
                      additional fee, but cannot be guaranteed.
                    </p>
                    <p>
                      All cookies come individually heat-sealed at no extra
                      charge for maximum freshness. Ribbon-tied packaging is
                      available as an upgrade. We accept Venmo, Zelle, and all
                      major credit cards, with payment due at least two weeks
                      before your pickup date.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-bakery-pink-light/30 bg-bakery-cream/60 p-8 shadow-lg shadow-bakery-pink/5">
                  <h3 className="font-bebas text-3xl text-gray-800">
                    Quick Reference
                  </h3>
                  <div className="mt-6 space-y-4">
                    {[
                      ["Starting price", "$65/dozen"],
                      ["Character or logo sets", "$70+/dozen"],
                      ["Gluten-free flour option", "+$6/dozen"],
                      ["Dye-free icing option", "+$10/dozen"],
                      ["Lead time", "2-3 weeks recommended"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4"
                      >
                        <span className="font-poppins text-sm text-gray-600">
                          {label}
                        </span>
                        <span className="font-poppins text-sm font-semibold text-gray-800">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-bakery-cream/30 py-16 md:py-24">
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-5xl">
              <div className="max-w-3xl">
                <h2 className="font-bebas text-4xl tracking-tight text-gray-800 md:text-5xl">
                  Custom Cookie Gallery
                </h2>
                <p className="mt-4 font-poppins text-base leading-relaxed text-gray-700">
                  A few favorite custom cookie designs from across the Rose &
                  Sugar collection.
                </p>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {customCookieGallery.map((image) => (
                  <figure
                    key={image.src}
                    className="overflow-hidden rounded-[2rem] border border-bakery-pink-light/30 bg-white shadow-lg shadow-bakery-pink/5"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      />
                    </div>
                    <figcaption className="border-t border-bakery-pink-light/20 px-5 py-4 font-poppins text-sm text-gray-700">
                      {image.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23d286a0' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          <div className="absolute -right-32 top-20 h-[300px] w-[300px] rounded-full bg-gradient-to-bl from-bakery-pink-light/20 to-transparent blur-3xl" />
          <div className="absolute -left-32 bottom-20 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-bakery-peach/20 to-transparent blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/50 bg-bakery-pink-light/30 px-4 py-2">
                  <MessageSquare className="h-4 w-4 text-bakery-pink-dark" />
                  <span className="font-poppins text-sm font-medium text-gray-700">
                    Common Questions
                  </span>
                </div>
                <h2 className="font-bebas text-4xl tracking-tight text-gray-800 md:text-5xl">
                  Frequently{" "}
                  <span className="bg-gradient-to-r from-bakery-pink-dark to-bakery-pink bg-clip-text text-transparent">
                    Asked Questions
                  </span>
                </h2>
              </div>

              <div className="rounded-3xl border border-bakery-pink-light/20 bg-white/80 p-6 shadow-xl shadow-bakery-pink/5 backdrop-blur-sm md:p-10">
                <FAQAccordion
                  faqs={customOrderFaqs.map((faq) => ({
                    question: faq.question,
                    answer: faq.answerText,
                  }))}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CustomOrderPage;
