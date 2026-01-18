"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Cookie,
  Users,
  Sparkles,
  Gift,
  Palette,
  Heart,
  ArrowRight,
} from "lucide-react";

const Services = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cookieFeatures = [
    { icon: Palette, text: "Custom Designs & Gift Boxes" },
    { icon: Sparkles, text: "Various Flavor Options" },
    { icon: Gift, text: "Premium Packaging" },
    { icon: Heart, text: "Welcome Home Gift Sets" },
  ];

  const classFeatures = [
    { icon: Users, text: "Small Groups (Max 15)" },
    { icon: Sparkles, text: "All Supplies Included" },
    { icon: Heart, text: "Perfect for Beginners" },
    { icon: Gift, text: "Take Home Your Creations" },
  ];

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden bg-white"
      aria-labelledby="services-heading"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d286a0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative blobs */}
      <div
        className={`absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-pink-light/30 to-transparent blur-3xl transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/30 to-transparent blur-3xl transition-all duration-1000 delay-200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/30 border border-bakery-pink-light/50 mb-6">
            <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
            <span className="text-sm font-poppins font-medium text-gray-700">
              What We Offer
            </span>
          </div>
          <h2
            className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
            id="services-heading"
          >
            <span className="text-gray-800">Our</span>{" "}
            <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mt-6 font-poppins text-lg text-gray-600">
            From custom creations to hands-on experiences
          </p>
        </div>

        {/* Services grid - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Custom Cookies Card - Takes 7 columns */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="group h-full bg-gradient-to-br from-bakery-cream via-white to-bakery-pink-light/20 rounded-3xl p-8 md:p-10 shadow-lg shadow-bakery-pink/5 hover:shadow-xl hover:shadow-bakery-pink/10 border border-bakery-pink-light/30 transition-all duration-500 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-bakery-pink-light/40 to-transparent rounded-bl-full" />

              <div className="relative z-10">
                {/* Icon and title row */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-bakery-pink-dark to-bakery-pink rounded-2xl shadow-lg shadow-bakery-pink/30 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Cookie className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-3xl md:text-4xl text-gray-800 tracking-wide">
                      Custom Cookies
                    </h3>
                    <p className="font-poppins text-gray-600 mt-1">
                      Edible art for your celebrations
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="font-poppins text-gray-600 leading-relaxed mb-8">
                  Beautifully designed cookies for birthdays, showers, weddings,
                  and every special moment worth celebrating. Each cookie is
                  hand-decorated with royal icing and made with love.
                </p>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {cookieFeatures.map((feature, index) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-bakery-pink-light/20 hover:border-bakery-pink-light hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: `${300 + index * 100}ms` }}
                    >
                      <feature.icon className="w-5 h-5 text-bakery-pink-dark flex-shrink-0" />
                      <span className="font-poppins text-sm text-gray-700">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/cookies/custom-orders"
                  className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Order Custom Cookies
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Decorating Classes Card - Takes 5 columns */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="group h-full bg-gradient-to-br from-bakery-peach/40 via-bakery-cream to-white rounded-3xl overflow-hidden shadow-lg shadow-bakery-brown/5 hover:shadow-xl hover:shadow-bakery-brown/10 border border-bakery-peach/30 transition-all duration-500 relative">
              {/* Top image section */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/openDefault.webp"
                  alt="Cookie decorating class in action"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-cream via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="font-poppins font-semibold text-sm text-bakery-brown">
                    Starting at $55
                  </span>
                </div>
              </div>

              {/* Content section */}
              <div className="p-8">
                {/* Icon and title */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-bakery-brown to-bakery-brown/80 rounded-2xl shadow-lg shadow-bakery-brown/30 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                    <Users className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl md:text-3xl text-gray-800 tracking-wide">
                      Decorating Classes
                    </h3>
                    <p className="font-poppins text-sm text-gray-600">
                      Learn the art of cookie decorating
                    </p>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-6">
                  {classFeatures.map((feature, index) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-3"
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-bakery-peach/50 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-bakery-brown" />
                      </div>
                      <span className="font-poppins text-sm text-gray-700">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/classes"
                  className="group/btn w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-bakery-brown text-white font-poppins font-semibold rounded-full shadow-md shadow-bakery-brown/20 hover:shadow-lg hover:shadow-bakery-brown/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Book a Class
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
