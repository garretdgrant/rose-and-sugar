import Link from "next/link";
import { ArrowRight, Home, Sparkles, Cookie, Mail } from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative h-screen overflow-hidden bg-gradient-to-br from-bakery-cream via-white to-bakery-peach/30">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-bakery-pink-light/60 to-bakery-peach/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-bakery-peach/40 to-bakery-pink-light/30 blur-3xl" />

      {/* Floating accents */}
      <div
        className="absolute top-1/4 right-1/3 h-3 w-3 rounded-full bg-bakery-pink/70"
        style={{ animation: "float 4s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 h-2.5 w-2.5 rounded-full bg-bakery-brown/40"
        style={{ animation: "float 5s ease-in-out infinite 0.4s" }}
      />

      <div className="container-custom relative z-10 flex min-h-screen items-center py-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/50 bg-white/80 px-4 py-2 font-poppins text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-bakery-pink-dark" />
            Lost in the cookie crumbs
          </div>

          <h1 className="mt-6 font-bebas text-5xl tracking-tight text-gray-800 sm:text-6xl md:text-7xl">
            This page has
            <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
              gone missing
            </span>
          </h1>

          <p className="mt-4 font-poppins text-lg text-gray-600 sm:text-xl">
            We can&apos;t find the page you&apos;re looking for, but we can get
            you back to the good stuff.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink px-7 py-3 font-poppins font-semibold text-white shadow-lg shadow-bakery-pink/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-bakery-pink/40"
            >
              <Home className="h-5 w-5" />
              Back to Home
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/cookies/signature-sugar-cookie-sets"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-bakery-pink-light/50 bg-white/80 px-7 py-3 font-poppins font-semibold text-bakery-pink-dark shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-bakery-pink-light/30"
            >
              <Cookie className="h-5 w-5" />
              Browse Signature Sets
            </Link>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 font-poppins text-sm font-medium text-gray-600 transition-colors hover:text-bakery-pink-dark"
            >
              <Sparkles className="h-4 w-4" />
              Explore Classes
            </Link>
            <span className="hidden text-gray-300 sm:inline">•</span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-poppins text-sm font-medium text-gray-600 transition-colors hover:text-bakery-pink-dark"
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
