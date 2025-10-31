"use client";
import UnderConstruction from "@/components/UnderConstruction";
import { FetchedSweetBake } from "@/lib/fetchSanity";

const PreDesignedBakesClient = ({
  sweetBakes,
}: {
  sweetBakes: FetchedSweetBake[];
}) => {
  void sweetBakes;

  return (
    <UnderConstruction
      title="Sweet Bakes Are Baking!"
      message="Our pre-designed cakes and cupcake sets are in the oven. We’ll share the full menu soon. In the meantime, reach out and we’ll help craft something delicious for you."
      ctaLabel="Get In Touch"
      ctaHref="/contact"
    />
  );

  /*
  import { useEffect, useMemo, useState } from "react";
  import Link from "next/link";
  import DesignCard from "@/components/cookie/DesignCard";
  import OrderForm from "@/components/cookie/OrderForm";
  import { transformToSweetBake } from "@/lib/fetchSanity";
  import type { Design } from "@/components/PreDesignedClient";

  const transformedBakes = useMemo(
    () => sweetBakes.map((item) => transformToSweetBake(item)),
    [sweetBakes],
  );

  const [designs, setDesigns] = useState<Design[]>(transformedBakes);

  useEffect(() => {
    setDesigns(transformedBakes);
  }, [transformedBakes]);

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
            Sweet Bakes Collection
          </h1>
          <p className="text-center max-w-3xl mx-auto text-gray-700 mb-12">
            Explore our pre-designed cakes and cupcake sets crafted for
            celebrations big and small. Choose your favorites, select
            quantities, and send your request—each bake is finished with the
            same handmade detail you love from our cookies.
            <br />
            <br />
            Ready for a fully custom cake or cupcake spread?{" "}
            <Link className="text-bakery-pink-dark" href="/contact">
              Reach out here
            </Link>
            .
          </p>

          {designs.length === 0 ? (
            <p className="text-center text-gray-600 mb-12">
              New sweet bakes are baking! Check back soon or{" "}
              <Link className="text-bakery-pink-dark" href="/contact">
                contact us
              </Link>{" "}
              for custom treats.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {designs.map((design) => (
                <DesignCard
                  key={design.id}
                  {...design}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          )}

          <div
            id="order-form"
            className="max-w-2xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md"
          >
            <h2 className="font-bebas text-2xl md:text-3xl text-bakery-pink-dark mb-6 text-center">
              Request Your Sweet Bakes
            </h2>
            <OrderForm
              selectedDesigns={selectedDesigns}
              thankYouPath="/sweet-bakes/thank-you"
            />
            <p className="text-center text-gray-600 mt-6">
              We&apos;ll follow up within 48 hours to confirm availability,
              flavor notes, and pick-up details. Let&apos;s bake something
              beautiful!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
  */
};

export default PreDesignedBakesClient;
