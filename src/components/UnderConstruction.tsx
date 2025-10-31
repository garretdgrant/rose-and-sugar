import Link from "next/link";

const UnderConstruction = () => {
  return (
    <section className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl items-center justify-center px-6 py-24 sm:px-8">
      <div
        className="absolute -top-12 left-6 hidden h-24 w-24 rounded-full bg-bakery-peach/60 blur-2xl md:block"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 right-10 hidden h-20 w-20 rounded-full bg-bakery-pink-light/50 blur-xl md:block"
        aria-hidden="true"
      />

      <div className="relative w-full overflow-hidden rounded-3xl border border-bakery-pink-light/70 bg-bakery-offWhite/90 p-10 text-center shadow-[0_28px_80px_-45px_rgba(212,134,160,0.85)] backdrop-blur-sm md:p-14">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-bakery-pink-dark/30 bg-white shadow-inner">
          <svg
            className="h-14 w-14 text-bakery-pink-dark"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="32" cy="32" r="30" fill="#FDE1D3" />
            <circle cx="22" cy="24" r="4" fill="#D286A0" />
            <circle cx="36" cy="18" r="3.5" fill="#D286A0" />
            <circle cx="28" cy="38" r="3.5" fill="#D286A0" />
            <circle cx="44" cy="30" r="3" fill="#D286A0" />
            <circle cx="40" cy="44" r="4" fill="#D286A0" />
            <circle cx="22" cy="46" r="3" fill="#D286A0" />
            <path
              d="M35 6a12 12 0 0 1 12 12"
              stroke="#D286A0"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <p className="font-bebas text-sm uppercase tracking-[0.4em] text-bakery-brown">
            Pre-designed cookies
          </p>
          <h1 className="font-fraunces text-4xl text-bakery-pink-dark sm:text-5xl">
            Sweet things are baking!
          </h1>
          <p className="mx-auto max-w-2xl text-base text-bakery-brown/90 sm:text-lg">
            Our ready-to-order collection is getting a fresh coat of frosting.
            We&apos;re putting the final sprinkles in place so you can browse a
            dreamy lineup of designs very soon. Thank you for your patience!
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-bakery-pink-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-bakery-pink-light"
          >
            Say hello
          </Link>
          <Link
            href="/cookies/custom-orders"
            className="rounded-full border border-bakery-pink-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-bakery-pink-dark transition hover:border-bakery-pink-light hover:bg-bakery-pink-light/30"
          >
            Explore custom cookies
          </Link>
        </div>

        <p className="mt-8 text-sm text-bakery-brown/80">
          Need inspiration right away? We&apos;re happy to help craft a custom
          set that matches your celebration.
        </p>
      </div>
    </section>
  );
};

export default UnderConstruction;
