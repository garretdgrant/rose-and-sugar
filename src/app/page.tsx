import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import CallToAction from "../components/CallToAction";
import FAQAccordion from "../components/FAQAccordion";

const faqs = [
  {
    question: "How far in advance should I order custom cookies?",
    answer:
      "We recommend placing your order at least 2-3 weeks in advance for custom designs. For major holidays or peak wedding season, earlier is better!",
  },
  {
    question: "Do you deliver or ship cookies?",
    answer:
      "We offer local pickup in Folsom. Shipping is available for an additional fee within California only, as we want to ensure your cookies arrive in perfect condition.",
  },
  {
    question: "How long do the cookies stay fresh?",
    answer:
      "Our cookies stay fresh for up to 3 weeks when stored in their sealed packaging at room temperature. Once opened, we recommend enjoying them within 5-7 days.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "While our standard recipes contain wheat, dairy, and eggs, we can discuss options for certain dietary needs. Please note that all cookies are prepared in a kitchen that processes nuts.",
  },
  {
    question: "How do I book a private decorating class?",
    answer:
      "Fill out our contact form with your preferred date, group size, and event details. Private classes require a minimum of 8 participants and can be hosted at your location or a reserved venue.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* FAQ Section below Hero */}
      <section className="py-14 px-4 bg-white/70">
        <h2 className="font-fraunces text-2xl md:text-3xl text-center mb-6 text-bakery-pink-dark">
          Have questions? We&apos;ve got answers.
        </h2>
        <FAQAccordion faqs={faqs} initiallyOpenIndex={0} />
      </section>
      <Services />
      <Testimonials />
      <Gallery />
      <CallToAction />
    </>
  );
}
