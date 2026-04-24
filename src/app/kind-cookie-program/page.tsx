import Link from "next/link";
import Script from "next/script";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Gift, Heart, MapPin, Sparkles, User } from "lucide-react";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/metadata";
import KindCookieProgramClient from "./KindCookieProgramClient";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Kind Cookie Program | Rose & Sugar",
    description:
      "Nominate community helpers for a free cookie gift box. Recognizing teachers, nurses, postal workers, and everyday heroes making our community better.",
    path: "/kind-cookie-program",
  });
}

const steps = [
  {
    step: "1",
    icon: User,
    title: "Nominate a Helper",
    description:
      "Submit your nominee any time during the week until COB Friday (beginning 2/6). Share their name and a little blurb about their act of kindness.",
    emoji: "✨",
  },
  {
    step: "2",
    icon: Heart,
    title: "Weekly Drawing",
    description:
      "Every Friday evening, I'll randomly select a nominee to receive their free Kind Cookie Gift Box for delivery the following week!",
    emoji: "🎉",
  },
  {
    step: "3",
    icon: Gift,
    title: "Custom Cookies",
    description:
      "Cookies can be slightly customized on a case-by-case basis to make them extra special for your nominee.",
    emoji: "🍪",
  },
  {
    step: "4",
    icon: MapPin,
    title: "Free Delivery",
    description:
      "Free delivery offered within Folsom for nominees in Folsom and surrounding areas. Think of it as a cookie gram without any embarrassing singing!",
    emoji: "🚗",
  },
] as const;

const KindCookieProgramPage = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildCanonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kind Cookie Program",
        item: buildCanonicalUrl("/kind-cookie-program"),
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumbs-jsonld-kind-cookie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="relative overflow-hidden">
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-bakery-peach/20" />
          <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-bakery-pink-light/70 to-bakery-peach/50 opacity-0 blur-3xl transition-all duration-1000 animate-scale-in" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-rose-200/60 to-bakery-pink-light/40 opacity-0 blur-3xl transition-all duration-1000 animate-scale-in animation-delay-200" />
          <div
            className="absolute right-1/4 top-1/4 text-bakery-pink-dark/30 opacity-0 transition-all duration-700 animate-fade-in animation-delay-400"
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            <Heart className="h-12 w-12 fill-current" />
          </div>
          <div
            className="absolute left-1/5 top-1/3 text-rose-300/40 opacity-0 transition-all duration-700 animate-fade-in animation-delay-600"
            style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
          >
            <Heart className="h-8 w-8 fill-current" />
          </div>
          <div
            className="absolute bottom-1/4 right-1/3 text-bakery-pink/30 opacity-0 transition-all duration-700 animate-fade-in animation-delay-800"
            style={{ animation: "float 3.5s ease-in-out infinite 1s" }}
          >
            <Heart className="h-10 w-10 fill-current" />
          </div>

          <div className="container-custom relative z-10 py-32 md:py-40">
            <div className="mb-8 mt-2 opacity-0 transition-all duration-700 animate-fade-in-up md:mt-0">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Kind Cookie Program</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="mx-auto max-w-5xl text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-rose-200 bg-white/90 px-5 py-2.5 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-700 animate-fade-in-up animation-delay-200">
                <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                <span className="font-poppins text-base font-semibold text-gray-700">
                  Spreading Kindness, One Cookie at a Time
                </span>
              </div>

              <h1 className="mb-8 font-bebas leading-[0.85] tracking-tight opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-300">
                <span className="block text-6xl text-rose-500 drop-shadow-sm sm:text-7xl md:text-8xl lg:text-9xl">
                  KIND COOKIE
                </span>
                <span className="block bg-gradient-to-r from-bakery-brown via-amber-700 to-bakery-brown bg-clip-text text-6xl text-transparent sm:text-7xl md:text-8xl lg:text-9xl">
                  PROGRAM
                </span>
              </h1>

              <div className="mb-8 flex items-center justify-center gap-3 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-400">
                <span className="animate-bounce-soft text-4xl md:text-5xl">
                  🍪
                </span>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-bakery-pink to-transparent" />
                <span
                  className="animate-bounce-soft text-4xl md:text-5xl"
                  style={{ animationDelay: "0.5s" }}
                >
                  🍪
                </span>
              </div>

              <p className="mx-auto mb-10 max-w-3xl font-bebas text-2xl leading-tight text-gray-700 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-500 md:text-3xl lg:text-4xl">
                THANKING OUR COMMUNITY HELPERS ONE COOKIE AT A TIME!
              </p>

              <p className="mx-auto max-w-2xl font-poppins text-lg leading-relaxed text-gray-600 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-600 md:text-xl">
                Show someone you appreciate their act of kindness with a{" "}
                <span className="font-semibold text-bakery-pink-dark">
                  free cookie gift box
                </span>
                . Think teachers, nurses, grocery clerks, postal workers, or
                even your neighbor. No act of kindness is too big or too small!
              </p>

              <div className="mt-10 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-700">
                <blockquote className="font-playfair text-xl italic text-bakery-pink-dark md:text-2xl">
                  &ldquo;Look for the helpers. There&apos;s always people
                  helping.&rdquo;
                </blockquote>
                <p className="mt-2 font-poppins text-sm text-gray-500">
                  — Mister Rogers
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg
              className="relative block h-20 w-full md:h-32"
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

        <section className="relative overflow-hidden bg-white py-20 md:py-28">
          <div className="container-custom relative z-10">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-bakery-pink-light/40 px-4 py-2 border border-bakery-pink-light">
                <Sparkles className="h-4 w-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  How It Works
                </span>
              </div>
              <h2 className="mb-4 font-bebas text-5xl text-gray-800 tracking-tight md:text-6xl">
                HOW DOES IT{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                  WORK?
                </span>
              </h2>
              <p className="mx-auto max-w-3xl font-poppins text-lg leading-relaxed text-gray-600">
                This program is all about recognizing our community helpers and
                people that have gone the extra mile to be kind and make our
                community a better place!
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((item, idx) => (
                <div
                  key={item.step}
                  className="group opacity-0 transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${100 + idx * 100}ms` }}
                >
                  <div className="relative h-full rounded-3xl border border-bakery-pink-light/30 bg-gradient-to-br from-white to-bakery-cream/30 p-8 shadow-md transition-all duration-300 hover:border-bakery-pink hover:shadow-xl">
                    <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-bakery-pink-dark to-rose-500 shadow-lg">
                      <span className="font-bebas text-2xl text-white">
                        {item.step}
                      </span>
                    </div>
                    <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                      {item.emoji}
                    </div>
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-rose-100/50 transition-all duration-300 group-hover:from-bakery-pink-dark group-hover:to-rose-500">
                      <item.icon className="h-7 w-7 text-bakery-pink-dark transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <h3 className="mb-3 font-bebas text-2xl tracking-wide text-gray-800">
                      {item.title}
                    </h3>
                    <p className="font-poppins leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-3xl rounded-3xl border-2 border-bakery-pink-light bg-gradient-to-br from-rose-50 to-bakery-pink-light/30 p-8 opacity-0 shadow-lg transition-all duration-700 animate-fade-in-up animation-delay-600 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                    <Heart className="h-6 w-6 fill-rose-500 text-rose-500" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-bebas text-2xl text-gray-800">
                    Want to show someone your appreciation?
                  </h3>
                  <p className="font-poppins leading-relaxed text-gray-700">
                    This is an ongoing weekly giveaway, so you can nominate
                    someone anytime. Anyone can submit a nominee in Folsom or
                    the surrounding areas, with free delivery offered within
                    Folsom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20" />
          <div className="absolute top-20 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-rose-200/40 to-transparent blur-3xl" />
          <div className="absolute bottom-20 -right-32 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/40 to-transparent blur-3xl" />

          <div className="absolute left-0 right-0 top-0 rotate-180 overflow-hidden leading-none">
            <svg
              className="relative block h-20 w-full md:h-32"
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
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 font-bebas text-5xl tracking-tight text-gray-800 opacity-0 transition-all duration-700 animate-fade-in-up md:text-6xl">
                  Nominate a{" "}
                  <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                    Community Hero
                  </span>
                </h2>
                <p className="mt-4 font-poppins text-lg text-gray-600 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-100">
                  Fill out the form below to nominate someone special for this
                  week&apos;s Kind Cookie drawing!
                </p>
              </div>

              <KindCookieProgramClient />

              <div className="mt-12 text-center opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-400">
                <div className="inline-flex items-center gap-3 rounded-full border-2 border-bakery-pink-light/50 bg-gradient-to-r from-rose-50 via-bakery-pink-light/30 to-rose-50 px-6 py-4">
                  <Heart className="h-5 w-5 animate-pulse fill-rose-500 text-rose-500" />
                  <p className="font-poppins font-medium text-gray-700">
                    Thank you for spreading kindness in our community!
                  </p>
                  <Heart className="h-5 w-5 animate-pulse fill-rose-500 text-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default KindCookieProgramPage;
