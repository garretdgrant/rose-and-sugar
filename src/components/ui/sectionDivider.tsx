import { Flower, Cookie } from "lucide-react";

type SectionDividerProps = {
  icon?: "flower" | "cookie";
};

const SectionDivider = ({ icon = "flower" }: SectionDividerProps) => {
  const IconComponent = icon === "cookie" ? Cookie : Flower;
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="h-px bg-bakery-pink-light flex-grow"></div>
      <IconComponent size={24} className="mx-4 text-bakery-pink" />
      <div className="h-px bg-bakery-pink-light flex-grow"></div>
    </div>
  );
};

export default SectionDivider;
