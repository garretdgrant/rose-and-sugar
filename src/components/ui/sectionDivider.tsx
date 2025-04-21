import { Flower, Cookie, Flower2, ChefHat, CookingPot } from "lucide-react";

type SectionDividerProps = {
  icon?: "flower" | "flower2" | "cookie" | "chefHat" | "pot";
};

const iconDict = {
  flower: Flower,
  flower2: Flower2,
  cookie: Cookie,
  chefHat: ChefHat,
  pot: CookingPot,
};

const SectionDivider = ({ icon = "flower" }: SectionDividerProps) => {
  const IconComponent = iconDict[icon];
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="h-px bg-bakery-pink-light flex-grow"></div>
      <IconComponent size={24} className="mx-4 text-bakery-pink" />
      <div className="h-px bg-bakery-pink-light flex-grow"></div>
    </div>
  );
};

export default SectionDivider;
