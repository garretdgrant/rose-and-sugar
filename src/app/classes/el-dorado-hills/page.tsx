import Link from "next/link";
import Script from "next/script";
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
import { buildPageMetadata } from "@/lib/metadata";
import { MapPin, Clock, Palette, Gift } from "lucide-react";

export async function generateMetadata() {
  return buildPageMetadata({
    title:
      "Custom Cookie Decorating Classes in El Dorado Hills, CA | Rose & Sugar",
    description:
      "Join sugar cookie decorating classes near El Dorado Hills, CA with Rose & Sugar. Small-group instruction, all supplies included, and custom cookie options.",
    path: "/classes/el-dorado-hills",
  });
}

const faqs = [
  {
    question: "Are there cookie decorating classes near El Dorado Hills?",
    answerText:
      "Yes, Rose & Sugar hosts classes nearby with all supplies included.",
    answer: (
      <>
        Yes, Rose & Sugar hosts classes nearby with all supplies included. See{" "}
        <Link className="text-bakery-pink-dark" href="/classes">
          upcoming classes
        </Link>
        .
      </>
    ),
  },
  {
    question: "Is this a good cooking class for beginners?",
    answerText:
      "Yes. Classes are beginner-friendly and include guided instruction.",
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
    answerText:
      "You'll receive cookies, icing, tools, packaging, and step-by-step guidance.",
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
    question: "Do you make custom cookies for El Dorado Hills events?",
    answerText:
      "Yes, we create custom cookie sets for El Dorado Hills celebrations and events.",
    answer: (
      <>
        Yes, we create custom cookie sets for El Dorado Hills celebrations and
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

const ElDoradoHillsClassesPage = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerText,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-bakery-cream">
      <Script
        id="faq-jsonld-el-dorado-hills"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Subtle paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.4] z-0"
        style={{
          backgroundImage: `url("/paper-texture.svg")`,
        }}
      />

      <main className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="container-custom">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb className="flex justify-start mb-6">
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
                  <BreadcrumbPage>El Dorado Hills</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {/* Location badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-poppins text-bakery-pink-dark border border-bakery-pink-light/50 shadow-sm">
                <MapPin className="w-4 h-4" />
                Serving El Dorado Hills, CA
              </span>
            </div>

            {/* Main headline - dramatic size */}
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center tracking-tight text-gray-900 leading-[0.9]">
              Cookie Decorating
              <span className="block text-bakery-pink-dark">Classes</span>
            </h1>

            <p className="mt-8 text-center text-lg md:text-xl text-gray-600 font-poppins max-w-2xl mx-auto leading-relaxed">
              Hands-on cookie decorating for El Dorado Hills guests. Learn royal
              icing techniques in a welcoming, beginner-friendly setting.
            </p>

            {/* Primary CTA */}
            <div className="mt-10 flex justify-center">
              <Link
                href="/classes"
                className="group relative inline-flex items-center gap-3 bg-bakery-pink-dark text-white px-8 py-4 rounded-full font-poppins font-medium text-lg shadow-lg shadow-bakery-pink-dark/25 hover:shadow-xl hover:shadow-bakery-pink-dark/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>View Upcoming Classes</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Image Section - Asymmetric layout */}
        <section className="mt-20 container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Main image with offset shadow */}
              <div className="relative z-10">
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full bg-bakery-peach rounded-2xl" />
                <Image
                  src="/roseSugarClassCropped.webp"
                  alt="Cookie decorating class in progress"
                  width={1200}
                  height={600}
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-8 -left-4 md:bottom-8 md:-left-8 bg-white rounded-xl p-4 md:p-5 shadow-xl z-20 max-w-[200px] md:max-w-[240px]">
                <p className="font-bebas text-2xl md:text-3xl text-bakery-pink-dark leading-tight">
                  All Supplies Included
                </p>
                <p className="text-sm text-gray-600 mt-1 font-poppins">
                  Cookies, icing, tools & take-home box
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn - Editorial grid */}
        <section className="mt-32 container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-bebas text-4xl md:text-5xl text-center text-gray-900 tracking-tight">
              What You&apos;ll Learn
            </h2>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {[
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
                  title: "Near El Dorado Hills",
                  desc: "Convenient location for El Dorado Hills and surrounding areas.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bakery-pink-light/50 flex items-center justify-center group-hover:bg-bakery-pink-light transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-bakery-pink-dark" />
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
        </section>

        {/* CTA Banner - Full bleed */}
        <section className="mt-32 bg-bakery-pink-dark py-16 md:py-20 relative overflow-hidden">
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
                  className="inline-flex items-center gap-3 bg-white text-bakery-pink-dark px-8 py-4 rounded-full font-poppins font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Book Your Spot
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Cookies Section */}
        <section className="mt-32 container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="md:flex md:items-center md:gap-12">
                <div className="md:flex-1">
                  <span className="inline-block px-3 py-1 bg-bakery-peach/50 rounded-full text-sm font-poppins text-bakery-pink-dark mb-4">
                    Custom Orders
                  </span>
                  <h2 className="font-bebas text-3xl md:text-4xl text-gray-900 tracking-tight">
                    Need Cookies for an El Dorado Hills Event?
                  </h2>
                  <p className="mt-4 text-gray-600 font-poppins leading-relaxed">
                    From birthday parties to corporate events, we create custom
                    decorated cookies for El Dorado Hills celebrations.
                    Hand-crafted with attention to every detail.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/cookies/order-custom-sugar-cookies"
                      className="btn-primary text-center"
                    >
                      Start Custom Order
                    </Link>
                    <Link
                      href="/cookies/signature-sugar-cookie-sets"
                      className="btn-secondary text-center"
                    >
                      Signature Sets
                    </Link>
                  </div>
                </div>
                <div className="mt-8 md:mt-0 md:flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -bottom-3 -right-3 w-full h-full bg-bakery-pink-light rounded-xl" />
                    <Image
                      src="/gallery/weddingCookies.jpg"
                      alt="Custom decorated cookies"
                      width={280}
                      height={280}
                      className="relative rounded-xl shadow-lg object-cover w-full md:w-[280px] h-auto aspect-square"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-32 container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bebas text-4xl md:text-5xl text-center text-gray-900 tracking-tight">
              Questions About Classes
            </h2>
            <p className="mt-4 text-center text-gray-600 font-poppins">
              Everything El Dorado Hills guests need to know
            </p>

            <div className="mt-10 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <FAQAccordion
                faqs={faqs.map(({ question, answer }) => ({ question, answer }))}
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-32 container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bebas text-3xl md:text-4xl text-gray-900 tracking-tight">
              Join Us for a Class
            </h2>
            <p className="mt-4 text-gray-600 font-poppins">
              New themes every month. All skill levels welcome.
            </p>
            <div className="mt-8">
              <Link
                href="/classes"
                className="inline-flex items-center gap-2 bg-bakery-pink text-white px-8 py-4 rounded-full font-poppins font-medium text-lg shadow-md hover:bg-bakery-pink-dark hover:shadow-lg transition-all duration-300"
              >
                See Class Schedule
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ElDoradoHillsClassesPage;
