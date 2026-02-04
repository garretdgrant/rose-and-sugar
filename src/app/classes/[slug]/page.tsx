import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ArrowLeft,
  Heart,
  Cookie,
  Quote,
  Star,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import FAQAccordion from "@/components/FAQAccordion";
import ProductDetailClient from "@/components/ProductDetailClient";
import { buildClassNode, fetchClassByHandle } from "@/lib/shopifyClasses";

type Props = { params: Promise<{ slug: string }> };

const formatTime = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value;
  const minute = parts.find((part) => part.type === "minute")?.value;
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value;
  if (!hour || !dayPeriod) return "";
  if (!minute || minute === "00") return `${hour} ${dayPeriod}`;
  return `${hour}:${minute} ${dayPeriod}`;
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(date);
};

const formatDateParts = (date: Date) => {
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "America/Los_Angeles",
  }).format(date);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(date);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "America/Los_Angeles",
  }).format(date);
  return { month, day, weekday };
};

const getDurationLabel = (start: Date, end: Date) => {
  const durationMinutes = Math.max(
    0,
    (end.getTime() - start.getTime()) / 60000,
  );
  if (durationMinutes % 60 === 0) {
    const hours = durationMinutes / 60;
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }
  return `${(durationMinutes / 60).toFixed(1)} hours`;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const classItem = await fetchClassByHandle(slug);

  if (!classItem) {
    return buildPageMetadata({
      title: "Class",
      description: "Join a hands-on cookie decorating class with Rose & Sugar.",
      path: `/classes/${slug}`,
      imagePath: "/roseSugarClassCropped.webp",
    });
  }

  return buildPageMetadata({
    title: classItem.seo?.title || `${classItem.title} | Rose & Sugar`,
    description:
      classItem.seo?.description ||
      classItem.description ||
      "Join a hands-on cookie decorating class with Rose & Sugar.",
    path: `/classes/${slug}`,
    imagePath: classItem.image?.url || "/roseSugarClassCropped.webp",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const classItem = await fetchClassByHandle(slug);

  if (!classItem) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bakery-cream via-white to-bakery-peach/30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-bakery-peach/40 to-transparent blur-3xl" />

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
              <Cookie className="w-10 h-10 text-bakery-pink-dark" />
            </div>
            <h2 className="font-bebas text-4xl md:text-5xl text-gray-800 tracking-tight">
              Class Not Found
            </h2>
            <p className="mt-4 font-poppins text-gray-600 leading-relaxed">
              This class may have ended or the link might be incorrect. Check
              out our upcoming classes for new opportunities!
            </p>
            <Link
              href="/classes"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              View All Classes
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const imageUrl = classItem.image?.url || "/openDefault.webp";
  const imageAlt = classItem.image?.altText || classItem.title;
  const price = parseFloat(classItem.price || "0");
  const productNode = buildClassNode(classItem);
  const startDate = classItem.eventStartDateTime
    ? new Date(classItem.eventStartDateTime)
    : null;
  const endDate = classItem.eventEndDateTime
    ? new Date(classItem.eventEndDateTime)
    : null;
  const validStart = startDate && !Number.isNaN(startDate.getTime());
  const validEnd = endDate && !Number.isNaN(endDate.getTime());

  const dateLabel = validStart ? formatDate(startDate) : "Date TBD";
  const dateParts = validStart ? formatDateParts(startDate) : null;
  const timeLabel = validStart
    ? validEnd
      ? `${formatTime(startDate)} – ${formatTime(endDate)}`
      : formatTime(startDate)
    : "Time TBD";
  const durationLabel =
    validStart && validEnd ? getDurationLabel(startDate, endDate) : null;

  const locationName = classItem.location || "Location TBD";
  const hasLocation = Boolean(classItem.location);
  const locationSummary = hasLocation
    ? `${locationName}.`
    : "Location details will be shared after booking.";

  const seatsLeft = classItem.quantityAvailable ?? null;
  const seatsLabel =
    seatsLeft !== null && seatsLeft !== undefined
      ? seatsLeft === 0
        ? "Sold Out"
        : `${seatsLeft} seat${seatsLeft === 1 ? "" : "s"} remaining`
      : "Limited availability";
  const isLowStock = seatsLeft !== null && seatsLeft > 0 && seatsLeft <= 5;
  const isSoldOut = seatsLeft === 0;
  const durationSummary = durationLabel || "About 1.5–2 hours";

  const faqs = [
    {
      question: "What is included in the class?",
      answer:
        "All supplies are provided, including cookies, icing, tools, and take-home packaging. You'll leave with your decorated cookies.",
    },
    {
      question: "How long does the class last?",
      answer: durationSummary,
    },
    {
      question: "Where is the class held?",
      answer: locationSummary,
    },
    {
      question: "Is the class beginner friendly?",
      answer:
        "Yes! Classes are designed for all skill levels with step-by-step instruction.",
    },
    {
      question: "What if I need to cancel or reschedule?",
      answer: (
        <>
          Please reach out as soon as possible and we&apos;ll do our best to
          help.{" "}
          <Link
            className="text-bakery-pink-dark underline underline-offset-4 hover:text-bakery-pink"
            href="/contact"
          >
            Contact us here
          </Link>
          .
        </>
      ),
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is included in the class?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All supplies are provided, including cookies, icing, tools, and take-home packaging. You'll leave with your decorated cookies.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the class last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: durationSummary,
        },
      },
      {
        "@type": "Question",
        name: "Where is the class held?",
        acceptedAnswer: {
          "@type": "Answer",
          text: locationSummary,
        },
      },
      {
        "@type": "Question",
        name: "Is the class beginner friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Classes are designed for all skill levels with step-by-step instruction.",
        },
      },
      {
        "@type": "Question",
        name: "What if I need to cancel or reschedule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Please reach out as soon as possible and we'll do our best to help. Contact us for assistance.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Script
        id="faq-jsonld-class-detail"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Layered background with organic shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-bakery-cream via-white to-bakery-pink-light/30" />

      {/* Large decorative blob - top right */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-bakery-pink-light/50 to-bakery-peach/30 blur-3xl" />

      {/* Medium blob - bottom left */}
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
              href="/classes"
              className="hover:text-bakery-pink-dark transition-colors"
            >
              Classes
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800 font-medium truncate max-w-[240px]">
              {classItem.title}
            </span>
          </div>
        </nav>

        {/* Hero Section with Editorial Layout */}
        <section className="container-custom py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-stretch">
            {/* Left Column - Image + Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Image Container */}
              <div className="relative">
                {/* Background decorative shape */}
                <div className="absolute -inset-4 bg-gradient-to-br from-bakery-peach via-bakery-pink-light/60 to-bakery-cream rounded-[2.5rem] transform rotate-2 hidden lg:block" />

                {/* Main image container */}
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
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Date badge - floating on image */}
                  {dateParts && (
                    <div className="absolute top-6 left-6 z-10">
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <div className="bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white text-center py-1.5 font-bebas text-sm tracking-widest uppercase">
                          {dateParts.month}
                        </div>
                        <div className="bg-white text-center py-3">
                          <span className="font-bebas text-4xl text-gray-900">
                            {dateParts.day}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status badge - sold out or low stock */}
                  {(isSoldOut || isLowStock) && (
                    <div className="absolute top-6 right-6 z-10">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-poppins font-semibold shadow-lg ${
                          isSoldOut
                            ? "bg-gray-900 text-white"
                            : "bg-amber-500 text-white"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${isSoldOut ? "bg-gray-400" : "bg-white animate-pulse"}`}
                        />
                        {isSoldOut ? "Sold Out" : `Only ${seatsLeft} left!`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Floating elements around image */}
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
                        Hands-On
                      </p>
                      <p className="font-poppins text-xs text-gray-500">
                        Learning Experience
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cookie takeaway badge */}
                <div
                  className="absolute -bottom-2 left-8 md:-bottom-6 md:left-12 bg-gradient-to-br from-bakery-pink-dark to-bakery-pink text-white rounded-2xl shadow-xl p-4 transform -rotate-3 hidden md:block z-20"
                  style={{ animation: "float 6s ease-in-out infinite 1s" }}
                >
                  <div className="flex items-center gap-2">
                    <Cookie className="w-5 h-5" />
                    <span className="font-poppins font-semibold text-sm">
                      Take Home Your Creations
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
                      Cookie Decorating
                    </h4>
                    <p className="font-poppins text-xs text-gray-600">
                      Themed cookies to take home
                    </p>
                  </div>
                  <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-bakery-cream/60 to-white border border-bakery-pink-light/20 hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-bakery-pink-dark" />
                    </div>
                    <h4 className="font-bebas text-lg text-gray-800 mb-1">
                      All Supplies
                    </h4>
                    <p className="font-poppins text-xs text-gray-600">
                      Everything you need provided
                    </p>
                  </div>
                  <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-bakery-cream/60 to-white border border-bakery-pink-light/20 hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                      <Heart className="w-7 h-7 text-bakery-pink-dark" />
                    </div>
                    <h4 className="font-bebas text-lg text-gray-800 mb-1">
                      Sweet Experience
                    </h4>
                    <p className="font-poppins text-xs text-gray-600">
                      Refreshments & fun atmosphere
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
                      &ldquo;Such a fun girls night out! Megan is an amazing
                      teacher and made everyone feel comfortable. Can&apos;t
                      wait to book another class!&rdquo;
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink to-bakery-pink-dark flex items-center justify-center">
                        <span className="font-poppins font-bold text-white">
                          SK
                        </span>
                      </div>
                      <div>
                        <p className="font-poppins font-medium text-gray-800">
                          Sarah K.
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

              {/* Browse All Classes Link - Desktop */}
              <div className="hidden lg:block text-center">
                <Link
                  href="/classes"
                  className="inline-flex items-center gap-2 font-poppins text-bakery-pink-dark font-medium hover:text-bakery-pink transition-colors"
                >
                  Browse all upcoming classes
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>

            {/* Right Column - Sticky Booking Card Only */}
            <div className="lg:col-span-5 lg:flex lg:items-stretch">
              <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 shadow-xl shadow-bakery-pink/10 border border-bakery-pink-light/30 lg:flex-1 lg:h-full">
                {/* Category tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bakery-pink-light/50 border border-bakery-pink-light mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-bakery-pink-dark animate-pulse" />
                  <span className="text-xs font-poppins font-medium text-bakery-pink-dark uppercase tracking-wider">
                    Cookie Decorating Class
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-bebas text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-gray-900 leading-[0.95] tracking-tight">
                  {classItem.title}
                </h1>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-bebas text-4xl bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                    ${price.toFixed(0)}
                  </span>
                  <span className="font-poppins text-sm text-gray-500">
                    per person
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 font-poppins text-gray-600 leading-relaxed">
                  {classItem.description ||
                    "Join us for a hands-on cookie decorating experience where you'll learn professional techniques and take home your delicious creations!"}
                </p>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-bakery-pink-light to-transparent" />

                {/* Event Details - Vertical Stack */}
                <div className="grid grid-cols-1 gap-3">
                  {/* Date */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-bakery-cream/50 border border-bakery-pink-light/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-bakery-pink-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-poppins text-xs font-medium text-gray-800 truncate">
                        {dateParts
                          ? `${dateParts.month} ${dateParts.day}`
                          : dateLabel}
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500">
                        {dateParts?.weekday || "Date"}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-bakery-cream/50 border border-bakery-pink-light/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-bakery-pink-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-poppins text-xs font-medium text-gray-800 truncate">
                        {timeLabel}
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500">
                        {durationLabel || "Duration"}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-bakery-cream/50 border border-bakery-pink-light/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-bakery-pink-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-poppins text-xs font-medium text-gray-800 truncate">
                        {locationName}
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500 truncate">
                        {locationName || "Location"}
                      </p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-bakery-cream/50 border border-bakery-pink-light/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-bakery-pink-dark" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`font-poppins text-xs font-medium truncate ${isSoldOut ? "text-gray-500" : isLowStock ? "text-amber-600" : "text-gray-800"}`}
                      >
                        {seatsLabel}
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500">
                        Small group
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-bakery-pink-light to-transparent" />

                {/* Booking Section */}
                <ProductDetailClient
                  product={productNode}
                  actionLabel="Book Your Seat"
                  addedLabel="Seat Added!"
                  addedLabelSingular="Seat Added!"
                  addedLabelPlural="Seats Added!"
                  helperText="Secure checkout • Take home your cookies"
                />

                {/* Additional Links */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-bakery-pink-light text-bakery-pink-dark font-poppins font-medium text-sm hover:bg-bakery-pink-light/30 hover:border-bakery-pink transition-all duration-300"
                  >
                    <Heart className="w-4 h-4" />
                    Request Private Class
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
                    Cookie Decorating
                  </h3>
                  <p className="font-poppins text-xs text-gray-600">
                    Themed cookies to take home
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-bakery-cream/50 to-white border border-bakery-pink-light/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-bakery-pink-dark" />
                </div>
                <div>
                  <h3 className="font-bebas text-lg text-gray-800">
                    All Supplies
                  </h3>
                  <p className="font-poppins text-xs text-gray-600">
                    Everything provided
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-bakery-cream/50 to-white border border-bakery-pink-light/20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-bakery-pink-dark" />
                </div>
                <div>
                  <h3 className="font-bebas text-lg text-gray-800">
                    Sweet Experience
                  </h3>
                  <p className="font-poppins text-xs text-gray-600">
                    Light refreshments & fun atmosphere
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial on mobile */}
            <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-bakery-pink-light/30 to-bakery-peach/20 border border-bakery-pink-light/40">
              <div className="flex gap-3">
                <Quote className="w-6 h-6 text-bakery-pink-dark/60 transform rotate-180 flex-shrink-0" />
                <div>
                  <p className="font-playfair text-sm text-gray-700 italic leading-relaxed">
                    &ldquo;Such a fun girls night out! Megan is an amazing
                    teacher.&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-poppins text-xs font-medium text-gray-800">
                      Sarah K.
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
                href="/classes"
                className="inline-flex items-center gap-2 font-poppins text-bakery-pink-dark font-medium hover:text-bakery-pink transition-colors"
              >
                Browse all classes
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container-custom pb-20">
          <div className="rounded-[2rem] bg-white/80 backdrop-blur-sm border border-bakery-pink-light/30 shadow-xl p-8 md:p-10">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bakery-pink-light/50 text-bakery-pink-dark font-poppins text-xs font-medium tracking-wide mb-4">
                Class FAQs
              </span>
              <h2 className="font-bebas text-3xl md:text-4xl text-gray-800">
                Your Questions, Answered
              </h2>
              <p className="mt-3 font-poppins text-gray-600 max-w-2xl mx-auto">
                Quick details to help you plan your cookie decorating
                experience.
              </p>
            </div>
            <FAQAccordion faqs={faqs} initiallyOpenIndex={0} />
          </div>
        </section>
      </div>
    </main>
  );
}
