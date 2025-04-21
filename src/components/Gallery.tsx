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
      src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      alt: "3-tier wedding cake",
      caption: "3-tier wedding cake — EDH",
    },
    {
      src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Cake decorating class",
      caption: "Cake decorating class",
    },
    {
      src: "https://images.unsplash.com/photo-1634151739970-bba3910d0d36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Birthday cake",
      caption: "Chocolate birthday cake with berries",
    },
    {
      src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Cupcake platter",
      caption: "Holiday cupcake platter",
    },
    {
      src: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Kids baking class",
      caption: "Kids holiday baking class",
    },
    {
      src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
