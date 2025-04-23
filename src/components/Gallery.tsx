"use client";
import { SetStateAction, useState } from "react";
import ImageModal from "./ImageModal";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
    caption: string;
  }>(null);

  const galleryItems = [
    {
      src: "/gallery/easter.jpg",
      alt: "3-tier wedding cake",
      caption: "Easter basket cookies",
    },
    {
      src: "/gallery/class1.jpg",
      alt: "Cake decorating class",
      caption: "Cookie Decorating Class",
    },
    {
      src: "/gallery/catCookies.jpg",
      alt: "Cupcake platter",
      caption: "Cat theme cookies",
    },
    {
      src: "/gallery/wedding3.jpg",
      alt: "3-tier wedding cake",
      caption: "3-tier wedding cake — EDH",
    },
    {
      src: "/gallery/insects.jpg",
      alt: "Birthday cake",
      caption: "Garden theme cookies",
    },
    {
      src: "/gallery/weddingCookies2.jpg",
      alt: "Baby shower cake",
      caption: "Gender reveal cake",
    },
  ];

  const openModal = (
    image: SetStateAction<{
      src: string;
      alt: string;
      caption: string;
    } | null>,
  ) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="section-heading">Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => openModal(item)}
              className="cursor-pointer group overflow-hidden rounded-lg shadow-md hover-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/classes" className="btn-secondary">
            Book a Class
          </a>
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
