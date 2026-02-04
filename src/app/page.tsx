import dynamic from "next/dynamic";
import Link from "next/link";
import Hero from "@/components/Hero";

const About = dynamic(() => import("@/components/About"), {
  loading: () => null,
});
const FeaturedShop = dynamic(() => import("@/components/FeaturedShop"), {
  loading: () => null,
});
const Services = dynamic(() => import("@/components/Services"), {
  loading: () => null,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => null,
});
const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => null,
});
const CallToAction = dynamic(() => import("@/components/CallToAction"), {
  loading: () => null,
});
const FAQAccordion = dynamic(() => import("@/components/FAQAccordion"), {
  loading: () => null,
});

const faqs = [
  {
    question: "Do you ship?",
    answer: (
      <>
        No. We can not legally ship cookies under California Cottage Laws.
        Please reach out via our{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          contact page
        </Link>{" "}
        for pickup details.
      </>
    ),
  },
  {
    question: "Do you deliver?",
    answer: (
      <>
        Not at this time. You must pick up your order at the specified location
        in Folsom (on Old Town side) sent via email. If you have questions,
        <Link className="text-bakery-pink-dark" href="/contact">
          {" "}
          contact us
        </Link>
        .
      </>
    ),
  },
  {
    question: "How far in advance should I order?",
    answer: (
      <>
        We are currently booking one month out depending on the time of year.
        It&apos;s never too early to order!! Sometimes we do have cancellations
        and can squeeze you in but it&apos;s never a guarantee. For custom
        orders, start here:{" "}
        <Link
          className="text-bakery-pink-dark"
          href="/cookies/order-custom-sugar-cookies"
        >
          Custom Cookie Orders
        </Link>
        .
      </>
    ),
  },
  {
    question: "How do I pay?",
    answer: (
      <>
        We accept cash, check, Venmo, Zelle, or Apple Cash. If you need an
        invoice,{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          reach out
        </Link>
        .
      </>
    ),
  },
  {
    question: "Do you have to put a deposit down?",
    answer:
      "We require full payment to secure your order. I request full payment two weeks prior to pickup.",
  },
  {
    question: "Can I refrigerate my cookies?",
    answer:
      "Refrigeration is not recommended. Cookies will remain fresh for up to 2 weeks at room temp in the packaging. You can freeze the cookies for up to 3 months. Each order will come with Cookie Care instructions.",
  },
  {
    question: "Do you have gluten-free or keto friendly options?",
    answer: (
      <>
        Right now, I only offer cookies made with gluten-free flour. They are
        not certified gluten free cookies so they are not recommended for
        serious gluten allergies. Please{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          contact us
        </Link>{" "}
        with any dietary questions.
      </>
    ),
  },
];

const galleryItems = [
  {
    src: "/gallery/easter.jpg",
    alt: "Easter themed decorated cookies",
    caption: "Easter basket cookies",
  },
  {
    src: "/gallery/class1.jpg",
    alt: "Guests enjoying a cookie decorating class",
    caption: "Cookie Decorating Class",
  },
  {
    src: "/gallery/catCookies.jpg",
    alt: "Cat themed decorated cookies",
    caption: "Cat theme cookies",
  },
  {
    src: "/gallery/wedding3.jpg",
    alt: "Elegant wedding themed cookies",
    caption: "Wedding cookies",
  },
  {
    src: "/gallery/insects.jpg",
    alt: "Garden insect themed decorated cookies",
    caption: "Garden theme cookies",
  },
  {
    src: "/gallery/weddingCookies2.jpg",
    alt: "Beautiful wedding cookies",
    caption: "Wedding cookies",
  },
];

export default function Home() {
  return (
    <main className="page-transition">
      {/* Hero - Full screen dramatic intro */}
      <Hero />

      {/* About - Meet Megan, organic flowing design */}
      <About />

      {/* Services - What we offer with asymmetric cards */}
      <Services />

      {/* Featured Shop - Classes and cookies for purchase */}
      <FeaturedShop />

      {/* Testimonials - Social proof with editorial quotes */}
      <Testimonials />

      {/* Gallery - Visual showcase with masonry layout */}
      <Gallery items={galleryItems} />

      {/* FAQ Section - Redesigned with modern styling */}
      <section
        className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/40"
        aria-labelledby="faq-heading"
      >
        {/* Decorative elements */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-peach/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2
              className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              id="faq-heading"
            >
              <span className="text-gray-800">Common</span>{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="mt-6 font-poppins text-lg text-gray-600">
              Everything you need to know about our cookies and classes
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/5 border border-bakery-pink-light/20 max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} initiallyOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* Call to Action - Bold finishing statement */}
      <CallToAction />
    </main>
  );
}
