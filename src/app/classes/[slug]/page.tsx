import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/metadata";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getClassBySlug } from "@/data/classDetails";
import {
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  Leaf,
  Award,
  Heart,
  Users,
  ChevronDown,
  Calendar,
} from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const classDetail = getClassBySlug(slug);
  const title = classDetail
    ? `${classDetail.product.title} | Rose & Sugar`
    : "Class";
  const description =
    classDetail?.product.description ??
    "Join a hands-on cookie decorating class with Rose & Sugar.";
  const imagePath =
    classDetail?.product.images?.edges?.[0]?.node.url ??
    "/roseSugarClassCropped.webp";

  return buildPageMetadata({
    title,
    description,
    path: `/classes/${slug}`,
    imagePath,
  });
}

const ClassDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const classDetail = getClassBySlug(slug);

  if (!classDetail) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bakery-pink-light/20 via-white to-bakery-cream/30">
        <div className="max-w-md p-12 text-center">
          <div className="w-20 h-20 bg-bakery-pink-light/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-bakery-pink-dark" />
          </div>
          <h2 className="font-bebas text-3xl text-gray-800 mb-3">
            Class Not Found
          </h2>
          <p className="text-gray-600 font-poppins mb-8">
            We couldn&apos;t find this class. Check our upcoming sessions for
            new dates.
          </p>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bakery-pink-dark text-white rounded-full font-medium hover:bg-bakery-pink-dark/90 transition-colors shadow-lg shadow-bakery-pink-dark/20"
          >
            <Sparkles className="w-4 h-4" />
            View Classes
          </Link>
        </div>
      </main>
    );
  }

  const { product } = classDetail;
  const imageUrl = product.images?.edges?.[0]?.node.url ?? "/openDefault.webp";
  const gallery = (product.images?.edges || [])
    .map((e) => e.node.url)
    .slice(0, 4);
  const price = product.priceRange?.minVariantPrice?.amount ?? "0";
  const tags = (product.tags || []).map((tag) => tag.toLowerCase());

  const isSeasonal = tags.includes("seasonal");
  const isBeginner = tags.includes("beginner");
  const isSignature = tags.includes("signature");
  const isNew = tags.includes("new");

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Event",
    name: product.title,
    image: gallery.length ? gallery : [imageUrl],
    description: product.description || undefined,
    startDate: classDetail.dateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Rose & Sugar",
      address: classDetail.location,
    },
    offers: {
      "@type": "Offer",
      price: parseFloat(price).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://roseandsugar.com/classes/${product.handle}`,
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
        name: "Classes",
        item: buildCanonicalUrl("/classes"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: buildCanonicalUrl(`/classes/${product.handle}`),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: classDetail.faq.map((faq) => ({
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
        id="event-jsonld-class"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumbs-jsonld-class"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="faq-jsonld-class"
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
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 text-sm font-poppins">
              <Link
                href="/"
                className="text-gray-500 hover:text-bakery-pink-dark transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href="/classes"
                className="text-gray-500 hover:text-bakery-pink-dark transition-colors"
              >
                Classes
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-800 font-medium truncate max-w-[200px]">
                {product.title}
              </span>
            </div>
          </div>
        </nav>

        {/* Main Class Section */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
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

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {isBeginner && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                            <Users className="w-3.5 h-3.5" />
                            Beginner Friendly
                          </span>
                        )}
                        {isNew && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bakery-pink-dark text-white text-xs font-semibold rounded-full shadow-lg">
                            <Sparkles className="w-3.5 h-3.5" />
                            New
                          </span>
                        )}
                        {isSeasonal && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-lg">
                            <Leaf className="w-3.5 h-3.5" />
                            Seasonal
                          </span>
                        )}
                        {isSignature && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white text-xs font-semibold rounded-full shadow-lg">
                            <Award className="w-3.5 h-3.5" />
                            Signature
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {gallery.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        className={`relative aspect-square rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow ring-2 ring-offset-2 ${
                          i === 0
                            ? "ring-bakery-pink-dark"
                            : "ring-transparent hover:ring-bakery-pink-light"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${product.title} view ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Class Details */}
              <div className="lg:sticky lg:top-32 space-y-6">
                {/* Title & Price */}
                <div>
                  <h1 className="font-bebas text-4xl md:text-5xl text-gray-800 tracking-wide leading-tight mb-3">
                    {product.title}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-bakery-pink-dark">
                      ${parseFloat(price).toFixed(2)}
                    </span>
                    <span className="text-gray-500 font-poppins text-sm">
                      per seat
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-bakery-pink-light/20">
                  <p className="text-gray-700 font-poppins leading-relaxed">
                    {product.description ||
                      "Hands-on cookie decorating class with step-by-step instruction, all supplies included, and plenty of time to practice."}
                  </p>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-bakery-offWhite rounded-xl p-4 flex items-start gap-3">
                    <div className="w-10 h-10 bg-bakery-pink-light/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Date
                      </p>
                      <p className="text-gray-600 text-sm">
                        {classDetail.dateLabel}
                      </p>
                    </div>
                  </div>
                  <div className="bg-bakery-offWhite rounded-xl p-4 flex items-start gap-3">
                    <div className="w-10 h-10 bg-bakery-pink-light/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Duration
                      </p>
                      <p className="text-gray-600 text-sm">
                        {classDetail.duration}
                      </p>
                    </div>
                  </div>
                  <div className="bg-bakery-offWhite rounded-xl p-4 flex items-start gap-3">
                    <div className="w-10 h-10 bg-bakery-pink-light/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Location
                      </p>
                      <p className="text-gray-600 text-sm">
                        {classDetail.location}
                      </p>
                    </div>
                  </div>
                  <div className="bg-bakery-offWhite rounded-xl p-4 flex items-start gap-3">
                    <div className="w-10 h-10 bg-bakery-pink-light/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Level
                      </p>
                      <p className="text-gray-600 text-sm">
                        {classDetail.level}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book a Seat */}
                <ProductDetailClient
                  product={product}
                  actionLabel="Book Seat"
                  addedLabelSingular="Seat added to cart"
                  addedLabelPlural="Seats added to cart"
                  helperText="Reserve your spot and checkout when ready"
                />

                {/* Trust Signals */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-bakery-pink-light/30">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                    <span>Hands-on</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Heart className="w-4 h-4 text-bakery-pink-dark" />
                    <span>All supplies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-bakery-pink-dark" />
                    <span>Small groups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-16 bg-white/60 backdrop-blur-sm border-y border-bakery-pink-light/20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* What's Included */}
                <div>
                  <h2 className="font-bebas text-2xl md:text-3xl text-gray-800 mb-4 tracking-wide">
                    What&apos;s Included
                  </h2>
                  <div className="bg-bakery-offWhite rounded-2xl p-6">
                    <ul className="space-y-3 font-poppins text-gray-700">
                      {classDetail.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-bakery-pink-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-bakery-pink-dark text-sm font-semibold">
                              ✓
                            </span>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Class Highlights */}
                <div>
                  <h2 className="font-bebas text-2xl md:text-3xl text-gray-800 mb-4 tracking-wide">
                    Class Highlights
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {classDetail.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="bg-bakery-offWhite rounded-xl px-4 py-3 font-poppins text-gray-700 text-sm"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-500 font-poppins">
                    <strong>Time:</strong> {classDetail.time}
                  </p>
                </div>

                {/* FAQ Accordion */}
                <div>
                  <h2 className="font-bebas text-2xl md:text-3xl text-gray-800 mb-4 tracking-wide">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {classDetail.faq.map((faq) => (
                      <details
                        key={faq.q}
                        className="group bg-bakery-offWhite rounded-xl overflow-hidden"
                      >
                        <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-800 hover:bg-bakery-pink-light/20 transition-colors">
                          <span className="font-poppins">{faq.q}</span>
                          <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Class Info Card */}
                <div className="bg-gradient-to-br from-bakery-pink-light/40 to-bakery-peach/30 rounded-2xl p-6">
                  <h3 className="font-bebas text-xl text-gray-800 mb-4 tracking-wide">
                    Class Information
                  </h3>
                  <ul className="space-y-3 font-poppins text-sm text-gray-700">
                    <li className="flex justify-between">
                      <span>Price</span>
                      <span className="font-semibold text-bakery-pink-dark">
                        ${parseFloat(price).toFixed(2)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Date</span>
                      <span>{classDetail.dateLabel}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Time</span>
                      <span>{classDetail.time}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Location</span>
                      <span>{classDetail.location}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Level</span>
                      <span>{classDetail.level}</span>
                    </li>
                  </ul>
                </div>

                {/* Private Class CTA */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-bakery-pink-light/20">
                  <h3 className="font-bebas text-xl text-gray-800 mb-2 tracking-wide">
                    Want a Private Class?
                  </h3>
                  <p className="text-gray-600 font-poppins text-sm mb-4">
                    Book a private session for birthdays, teams, or
                    celebrations.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-bakery-pink-dark text-white rounded-xl font-medium hover:bg-bakery-pink-dark/90 transition-colors shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    Inquire About Private Classes
                  </Link>
                </div>

                {/* Contact Card */}
                <div className="bg-bakery-offWhite rounded-2xl p-6">
                  <h3 className="font-bebas text-xl text-gray-800 mb-2 tracking-wide">
                    Have Questions?
                  </h3>
                  <p className="text-gray-600 font-poppins text-sm mb-4">
                    We&apos;re happy to help you find the right class.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 border-2 border-bakery-pink text-bakery-pink-dark rounded-xl font-medium hover:bg-bakery-pink-light/30 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="relative bg-gradient-to-r from-bakery-pink-light/60 via-bakery-peach/40 to-bakery-pink-light/60 rounded-3xl p-8 md:p-12 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/30 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-16 w-32 h-32 bg-white/20 rounded-full translate-y-1/2" />

              <div className="relative z-10 text-center">
                <h2 className="font-bebas text-3xl md:text-4xl text-gray-800 mb-3 tracking-wide">
                  Explore More Classes
                </h2>
                <p className="text-gray-700 font-poppins mb-6 max-w-xl mx-auto">
                  Browse upcoming cookie decorating classes and reserve your
                  spot.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/classes"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bakery-pink-dark text-white rounded-full font-semibold hover:bg-bakery-pink-dark/90 transition-all shadow-xl shadow-bakery-pink-dark/30 hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    View All Classes
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-bakery-pink-dark rounded-full font-semibold hover:bg-bakery-offWhite transition-all shadow-lg"
                  >
                    Ask a Question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
};

export default ClassDetailPage;
