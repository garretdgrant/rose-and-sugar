"use client";

import { SetStateAction, useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";
import Link from "next/link";

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

  const openModal = (image: SetStateAction<GalleryItem | null>) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section
      id="gallery"
      className="section-padding bg-white"
      aria-labelledby="gallery-heading"
    >
      <div className="container-custom">
        <h2
          className="font-bebas text-4xl md:text-5xl text-center mb-12 text-bakery-pink-dark"
          id="gallery-heading"
        >
          Cookie Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => openModal(item)}
              className="cursor-pointer group overflow-hidden rounded-lg shadow-md hover-card text-left"
              aria-label={`View ${item.caption}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                  quality={70}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">{item.caption}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/classes" className="btn-secondary">
            Book a Class
          </Link>
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
