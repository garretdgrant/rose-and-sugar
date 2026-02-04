"use client";

import { SetStateAction, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowRight, Sparkles } from "lucide-react";
import ImageModal from "./ImageModal";

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

const Gallery = ({ items }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<null | GalleryItem>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (image: SetStateAction<GalleryItem | null>) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Masonry-style layout patterns for different grid positions
  const getItemClass = (index: number) => {
    const patterns = [
      "md:col-span-2 md:row-span-2", // Large
      "md:col-span-1 md:row-span-1", // Normal
      "md:col-span-1 md:row-span-1", // Normal
      "md:col-span-1 md:row-span-2", // Tall
      "md:col-span-1 md:row-span-1", // Normal
      "md:col-span-2 md:row-span-1", // Wide
    ];
    return patterns[index % patterns.length];
  };

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden bg-white"
      aria-labelledby="gallery-heading"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("/paper-texture.svg")`,
        }}
      />

      {/* Decorative blobs */}
      <div
        className={`absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-bakery-pink-light/20 to-transparent blur-3xl transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-bakery-peach/20 to-transparent blur-3xl transition-all duration-1000 delay-200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/30 border border-bakery-pink-light/50 mb-6">
            <Camera className="w-4 h-4 text-bakery-pink-dark" />
            <span className="text-sm font-poppins font-medium text-gray-700">
              Our Creations
            </span>
          </div>
          <h2
            className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
            id="gallery-heading"
          >
            <span className="text-gray-800">Cookie</span>{" "}
            <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="mt-6 font-poppins text-lg text-gray-600">
            A taste of what we create
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[180px]">
          {items.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => openModal(item)}
              className={`group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 text-left ${getItemClass(
                index,
              )} ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              aria-label={`View ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                quality={80}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-bakery-pink-light" />
                  <span className="text-xs font-poppins text-bakery-pink-light uppercase tracking-wider">
                    View Details
                  </span>
                </div>
                <p className="text-white font-poppins font-medium text-sm md:text-base">
                  {item.caption}
                </p>
              </div>

              {/* Corner accent on hover */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </button>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-800 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl bg-gradient-to-r from-bakery-cream via-bakery-pink-light/20 to-bakery-peach/30 border border-bakery-pink-light/30">
            <p className="font-poppins text-gray-700">
              Want to create your own?
            </p>
            <Link
              href="/classes"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Class
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        image={selectedImage || { src: "", alt: "", caption: "" }}
      />
    </section>
  );
};

export default Gallery;
