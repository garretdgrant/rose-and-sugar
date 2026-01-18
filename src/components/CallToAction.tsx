"use client";

import { useEffect, useState } from "react";
import { Phone, Calendar, Cookie, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const actions = [
    {
      href: "sms:9163378880",
      icon: Phone,
      title: "Call or Text",
      description: "916-337-8880",
      color: "from-bakery-pink-dark to-bakery-pink",
      shadow: "shadow-bakery-pink/30",
    },
    {
      href: "/classes",
      icon: Calendar,
      title: "Book a Class",
      description: "Upcoming Sessions",
      color: "from-bakery-pink to-bakery-peach",
      shadow: "shadow-bakery-peach/30",
    },
    {
      href: "/cookies/custom-orders",
      icon: Cookie,
      title: "Order Cookies",
      description: "Custom Designs",
      color: "from-bakery-brown to-bakery-peach",
      shadow: "shadow-bakery-brown/30",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/50 to-bakery-pink-light/60" />

      {/* Decorative shapes */}
      <div
        className={`absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-peach/30 to-transparent blur-3xl transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-bakery-pink-light/40 to-transparent blur-3xl transition-all duration-1000 delay-200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Floating accent dots */}
      <div
        className={`absolute top-1/3 left-[15%] w-4 h-4 rounded-full bg-bakery-pink-dark/30 transition-all duration-700 delay-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ animation: "float 5s ease-in-out infinite" }}
      />
      <div
        className={`absolute bottom-1/4 right-[20%] w-3 h-3 rounded-full bg-bakery-brown/40 transition-all duration-700 delay-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ animation: "float 4s ease-in-out infinite 0.5s" }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6">
              <Heart className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Let&apos;s Connect
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6"
              id="cta-heading"
            >
              <span className="text-gray-800">Ready to Create</span>
              <br />
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Something Sweet?
              </span>
            </h2>

            <p className="font-poppins text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re planning a celebration or want to join a
              decorating class, we&apos;d love to hear from you!
            </p>
          </div>

          {/* Action cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl border border-bakery-pink-light/20 hover:border-bakery-pink-light/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Background decoration */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${action.color} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500`}
                />

                {/* Icon */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} ${action.shadow} shadow-lg flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  <action.icon
                    className="w-7 h-7 text-white"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-bebas text-2xl text-gray-800 tracking-wide mb-2">
                    {action.title}
                  </h3>
                  <p className="font-poppins text-gray-600">
                    {action.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-bakery-pink-light/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <ArrowRight className="w-5 h-5 text-bakery-pink-dark" />
                </div>

                {/* Bottom border accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${action.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`}
                />
              </Link>
            ))}
          </div>

          {/* Social proof / trust message */}
          <div
            className={`mt-16 text-center transition-all duration-1000 delay-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-playfair text-xl italic text-gray-600">
              &ldquo;Every cookie is made with love in Folsom, CA&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Heart
                  key={star}
                  className="w-4 h-4 text-bakery-pink-dark fill-bakery-pink-dark"
                  style={{
                    animation: `pulse 2s ease-in-out infinite ${star * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
