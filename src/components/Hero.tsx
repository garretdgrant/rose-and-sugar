import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-bakery-pink-light/40 to-white flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/cookies.webp')] bg-cover bg-center opacity-20"></div>
      </div>

      <div className="container-custom relative z-10 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in">
            <h1 className="font-bebas text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-800">
              Handcrafted Custom Cookies & Decorating Classes That Delight
            </h1>
            <h2 className="font-bebas text-2xl md:text-3xl font-medium text-bakery-pink-dark mb-2">
              Made With Love in Folsom
            </h2>
            <p className="font-poppins text-gray-600 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              From delightful custom cookies to hands-on decorating classes,
              Rose and Sugar brings creativity and sweetness to every
              celebration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/cookies/custom-orders" className="btn-primary">
                Order Cookies
              </Link>
              <Link href="/classes" className="btn-secondary">
                Book a Class
              </Link>
            </div>
          </div>

          <div
            className="w-full py-6 md:w-1/2 mt-8 md:mt-0 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <div className="bg-bakery-peach rounded-full absolute -top-4 -right-4 w-64 h-64 md:w-80 md:h-80 -z-10"></div>
              <img
                src="/singleCookie.webp"
                alt="Decorated cookies by Rose and Sugar"
                className="rounded-lg shadow-lg max-w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
