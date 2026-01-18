import CustomInquiryForm from "@/components/CustomCookieInquiry";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const customOrderFaqs = [
  {
    question: "How far in advance should I order custom cookies?",
    answer: (
      <>
        We recommend placing your order at least 2-3 weeks in advance. Rush
        orders may be available for an additional fee, but cannot be
        guaranteed. For timing questions,{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          contact us
        </Link>
        .
      </>
    ),
  },
  {
    question: "What's included in the base price per dozen?",
    answer: (
      <>
        Starting at $65 per dozen, each order includes up to five colors and
        basic to intermediate detail. Character cookies and logos start at $70
        per dozen. Additional colors, airbrushing, and intricate designs may
        increase pricing. For a custom quote,{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          reach out
        </Link>
        .
      </>
    ),
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer: (
      <>
        Our cookies contain wheat, milk, eggs, and soy (in sprinkles). While we
        cannot guarantee allergen-free cookies, we&apos;re happy to discuss your
        specific needs.{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          Contact us
        </Link>{" "}
        for details.
      </>
    ),
  },
  {
    question: "What are the payment and pickup options?",
    answer: (
      <>
        We accept Zelle, cash, or Venmo. Payment is required at least two weeks
        before pickup to confirm your order. Pickup is available in Folsom, with
        preferred times on Saturdays. A $10 weekday pickup fee applies.{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          Contact us
        </Link>{" "}
        for scheduling.
      </>
    ),
  },
  {
    question: "How are the cookies packaged?",
    answer: (
      <>
        Cookies come individually heat-sealed for freshness at no additional
        cost. Ribbon-tied packaging is available for an additional charge per
        dozen. For packaging add-ons,{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          reach out
        </Link>
        .
      </>
    ),
  },
];

const CustomOrders = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bakery-cream/40 via-white to-bakery-pink-light/30">
      <main className="relative overflow-hidden pt-28 pb-20">

        {/* Decorative blobs */}
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-0 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-bakery-peach/40 to-transparent blur-3xl" />

        {/* Hero */}
        <section className="container-custom relative z-10 pt-4 md:pt-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Custom Orders
              </span>
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              <span className="text-gray-800">Custom</span>{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Cookie Orders
              </span>
            </h1>
            <p className="mt-6 font-poppins text-lg md:text-xl text-gray-600 leading-relaxed">
              Make your celebration extra sweet with custom-designed sugar
              cookies. Every set is handcrafted and tailored to your vision.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cookies/signature-sugar-cookie-sets"
                className="group inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full font-poppins font-medium border border-bakery-pink-light/60 hover:bg-bakery-pink-light/20 transition-all duration-300"
              >
                Looking for Signature Sets?
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="container-custom relative z-10 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-bakery-pink/20 border border-bakery-pink-light/60">
              <h2 className="font-bebas text-2xl md:text-3xl text-gray-800 mb-4">
                Pricing & Minimums
              </h2>
              <p className="text-gray-700 font-poppins leading-relaxed">
                Custom sugar cookies start at $65 per dozen with a two dozen
                minimum. Character and logo cookies start at $70 per dozen.
                Airbrushing, intricate designs, and additional colors may
                increase pricing.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-bakery-pink/20 border border-bakery-pink-light/60">
              <h2 className="font-bebas text-2xl md:text-3xl text-gray-800 mb-4">
                Important Notes
              </h2>
              <ul className="space-y-3 font-poppins text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-bakery-pink-dark" />
                  Orders should be placed at least two weeks in advance.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-bakery-pink-dark" />
                  All cookies contain wheat, milk, eggs, and soy (in sprinkles).
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-bakery-pink-dark" />
                  Pickup available in Folsom, preferred Saturdays.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-bakery-pink-dark" />
                  Payment via Zelle, cash, or Venmo.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="relative mt-10 py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-bakery-pink-light/40 via-bakery-cream/30 to-white" />
          <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
            <svg
              className="relative block w-full h-16 md:h-24 rotate-180"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
                className="fill-bakery-pink-light/30"
              />
            </svg>
          </div>
          <div className="container-custom relative z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/10 border border-bakery-pink-light/30">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-2xl md:text-3xl text-bakery-pink-dark">
                Request a Custom Order
              </h2>
              <p className="mt-2 text-gray-600 font-poppins">
                Tell us about your event and we&apos;ll follow up within 48
                hours.
              </p>
            </div>
            <CustomInquiryForm />
            <p className="text-center text-gray-600 mt-6 font-poppins">
              After you submit your request, Megan will follow up within 48
              hours with an invoice and next steps.
            </p>
          </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-custom relative z-10 mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/5 border border-bakery-pink-light/20 max-w-4xl mx-auto">
            <h2 className="font-bebas text-2xl md:text-3xl text-center text-bakery-pink-dark mb-6">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={customOrderFaqs} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default CustomOrders;
