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
  Quote,
  Star,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { getPredesignedSizeLabel } from "@/lib/predesignedCookies";

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
  const imageAlt = product.images?.edges?.[0]?.node.altText || product.title;
  const gallery = (product.images?.edges || [])
    .map((e) => e.node.url)
    .slice(0, 4);
  const price = product.priceRange?.minVariantPrice?.amount ?? "0";
  const rawTags = product.tags || [];
  const tags = rawTags.map((t) => t.toLowerCase());
  const sizeLabel = getPredesignedSizeLabel(rawTags) || "set";

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

  const setLabel = isSignature ? "Signature Set" : "Cookie Set";
  const highlightLabel = isBestSeller
    ? "Best Seller"
    : isNew
      ? "New Release"
      : "Handcrafted";
  const highlightSub = isBestSeller
    ? "Fan favorite"
    : isNew
      ? "Fresh design"
      : "Made with love";
  const badgeItems = [
    isSignature
      ? {
          label: "Signature Set",
          icon: Sparkles,
          tone: "text-bakery-pink-dark",
        }
      : null,
    isSeasonal
      ? { label: "Seasonal", icon: Leaf, tone: "text-bakery-brown" }
      : null,
    isBestSeller
      ? { label: "Best Seller", icon: Award, tone: "text-bakery-pink-dark" }
      : null,
    isNew ? { label: "New", icon: Heart, tone: "text-bakery-pink-dark" } : null,
  ].filter(
    (item): item is { label: string; icon: typeof Sparkles; tone: string } =>
      item !== null,
  );

  return (
    <main className="min-h-screen relative overflow-hidden">
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

      {/* Layered background with organic shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-bakery-cream via-white to-bakery-pink-light/30" />
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-bakery-pink-light/50 to-bakery-peach/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-bakery-peach/40 to-bakery-pink-light/20 blur-3xl" />

      {/* Floating accent shapes */}
      <div
        className="absolute top-1/4 right-[15%] w-4 h-4 rounded-full bg-bakery-pink-dark/40"
        style={{ animation: "float 4s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/2 left-[10%] w-3 h-3 rounded-full bg-bakery-brown/40"
        style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-bakery-pink/50"
        style={{ animation: "float 3.5s ease-in-out infinite 1s" }}
      />

      <div className="relative z-10 pt-28 md:pt-32">
        <nav className="container-custom mb-6" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm font-poppins text-gray-500">
            <Link
              href="/"
              className="hover:text-bakery-pink-dark transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href="/cookies/signature-sugar-cookie-sets"
              className="hover:text-bakery-pink-dark transition-colors"
            >
              Signature Sets
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800 font-medium truncate max-w-[240px]">
              {product.title}
            </span>
          </div>
        </nav>

        {/* Hero Section with Editorial Layout */}
        <section className="container-custom py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-stretch">
            {/* Left Column - Image + Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-bakery-peach via-bakery-pink-light/60 to-bakery-cream rounded-[2.5rem] transform rotate-2 hidden lg:block" />

                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-bakery-pink/20 transform lg:-rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="relative aspect-[4/3] lg:aspect-[16/10]">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {badgeItems.length > 0 && (
                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                      {badgeItems.map((badge) => (
                        <span
                          key={badge.label}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-bakery-pink-light/40 shadow-lg text-sm font-poppins font-semibold ${badge.tone}`}
                        >
                          <badge.icon className="w-4 h-4" />
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-white rounded-2xl shadow-xl p-4 transform rotate-3 hidden md:block z-20"
                  style={{ animation: "float 5s ease-in-out infinite" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <p className="font-bebas text-xl text-gray-800">
                        Handcrafted
                      </p>
                      <p className="font-poppins text-xs text-gray-500">
                        Signature designs
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-2 left-8 md:-bottom-6 md:left-12 bg-gradient-to-br from-bakery-pink-dark to-bakery-pink text-white rounded-2xl shadow-xl p-4 transform -rotate-3 hidden md:block z-20"
                  style={{ animation: "float 6s ease-in-out infinite 1s" }}
                >
                  <div className="flex items-center gap-2">
                    <Cookie className="w-5 h-5" />
                    <span className="font-poppins font-semibold text-sm">
                      Ready to order
                    </span>
                  </div>
                </div>
              </div>

              {/* What's Included - Below Image on Desktop */}
              <div className="hidden lg:block bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg shadow-bakery-pink/5 border border-bakery-pink-light/20 mt-16">
                <h3 className="font-bebas text-3xl text-gray-900 mb-6">
                  What&apos;s{" "}
                  <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                    Included
                  </span>
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-bakery-cream/60 to-white border border-bakery-pink-light/20 hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                      <Cookie className="w-7 h-7 text-bakery-pink-dark" />
                    </div>
                    <h4 className="font-bebas text-lg text-gray-800 mb-1">
                      Signature Designs
                    </h4>
                    <p className="font-poppins text-xs text-gray-600">
                      Curated themes for every celebration
                    </p>
                  </div>
                  <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-bakery-cream/60 to-white border border-bakery-pink-light/20 hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-bakery-pink-dark" />
                    </div>
                    <h4 className="font-bebas text-lg text-gray-800 mb-1">
                      Premium Packaging
                    </h4>
                    <p className="font-poppins text-xs text-gray-600">
                      Beautifully boxed and presentation-ready
                    </p>
                  </div>
                  <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-bakery-cream/60 to-white border border-bakery-pink-light/20 hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                      <Heart className="w-7 h-7 text-bakery-pink-dark" />
                    </div>
                    <h4 className="font-bebas text-lg text-gray-800 mb-1">
                      Sweet Details
                    </h4>
                    <p className="font-poppins text-xs text-gray-600">
                      Fresh-baked cookies made with care
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial - Below What's Included on Desktop */}
              <div className="hidden lg:block bg-gradient-to-br from-bakery-pink-light/40 to-bakery-peach/30 backdrop-blur-sm rounded-[2rem] p-8 border border-bakery-pink-light/40">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <Quote className="w-10 h-10 text-bakery-pink-dark/50 transform rotate-180" />
                  </div>
                  <div>
                    <p className="font-playfair text-xl text-gray-700 italic leading-relaxed">
                      &ldquo;These cookies were stunning and tasted amazing. The
                      presentation made our celebration feel extra
                      special!&rdquo;
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink to-bakery-pink-dark flex items-center justify-center">
                        <span className="font-poppins font-bold text-white">
                          HK
                        </span>
                      </div>
                      <div>
                        <p className="font-poppins font-medium text-gray-800">
                          Hannah K.
                        </p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Browse Collection Link - Desktop */}
              <div className="hidden lg:block text-center">
                <Link
                  href="/cookies/signature-sugar-cookie-sets"
                  className="inline-flex items-center gap-2 font-poppins text-bakery-pink-dark font-medium hover:text-bakery-pink transition-colors"
                >
                  Browse all signature sets
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-5 lg:flex lg:items-stretch">
              <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 shadow-xl shadow-bakery-pink/10 border border-bakery-pink-light/30 lg:flex-1 lg:h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bakery-pink-light/50 border border-bakery-pink-light mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-bakery-pink-dark animate-pulse" />
                  <span className="text-xs font-poppins font-medium text-bakery-pink-dark uppercase tracking-wider">
                    {setLabel}
                  </span>
                </div>

                <h1 className="font-bebas text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-gray-900 leading-[0.95] tracking-tight">
                  {product.title}
                </h1>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-bebas text-4xl bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                    ${parseFloat(price).toFixed(2)}
                  </span>
                  <span className="font-poppins text-sm text-gray-500">
                    per {sizeLabel}
                  </span>
                </div>

                <p className="mt-5 font-poppins text-gray-600 leading-relaxed">
                  {product.description ||
                    "Handcrafted signature cookies made to celebrate every moment."}
                </p>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-bakery-pink-light to-transparent" />

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-bakery-cream/50 border border-bakery-pink-light/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-4 h-4 text-bakery-pink-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-poppins text-xs font-medium text-gray-800 truncate">
                        {setLabel}
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500">
                        Collection
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-bakery-cream/50 border border-bakery-pink-light/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-bakery-pink-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-poppins text-xs font-medium text-gray-800 truncate">
                        Order timing
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500">
                        About one month out
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-bakery-cream/50 border border-bakery-pink-light/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-bakery-pink-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-poppins text-xs font-medium text-gray-800 truncate">
                        Folsom, CA
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500">
                        Pickup location
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-bakery-cream/50 border border-bakery-pink-light/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-bakery-pink-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-poppins text-xs font-medium text-gray-800 truncate">
                        {highlightLabel}
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500">
                        {highlightSub}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-bakery-pink-light to-transparent" />

                <ProductDetailClient
                  product={product}
                  actionLabel="Add to Cart"
                  addedLabel="Added!"
                  helperText="Pickup is arranged after checkout confirmation."
                />

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/cookies/order-custom-sugar-cookies"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-bakery-pink-light text-bakery-pink-dark font-poppins font-medium text-sm hover:bg-bakery-pink-light/30 hover:border-bakery-pink transition-all duration-300"
                  >
                    <Heart className="w-4 h-4" />
                    Request Custom Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section - Mobile Only */}
        <section className="container-custom pb-16 lg:hidden">
          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg shadow-bakery-pink/5 border border-bakery-pink-light/20">
            <h2 className="font-bebas text-3xl text-gray-900 text-center mb-6">
              What&apos;s{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Included
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-bakery-cream/50 to-white border border-bakery-pink-light/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-bakery-pink-dark" />
                </div>
                <div>
                  <h3 className="font-bebas text-lg text-gray-800">
                    Signature Designs
                  </h3>
                  <p className="font-poppins text-xs text-gray-600">
                    Curated themes for every celebration
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-bakery-cream/50 to-white border border-bakery-pink-light/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-bakery-pink-dark" />
                </div>
                <div>
                  <h3 className="font-bebas text-lg text-gray-800">
                    Premium Packaging
                  </h3>
                  <p className="font-poppins text-xs text-gray-600">
                    Beautifully boxed and presentation-ready
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-bakery-cream/50 to-white border border-bakery-pink-light/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-bakery-pink-dark" />
                </div>
                <div>
                  <h3 className="font-bebas text-lg text-gray-800">
                    Sweet Details
                  </h3>
                  <p className="font-poppins text-xs text-gray-600">
                    Fresh-baked cookies made with care
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-bakery-pink-light/30 to-bakery-peach/20 border border-bakery-pink-light/40">
              <div className="flex gap-3">
                <Quote className="w-6 h-6 text-bakery-pink-dark/60 transform rotate-180 flex-shrink-0" />
                <div>
                  <p className="font-playfair text-sm text-gray-700 italic leading-relaxed">
                    &ldquo;Absolutely beautiful and delicious cookies. They made
                    our party unforgettable.&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-poppins text-xs font-medium text-gray-800">
                      Hannah K.
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-2.5 h-2.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/cookies/signature-sugar-cookie-sets"
                className="inline-flex items-center gap-2 font-poppins text-bakery-pink-dark font-medium hover:text-bakery-pink transition-colors"
              >
                Browse all signature sets
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
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
