import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FAQ = {
  question: string;
  answer: ReactNode;
};

interface FAQAccordionProps {
  faqs: FAQ[];
  initiallyOpenIndex?: number;
  className?: string;
}

const FAQAccordion = ({
  faqs,
  initiallyOpenIndex = -1,
  className = "",
}: FAQAccordionProps) => {
  return (
    <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
      {faqs.map((faq, idx) => {
        const isFeatured =
          initiallyOpenIndex >= 0 && initiallyOpenIndex === idx;
        return (
          <article
            key={`${faq.question}-${idx}`}
            className={cn(
              "rounded-2xl border border-bakery-pink-light/30 bg-white p-5 md:p-6 shadow-sm",
              isFeatured && "ring-2 ring-bakery-pink-light/60",
            )}
          >
            <h3 className="font-poppins text-lg font-semibold text-bakery-pink-dark">
              {faq.question}
            </h3>
            <div className="mt-3 font-poppins text-base leading-relaxed text-gray-700">
              {faq.answer}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
