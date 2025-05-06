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

const initialDesigns: Design[] = [
  {
    id: "teacher-appreciation",
    name: "Teacher Appreciation Box (One Dozen)",
    description:
      "An adorable assortment of custom sugar cookies featuring apples, pencils, notebooks, and coffee cups — the perfect sweet gift to celebrate and thank an amazing teacher!",
    image: "/predesigned/teacher-appreciation.webp",
    price: "$50/box",
    quantity: 0,
  },
  {
    id: "floral-bundle",
    name: "Floral Bundle (Half Dozen)",
    description:
      "A beautiful half dozen of hand-decorated floral sugar cookies, featuring a variety of delicate flowers in soft pastel colors. Perfect for spring celebrations, Mother's Day, or as a thoughtful gift!",
    image: "/predesigned/floral-bundle.webp",
    price: "$40/box",
    quantity: 0,
  },
  {
    id: "one-in-a-melon",
    name: "One in a Melon Pie (Custom Text)",
    description:
      "A fun and colorful watermelon-themed sugar cookie pie, featuring eight slice cookies and one customizable center cookie. Personalize it with a name, title, or special message!",
    image: "/predesigned/one-in-melon.webp",
    price: "$36/pie",
    quantity: 0,
  },
  {
    id: "welcome-home-box",
    name: "Welcome Home Gift Box",
    description:
      "A thoughtful gift box featuring four hand-decorated sugar cookies, including a house, a welcome wreath, and customizable options like a realtor logo. Perfect for celebrating a new home or thanking clients!",
    image: "/predesigned/welcome-home.webp",
    price: "$25/box",
    quantity: 0,
  },
  {
    id: "buttercream-dreams",
    name: "Buttercream Dreams",
    description:
      "A dozen soft sugar cookies topped with beautiful, hand-piped buttercream roses. Perfect for any celebration or to simply brighten someone’s day!",
    image: "/predesigned/buttercream-dreams.webp",
    price: "$36/dozen",
    quantity: 0,
  },
  {
    id: "test-adding-design",
    name: "test design",
    description: "tst design",
    image: "/predesigned/buttercream-dreams.webp",
    price: "$36/dozen",
    quantity: 0,
  },
];

const PreDesignedClient = ({ predesigns }: { predesigns: FetchedDesign[] }) => {
    const transformedDesigns = predesigns.map(design => transformToDesign(design))

  const [designs, setDesigns] = useState<Design[]>(transformedDesigns);
  console.log(transformedDesigns);
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
