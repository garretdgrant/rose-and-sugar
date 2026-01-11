import Link from "next/link";
import Script from "next/script";
import FAQAccordion from "@/components/FAQAccordion";
import SectionDivider from "@/components/ui/sectionDivider";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Cookie Decorating Classes in Folsom, CA | Rose & Sugar",
    description:
      "Join cookie decorating classes in Folsom, CA with Rose & Sugar. Hands-on instruction, small groups, and take-home treats. Book your spot today.",
    path: "/classes/folsom",
  });
}

const faqs = [
  {
    question: "Where are the cookie decorating classes held for Folsom?",
    answer:
      "Classes are hosted in the Folsom area with exact details sent after booking.",
  },
  {
    question: "Do I need experience to join a cookie decorating class?",
    answer:
      "No experience is required. Classes are beginner-friendly with step-by-step instruction.",
  },
  {
    question: "What is included in the class?",
    answer:
      "All supplies are included, plus a set of cookies to decorate and take home.",
  },
  {
    question: "Do you offer custom cookies in Folsom?",
    answer:
      "Yes, custom cookie orders are available for celebrations and events.",
  },
];

const FolsomClassesPage = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="page-wrapper">
      <Script
        id="faq-jsonld-folsom"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">Cookie Decorating Classes in Folsom</h1>
          <p className="body-text text-center max-w-3xl mx-auto">
            Looking for cookie decorating classes in Folsom? Rose &amp; Sugar
            hosts hands-on cookie decorating and cooking classes for beginners
            and creatives who want a fun, sweet experience. Each class includes
            expert instruction, all supplies, and a take-home box of beautifully
            decorated cookies.
          </p>

          <div className="mt-10 bg-white rounded-xl p-6 md:p-8 shadow-xl">
            <h2 className="section-subheading text-center">
              What to Expect in Our Folsom Classes
            </h2>
            <div className="content-spacing mt-6">
              <p className="body-text">
                You&apos;ll learn classic piping techniques, flooding, and
                detail work in a relaxed setting. Classes are small, so you get
                personal guidance while creating designs that feel custom to
                you. Perfect for friends&apos; nights out, birthday
                celebrations, or a creative weekend activity.
              </p>
              <p className="body-text">
                Looking for custom cookies in Folsom? We also take custom orders
                for parties, showers, and events. Our designs are handcrafted
                with floral-inspired details and personalized touches.
              </p>
            </div>
          </div>

          <SectionDivider icon="flower" />

          <div className="mt-10 bg-bakery-pink-light/30 rounded-xl p-6 md:p-8">
            <h2 className="section-subheading text-center">
              Book a Cookie Decorating Class in Folsom
            </h2>
            <p className="body-text text-center max-w-2xl mx-auto mt-4">
              View upcoming class dates, reserve your seat, and see what&apos;s
              included.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/classes" className="btn-primary">
                View Class Schedule
              </Link>
            </div>
          </div>

          <SectionDivider icon="cookie" />

          <section className="bg-white rounded-xl p-6 md:p-8 shadow-xl mt-10">
            <h2 className="section-subheading text-center">
              Order Custom or Ready-to-Order Cookies
            </h2>
            <p className="body-text text-center max-w-2xl mx-auto mt-4">
              Need cookies for a celebration in Folsom? Choose a fully custom
              design or browse pre-designed sets that are ready to order.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cookies/custom-orders" className="btn-primary">
                Start a Custom Order
              </Link>
              <Link href="/cookies/pre-designed" className="btn-secondary">
                Shop Pre-Designed Sets
              </Link>
            </div>
          </section>

          <SectionDivider icon="flower2" />

          <section className="bg-white rounded-xl p-6 md:p-8 shadow-xl mt-10">
            <h2 className="section-subheading text-center">
              Folsom Cookie Class FAQs
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default FolsomClassesPage;
