"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gift,
  Users,
  Heart,
  Sparkles,
  Building2,
  Calendar,
  Check,
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";

const PrivateCookieClassesClient = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const occasions = [
    {
      icon: Gift,
      title: "Kids & Adult Birthday Parties",
      description:
        "Celebrate with a hands-on cookie experience everyone can enjoy.",
      emoji: "🎂",
    },
    {
      icon: Users,
      title: "Sports Teams & End-of-Season Events",
      description: "A fun team reward with treats to take home.",
      emoji: "🏆",
    },
    {
      icon: Heart,
      title: "Girls' Nights & Friend Get-Togethers",
      description: "Laugh, decorate, and make something beautiful together.",
      emoji: "💕",
    },
    {
      icon: Sparkles,
      title: "Bridal & Baby Showers",
      description: "Elegant, memorable celebrations with custom themes.",
      emoji: "👰",
    },
    {
      icon: Building2,
      title: "Corporate & Team-Building Events",
      description: "Creative bonding for teams of all sizes.",
      emoji: "🏢",
    },
    {
      icon: Calendar,
      title: "Holiday Parties & Seasonal Events",
      description: "Festive cookie classes tailored to the season.",
      emoji: "🎄",
    },
  ];

  const inclusions = [
    "Professionally baked sugar cookies",
    "Custom royal icing colors",
    "All decorating tools & supplies",
    "Step-by-step instruction",
    "Take-home decorated cookies",
    "Custom themes available upon request",
  ];

  const highlights = [
    {
      icon: Star,
      title: "Locally owned & operated",
      description: "A boutique experience led by a local baker you can trust.",
    },
    {
      icon: Users,
      title: "Small-group focused",
      description: "Personalized guidance so everyone feels confident.",
    },
    {
      icon: Sparkles,
      title: "High-quality ingredients",
      description: "Beautiful designs with delicious, premium cookies.",
    },
    {
      icon: Heart,
      title: "Beginner-friendly & fun",
      description: "No experience required — just show up and enjoy.",
    },
  ];

  const faqs = [
    {
      question: "How many people can attend a private class?",
      answer: (
        <>
          Private classes are flexible and can be customized for small or large
          groups. Share your group size and event details on our{" "}
          <Link className="text-bakery-pink-dark" href="/contact">
            contact page
          </Link>
          .
        </>
      ),
    },
    {
      question: "Do you offer kids' cookie decorating classes?",
      answer: (
        <>
          Yes! Kids&apos; birthday parties and youth groups are some of our most
          popular private classes.
        </>
      ),
    },
    {
      question: "Can you customize the theme?",
      answer: (
        <>
          Absolutely. Sports teams, birthdays, holidays, colors, and special
          requests are welcome.
        </>
      ),
    },
    {
      question: "Do you travel to my location?",
      answer: (
        <>
          Yes — we offer on-site private classes throughout Folsom and the
          greater Sacramento area. Location details are discussed during
          booking.
        </>
      ),
    },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-bakery-peach/20" />

        {/* Large decorative blobs */}
        <div
          className={`absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-bakery-pink-light/70 to-bakery-peach/50 blur-3xl transition-all duration-1000 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />
        <div
          className={`absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-200/60 to-bakery-pink-light/40 blur-3xl transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />

        <div className="container-custom relative z-10 py-32 md:py-40">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border-2 border-rose-200 shadow-sm mb-8 transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="text-base font-poppins font-semibold text-gray-700">
                Private Cookie Decorating Classes
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-bebas leading-[0.85] tracking-tight mb-8 transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gray-800">
                PRIVATE COOKIE
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent drop-shadow-sm">
                CLASSES
              </span>
            </h1>

            {/* Cookie emoji decoration */}
            <div
              className={`flex items-center justify-center gap-3 mb-8 transition-all duration-700 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-4xl md:text-5xl animate-bounce-soft">
                🍪
              </span>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-bakery-pink to-transparent rounded-full" />
              <span
                className="text-4xl md:text-5xl animate-bounce-soft"
                style={{ animationDelay: "0.5s" }}
              >
                🍪
              </span>
            </div>

            {/* Subheadline */}
            <p
              className={`font-bebas text-2xl md:text-3xl lg:text-4xl text-gray-700 max-w-3xl mx-auto mb-10 leading-tight transition-all duration-700 delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              IN FOLSOM & SACRAMENTO
            </p>

            {/* Supporting text */}
            <p
              className={`font-poppins text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Looking for a fun, hands-on private cookie decorating experience?
              Rose & Sugar hosts beginner-friendly classes for birthdays, teams,
              friends, and special celebrations — all led by an experienced
              local baker.
            </p>

            {/* CTA Button */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-bakery-pink-dark via-rose-500 to-bakery-pink-dark text-white font-bebas text-2xl tracking-wide rounded-full shadow-2xl shadow-rose-300/50 hover:shadow-rose-300/70 hover:scale-105 transition-all duration-300"
              >
                Request a Private Class
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="inline-flex items-center gap-2 text-sm font-poppins text-gray-600">
                <MapPin className="h-4 w-4 text-bakery-pink-dark" />
                Serving Folsom, Sacramento, El Dorado Hills & nearby areas
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-20 md:h-32"
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

      {/* ===== OCCASIONS SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light mb-6">
              <Heart className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Perfect for any occasion
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-4">
              CELEBRATE WITH A{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                COOKIE CLASS
              </span>
            </h2>
          </div>

          {/* Occasions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {occasions.map((occasion, idx) => (
              <div
                key={occasion.title}
                className={`group transition-all duration-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${100 + idx * 100}ms` }}
              >
                <div className="relative h-full bg-gradient-to-br from-white to-bakery-cream/30 rounded-3xl p-8 shadow-md hover:shadow-xl border border-bakery-pink-light/30 hover:border-bakery-pink transition-all duration-300">
                  {/* Emoji decoration */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {occasion.emoji}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-rose-100/50 mb-5 group-hover:from-bakery-pink-dark group-hover:to-rose-500 transition-all duration-300">
                    <occasion.icon className="w-7 h-7 text-bakery-pink-dark group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bebas text-2xl text-gray-800 tracking-wide mb-3">
                    {occasion.title}
                  </h3>
                  <p className="font-poppins text-gray-600 leading-relaxed">
                    {occasion.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED SECTION ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20" />

        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-200/40 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/40 to-transparent blur-3xl" />

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-20 md:h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="container-custom relative z-10 pt-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light mb-6">
              <Check className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                What&apos;s included
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight">
              EVERYTHING YOU NEED TO DECORATE WITH{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                CONFIDENCE
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div
              className={`relative transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-rose-300/60 via-bakery-pink-light/60 to-bakery-peach/60 rounded-[2rem] transform rotate-0.5" />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
                <ul className="space-y-5">
                  {inclusions.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-start gap-4 transition-all duration-500 ${
                        mounted
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-rose-500 text-white shadow-lg flex-shrink-0">
                        <Check className="h-5 w-5" strokeWidth={3} />
                      </span>
                      <span className="font-poppins text-lg text-gray-700 pt-1.5">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.3fr_1fr] items-center">
            <div
              className={`transition-all duration-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light mb-6">
                <Gift className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Pricing & details
                </span>
              </div>
              <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-6">
                PRIVATE CLASSES START AT{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                  $55 PER PERSON
                </span>
              </h2>
              <p className="font-poppins text-lg text-gray-600 leading-relaxed mb-8">
                Pricing varies based on group size, custom themes or designs,
                and location/setup needs. We&apos;ll tailor the experience to
                your event.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-50 via-bakery-pink-light/30 to-rose-50 rounded-full border-2 border-bakery-pink-light/50">
                <MapPin className="h-5 w-5 text-bakery-pink-dark" />
                <span className="text-sm font-poppins text-gray-700 font-medium">
                  Available in Folsom, Sacramento, El Dorado Hills & surrounding
                  areas
                </span>
              </div>
            </div>

            <div
              className={`relative transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-rose-300/60 via-bakery-pink-light/60 to-bakery-peach/60 rounded-[2rem]" />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl">
                <h3 className="font-bebas text-4xl text-gray-800 mb-4 tracking-wide">
                  REQUEST A{" "}
                  <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                    PRIVATE CLASS
                  </span>
                </h3>
                <p className="font-poppins text-gray-600 mb-8 leading-relaxed">
                  Share your event date, group size, and location. We&apos;ll
                  follow up with options and availability.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-bakery-pink-dark via-rose-500 to-bakery-pink-dark text-white font-bebas text-2xl tracking-wide rounded-2xl shadow-xl shadow-rose-300/50 hover:shadow-2xl hover:shadow-rose-300/70 hover:scale-105 transition-all duration-300"
                >
                  Request Class
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY ROSE & SUGAR SECTION ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20" />

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-20 md:h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="container-custom relative z-10 pt-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light mb-6">
              <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Why Rose & Sugar
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight">
              A MEMORABLE{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                EXPERIENCE
              </span>
              <br />
              FROM START TO FINISH
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={`group transition-all duration-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                <div className="h-full bg-gradient-to-br from-white to-bakery-cream/30 rounded-3xl p-8 shadow-md hover:shadow-xl border border-bakery-pink-light/30 hover:border-bakery-pink transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-rose-100/50 mb-5 group-hover:from-bakery-pink-dark group-hover:to-rose-500 transition-all duration-300">
                    <highlight.icon className="w-7 h-7 text-bakery-pink-dark group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bebas text-2xl text-gray-800 tracking-wide mb-3">
                    {highlight.title}
                  </h3>
                  <p className="font-poppins text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light mb-6">
              <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                FAQs
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight">
              PRIVATE CLASS{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                FAQS
              </span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20" />

        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-200/40 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/40 to-transparent blur-3xl" />

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-20 md:h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="container-custom relative z-10 pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`relative transition-all duration-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-rose-300/60 via-bakery-pink-light/60 to-bakery-peach/60 rounded-[2rem]" />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl">
                <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-6">
                  BOOK A PRIVATE{" "}
                  <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                    COOKIE CLASS
                  </span>
                </h2>
                <p className="font-poppins text-xl text-gray-700 leading-relaxed mb-10 max-w-2xl mx-auto">
                  Ready to plan a private cookie decorating class in Folsom or
                  the Sacramento area? Share your details and we&apos;ll help
                  you create a fun, unforgettable experience.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-bakery-pink-dark via-rose-500 to-bakery-pink-dark text-white font-bebas text-2xl tracking-wide rounded-full shadow-2xl shadow-rose-300/50 hover:shadow-rose-300/70 hover:scale-105 transition-all duration-300"
                >
                  Request a Private Class
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Bottom note */}
            <div
              className={`mt-12 transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-50 via-bakery-pink-light/30 to-rose-50 rounded-full border-2 border-bakery-pink-light/50">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                <p className="font-poppins text-gray-700 font-medium">
                  Let&apos;s create something sweet together!
                </p>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivateCookieClassesClient;
