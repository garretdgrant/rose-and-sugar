"use client";

import { useEffect, useState } from "react";
import ClassProductCard from "@/components/ClassProductCard";
import { mockShopifyClasses } from "@/data/shopifyMocks";
import {
  Check,
  Users,
  Sparkles,
  Clock,
  Package,
  Heart,
  Calendar,
  Mail,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ClientClasses = () => {
  const [mounted, setMounted] = useState(false);
  const upcomingClasses = mockShopifyClasses;
  const isLoading = false;
  const loadError = null;

  const classFeatures = [
    "Hands-on instruction perfect for all skill levels",
    "All supplies included (cookies, icing, tools, and packaging)",
    "Small group setting with maximum 15 attendees",
    "Learn multiple decorating techniques",
    "Take home your beautiful cookie creations",
    "Fun, relaxed atmosphere with lots of creative freedom",
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: "Expert Guidance",
      desc: "Learn from Megan with step-by-step instruction",
    },
    {
      icon: Clock,
      title: "1.5-2 Hours",
      desc: "Relaxed pace with plenty of creative time",
    },
    {
      icon: Package,
      title: "All Included",
      desc: "Cookies, icing, tools & take-home box",
    },
    {
      icon: Heart,
      title: "Beginner Friendly",
      desc: "No experience needed to create beautiful cookies",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bakery-cream via-white to-bakery-peach/30" />

        {/* Large decorative blob - top right */}
        <div
          className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-bakery-pink-light/60 to-bakery-peach/40 blur-3xl transition-all duration-1000 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />

        {/* Medium blob - bottom left */}
        <div
          className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-bakery-peach/50 to-bakery-pink-light/30 blur-2xl transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />

        {/* Floating accent shapes */}
        <div
          className={`absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-bakery-pink-dark/60 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 4s ease-in-out infinite" }}
        />
        <div
          className={`absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-bakery-brown/50 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
        />
        <div
          className={`absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-bakery-pink/70 transition-all duration-700 delay-900 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 3.5s ease-in-out infinite 1s" }}
        />

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("/paper-texture.svg")`,
          }}
        />

        <div className="container-custom relative z-10 py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div
              className={`text-center lg:text-left transition-all duration-1000 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6 transition-all duration-700 delay-200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Learn Cookie Decorating
                </span>
              </div>

              {/* Main Headline */}
              <h1
                className={`font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-6 transition-all duration-700 delay-300 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <span className="block text-gray-800">Cookie Decorating</span>
                <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Classes
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className={`font-poppins text-lg md:text-xl text-gray-600 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed transition-all duration-700 delay-400 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Join Megan for a fun, creative cookie decorating experience.
                Small-group classes designed for all skill levels in a warm,
                supportive environment.
              </p>

              {/* CTA */}
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <a
                  href="#book-class"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Upcoming Classes
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Stats */}
              <div
                className={`mt-10 flex items-center gap-8 justify-center lg:justify-start transition-all duration-700 delay-600 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="text-center">
                  <p className="font-bebas text-3xl text-bakery-pink-dark">
                    50+
                  </p>
                  <p className="font-poppins text-sm text-gray-500">
                    Classes Taught
                  </p>
                </div>
                <div className="w-px h-10 bg-bakery-pink-light" />
                <div className="text-center">
                  <p className="font-bebas text-3xl text-bakery-pink-dark">
                    15
                  </p>
                  <p className="font-poppins text-sm text-gray-500">
                    Max Group Size
                  </p>
                </div>
                <div className="w-px h-10 bg-bakery-pink-light" />
                <div className="text-center">
                  <p className="font-bebas text-3xl text-bakery-pink-dark">
                    $55
                  </p>
                  <p className="font-poppins text-sm text-gray-500">
                    Starting At
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Image Composition */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              {/* Decorative ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-[90%] h-[90%] rounded-full border-2 border-dashed border-bakery-pink-light/40"
                  style={{ animation: "spin 60s linear infinite" }}
                />
              </div>

              {/* Main image container */}
              <div className="relative z-10 mx-auto max-w-lg lg:max-w-none">
                {/* Background shape */}
                <div className="absolute inset-4 bg-gradient-to-br from-bakery-peach via-bakery-pink-light/50 to-bakery-cream rounded-[3rem] transform rotate-3" />

                {/* Main image */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-bakery-pink/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/roseSugarClassCropped.webp"
                    alt="Cookie decorating class in progress"
                    width={600}
                    height={500}
                    priority
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={80}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bakery-pink-dark/20 via-transparent to-transparent" />
                </div>

                {/* Floating badge - top right */}
                <div
                  className={`absolute -top-4 -right-4 md:top-4 md:right-0 bg-white rounded-2xl shadow-xl p-4 transform rotate-6 transition-all duration-700 delay-700 ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ animation: "float 4s ease-in-out infinite" }}
                >
                  <div className="text-center">
                    <p className="font-bebas text-3xl text-bakery-pink-dark">
                      All Supplies
                    </p>
                    <p className="text-xs font-poppins text-gray-600">
                      Included
                    </p>
                  </div>
                </div>

                {/* Floating badge - bottom left */}
                <div
                  className={`absolute -bottom-2 -left-2 md:bottom-8 md:-left-8 bg-gradient-to-br from-bakery-pink-dark to-bakery-pink text-white rounded-2xl shadow-xl p-4 transform -rotate-6 transition-all duration-700 delay-800 ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ animation: "float 5s ease-in-out infinite 1s" }}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-poppins font-semibold text-sm">
                      Small Groups
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SVG wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 md:h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
              fill="white"
            />
          </svg>
        </div>

        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </section>

      {/* ===== HIGHLIGHTS SECTION ===== */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d286a0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-bakery-cream to-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300 border border-bakery-pink-light/20 hover:border-bakery-pink-light"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-bakery-peach/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-bakery-pink-dark" />
                  </div>
                  <h3 className="font-bebas text-xl text-gray-900 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 font-poppins">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOOK A CLASS SECTION ===== */}
      <section
        id="book-class"
        className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-bakery-cream/50 to-bakery-pink-light/40"
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-peach/30 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6">
                <Calendar className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Upcoming Sessions
                </span>
              </div>
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                <span className="text-gray-800">Book a</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Decorating Class
                </span>
              </h2>
              <p className="mt-6 font-poppins text-lg text-gray-600 max-w-xl mx-auto">
                Select from our upcoming cookie decorating classes and reserve
                your spot today
              </p>
            </div>

            {/* Class Cards Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-bakery-pink-dark mx-auto mb-4" />
                  <p className="font-poppins text-gray-600">
                    Loading classes...
                  </p>
                </div>
              </div>
            ) : loadError ? (
              <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl border border-bakery-pink-light/30 shadow-lg">
                <p className="text-gray-600 font-poppins">{loadError}</p>
              </div>
            ) : upcomingClasses.length === 0 ? (
              <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl border border-bakery-pink-light/30 shadow-lg">
                <Calendar className="w-12 h-12 text-bakery-pink-light mx-auto mb-4" />
                <p className="text-gray-600 font-poppins text-lg">
                  No upcoming classes at the moment.
                </p>
                <p className="text-gray-500 font-poppins mt-2">
                  Check back soon for new dates!
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 lg:gap-8 ${
                  upcomingClasses.length === 1
                    ? "grid-cols-1 max-w-md mx-auto"
                    : upcomingClasses.length === 2
                      ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {upcomingClasses.map((classItem, index) => (
                  <ClassProductCard
                    key={classItem.node.id}
                    product={classItem}
                    imageOverride={
                      index === 0 ? "/singleCookie.webp" : undefined
                    }
                  />
                ))}
              </div>
            )}

            {/* Waitlist CTA */}
            <div className="mt-16">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-bakery-pink-light via-bakery-peach to-bakery-pink-light rounded-3xl blur-sm" />
                <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-lg">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-bakery-pink-dark" />
                      </div>
                      <div className="text-center md:text-left">
                        <p className="font-bebas text-2xl text-gray-900 tracking-wide">
                          Don&apos;t Miss Out
                        </p>
                        <p className="text-gray-600 font-poppins">
                          Get notified when new classes are added
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white px-8 py-4 rounded-full font-poppins font-semibold shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                    >
                      Join Waitlist
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED SECTION ===== */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                <span className="text-gray-800">What&apos;s</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Included
                </span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-bakery-peach/30 to-bakery-pink-light/30 rounded-[2rem] transform rotate-1" />
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-bakery-pink-light/20">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center shadow-lg shadow-bakery-pink/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-bebas text-2xl md:text-3xl text-gray-900 tracking-wide">
                    Small-Group Experience
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {classFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-4 rounded-xl bg-bakery-cream/50 hover:bg-bakery-pink-light/30 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <Check className="w-4 h-4 text-bakery-pink-dark" />
                      </div>
                      <p className="text-gray-700 font-poppins leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLASS EXPERIENCE SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-peach/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                <span className="text-gray-800">The Class</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Content - 7 columns */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-gray-700 font-poppins text-lg leading-relaxed">
                  Each Rose & Sugar class is designed to be both educational and
                  enjoyable. You&apos;ll learn various decorating methods
                  including outlining, flooding, detail piping, and wet-on-wet
                  designs. Each class begins with a practice cookie and practice
                  piping sheet before jumping into the set.
                </p>

                <p className="text-gray-700 font-poppins text-lg leading-relaxed">
                  Classes typically run for 1.5-2 hours, giving you plenty of
                  time to practice your skills and decorate 3-5 cookies that
                  you&apos;ll take home in a beautiful box. We keep our classes
                  small (maximum 15 people) to ensure everyone receives personal
                  attention.
                </p>

                <p className="text-gray-700 font-poppins text-lg leading-relaxed">
                  No experience necessary — just bring your creativity! Classes
                  are perfect for friends&apos; nights out, birthday
                  celebrations, or anyone looking to learn a new skill in a
                  supportive environment.
                </p>
              </div>

              {/* Testimonial Card - 5 columns */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-bakery-peach to-bakery-pink-light/50 rounded-3xl transform rotate-2" />
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                    <div className="absolute -top-4 left-8">
                      <span className="text-6xl text-bakery-pink-light font-serif">
                        &ldquo;
                      </span>
                    </div>
                    <div className="pt-6">
                      <p className="text-gray-700 font-poppins text-lg italic leading-relaxed">
                        The cookie decorating class was so fun! It was
                        intimidating coming into the class but with Megan&apos;s
                        great instruction and being able to bring it down to an
                        entry level it was so much fun and we were able to
                        create really beautiful designs!
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                          <span className="font-bebas text-lg text-bakery-pink-dark">
                            B
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins font-medium text-gray-900">
                            Brittany D.
                          </p>
                          <p className="text-sm text-gray-500">
                            Class Attendee
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRIVATE CLASSES CTA ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-bakery-pink-dark">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-bakery-pink/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-bakery-peach/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 mb-6">
              <Users className="w-4 h-4 text-white" />
              <span className="text-sm font-poppins font-medium text-white">
                Private Events
              </span>
            </div>
            <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Host a Private Class
            </h2>
            <p className="mt-6 text-lg text-white/90 font-poppins max-w-xl mx-auto">
              Looking for a unique activity for a bridal shower, team building,
              or birthday celebration? Private classes are tailored to your
              event with a minimum of 8 guests at $55 per person.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-bakery-pink-dark font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Inquire About Private Classes
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClientClasses;
