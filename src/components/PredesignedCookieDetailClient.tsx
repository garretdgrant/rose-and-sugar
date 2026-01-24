"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductDetailClient from "@/components/ProductDetailClient";
import {
  buildPredesignedNode,
  fetchPredesignedByHandle,
  predesignedDetailQueryKey,
  type PredesignedApiProduct,
} from "@/lib/predesignedCookies";
import { buildCanonicalUrl } from "@/lib/metadata";
import {
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  Leaf,
  Award,
  Heart,
  Cookie,
  ChevronDown,
  Loader2,
} from "lucide-react";

const PredesignedCookieDetailClient = ({ handle }: { handle: string }) => {
  const queryClient = useQueryClient();
  const cachedProduct = queryClient.getQueryData<PredesignedApiProduct>(
    predesignedDetailQueryKey(handle),
  );
  const {
    data: apiProduct,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: predesignedDetailQueryKey(handle),
    queryFn: () => fetchPredesignedByHandle(handle),
    initialData: cachedProduct ?? undefined,
  });

  const product = useMemo(
    () => (apiProduct ? buildPredesignedNode(apiProduct) : null),
    [apiProduct],
  );

  if (isLoading && !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bakery-pink-light/10 via-white to-bakery-cream/20">
        <div className="flex flex-col items-center gap-3 text-gray-600">
          <Loader2 className="h-8 w-8 animate-spin text-bakery-pink-dark" />
          <p className="font-poppins text-sm">Loading cookie details...</p>
        </div>
      </main>
    );
  }

  if (isError && !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bakery-pink-light/10 via-white to-bakery-cream/20">
        <div className="max-w-md p-8 text-center bg-white rounded-2xl border border-bakery-pink-light/30 shadow-sm">
          <h2 className="font-bebas text-3xl text-gray-800 mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-600 font-poppins mb-6">
            We couldn&apos;t load this cookie right now.
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-bakery-pink-dark text-white rounded-full font-medium hover:bg-bakery-pink-dark/90 transition-colors shadow-lg shadow-bakery-pink-dark/20"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bakery-pink-light/20 via-white to-bakery-cream/30">
        <div className="max-w-md p-12 text-center">
          <div className="w-20 h-20 bg-bakery-pink-light/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-10 h-10 text-bakery-pink-dark" />
          </div>
          <h2 className="font-bebas text-3xl text-gray-800 mb-3">
            Cookie Not Found
          </h2>
          <p className="text-gray-600 font-poppins mb-8">
            We couldn&apos;t find this cookie design. It may have been removed
            or the link might be incorrect.
          </p>
          <Link
            href="/cookies/signature-sugar-cookie-sets"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bakery-pink-dark text-white rounded-full font-medium hover:bg-bakery-pink-dark/90 transition-colors shadow-lg shadow-bakery-pink-dark/20"
          >
            <Sparkles className="w-4 h-4" />
            Browse Collection
          </Link>
        </div>
      </main>
    );
  }

  const imageUrl = product.images?.edges?.[0]?.node.url ?? "/openDefault.webp";
  const gallery = (product.images?.edges || [])
    .map((e) => e.node.url)
    .slice(0, 4);
  const price = product.priceRange?.minVariantPrice?.amount ?? "0";
  const tags = (product.tags || []).map((t) => t.toLowerCase());

  const isSeasonal = tags.includes("seasonal");
  const isSignature = tags.includes("signature");
  const isBestSeller =
    tags.includes("best seller") ||
    tags.includes("best-seller") ||
    tags.includes("bestseller");
  const isNew = tags.includes("new");

  const faqs = [
    {
      q: "How long do the cookies stay fresh?",
      a: "Our cookies stay fresh for 2-3 weeks when stored in an airtight container at room temperature. For best results, keep them away from direct sunlight and humidity.",
    },
    {
      q: "Can I freeze the cookies?",
      a: "Yes! Freeze in a single layer, then transfer to an airtight container. They'll keep for up to 2 months. Thaw at room temperature for 1-2 hours before serving.",
    },
    {
      q: "Do you offer local delivery?",
      a: "We offer local pickup in Folsom, CA. Delivery options may be available for larger orders—please contact us for details.",
    },
    {
      q: "Can I customize the colors or designs?",
      a: "These are signature sets, but we'd love to create custom cookies for you! Visit our Custom Orders page to get started.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: gallery.length ? gallery : [imageUrl],
    description: product.description || undefined,
    category: "Baked Goods",
    offers: {
      "@type": "Offer",
      price: parseFloat(price).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://roseandsugar.com/cookies/signature-sugar-cookie-sets/${product.handle}`,
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
        item: buildCanonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Signature Sets",
        item: buildCanonicalUrl("/cookies/signature-sugar-cookie-sets"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: buildCanonicalUrl(
          `/cookies/signature-sugar-cookie-sets/${product.handle}`,
        ),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-bakery-pink-light/10 via-white to-bakery-cream/20">
      <Script
        id="product-jsonld-cookie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumbs-jsonld-cookie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="faq-jsonld-cookie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-bakery-peach/20 rounded-full blur-3xl" />
        <div className="absolute top-96 -right-32 w-96 h-96 bg-bakery-pink-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-bakery-pink/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Breadcrumbs */}
        <nav className="pt-28 pb-6 md:pt-32">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 text-sm font-poppins">
              <Link
                href="/"
                className="text-gray-500 hover:text-bakery-pink-dark transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href="/cookies/signature-sugar-cookie-sets"
                className="text-gray-500 hover:text-bakery-pink-dark transition-colors"
              >
                Signature Sets
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-800 font-medium truncate max-w-[200px]">
                {product.title}
              </span>
            </div>
          </div>
        </nav>

        {/* Main Product Section */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left: Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-br from-bakery-pink-light/40 via-bakery-peach/30 to-bakery-pink-light/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                    <div className="relative aspect-square">
                      <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Thumbnail Row */}
                {gallery.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {gallery.map((url, index) => (
                      <div
                        key={url}
                        className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-bakery-pink-light/30"
                      >
                        <Image
                          src={url}
                          alt={`${product.title} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {isSignature && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm text-sm font-medium text-bakery-pink-dark">
                      <Sparkles className="w-4 h-4" />
                      Signature Set
                    </span>
                  )}
                  {isSeasonal && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm text-sm font-medium text-bakery-brown">
                      <Leaf className="w-4 h-4" />
                      Seasonal
                    </span>
                  )}
                  {isBestSeller && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm text-sm font-medium text-bakery-pink-dark">
                      <Award className="w-4 h-4" />
                      Best Seller
                    </span>
                  )}
                  {isNew && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm text-sm font-medium text-bakery-pink-dark">
                      <Heart className="w-4 h-4" />
                      New
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="font-bebas text-4xl md:text-5xl text-gray-800 tracking-wide mb-3">
                    {product.title}
                  </h1>
                  <p className="font-poppins text-lg text-gray-600">
                    {product.description ||
                      "Handcrafted signature cookies made to celebrate every moment."}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-bakery-pink-dark font-bebas tracking-wide">
                    ${parseFloat(price).toFixed(2)}
                  </span>
                  <span className="text-sm font-poppins text-gray-500">
                    per set
                  </span>
                </div>

                <ProductDetailClient
                  product={product}
                  actionLabel="Add to Cart"
                  helperText="Pickup is arranged after checkout confirmation."
                />

                <div className="rounded-2xl border border-bakery-pink-light/30 bg-white/80 backdrop-blur-sm p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bakery-pink-light/40 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <p className="font-poppins font-medium text-gray-800">
                        Order Timing
                      </p>
                      <p className="font-poppins text-sm text-gray-500">
                        We book about one month out for signature sets.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bakery-pink-light/40 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <p className="font-poppins font-medium text-gray-800">
                        Pickup Location
                      </p>
                      <p className="font-poppins text-sm text-gray-500">
                        Folsom, CA — exact pickup details shared after ordering.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-bakery-pink-light/30 bg-gradient-to-br from-bakery-pink-light/20 via-white to-bakery-cream/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-bakery-pink-dark flex items-center justify-center text-white">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-bebas text-2xl text-gray-800">
                      Customize Your Set
                    </h3>
                  </div>
                  <p className="font-poppins text-gray-600 mb-4">
                    Want something unique? We can create custom cookie designs
                    for your celebration.
                  </p>
                  <Link
                    href="/cookies/order-custom-sugar-cookies"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-bakery-pink-dark border border-bakery-pink-light rounded-full font-poppins font-medium hover:bg-bakery-pink-light/30 transition-colors"
                  >
                    Start Custom Order
                    <ChevronDown className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-bakery-pink-light/30 shadow-xl p-8 md:p-10">
              <h2 className="font-bebas text-3xl text-gray-800 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.q} className="border-b border-gray-100 pb-6">
                    <h3 className="font-poppins font-semibold text-bakery-pink-dark mb-2">
                      {faq.q}
                    </h3>
                    <p className="font-poppins text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PredesignedCookieDetailClient;
