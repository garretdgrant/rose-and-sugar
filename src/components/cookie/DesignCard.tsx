import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";

interface DesignCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: string;
  onQuantityChange: (id: string, quantity: number) => void;
}

const DesignCard = ({
  id,
  name,
  description,
  image,
  quantity,
  price,
  onQuantityChange,
}: DesignCardProps) => {
  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment
      ? Math.min(10, quantity + 1)
      : Math.max(0, quantity - 1);
    onQuantityChange(id, newQuantity);
  };

  return (
    <Card className="bg-white border border-bakery-pink-light/50">
      <CardContent className="p-4 relative">
        <div className="overflow-hidden rounded-lg mb-4">
          <img src={image} alt={name} className="h-64 w-full object-cover" />
        </div>
        <h3 className="section-subheading text-xl mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center gap-2 rounded-md border border-input bg-background p-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent"
              onClick={() => handleQuantityChange(false)}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span
              id={`quantity-${id}`}
              className="min-w-[2rem] text-center font-medium"
            >
              {quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent"
              onClick={() => handleQuantityChange(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-bakery-pink-dark font-semibold">
          {price || "$42"}
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignCard;
