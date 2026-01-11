import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
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

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      // Lock body scroll
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      // Restore body scroll
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
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4"
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-modal-title"
        className={`bg-white rounded-lg overflow-hidden max-w-4xl w-full shadow-2xl transition-all duration-300 ${
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3
            className="font-playfair text-xl font-medium"
            id="image-modal-title"
          >
            {image.caption}
          </h3>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close image preview"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="p-4">
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={900}
            sizes="(max-width: 1024px) 100vw, 896px"
            quality={70}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
