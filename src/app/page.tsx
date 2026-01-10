import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/ui/sectionDivider";

const About = dynamic(() => import("@/components/About"), {
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
    answer:
      "No. We can not legally ship cookies under California Cottage Laws.",
  },
  {
    question: "Do you deliver?",
    answer:
      "Not at this time. You must pick up your order at the specified location in Folsom (on Old Town side) sent via email.",
  },
  {
    question: "How far in advance should I order?",
    answer:
      "We are currently booking one month out depending on the time of year. It's never too early to order!! Sometimes we do have cancellations and can squeeze you in but it’s never a guarantee.",
  },
  {
    question: "How do I pay?",
    answer: "We accept cash, check, Venmo, Zelle, or Apple Cash.",
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
    answer:
      "Right now, I only offer cookies made with gluten-free flour. They are not certified gluten free cookies so they are not recommended for serious gluten allergies.",
  },
];

const galleryItems = [
  {
    src: "/gallery/easter.jpg",
    alt: "3-tier wedding cake",
    caption: "Easter basket cookies",
  },
  {
    src: "/gallery/class1.jpg",
    alt: "Cake decorating class",
    caption: "Cookie Decorating Class",
  },
  {
    src: "/gallery/catCookies.jpg",
    alt: "Cupcake platter",
    caption: "Cat theme cookies",
  },
  {
    src: "/gallery/wedding3.jpg",
    alt: "3-tier wedding cake",
    caption: "3-tier wedding cake — EDH",
  },
  {
    src: "/gallery/insects.jpg",
    alt: "Birthday cake",
    caption: "Garden theme cookies",
  },
  {
    src: "/gallery/weddingCookies2.jpg",
    alt: "Baby shower cake",
    caption: "Gender reveal cake",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider icon="cookie" />
      <About />
      {/* FAQ Section */}
      <section
        className="custom-container px-8 bg-gradient-to-b to-white from-bakery-pink-light/70"
        aria-labelledby="faq-heading"
      >
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl max-w-3xl mx-auto w-full">
          <h2
            className="font-bebas text-2xl md:text-3xl text-center mb-6 text-bakery-pink-dark"
            id="faq-heading"
          >
            Have questions? We&apos;ve got answers.
          </h2>
          <FAQAccordion faqs={faqs} initiallyOpenIndex={0} />
        </div>
      </section>
      <SectionDivider icon="flower2" />
      <Services />
      <Testimonials />
      <SectionDivider icon="flower" />
      <Gallery items={galleryItems} />
      <SectionDivider icon="chefHat" />
      <CallToAction />
    </>
  );
}
