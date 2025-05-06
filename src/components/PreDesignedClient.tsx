"use client";
import { useState } from "react";
import DesignCard from "@/components/cookie/DesignCard";
import OrderForm from "@/components/cookie/OrderForm";
import Link from "next/link";
import { FetchedDesign, transformToDesign } from "@/lib/fetchSanity";

export interface Design {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  quantity: number;
}

const PreDesignedClient = ({ predesigns }: { predesigns: FetchedDesign[] }) => {
  const transformedDesigns = predesigns.map((design) =>
    transformToDesign(design),
  );

  const [designs, setDesigns] = useState<Design[]>(transformedDesigns);
  const handleQuantityChange = (id: string, quantity: number) => {
    setDesigns((prev) =>
      prev.map((design) =>
        design.id === id ? { ...design, quantity } : design,
      ),
    );
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
            <OrderForm selectedDesigns={selectedDesigns} />
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

export default PreDesignedClient;
