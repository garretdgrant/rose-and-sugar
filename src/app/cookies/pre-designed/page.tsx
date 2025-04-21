import { Cookie } from "lucide-react";

const PreDesigned = () => {
  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center bg-bakery-pink-light/20 pt-20">
        <div className="max-w-lg mx-auto text-center rounded-2xl px-8 py-14 shadow-xl bg-white/80 border border-bakery-pink-light">
          <Cookie className="mx-auto text-bakery-pink-dark mb-6" size={56} />
          <h1 className="font-bebas text-3xl md:text-4xl text-bakery-pink-dark mb-3">
            Stay tuned for sweetness!
          </h1>
          <p className="text-lg text-gray-700 mb-6 font-poppins">
            Our pre-designed cookie collection is in the oven.
            <br />
            Come back soon for all the sweet details!
          </p>
          <div className="mt-6 flex flex-col items-center">
            <span className="text-bakery-pink-dark/90 font-semibold mb-2">
              Want to see a sneak peek?
            </span>
            <a
              href="/contact"
              className="btn-primary inline-block text-base px-5 py-2 rounded-full"
            >
              Contact us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreDesigned;
