"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    alt: string;
    caption: string;
  };
}

// Decorative corner flourish component
const CornerFlourish = ({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) => {
  const rotations = {
    tl: "rotate-0",
    tr: "rotate-90",
    br: "rotate-180",
    bl: "-rotate-90",
  };
  const positions = {
    tl: "-top-1 -left-1",
    tr: "-top-1 -right-1",
    bl: "-bottom-1 -left-1",
    br: "-bottom-1 -right-1",
  };

  return (
    <svg
      viewBox="0 0 40 40"
      className={`absolute w-10 h-10 text-bakery-pink/60 ${rotations[position]} ${positions[position]}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 38 C2 20, 2 10, 10 4 Q20 -2, 38 2" strokeLinecap="round" />
      <path d="M8 32 C8 20, 10 14, 16 10" strokeLinecap="round" opacity="0.5" />
      <circle cx="6" cy="34" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger CSS transitions
      const timer = setTimeout(() => setIsVisible(true), 20);
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setImageLoaded(false);
      document.body.style.overflow = "unset";
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop with gradient overlay */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isVisible ? "backdrop-blur-md" : "backdrop-blur-none"
        }`}
        style={{
          background: isVisible
            ? "linear-gradient(135deg, rgba(210, 134, 160, 0.15) 0%, rgba(0, 0, 0, 0.75) 50%, rgba(253, 225, 211, 0.1) 100%)"
            : "rgba(0, 0, 0, 0)",
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-bakery-pink/10 blur-3xl transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
        <div
          className={`absolute bottom-[15%] right-[8%] w-40 h-40 rounded-full bg-bakery-peach/15 blur-3xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
      </div>

      {/* Modal container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-modal-title"
        className={`relative max-w-5xl w-full transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        {/* Close button - floating top right */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center group transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-2xl hover:shadow-bakery-pink/20 focus:outline-none focus:ring-2 focus:ring-bakery-pink focus:ring-offset-2"
          aria-label="Close image preview"
        >
          <svg
            className="w-6 h-6 text-gray-600 group-hover:text-bakery-pink-dark transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          {/* Hover bloom effect */}
          <div className="absolute inset-0 rounded-full bg-bakery-pink/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
        </button>

        {/* Frame container */}
        <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          {/* Decorative corner flourishes */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <CornerFlourish position="tl" />
            <CornerFlourish position="tr" />
            <CornerFlourish position="bl" />
            <CornerFlourish position="br" />
          </div>

          {/* Inner frame with subtle border */}
          <div className="m-3 md:m-5 rounded-xl md:rounded-2xl overflow-hidden border border-bakery-pink-light/30 bg-bakery-cream/30">
            {/* Image container */}
            <div className="relative">
              {/* Loading shimmer */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-bakery-cream via-white to-bakery-cream bg-[length:200%_100%] animate-shimmer" />
              )}

              {/* Main image */}
              <div
                className={`transition-all duration-700 delay-100 ${
                  imageLoaded && isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.02]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 896px"
                  quality={80}
                  className="w-full h-auto max-h-[65vh] object-contain"
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
              </div>
            </div>

            {/* Caption placard */}
            {image.caption && (
              <div
                className={`relative transition-all duration-500 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {/* Decorative divider */}
                <div className="flex items-center justify-center py-3 px-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-bakery-pink-light to-transparent" />
                  <div className="mx-4 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-bakery-pink/50"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-bakery-pink-light via-bakery-pink-light to-transparent" />
                </div>

                {/* Caption text */}
                <div className="px-6 pb-5 text-center">
                  <h3
                    id="image-modal-title"
                    className="font-playfair text-xl md:text-2xl text-gray-800 tracking-wide"
                  >
                    {image.caption}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hint text */}
        <p
          className={`text-center mt-4 text-white/60 text-sm font-poppins transition-all duration-500 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Press{" "}
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-white/80 font-mono text-xs">
            ESC
          </kbd>{" "}
          or click outside to close
        </p>
      </div>
    </div>
  );
};

export default ImageModal;
