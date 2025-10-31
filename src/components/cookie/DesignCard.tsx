import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const handleCheckoutClick = () => {
    if (quantity === 0) {
      return;
    }
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isCheckoutDisabled = quantity === 0;

  return (
    <Card className="bg-white border border-bakery-pink-light/50 h-full">
      <CardContent className="flex h-full flex-col p-4">
        <div className="flex-1">
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={image} alt={name} className="h-64 w-full object-cover" />
          </div>
          <h3 className="section-subheading text-xl mb-2">{name}</h3>
          <p className="text-bakery-pink-dark font-semibold mb-2">
            {price || "$42"}
          </p>
          <p className="text-muted-foreground mb-4">{description}</p>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
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
          </div>
        </div>
        <Button
          type="button"
          disabled={isCheckoutDisabled}
          className={cn(
            "mt-4 w-full disabled:cursor-not-allowed",
            isCheckoutDisabled
              ? "bg-gray-200 text-gray-500"
              : "bg-bakery-pink-dark text-white hover:bg-bakery-pink-dark/90",
          )}
          onClick={handleCheckoutClick}
        >
          Checkout Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default DesignCard;
