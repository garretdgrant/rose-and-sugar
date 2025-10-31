"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const UnderConstruction = ({
  title = "Something Sweet Is Coming Soon",
  message = "We’re adding the finishing touches to this page. Check back shortly for fresh treats and updates.",
  ctaLabel = "Contact Us",
  ctaHref = "/contact",
}: UnderConstructionProps) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-bakery-offWhite via-white to-bakery-offWhite px-6 text-center">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-bakery-pink-light/40 text-bakery-pink-dark">
        <Sparkles className="h-8 w-8" />
      </div>
      <h1 className="font-bebas text-4xl md:text-5xl text-bakery-pink-dark mb-4">
        {title}
      </h1>
      <p className="max-w-xl text-gray-700 mb-8 text-base md:text-lg">
        {message}
      </p>
      {ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center rounded-full border border-bakery-pink-dark bg-bakery-pink-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-bakery-pink-dark/90"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
};

export default UnderConstruction;
