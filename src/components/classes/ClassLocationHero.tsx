"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight, MapPin } from "lucide-react";

interface ClassLocationHeroProps {
  city: string;
  heroDescription: string;
}

const ClassLocationHero = ({
  city,
  heroDescription,
}: ClassLocationHeroProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden">
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
        {/* Breadcrumb */}
        <div
          className={`mb-8 -mt-10 md:-mt-16 lg:-mt-20 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
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
                  <Link href="/classes">Classes</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{city}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Location badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <MapPin className="w-4 h-4 text-bakery-pink-dark" />
            <span className="text-sm font-poppins font-medium text-gray-700">
              Serving {city}, CA
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-6 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="block text-gray-800">Cookie Decorating</span>
            <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
              Classes
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`font-poppins text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {heroDescription}
          </p>

          {/* CTA */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/classes"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              View Upcoming Classes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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
  );
};

export default ClassLocationHero;
