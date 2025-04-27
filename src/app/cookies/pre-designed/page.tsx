"use client";
import { useState } from "react";
import DesignCard from "@/components/cookie/DesignCard";
import OrderForm from "@/components/cookie/OrderForm";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface Design {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  quantity: number;
}

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  message?: string;
  heardAbout?: string;
  selectedDesigns: Design[];
}

const initialDesigns: Design[] = [
  {
    id: "design1",
    name: "Birthday Celebration",
    description:
      "Colorful birthday-themed sugar cookies with sprinkles and custom message options.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    price: "$42/dozen",
    quantity: 0,
  },
  {
    id: "design2",
    name: "Thank You Set",
    description:
      "Elegant floral-inspired thank you cookies in soft pastel colors.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    price: "$42/dozen",
    quantity: 0,
  },
  {
    id: "design3",
    name: "Baby Shower Collection",
    description: "Sweet baby-themed cookies in gender-neutral colors.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    price: "$45/dozen",
    quantity: 0,
  },
  {
    id: "design4",
    name: "Welcome Home",
    description: "House-warming cookie set with charming home designs.",
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    price: "$45/dozen",
    quantity: 0,
  },
  {
    id: "design5",
    name: "Seasonal Favorites",
    description: "Rotating selection of seasonal and holiday designs.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    price: "$42/dozen",
    quantity: 0,
  },
  {
    id: "design6",
    name: "Congratulations Bundle",
    description:
      "Celebratory cookies perfect for graduations and achievements.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    price: "$42/dozen",
    quantity: 0,
  },
];

const PreDesigned = () => {
  const [designs, setDesigns] = useState<Design[]>(initialDesigns);
  const { toast } = useToast();

  const handleQuantityChange = (id: string, quantity: number) => {
    setDesigns((prev) =>
      prev.map((design) =>
        design.id === id ? { ...design, quantity } : design,
      ),
    );
  };

  const handleSubmit = (formData: OrderFormData) => {
    console.log("Order submitted:", formData);
    toast({
      title: "Order Submitted!",
      description: "We'll be in touch within 48 hours to confirm your order.",
    });
  };

  const selectedDesigns = designs.filter((design) => design.quantity > 0);

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-bakery-offWhite">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-bebas text-4xl md:text-5xl text-bakery-pink-dark text-center mb-6">
            Pre-Designed Cookie Collection
          </h1>
          <p className="text-center max-w-3xl mx-auto text-gray-700 mb-12">
            Browse our ready-to-order cookie designs below! These pre-made
            options are perfect for birthdays, thank-yous, and more. Simply
            select the designs you&apos;d like, choose quantities, and send your
            request — we&apos;ll take care of the rest!
            <br />
            <br />
            Looking for custom designed cookies?{" "}
            <Link
              className="text-bakery-pink-dark"
              href="/cookies/custom-orders"
            >
              Order Here
            </Link>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {designs.map((design) => (
              <DesignCard
                key={design.id}
                {...design}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md">
            <h2 className="font-bebas text-2xl md:text-3xl text-bakery-pink-dark mb-6 text-center">
              Request Your Order
            </h2>
            <OrderForm
              selectedDesigns={selectedDesigns}
              onSubmit={() => handleSubmit}
            />
            <p className="text-center text-gray-600 mt-6">
              We&apos;ll follow up within 48 hours to confirm availability and
              pricing. Thank you!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreDesigned;
