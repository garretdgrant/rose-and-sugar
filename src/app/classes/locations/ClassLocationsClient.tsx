"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Sparkles, Users } from "lucide-react";
import FeaturedShop from "@/components/FeaturedShop";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const locations = [
  {
    name: "Folsom",
    path: "/classes/folsom-sugar-cookie-decorating-class",
    detail: "Hands-on classes with royal icing techniques.",
  },
  {
    name: "Loomis",
    path: "/classes/loomis-sugar-cookie-decorating-class",
    detail: "Small-group decorating sessions for all levels.",
  },
  {
    name: "Sacramento",
    path: "/classes/sacramento-sugar-cookie-decorating-class",
    detail: "Creative cookie classes with all supplies included.",
  },
  {
    name: "El Dorado Hills",
    path: "/classes/el-dorado-hills-sugar-cookie-decorating-class",
    detail: "Beginner-friendly instruction and take-home sets.",
  },
  {
    name: "Roseville",
    path: "/classes/roseville-sugar-cookie-decorating-class",
    detail: "Seasonal classes with guided decorating tips.",
  },
];

const ClassLocationsClient = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
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
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div
              className={`mb-8 -mt-10 md:-mt-16 lg:-mt-20 transition-all duration-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Breadcrumb className="justify-start">
                <BreadcrumbList className="justify-start">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/classes">Classes</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Locations</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="text-center">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6 transition-all duration-700 delay-200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <MapPin className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Serving the Sacramento Area
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
                <span className="block text-gray-800">Class</span>
                <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Locations
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className={`font-poppins text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-400 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Explore cookie decorating classes near you. Each location offers
                hands-on instruction, seasonal themes, and take-home creations.
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  href="/classes"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Upcoming Classes
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-poppins font-semibold rounded-full border-2 border-bakery-pink-light hover:border-bakery-pink hover:bg-bakery-pink-light/30 transition-all duration-300"
                >
                  Ask a Question
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
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
      </section>

      {/* ===== LOCATIONS GRID ===== */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d286a0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-pink-light/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/20 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location, idx) => (
                <Link
                  key={location.name}
                  href={location.path}
                  className={`group relative transition-all duration-500 ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${200 + idx * 100}ms` }}
                >
                  {/* Card background with gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-bakery-pink-light via-bakery-peach to-bakery-pink-light rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />

                  <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-bakery-pink-light/20 group-hover:border-transparent">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-bakery-peach/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-bakery-pink-dark group-hover:to-bakery-pink transition-all duration-300">
                        <MapPin className="w-6 h-6 text-bakery-pink-dark group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-bebas text-2xl md:text-3xl text-gray-900 tracking-wide group-hover:text-bakery-pink-dark transition-colors duration-300">
                          {location.name}
                        </h2>
                        <p className="mt-2 text-gray-600 font-poppins leading-relaxed">
                          {location.detail}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 text-bakery-pink-dark font-poppins font-medium">
                          Explore details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED SHOP ===== */}
      <FeaturedShop />

      {/* ===== REQUEST LOCATION CTA ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/40">
        {/* Decorative elements */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-peach/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-bakery-peach/40 to-bakery-pink-light/40 rounded-[2rem] transform rotate-1" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-bakery-pink-light/20 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/30 border border-bakery-pink-light/50 mb-6">
                  <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                  <span className="text-sm font-poppins font-medium text-gray-700">
                    New sessions added regularly
                  </span>
                </div>

                <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
                  <span className="text-gray-800">Not Seeing</span>{" "}
                  <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                    Your City?
                  </span>
                </h2>

                <p className="mt-6 font-poppins text-lg text-gray-600 max-w-xl mx-auto">
                  Contact us to request a class near you or to plan a private
                  event for your group.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Request a Location
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-800 font-poppins font-semibold rounded-full border-2 border-bakery-pink-light hover:border-bakery-pink hover:bg-bakery-pink-light/30 transition-all duration-300"
                  >
                    <Users className="w-5 h-5 text-bakery-pink-dark" />
                    Plan Private Event
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClassLocationsClient;
