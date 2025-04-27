import { Check, Cookie, Users } from "lucide-react";
import Link from "next/link";

const Services = () => {
  return (
    <section
      id="services"
      className="section-padding bg-gradient-to-b from-white to-bakery-pink-light/70"
    >
      <div className="container-custom">
        <h2 className="font-bebas text-4xl md:text-5xl text-center mb-12 text-bakery-pink-dark">
          Our Services
        </h2>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Custom Cookies Column */}
          <div className="w-full md:w-1/2 bg-bakery-offWhite rounded-xl p-8 shadow-md hover-card">
            <div className="flex items-center justify-center h-16 w-16 bg-bakery-pink rounded-full mb-6 mx-auto">
              <Cookie size={28} className="text-white" />
            </div>

            <h3 className="section-subheading text-center">Custom Cookies</h3>
            <p className="text-center text-gray-700 mb-8">
              Beautifully designed cookies for birthdays, showers, weddings, and
              every special moment worth celebrating.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check
                  className="text-bakery-pink-dark mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-700">Custom Designs & Gift Boxes</p>
              </div>
              <div className="flex items-start">
                <Check
                  className="text-bakery-pink-dark mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-700">Various Flavor Options</p>
              </div>
              <div className="flex items-start">
                <Check
                  className="text-bakery-pink-dark mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-700">Sealed or Ribbon Packaging</p>
              </div>
              <div className="flex items-start">
                <Check
                  className="text-bakery-pink-dark mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-700">
                  &quot;Welcome Home&quot; Gift Sets
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/cookies/custom-orders" className="btn-primary">
                Order Custom Cookies
              </Link>
            </div>
          </div>

          {/* Cookie Classes Column */}
          <div className="w-full md:w-1/2 bg-bakery-cream rounded-xl p-8 shadow-md hover-card">
            <div className="flex items-center justify-center h-16 w-16 bg-bakery-brown rounded-full mb-6 mx-auto">
              <Users size={28} className="text-white" />
            </div>

            <h3 className="section-subheading text-center">
              Decorating Classes
            </h3>
            <p className="text-center text-gray-700 mb-8">
              Join our small-group cookie decorating classes for a fun, creative
              experience perfect for any skill level.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check
                  className="text-bakery-brown mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-700">Small Groups (Max 15)</p>
              </div>
              <div className="flex items-start">
                <Check
                  className="text-bakery-brown mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-700">All Supplies Included</p>
              </div>
              <div className="flex items-start">
                <Check
                  className="text-bakery-brown mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-700">Perfect for Beginners</p>
              </div>
              <div className="flex items-start">
                <Check
                  className="text-bakery-brown mr-2 mt-1 flex-shrink-0"
                  size={18}
                />
                <p className="text-gray-700">Take Home Your Creations</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/classes"
                className="btn-primary bg-bakery-brown hover:bg-bakery-brown/80"
              >
                Book a Class
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
