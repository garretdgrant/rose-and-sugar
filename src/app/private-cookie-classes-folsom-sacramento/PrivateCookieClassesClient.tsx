"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  ChevronRight,
  Gift,
  Heart,
  Mail,
  MapPin,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";

const PrivateCookieClassesClient = () => {
  const mounted = true;

  const occasions = [
    {
      icon: Gift,
      title: "Kids & Adult Birthday Parties",
      description:
        "Celebrate your next birthday with a hands-on cookie decorating party. Kids and adults alike love creating edible art they can take home — it's a birthday activity everyone remembers.",
      emoji: "🎂",
      imagePlaceholder:
        "Image placeholder: Kids cookie decorating birthday party with colorful royal icing designs",
    },
    {
      icon: Heart,
      title: "Girls' Nights & Friend Get-Togethers",
      description:
        "Grab your crew for a creative night out. Laugh, decorate, and make beautiful sugar cookies together with step-by-step guidance from a professional cookie artist.",
      emoji: "💕",
      imagePlaceholder:
        "Image placeholder: Friends decorating cookies together at a private Rose & Sugar class",
    },
    {
      icon: Sparkles,
      title: "Bridal Showers & Baby Showers",
      description:
        "Add a unique, elegant activity to your shower celebration. Custom cookie themes can match your event colors, motifs, and style — a perfect icebreaker for guests of all ages.",
      emoji: "👰",
      imagePlaceholder:
        "Image placeholder: Bridal shower cookie decorating class with elegant custom cookie designs",
    },
    {
      icon: Users,
      title: "Sports Teams & End-of-Season Celebrations",
      description:
        "Reward your team with a fun, hands-on experience they'll talk about all season. Cookie decorating is a creative way to celebrate wins, milestones, and teamwork.",
      emoji: "🏆",
    },
    {
      icon: Building2,
      title: "Corporate Team Building & Work Events",
      description: (
        <>
          Looking for a team building activity in the Sacramento area
          that&apos;s actually fun? Cookie decorating classes encourage
          creativity, collaboration, and conversation — no trust falls required.
          Perfect for office holiday parties, department outings, and client
          appreciation events. Learn more about our{" "}
          <Link
            className="text-bakery-pink-dark underline underline-offset-4"
            href="/corporate-team-building"
          >
            corporate team building events
          </Link>
          .
        </>
      ),
      emoji: "🏢",
      imagePlaceholder:
        "Image placeholder: Corporate team building cookie decorating event led by Rose & Sugar",
    },
    {
      icon: Calendar,
      title: "Holiday Parties & Seasonal Events",
      description:
        "From Valentine's Day hearts to Halloween spiders to Christmas trees, our seasonal private classes bring festive cheer to any gathering. Custom seasonal themes are available year-round.",
      emoji: "🎄",
    },
  ];

  const inclusions = [
    "Professionally baked vanilla sugar cookies (3-5 per person, depending on design complexity)",
    "Custom-colored royal icing in piping bags, ready to use",
    "All decorating tools and supplies — nothing extra to buy or bring",
    "Step-by-step instruction on techniques like outlining, flooding, and wet-on-wet design",
    "A beautiful take-home box for each guest's decorated cookies",
    "Custom themes available upon request to match your event or celebration",
  ];

  const highlights = [
    {
      icon: Star,
      title: "Locally Owned & Operated",
      description: (
        <>
          Rose & Sugar is a boutique cookie business run by Megan, a
          Sacramento-area native and cookie artist who brings warmth and
          creativity to every class. Learn more{" "}
          <Link
            href="/about"
            className="text-bakery-pink-dark underline underline-offset-4"
          >
            about Megan
          </Link>
          .
        </>
      ),
    },
    {
      icon: Users,
      title: "Small-Group, Personalized Instruction",
      description:
        "Unlike large commercial workshops, our private classes are intimate and hands-on. Every guest gets individual attention so they feel confident and proud of their work.",
    },
    {
      icon: Sparkles,
      title: "Premium Ingredients & Beautiful Results",
      description:
        "We use high-quality butter, vanilla, and professional royal icing so your cookies taste as amazing as they look. Every design is achievable for beginners.",
    },
    {
      icon: Heart,
      title: "Beginner-Friendly — No Experience Required",
      description:
        "Never decorated a cookie before? That's exactly who this class is for. We break down every technique into simple, easy steps — just show up, have fun, and create something beautiful.",
    },
  ];

  const testimonials = [
    "The cookie decorating class was so fun! It was intimidating coming into the class but with Megan's great instruction and being able to bring it down to an entry level it was so much fun and we were able to create really beautiful designs!",
    "Megan's cookies are absolutely magical! She made the most beautiful set for my daughter's birthday party. Not only did they look stunning, but they tasted amazing too!",
    "I took one of Megan's decorating classes with friends and it was SO much fun! She's patient, creative, and makes the whole experience enjoyable. Can't wait to go back!",
  ];

  const faqs = [
    {
      question: "How many people can attend a private cookie decorating class?",
      answer: (
        <>
          Private classes are flexible and can accommodate small groups of 4-6
          friends or larger parties of 20+. Share your group size when you
          request a class and we&apos;ll tailor the experience to fit.
        </>
      ),
    },
    {
      question: "Do you offer kids' cookie decorating birthday parties?",
      answer: (
        <>
          Yes! Kids&apos; birthday parties and youth group events are some of
          our most popular private classes. We design age-appropriate themes and
          provide simple, fun techniques that kids love.
        </>
      ),
    },
    {
      question: "What ages are best for a cookie decorating class?",
      answer: (
        <>
          Kids as young as 5 can participate with a parent or guardian&apos;s
          help. Our classes are designed to be fun for all ages — we regularly
          host mixed groups of kids and adults together.
        </>
      ),
    },
    {
      question: "Can you customize the cookie theme for my event?",
      answer: (
        <>
          Absolutely. Sports teams, birthday themes, holiday designs, brand
          logos, wedding colors, baby shower motifs — you name it. Custom themes
          are one of our specialties, and we can coordinate with your event
          details and{" "}
          <Link
            className="text-bakery-pink-dark underline underline-offset-4"
            href="/cookies/order-custom-sugar-cookies"
          >
            custom sugar cookies
          </Link>
          .
        </>
      ),
    },
    {
      question: "Do you travel to my location for private classes?",
      answer: (
        <>
          Yes — we offer on-site private cookie decorating classes throughout
          Folsom, Sacramento, El Dorado Hills, Roseville, Granite Bay, and the
          surrounding area. We bring all the supplies; you just provide the
          space and the guests.
        </>
      ),
    },
    {
      question: "How long does a private cookie class take?",
      answer: (
        <>
          Most classes run about 1.5 to 2 hours, including practice time and
          step-by-step instruction on each design. We&apos;ll adjust timing
          based on your group&apos;s needs and the number of cookies in your
          set.
        </>
      ),
    },
    {
      question: "What cookie decorating techniques will we learn?",
      answer: (
        <>
          Guests learn royal icing fundamentals including outlining, flooding,
          wet-on-wet designs, and detail piping. Every class starts with a
          practice cookie so everyone feels comfortable before decorating their
          set. Want to practice at home first? Try our{" "}
          <Link
            className="text-bakery-pink-dark underline underline-offset-4"
            href="/sugar-cookie-recipe"
          >
            sugar cookie recipe
          </Link>
          .
        </>
      ),
    },
    {
      question: "How far in advance should I book a private cookie class?",
      answer: (
        <>
          We recommend booking at least 2-3 weeks in advance, especially for
          weekends and holiday seasons. Popular dates fill up quickly, so reach
          out early to secure your spot and{" "}
          <Link
            className="text-bakery-pink-dark underline underline-offset-4"
            href="/contact"
          >
            contact us
          </Link>
          .
        </>
      ),
    },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-bakery-peach/20" />

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

        <div className="container-custom relative z-10 py-28 md:py-36">
          <div className="max-w-5xl mx-auto text-center">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-rose-200 px-4 py-2 text-sm font-poppins text-gray-700">
                <li>
                  <Link
                    className="hover:text-bakery-pink-dark transition-colors"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li className="font-medium text-gray-900">Private Classes</li>
              </ol>
            </nav>

            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border-2 border-rose-200 shadow-sm mb-8 transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="text-base font-poppins font-semibold text-gray-700">
                Hands-on cookie decorating experiences
              </span>
            </div>

            <h1
              className={`font-bebas leading-[0.9] tracking-tight mb-8 transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-800">
                PRIVATE COOKIE DECORATING CLASSES
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent drop-shadow-sm mt-3">
                IN FOLSOM & SACRAMENTO
              </span>
            </h1>

            <p
              className={`font-poppins text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 transition-all duration-700 delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Looking for a fun, hands-on private cookie decorating experience
              for your next celebration? Rose & Sugar offers beginner-friendly
              private classes for birthdays, team events, girls&apos; nights,
              showers, and more — led by Megan, an experienced local cookie
              artist in the greater Sacramento area. Every guest leaves with
              beautifully decorated sugar cookies and memories to match.
            </p>

            <p
              className={`font-poppins text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Looking for public workshops too? Explore our{" "}
              <Link
                href="/classes"
                className="text-bakery-pink-dark underline underline-offset-4"
              >
                cookie decorating classes
              </Link>
              .
            </p>

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
                Serving Folsom, Sacramento, El Dorado Hills, Roseville, Granite
                Bay & surrounding areas
              </div>
            </div>

            <div
              className={`mt-10 mx-auto max-w-3xl border-2 border-dashed border-rose-300/70 rounded-2xl bg-white/80 p-5 text-left transition-all duration-700 delay-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-poppins text-sm text-gray-700">
                Image placeholder: Private cookie decorating class in Folsom —
                guests decorating sugar cookies with royal icing at a Rose &
                Sugar event
              </p>
            </div>
          </div>
        </div>

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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light mb-6">
              <Heart className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Perfect for any occasion
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-4">
              CELEBRATE ANY OCCASION WITH A COOKIE DECORATING PARTY
            </h2>
          </div>

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
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {occasion.emoji}
                  </div>

                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-rose-100/50 mb-5 group-hover:from-bakery-pink-dark group-hover:to-rose-500 transition-all duration-300">
                    <occasion.icon className="w-7 h-7 text-bakery-pink-dark group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="font-bebas text-2xl text-gray-800 tracking-wide mb-3">
                    {occasion.title}
                  </h3>
                  <p className="font-poppins text-gray-600 leading-relaxed">
                    {occasion.description}
                  </p>

                  {occasion.imagePlaceholder && (
                    <div className="mt-5 rounded-2xl border-2 border-dashed border-rose-300/70 bg-white/80 p-3">
                      <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                        {occasion.imagePlaceholder}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED SECTION ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20" />

        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-200/40 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/40 to-transparent blur-3xl" />

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
            <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-6">
              EVERYTHING YOU NEED TO DECORATE WITH CONFIDENCE
            </h2>
            <p className="font-poppins text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every private cookie class includes everything your group needs
              for a fun, stress-free experience:
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              className={`relative transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
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

                <p className="font-poppins text-gray-600 leading-relaxed mt-8">
                  Classes typically run 1.5-2 hours, giving your group plenty of
                  time to practice, create, and enjoy the experience at a
                  relaxed pace.
                </p>
                <p className="font-poppins text-gray-600 leading-relaxed mt-4">
                  You can also pair your class with{" "}
                  <Link
                    href="/cookies/order-custom-sugar-cookies"
                    className="text-bakery-pink-dark underline underline-offset-4"
                  >
                    custom sugar cookies
                  </Link>{" "}
                  and browse our{" "}
                  <Link
                    href="/classes"
                    className="text-bakery-pink-dark underline underline-offset-4"
                  >
                    cookie decorating classes
                  </Link>
                  .
                </p>

                <div className="grid gap-4 md:grid-cols-2 mt-8">
                  <div className="rounded-2xl border-2 border-dashed border-rose-300/70 bg-white/80 p-4">
                    <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                      Image placeholder: Beautifully decorated sugar cookies
                      made at a Rose & Sugar private class in Sacramento
                    </p>
                  </div>
                  <div className="rounded-2xl border-2 border-dashed border-rose-300/70 bg-white/80 p-4">
                    <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                      Image placeholder: Cookie decorating class supplies
                      including piping bags, royal icing, and sugar cookies
                    </p>
                  </div>
                </div>
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
                  Pricing
                </span>
              </div>
              <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-6">
                PRIVATE COOKIE CLASS PRICING
              </h2>
              <p className="font-poppins text-lg text-gray-600 leading-relaxed mb-6">
                Private classes start at <strong>$55 per person</strong>. Final
                pricing varies based on:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="font-poppins text-gray-700">
                  • Group size (small intimate gatherings to large parties)
                </li>
                <li className="font-poppins text-gray-700">
                  • Custom themes, designs, or seasonal specialties
                </li>
                <li className="font-poppins text-gray-700">
                  • Location and setup requirements (we can come to you!)
                </li>
              </ul>
              <p className="font-poppins text-gray-600 leading-relaxed mb-8">
                We tailor every experience to fit your event, so you get exactly
                what you need — nothing more, nothing less.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-50 via-bakery-pink-light/30 to-rose-50 rounded-full border-2 border-bakery-pink-light/50">
                <MapPin className="h-5 w-5 text-bakery-pink-dark" />
                <span className="text-sm font-poppins text-gray-700 font-medium">
                  Available throughout Folsom, Sacramento, El Dorado Hills,
                  Roseville, Granite Bay & the greater Sacramento region
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
              <div className="absolute -inset-1 bg-gradient-to-br from-rose-300/60 via-bakery-pink-light/60 to-bakery-peach/60 rounded-[2rem]" />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl">
                <h3 className="font-bebas text-4xl text-gray-800 mb-4 tracking-wide">
                  REQUEST A PRIVATE COOKIE DECORATING CLASS
                </h3>
                <p className="font-poppins text-gray-600 mb-8 leading-relaxed">
                  Share your event date, group size, preferred location, and any
                  theme ideas. We&apos;ll follow up with pricing, availability,
                  and a plan to make your event unforgettable.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-bakery-pink-dark via-rose-500 to-bakery-pink-dark text-white font-bebas text-2xl tracking-wide rounded-2xl shadow-xl shadow-rose-300/50 hover:shadow-2xl hover:shadow-rose-300/70 hover:scale-105 transition-all duration-300"
                >
                  Request a Class
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY ROSE & SUGAR SECTION ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20" />

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
              WHY FAMILIES & TEAMS CHOOSE ROSE & SUGAR
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

      {/* ===== SOCIAL PROOF SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light mb-6">
              <Star className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Social proof
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight">
              WHAT OUR GUESTS SAY
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <blockquote
                key={testimonial}
                className={`rounded-3xl bg-gradient-to-br from-white to-bakery-cream/30 border border-bakery-pink-light/40 p-8 shadow-md transition-all duration-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${100 + index * 120}ms` }}
              >
                <p className="font-poppins text-gray-700 leading-relaxed">
                  &ldquo;{testimonial}&rdquo;
                </p>
              </blockquote>
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
              PRIVATE COOKIE CLASS FAQS
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20" />

        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-200/40 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/40 to-transparent blur-3xl" />

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
              <div className="absolute -inset-1 bg-gradient-to-br from-rose-300/60 via-bakery-pink-light/60 to-bakery-peach/60 rounded-[2rem]" />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl">
                <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-6">
                  BOOK A PRIVATE COOKIE DECORATING CLASS TODAY
                </h2>
                <p className="font-poppins text-xl text-gray-700 leading-relaxed mb-10 max-w-2xl mx-auto">
                  Ready to plan a private cookie class in Folsom, Sacramento, or
                  the surrounding area? Whether it&apos;s a birthday party,
                  bridal shower, team outing, or just a fun night with friends —
                  we&apos;ll help you create a sweet, unforgettable experience.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-bakery-pink-dark via-rose-500 to-bakery-pink-dark text-white font-bebas text-2xl tracking-wide rounded-full shadow-2xl shadow-rose-300/50 hover:shadow-rose-300/70 hover:scale-105 transition-all duration-300"
                >
                  Request a Private Class
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="font-poppins text-sm md:text-base text-gray-700 mt-8">
                  Questions? Call us at{" "}
                  <a
                    className="text-bakery-pink-dark underline underline-offset-4"
                    href="tel:916-337-8880"
                  >
                    916-337-8880
                  </a>{" "}
                  or email{" "}
                  <a
                    className="text-bakery-pink-dark underline underline-offset-4"
                    href="mailto:roseandsugarcookies@gmail.com"
                  >
                    roseandsugarcookies@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>

            <div
              className={`mt-10 transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-4 bg-gradient-to-r from-rose-50 via-bakery-pink-light/30 to-rose-50 rounded-2xl border-2 border-bakery-pink-light/50">
                <Link
                  href="/cookies/signature-sugar-cookie-sets"
                  className="font-poppins text-sm text-gray-700 hover:text-bakery-pink-dark underline underline-offset-4"
                >
                  shop signature cookie sets
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/kind-cookie-program"
                  className="font-poppins text-sm text-gray-700 hover:text-bakery-pink-dark underline underline-offset-4"
                >
                  Kind Cookie Program
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/contact"
                  className="font-poppins text-sm text-gray-700 hover:text-bakery-pink-dark underline underline-offset-4"
                >
                  contact us
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/about"
                  className="font-poppins text-sm text-gray-700 hover:text-bakery-pink-dark underline underline-offset-4"
                >
                  about Megan
                </Link>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-bakery-pink-dark" />
                <p className="font-poppins text-sm">
                  We&apos;ll respond quickly with pricing and availability
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivateCookieClassesClient;
