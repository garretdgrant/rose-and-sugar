import Link from "next/link";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import FeaturedShop from "@/components/FeaturedShop";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Cookie Decorating Class Locations | Rose & Sugar",
    description:
      "Find cookie decorating class locations across the Sacramento area, including Folsom, Loomis, Sacramento, El Dorado Hills, and Roseville.",
    path: "/classes/locations",
  });
}

const locations = [
  {
    name: "Folsom",
    path: "/classes/folsom-sugar-cookie-decorating-class",
    detail: "Hands-on classes with royal icing techniques.",
  },
  {
    name: "Loomis",
    path: "/classes/loomis-sugar-cookie-decorating-class",
    detail: "Small-group decorating sessions for all levels.",
  },
  {
    name: "Sacramento",
    path: "/classes/sacramento-sugar-cookie-decorating-class",
    detail: "Creative cookie classes with all supplies included.",
  },
  {
    name: "El Dorado Hills",
    path: "/classes/el-dorado-hills-sugar-cookie-decorating-class",
    detail: "Beginner-friendly instruction and take-home sets.",
  },
  {
    name: "Roseville",
    path: "/classes/roseville-sugar-cookie-decorating-class",
    detail: "Seasonal classes with guided decorating tips.",
  },
];

const ClassLocationsPage = () => {
  return (
    <div className="min-h-screen bg-bakery-cream">
      {/* Subtle paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.4] z-0"
        style={{
          backgroundImage: `url("/paper-texture.svg")`,
        }}
      />

      <main className="relative z-10 pt-32 pb-20">
        <section className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-poppins text-bakery-pink-dark border border-bakery-pink-light/50 shadow-sm">
              <MapPin className="w-4 h-4" />
              Serving the Sacramento Area
            </span>
            <h1 className="mt-6 font-bebas text-5xl sm:text-6xl md:text-7xl tracking-tight text-gray-900 leading-[0.95]">
              Class
              <span className="block text-bakery-pink-dark">Locations</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 font-poppins max-w-2xl mx-auto leading-relaxed">
              Explore cookie decorating classes near you. Each location offers
              hands-on instruction, seasonal themes, and take-home creations.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/classes"
                className="group inline-flex items-center gap-3 bg-bakery-pink-dark text-white px-6 py-3 rounded-full font-poppins font-medium shadow-md shadow-bakery-pink-dark/25 hover:shadow-lg hover:shadow-bakery-pink-dark/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                View Upcoming Classes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full font-poppins font-medium border border-bakery-pink-light/60 hover:bg-bakery-pink-light/20 transition-all duration-300"
              >
                Ask a Question
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16 container-custom">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Link
                key={location.name}
                href={location.path}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-bakery-pink-light/60"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-bakery-pink-light/50 flex items-center justify-center group-hover:bg-bakery-pink-light transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-bakery-pink-dark" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bebas text-2xl text-gray-900 tracking-wide">
                      {location.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 font-poppins leading-relaxed">
                      {location.detail}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-bakery-pink-dark font-poppins text-sm font-medium">
                      Explore details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <FeaturedShop />
        </section>

        <section className="mt-20 container-custom">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-bakery-pink-light/30 via-bakery-cream to-white rounded-3xl p-8 md:p-10 shadow-sm border border-bakery-pink-light/40 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-poppins text-bakery-pink-dark border border-bakery-pink-light/50 shadow-sm">
              <Sparkles className="w-4 h-4" />
              New sessions added regularly
            </div>
            <h2 className="mt-6 font-bebas text-4xl md:text-5xl text-gray-900 tracking-tight">
              Not Seeing Your City?
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-poppins">
              Contact us to request a class near you or to plan a private event.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 bg-bakery-pink-dark text-white px-8 py-4 rounded-full font-poppins font-medium shadow-lg shadow-bakery-pink-dark/25 hover:shadow-xl hover:shadow-bakery-pink-dark/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Request a Location
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClassLocationsPage;
