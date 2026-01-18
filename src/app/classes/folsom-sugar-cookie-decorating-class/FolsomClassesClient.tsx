"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FAQAccordion from "@/components/FAQAccordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  MapPin,
  Clock,
  Palette,
  Gift,
  Sparkles,
  ArrowRight,
  Cookie,
} from "lucide-react";

const faqs = [
  {
    question: "Are there cookie decorating classes in Folsom?",
    answer: (
      <>
        Yes, Rose & Sugar hosts classes for Folsom guests with all supplies
        included. See{" "}
        <Link className="text-bakery-pink-dark" href="/classes">
          upcoming classes
        </Link>
        .
      </>
    ),
  },
  {
    question: "Is this a good cooking class for beginners?",
    answer: (
      <>
        Yes. Classes are beginner-friendly and include guided instruction. View{" "}
        <Link className="text-bakery-pink-dark" href="/classes">
          class sessions
        </Link>
        .
      </>
    ),
  },
  {
    question: "What is included in the class?",
    answer: (
      <>
        You&apos;ll receive cookies, icing, tools, packaging, and step-by-step
        guidance. For full details,{" "}
        <Link className="text-bakery-pink-dark" href="/classes">
          view upcoming classes
        </Link>
        .
      </>
    ),
  },
  {
    question: "Do you offer custom cookies in Folsom?",
    answer: (
      <>
        Yes, custom cookie orders are available for Folsom celebrations and
        events. Start at{" "}
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
];

const features = [
  {
    icon: Palette,
    title: "Royal Icing Techniques",
    desc: "Master piping, flooding, and detail work with professional guidance.",
  },
  {
    icon: Clock,
    title: "2-Hour Sessions",
    desc: "Relaxed pace with plenty of time to create and ask questions.",
  },
  {
    icon: Gift,
    title: "Take Home Your Art",
    desc: "Leave with a beautiful box of cookies you decorated yourself.",
  },
  {
    icon: MapPin,
    title: "Folsom Location",
    desc: "Convenient location for Folsom and surrounding areas.",
  },
];

const FolsomClassesClient = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
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
            className={`mb-8 -mt-10 md:-mt-12 transition-all duration-700 ${
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
                  <BreadcrumbPage>Folsom</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="max-w-5xl mx-auto text-center">
            {/* Location badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6 transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <MapPin className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Serving Folsom, CA
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
              className={`font-poppins text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Hands-on cookie decorating for Folsom guests. Learn royal icing
              techniques in a welcoming, beginner-friendly setting.
            </p>

            {/* CTA */}
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

      {/* ===== HERO IMAGE SECTION ===== */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-bakery-peach via-bakery-pink-light/50 to-bakery-cream rounded-[2rem] transform rotate-2" />

              {/* Main image */}
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl shadow-bakery-pink/20 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/roseSugarClassCropped.webp"
                  alt="Cookie decorating class in progress"
                  width={1200}
                  height={600}
                  priority
                  className="w-full h-64 md:h-80 lg:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-pink-dark/20 via-transparent to-transparent" />
              </div>

              {/* Floating accent card */}
              <div
                className="absolute -bottom-6 -left-4 md:bottom-8 md:-left-8 bg-white rounded-2xl p-5 shadow-xl z-20 max-w-[220px] transform -rotate-3"
                style={{ animation: "float 5s ease-in-out infinite" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-bebas text-xl text-bakery-pink-dark leading-tight">
                    All Supplies
                  </p>
                </div>
                <p className="text-sm text-gray-600 font-poppins">
                  Cookies, icing, tools & take-home box
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT YOU'LL LEARN SECTION ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-peach/30 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                <span className="text-gray-800">What You&apos;ll</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Learn
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:shadow-bakery-pink/10 transition-all duration-300 border border-bakery-pink-light/20 hover:border-bakery-pink-light"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-bakery-peach/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <h3 className="font-bebas text-xl md:text-2xl text-gray-900 tracking-wide">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-gray-600 font-poppins leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
              Browse upcoming class dates and themes. Small groups mean
              personalized attention.
            </p>
            <div className="mt-10">
              <Link
                href="/classes"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-bakery-pink-dark font-poppins font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Your Spot
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CUSTOM COOKIES SECTION ===== */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-bakery-peach/30 to-bakery-pink-light/30 rounded-[2rem] transform -rotate-1" />
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-bakery-pink-light/20">
                <div className="md:flex md:items-center md:gap-12">
                  <div className="md:flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-peach/50 border border-bakery-peach mb-4">
                      <Cookie className="w-4 h-4 text-bakery-brown" />
                      <span className="text-sm font-poppins font-medium text-bakery-brown">
                        Custom Orders
                      </span>
                    </div>
                    <h2 className="font-bebas text-4xl md:text-5xl text-gray-900 tracking-tight leading-[0.95]">
                      <span className="text-gray-800">Need Cookies for a</span>{" "}
                      <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                        Folsom Event?
                      </span>
                    </h2>
                    <p className="mt-4 text-gray-600 font-poppins leading-relaxed text-lg">
                      From birthday parties to corporate events, we create
                      custom decorated cookies for Folsom celebrations.
                      Hand-crafted with attention to every detail.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/cookies/order-custom-sugar-cookies"
                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Start Custom Order
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        href="/cookies/signature-sugar-cookie-sets"
                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-800 font-poppins font-semibold rounded-full border-2 border-bakery-pink-light hover:border-bakery-pink hover:bg-bakery-pink-light/30 transition-all duration-300"
                      >
                        Signature Sets
                      </Link>
                    </div>
                  </div>
                  <div className="mt-10 md:mt-0 md:flex-shrink-0">
                    <div className="relative">
                      <div className="absolute -inset-3 bg-gradient-to-br from-bakery-peach to-bakery-pink-light/50 rounded-2xl transform rotate-3" />
                      <Image
                        src="/gallery/weddingCookies.jpg"
                        alt="Custom decorated cookies"
                        width={300}
                        height={300}
                        className="relative rounded-xl shadow-lg object-cover w-full md:w-[300px] h-auto aspect-square"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                <span className="text-gray-800">Questions About</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Classes
                </span>
              </h2>
              <p className="mt-6 font-poppins text-lg text-gray-600">
                Everything Folsom guests need to know
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/5 border border-bakery-pink-light/20">
              <FAQAccordion faqs={faqs} initiallyOpenIndex={0} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d286a0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bebas text-4xl md:text-5xl text-gray-900 tracking-tight">
              <span className="text-gray-800">Join Us for a</span>{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Class
              </span>
            </h2>
            <p className="mt-4 text-gray-600 font-poppins text-lg">
              New themes every month. All skill levels welcome.
            </p>
            <div className="mt-10">
              <Link
                href="/classes"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                See Class Schedule
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FolsomClassesClient;
