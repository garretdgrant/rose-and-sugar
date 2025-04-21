import { useState, useEffect } from "react";
import { X } from "lucide-react";

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

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
        className={`bg-white rounded-lg overflow-hidden max-w-4xl w-full shadow-2xl transition-all duration-300 ${
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-playfair text-xl font-medium">{image.caption}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
