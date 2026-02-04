"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FAQAccordion from "@/components/FAQAccordion";
import {
  Heart,
  Award,
  Users,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";

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

  const faqs = [
    {
      question: "Where are you located?",
      answer: (
        <>
          Rose & Sugar is based in Folsom, CA and serves the greater Sacramento
          area. See our{" "}
          <Link className="text-bakery-pink-dark" href="/classes/locations">
            class locations
          </Link>
          .
        </>
      ),
    },
    {
      question: "How far in advance should I place an order?",
      answer: (
        <>
          We recommend ordering at least 2-3 weeks in advance. Seasonal demand
          may require more lead time. Start here for{" "}
          <Link
            className="text-bakery-pink-dark"
            href="/cookies/order-custom-sugar-cookies"
          >
            Custom Cookie Orders
          </Link>
          .
        </>
      ),
    },
    {
      question: "Do you offer classes for beginners?",
      answer: (
        <>
          Yes! Classes are beginner-friendly and include all supplies,
          step-by-step instruction, and take-home packaging. View{" "}
          <Link className="text-bakery-pink-dark" href="/classes">
            upcoming classes
          </Link>
          .
        </>
      ),
    },
    {
      question: "Can you match a theme or invitation?",
      answer: (
        <>
          Absolutely. We specialize in custom designs and can match colors,
          themes, and event details.{" "}
          <Link
            className="text-bakery-pink-dark"
            href="/cookies/order-custom-sugar-cookies"
          >
            Request a custom order
          </Link>
          .
        </>
      ),
    },
  ];

  const values = [
    {
      title: "Small-Batch Made",
      desc: "Fresh cookies made-to-order for maximum quality",
    },
    {
      title: "Custom Designs",
      desc: "Created just for your special occasion",
    },
    {
      title: "Floral-Inspired",
      desc: "Feminine touches and delicate details",
    },
    {
      title: "Beginner-Friendly",
      desc: "Intimate decorating classes for all levels",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
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
            {/* Left - Image Composition */}
            <div
              className={`relative order-2 lg:order-1 transition-all duration-1000 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              {/* Background decorative shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-bakery-peach via-bakery-pink-light/60 to-bakery-cream rounded-[2rem] transform rotate-3" />

              {/* Main image */}
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl shadow-bakery-pink/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/meganAbout.webp"
                  alt="Megan decorating cookies at Rose and Sugar"
                  width={600}
                  height={700}
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  quality={80}
                  className="w-full h-auto object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-pink-dark/10 via-transparent to-transparent" />
              </div>

              {/* Floating quote card */}
              <div
                className={`absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white rounded-2xl shadow-xl p-5 max-w-[220px] transform rotate-3 transition-all duration-700 delay-500 ${
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

              {/* Badge - top left */}
              <div
                className={`absolute -top-4 -left-4 md:top-4 md:-left-8 bg-gradient-to-br from-bakery-pink-dark to-bakery-pink text-white rounded-2xl shadow-xl p-4 transform -rotate-6 transition-all duration-700 delay-600 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ animation: "float 5s ease-in-out infinite 1s" }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-poppins font-semibold text-sm">
                    Est. 2020
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div
              className={`order-1 lg:order-2 text-center lg:text-left transition-all duration-1000 delay-200 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
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
                <MapPin className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Folsom, CA
                </span>
              </div>

              {/* Main Headline */}
              <h1
                className={`font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-6 transition-all duration-700 delay-400 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <span className="block text-gray-800">About</span>
                <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Rose &amp; Sugar
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className={`font-poppins text-lg md:text-xl text-gray-600 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed transition-all duration-700 delay-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Where every cookie is crafted with love, decorated with
                artistry, and made to celebrate life&apos;s sweetest moments.
              </p>

              {/* Stats row */}
              <div
                className={`grid grid-cols-3 gap-4 transition-all duration-700 delay-600 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-bakery-pink-light/30 hover:border-bakery-pink-light hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300"
                    style={{ animationDelay: `${700 + index * 100}ms` }}
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

      {/* ===== STORY SECTION ===== */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d286a0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-pink-light/30 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/30 border border-bakery-pink-light/50 mb-6">
              <Heart className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Meet Your Cookie Artist
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              <span className="text-gray-800">The Story of</span>{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Megan D&apos;Angelo
              </span>
            </h2>
          </div>

          {/* Story content - asymmetric layout */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Main story - 7 columns */}
            <div className="lg:col-span-7 space-y-6">
              <p className="font-poppins text-lg text-gray-600 leading-relaxed">
                Hi there! I&apos;m{" "}
                <span className="font-semibold text-bakery-pink-dark">
                  Megan
                </span>
                , your local cookie baker and decorator extraordinaire, and
                owner of Rose & Sugar. Born and raised in the Sacramento area,
                I&apos;m excited to share my passion with our community and
                create thoughtful and beautiful cookies for your life&apos;s
                special occasions.
              </p>

              <p className="font-poppins text-lg text-gray-600 leading-relaxed">
                I have always had a love for creating, whether through arts and
                crafts or baking. It wasn&apos;t until the year 2020 that I
                stumbled upon the art of cookie decorating & the rest was
                history! Just like many others during the pandemic, I embraced
                this newfound hobby of decorating, as it truly gave me a
                creative outlet and ease of anxiety I was looking for. I always
                say, you don&apos;t choose the cookie life, the cookie life
                chooses you… and it sure did!
              </p>

              <p className="font-poppins text-lg text-gray-600 leading-relaxed">
                What started as a hobby baking for friends and family has
                blossomed into a small business I am so proud of today! Now
                after almost five years of decorating, I&apos;ve decided to
                share my passion not just through custom orders, but also by
                teaching others. There&apos;s something magical about watching
                people discover their own creativity while decorating cookies in
                my small-group classes.
              </p>

              <p className="font-poppins text-lg text-gray-600 leading-relaxed">
                Each Rose & Sugar cookie is handcrafted with love, attention to
                detail, and a touch of whimsy. Whether I&apos;m creating a
                custom set for your baby shower or guiding you through your
                first piping technique, my goal is always the same — to bring a
                little extra sweetness and beauty to your day. Thank you for
                trusting me and letting me be a part of celebrating your special
                moments!
              </p>
            </div>

            {/* Sidebar - 5 columns */}
            <div className="lg:col-span-5 space-y-8">
              {/* Pull quote card */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-bakery-peach to-bakery-pink-light/50 rounded-3xl transform rotate-1" />
                <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                  <div className="absolute -top-4 left-8">
                    <span className="text-6xl text-bakery-pink-light font-serif">
                      &ldquo;
                    </span>
                  </div>
                  <div className="pt-6">
                    <p className="font-playfair text-xl italic text-gray-700 leading-relaxed">
                      As a planner at heart, I know how important the small
                      details are and I love sharing my passion for events and
                      celebrating life&apos;s most special moments by creating
                      thoughtful and detailed cookies for all occasions!
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                        <span className="font-bebas text-lg text-bakery-pink-dark">
                          M
                        </span>
                      </div>
                      <div>
                        <p className="font-poppins font-medium text-gray-900">
                          Megan D&apos;Angelo
                        </p>
                        <p className="text-sm text-gray-500">
                          Founder & Cookie Artist
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Values grid */}
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-br from-bakery-cream to-white border border-bakery-pink-light/30 hover:border-bakery-pink-light hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300"
                  >
                    <h4 className="font-bebas text-lg text-gray-800 tracking-wide">
                      {value.title}
                    </h4>
                    <p className="font-poppins text-sm text-gray-600 mt-1">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative py-20 md:py-24 overflow-hidden bg-bakery-pink-dark">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-bakery-pink/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-bakery-peach/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Ready to Create Something Sweet?
            </h2>
            <p className="mt-6 text-lg text-white/90 font-poppins max-w-xl mx-auto">
              Whether you need custom cookies for a celebration or want to learn
              the art of decorating, I&apos;d love to hear from you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cookies/order-custom-sugar-cookies"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-bakery-pink-dark font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Order Custom Cookies
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/classes"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-poppins font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                Book a Class
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/40">
        {/* Decorative elements */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-peach/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              <span className="text-gray-800">Common</span>{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="mt-6 font-poppins text-lg text-gray-600">
              Everything you need to know about Rose & Sugar
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/5 border border-bakery-pink-light/20 max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} initiallyOpenIndex={0} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
