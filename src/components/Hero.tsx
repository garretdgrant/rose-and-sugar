"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Layered background with organic shapes */}
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10 min-h-screen flex items-center py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Left Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                Handcrafted in Folsom, CA
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-6 transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              id="hero-heading"
            >
              <span className="block text-gray-800">Where Art</span>
              <span className="block text-gray-800">Meets</span>
              <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Sweet
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
              Custom decorated cookies & hands-on decorating classes for
              celebrations that deserve something extraordinary.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/cookies/custom-orders"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Order Custom Cookies
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/classes"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-poppins font-semibold rounded-full border-2 border-bakery-pink-light hover:border-bakery-pink hover:bg-bakery-pink-light/30 transition-all duration-300"
              >
                Book a Class
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Social proof */}
            <div
              className={`mt-10 flex items-center gap-4 justify-center lg:justify-start transition-all duration-700 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach border-2 border-white shadow-sm flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-bakery-pink-dark">
                      {["MJ", "SK", "LR", "AP"][i - 1]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-poppins">
                  Loved by 200+ happy customers
                </p>
              </div>
            </div>
          </div>

          {/* Right - Image Composition */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[90%] h-[90%] rounded-full border-2 border-dashed border-bakery-pink-light/40"
                style={{ animation: "spin 60s linear infinite" }}
              />
            </div>

            {/* Main image container with organic shape */}
            <div className="relative z-10 mx-auto max-w-lg lg:max-w-none">
              {/* Background shape */}
              <div className="absolute inset-4 bg-gradient-to-br from-bakery-peach via-bakery-pink-light/50 to-bakery-cream rounded-[3rem] transform rotate-3" />

              {/* Main image */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-bakery-pink/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/singleCookie.webp"
                  alt="Beautifully decorated sugar cookie by Rose and Sugar"
                  width={600}
                  height={500}
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  quality={80}
                  className="w-full h-auto object-cover"
                />

                {/* Overlay gradient */}
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
                    100+
                  </p>
                  <p className="text-xs font-poppins text-gray-600">
                    Unique Designs
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
                  <Sparkles className="w-5 h-5" />
                  <span className="font-poppins font-semibold text-sm">
                    Made with Love
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-poppins text-gray-500 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-bakery-pink-light flex items-start justify-center p-1">
            <div
              className="w-1.5 h-3 bg-bakery-pink-dark rounded-full"
              style={{
                animation: "scrollBounce 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollBounce {
          0%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.5;
          }
        }
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
  );
};

export default Hero;
