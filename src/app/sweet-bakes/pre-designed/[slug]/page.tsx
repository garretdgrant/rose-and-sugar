import Image from "next/image";
import React from "react";
import { getPredesignedCookieBySlug } from "../../../../data/predesignedCookies";

type Props = { params: Promise<{ slug: string }> };

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const cookie = getPredesignedCookieBySlug(slug);

  if (!cookie) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="max-w-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-pink-700">
            Item not found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Try browsing our Signature Sets collection.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white/60 backdrop-blur-sm grid md:grid-cols-2">
          <div className="relative h-72 md:h-auto md:min-h-[420px]">
            <Image
              src={cookie.images[0]}
              alt={cookie.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-semibold text-pink-700">
              {cookie.name}
            </h1>
            <p className="mt-3 text-pink-600">{cookie.shortDescription}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-pink-700">
                ${cookie.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">each</span>
            </div>

            <p className="mt-6 text-gray-700">{cookie.details}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="px-5 py-2 rounded-md bg-pink-600 text-white shadow hover:bg-pink-700">
                Add to cart
              </button>
              <a
                href="/contact"
                className="px-5 py-2 rounded-md border border-pink-600 text-pink-600"
              >
                Request custom order
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          This is a mock detail page for Signature Sets.
        </div>
      </section>
    </main>
  );
}
