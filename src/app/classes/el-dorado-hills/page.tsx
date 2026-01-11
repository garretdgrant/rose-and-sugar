import Link from "next/link";
import Script from "next/script";
import FAQAccordion from "@/components/FAQAccordion";
import SectionDivider from "@/components/ui/sectionDivider";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Cookie Decorating Classes in El Dorado Hills, CA | Rose & Sugar",
    description:
      "Explore cookie decorating classes near El Dorado Hills, CA with Rose & Sugar. Small-group instruction, all supplies included, and custom cookie options.",
    path: "/classes/el-dorado-hills",
  });
}

const faqs = [
  {
    question: "Are there cookie decorating classes near El Dorado Hills?",
    answer:
      "Yes, Rose & Sugar hosts classes nearby with all supplies included.",
  },
  {
    question: "Is this a good cooking class for groups?",
    answer:
      "Yes. Our classes are great for friends, families, and team outings.",
  },
  {
    question: "Do you provide everything for the class?",
    answer:
      "We provide cookies, icing, tools, and packaging so you can focus on decorating.",
  },
  {
    question: "Do you make custom cookies for El Dorado Hills events?",
    answer:
      "Yes, we create custom cookie sets for weddings, showers, and celebrations.",
  },
];

const ElDoradoHillsClassesPage = () => {
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
        id="faq-jsonld-el-dorado-hills"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">
            Cookie Decorating Classes in El Dorado Hills
          </h1>
          <p className="body-text text-center max-w-3xl mx-auto">
            Rose &amp; Sugar welcomes El Dorado Hills guests to our cookie
            decorating classes. These cooking classes are creative, relaxed, and
            designed for all skill levels — with every supply included.
          </p>

          <div className="mt-10 bg-white rounded-xl p-6 md:p-8 shadow-xl">
            <h2 className="section-subheading text-center">
              Learn Cookie Artistry Near El Dorado Hills
            </h2>
            <div className="content-spacing mt-6">
              <p className="body-text">
                You&apos;ll master the fundamentals and take home a set of
                beautifully decorated cookies. Whether you&apos;re celebrating a
                milestone or planning a unique group outing, our classes make it
                easy to create something special.
              </p>
              <p className="body-text">
                Looking for custom cookies in El Dorado Hills? We design
                made-to-order sets for weddings, showers, corporate events, and
                gifts.
              </p>
            </div>
          </div>

          <SectionDivider icon="chefHat" />

          <div className="mt-10 bg-bakery-pink-light/30 rounded-xl p-6 md:p-8">
            <h2 className="section-subheading text-center">
              See Upcoming Class Dates
            </h2>
            <p className="body-text text-center max-w-2xl mx-auto mt-4">
              Browse the schedule and reserve your spot today.
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
              Planning an El Dorado Hills celebration? Order custom cookies or
              pick a pre-designed set that&apos;s ready to order.
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

          <SectionDivider icon="flower" />

          <section className="bg-white rounded-xl p-6 md:p-8 shadow-xl mt-10">
            <h2 className="section-subheading text-center">
              El Dorado Hills Cookie Class FAQs
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ElDoradoHillsClassesPage;
