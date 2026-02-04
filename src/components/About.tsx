"use client";

import Image from "next/image";
import { Heart, Award, Users } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: Heart, value: "200+", label: "Happy Customers" },
    { icon: Award, value: "5", label: "Years Crafting" },
    { icon: Users, value: "25+", label: "Classes Taught" },
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/50 to-bakery-pink-light/40" />

      {/* Decorative organic shapes */}
      <div
        className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-bakery-peach/40 to-transparent blur-3xl transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-bakery-pink-light/50 to-transparent blur-3xl transition-all duration-1000 delay-200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Floating accent dots */}
      <div
        className={`absolute top-1/4 left-[10%] w-3 h-3 rounded-full bg-bakery-pink-dark/40 transition-all duration-700 delay-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ animation: "float 5s ease-in-out infinite" }}
      />
      <div
        className={`absolute bottom-1/3 right-[15%] w-2 h-2 rounded-full bg-bakery-brown/50 transition-all duration-700 delay-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ animation: "float 4s ease-in-out infinite 0.5s" }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image composition - 5 columns */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              {/* Background decorative shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-bakery-peach via-bakery-pink-light/60 to-bakery-cream rounded-[2rem] transform rotate-3" />

              {/* Main image */}
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl shadow-bakery-pink/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/roseSugarClassCropped.webp"
                  alt="Megan decorating cookies at Rose and Sugar"
                  width={520}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 520px"
                  quality={80}
                  className="w-full h-auto object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-pink-dark/10 via-transparent to-transparent" />
              </div>

              {/* Floating quote card */}
              <div
                className={`absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white rounded-2xl shadow-xl p-5 max-w-[200px] transform rotate-3 transition-all duration-700 delay-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                <p className="font-playfair text-sm italic text-gray-700 leading-relaxed">
                  &ldquo;Every cookie tells a story&rdquo;
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                    <Heart className="w-4 h-4 text-bakery-pink-dark" />
                  </div>
                  <span className="text-xs font-poppins font-medium text-gray-600">
                    Megan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content - 7 columns */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6 transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-bakery-pink-dark animate-pulse" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Meet Your Cookie Artist
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6 transition-all duration-700 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              id="about-heading"
            >
              <span className="text-gray-800">Creating</span>
              <br />
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Sweet Memories
              </span>
            </h2>

            {/* Story text */}
            <div
              className={`space-y-5 transition-all duration-700 delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-poppins text-lg text-gray-600 leading-relaxed">
                Hi, I&apos;m{" "}
                <span className="font-semibold text-bakery-pink-dark">
                  Megan
                </span>{" "}
                — Sacramento area native, cookie artist, and the creative heart
                behind Rose & Sugar. Every cookie is crafted with love and
                decorated with a floral-inspired touch that makes each order
                uniquely special.
              </p>
              <p className="font-poppins text-lg text-gray-600 leading-relaxed">
                What started as a passion for creating beautiful treats has
                blossomed into this thriving small business where I get to share
                the joy of cookie decorating through both custom orders and
                intimate classes.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className={`mt-8 pl-6 border-l-4 border-bakery-pink transition-all duration-700 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-playfair text-xl italic text-gray-700">
                &ldquo;I truly believe cookies can make a huge difference in any
                celebration & make anyone smile!&rdquo;
              </p>
            </div>

            {/* Stats row */}
            <div
              className={`mt-10 grid grid-cols-3 gap-6 transition-all duration-700 delay-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-bakery-pink-light/30 hover:border-bakery-pink-light hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-bakery-pink-dark" />
                  <p className="font-bebas text-3xl text-gray-800">
                    {stat.value}
                  </p>
                  <p className="font-poppins text-xs text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
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
  );
};

export default About;
