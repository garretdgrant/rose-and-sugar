import { Flower } from "lucide-react";

const SectionDivider = () => {
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="h-px bg-bakery-pink-light flex-grow"></div>
      <Flower size={24} className="mx-4 text-bakery-pink" />
      <div className="h-px bg-bakery-pink-light flex-grow"></div>
    </div>
  );
};

export default SectionDivider;
