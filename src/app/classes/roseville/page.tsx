import Link from "next/link";
import Script from "next/script";
import FAQAccordion from "@/components/FAQAccordion";
import SectionDivider from "@/components/ui/sectionDivider";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Custom Cookie Decorating Classes in Roseville, CA | Rose & Sugar",
    description:
      "Join sugar cookie decorating classes near Roseville, CA with Rose & Sugar. Small-group instruction, all supplies included, and custom cookie options.",
    path: "/classes/roseville",
  });
}

const faqs = [
  {
    question: "Are there cookie decorating classes near Roseville?",
    answer:
      "Yes, Rose & Sugar welcomes Roseville guests to nearby classes with all supplies included.",
  },
  {
    question: "Is this a good cooking class for beginners?",
    answer:
      "Yes. Classes are beginner-friendly and include guided instruction.",
  },
  {
    question: "What is included in the class?",
    answer:
      "You&apos;ll receive cookies, icing, tools, packaging, and step-by-step guidance.",
  },
  {
    question: "Do you offer custom cookies in Roseville?",
    answer:
      "Yes, custom cookie orders are available for Roseville celebrations and events.",
  },
];

const RosevilleClassesPage = () => {
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
        id="faq-jsonld-roseville"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">
            Cookie Decorating Classes in Roseville
          </h1>
          <p className="body-text text-center max-w-3xl mx-auto">
            Rose &amp; Sugar offers cookie decorating classes for Roseville
            guests who want a fun, hands-on cooking class experience. Learn
            piping, flooding, and finishing techniques in a welcoming,
            beginner-friendly setting.
          </p>

          <div className="mt-10 bg-white rounded-xl p-6 md:p-8 shadow-xl">
            <h2 className="section-subheading text-center">
              A Creative Cookie Class Experience
            </h2>
            <div className="content-spacing mt-6">
              <p className="body-text">
                Each class includes all supplies, expert guidance, and a set of
                cookies you decorate yourself. You&apos;ll leave with polished
                designs, new skills, and plenty of inspiration to keep creating
                at home.
              </p>
              <p className="body-text">
                If you&apos;re also searching for custom cookies in Roseville,
                our studio takes custom orders for celebrations, corporate
                events, and family gatherings.
              </p>
            </div>
          </div>

          <SectionDivider icon="flower" />

          <div className="mt-10 bg-bakery-pink-light/30 rounded-xl p-6 md:p-8">
            <h2 className="section-subheading text-center">
              See Upcoming Classes Near Roseville
            </h2>
            <p className="body-text text-center max-w-2xl mx-auto mt-4">
              Browse upcoming class themes, dates, and availability.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/classes" className="btn-primary">
                Book a Class
              </Link>
            </div>
          </div>

          <SectionDivider icon="cookie" />

          <section className="bg-white rounded-xl p-6 md:p-8 shadow-xl mt-10">
            <h2 className="section-subheading text-center">
              Order Custom or Ready-to-Order Cookies
            </h2>
            <p className="body-text text-center max-w-2xl mx-auto mt-4">
              Planning a Roseville celebration? Order custom cookies or choose a
              ready-to-order pre-designed set for gifting and events.
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
              Roseville Cookie Class FAQs
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default RosevilleClassesPage;
