import CustomInquiryForm from "@/components/CustomCookieInquiry";
import FAQAccordion from "@/components/FAQAccordion";
import SectionDivider from "@/components/ui/sectionDivider";
import Link from "next/link";

const customOrderFaqs = [
  {
    question: "How far in advance should I order custom cookies?",
    answer:
      "We recommend placing your order at least 2-3 weeks in advance. Rush orders may be available for an additional fee, but cannot be guaranteed.",
  },
  {
    question: "What's included in the base price per dozen?",
    answer:
      "Starting at $65 per dozen, each order includes up to five colors and basic to intermediate detail. Character cookies and logos start at $70 per dozen. Additional colors, airbrushing, and intricate designs may increase pricing.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "Our cookies contain wheat, milk, eggs, and soy (in sprinkles). While we cannot guarantee allergen-free cookies, we're happy to discuss your specific needs.",
  },
  {
    question: "What are the payment and pickup options?",
    answer:
      "We accept Zelle, cash, or Venmo. Payment is required at least two weeks before pickup to confirm your order. Pickup is available in Folsom, with preferred times on Saturdays. A $10 weekday pickup fee applies.",
  },
  {
    question: "How are the cookies packaged?",
    answer:
      "Cookies come individually heat-sealed for freshness at no additional cost. Ribbon-tied packaging is available for an additional charge per dozen.",
  },
];

const CustomOrders = () => {
  return (
    <div className="min-h-screen pt-24 flex flex-col bg-bakery-offWhite">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-bebas text-4xl md:text-5xl text-bakery-pink-dark mb-6">
              Custom Cookie Orders
            </h1>
            <div className="prose mx-auto text-gray-700 space-y-4 max-w-3xl">
              <p className="text-lg">
                Make your celebration extra sweet with our custom-designed sugar
                cookies! Each cookie is handcrafted and decorated to match your
                vision perfectly.
              </p>
              <p className="text-lg">
                Looking for pre-designed cookies?{" "}
                <Link
                  className="text-bakery-pink-dark"
                  href="/cookies/pre-designed"
                >
                  Order Here
                </Link>
              </p>
              <div className="bg-white/80 rounded-lg p-6 shadow-sm text-left">
                <p>
                  Custom sugar cookies are available by the dozen, starting at
                  $65 per dozen with a two dozen minimum. Character and logo
                  cookies start at $70 per dozen. Airbrushing, intricate
                  designs, and additional colors may increase pricing.
                </p>
                <p className="mt-4">
                  <strong>Important Notes:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Orders should be placed at least two weeks in advance</li>
                  <li>
                    All cookies contain wheat, milk, eggs, and soy (in
                    sprinkles)
                  </li>
                  <li>
                    Pickup available in Folsom (preferred times on Saturdays)
                  </li>
                  <li>Payment via Zelle, cash, or Venmo</li>
                </ul>
              </div>
            </div>
          </div>
          <SectionDivider icon="cookie" />
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl mt-12 mb-12">
            <h2 className="font-bebas text-2xl md:text-3xl text-bakery-pink-dark mb-6 text-center">
              Request a Custom Order
            </h2>
            <CustomInquiryForm />
            <p className="text-center text-gray-600 mt-6">
              After you submit your request, Megan will follow up within 48
              hours with an invoice and next steps.
            </p>
          </div>

          <SectionDivider icon="flower2" />

          <section className="bg-white rounded-xl p-6 md:p-8 shadow-xl mt-12 mb-12">
            <h2 className="font-bebas text-2xl md:text-3xl text-center text-bakery-pink-dark mb-6">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={customOrderFaqs} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default CustomOrders;
