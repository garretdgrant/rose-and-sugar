import Link from "next/link";
import { Cake } from "lucide-react";

const SweetBakesPreDesignedPage = () => {
  return (
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading text-center">Sweet Bakes Collection</h1>

          <div className="content-container max-w-3xl mx-auto text-center">
            <div className="relative overflow-hidden rounded-3xl border border-bakery-pink-light bg-white/70 px-6 py-14 shadow-sm">
              <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-bakery-pink-light/30 blur-3xl" />
              <div className="absolute -bottom-8 -right-12 h-40 w-40 rounded-full bg-bakery-pink-dark/10 blur-3xl" />

              <div className="relative flex flex-col items-center gap-4">
                <span className="inline-flex items-center justify-center rounded-full bg-bakery-pink-light/40 p-4">
                  <Cake className="h-10 w-10 text-bakery-pink-dark" />
                </span>

                <h2 className="section-subheading text-2xl font-semibold text-bakery-pink-dark">
                  We&apos;re Frosting Up Something Sweet
                </h2>
                <p className="body-text">
                  Our pre-designed cakes and cupcake creations are in the oven!
                  We&apos;re putting the finishing touches on a menu filled with
                  charming celebration-ready designs.
                </p>
                <p className="body-text">
                  In the meantime, reach out with your event details and
                  we&apos;ll help craft a dessert spread that fits your
                  celebration.
                </p>
                <Link href="/contact" className="btn-primary mt-4">
                  Contact Megan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SweetBakesPreDesignedPage;
