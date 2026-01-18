import Link from "next/link";
import Image from "next/image";
import FAQAccordion from "@/components/FAQAccordion";
import ClassLocationHero from "@/components/classes/ClassLocationHero";
import {
  ArrowRight,
  Clock,
  Cookie,
  Gift,
  MapPin,
  Palette,
  Sparkles,
} from "lucide-react";
import { ClassLocationFaq } from "@/data/classLocationFaqs";

interface ClassLocationPageProps {
  city: string;
  heroDescription: string;
  faqs: ClassLocationFaq[];
}

const ClassLocationPage = ({
  city,
  heroDescription,
  faqs,
}: ClassLocationPageProps) => {
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
      title: `${city} Location`,
      desc: `Convenient location for ${city} and surrounding areas.`,
    },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <ClassLocationHero city={city} heroDescription={heroDescription} />

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
              {features.map((item) => (
                <div
                  key={item.title}
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
                        {city} Event?
                      </span>
                    </h2>
                    <p className="mt-4 text-gray-600 font-poppins leading-relaxed text-lg">
                      From birthday parties to corporate events, we create
                      custom decorated cookies for {city} celebrations.
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
                Everything {city} guests need to know
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/5 border border-bakery-pink-light/20">
              <FAQAccordion
                faqs={faqs.map(({ question, answer }) => ({ question, answer }))}
                initiallyOpenIndex={0}
              />
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

export default ClassLocationPage;
