import Link from "next/link";
import { Cake } from "lucide-react";

const SweetBakesThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bakery-pink-light/10">
      <main className="flex-grow flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="animate-float mb-6">
              <Cake size={48} className="mx-auto text-bakery-pink-dark" />
            </div>

            <h1 className="font-bebas text-4xl md:text-5xl text-bakery-pink-dark mb-6">
              Thank You for Your Sweet Bakes Request!
            </h1>

            <div className="space-y-4 mb-8 text-gray-700">
              <p className="text-lg">
                We received your cake and cupcake inquiry and can&apos;t wait to
                make your celebration sparkle.
              </p>
              <p className="text-lg">
                Megan will review your selections and get back to you within 1-2
                business days with availability, flavor notes, and next steps.
              </p>
              <p className="font-medium text-bakery-pink-dark">
                Thank you for choosing Rose & Sugar for your special moment!
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center btn-primary transition-all hover:translate-y-[-2px]"
            >
              Return to Home
            </Link>

            <div className="mt-6 text-sm text-gray-500">
              — Megan from Rose & Sugar
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SweetBakesThankYouPage;
