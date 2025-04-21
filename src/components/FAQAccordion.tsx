import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

export type FAQ = {
  question: string;
  answer: string;
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
}: FAQAccordionProps) => (
  <Accordion
    type="single"
    collapsible
    className={`w-full max-w-3xl mx-auto border-none ${className}`}
    defaultValue={
      initiallyOpenIndex >= 0 ? String(initiallyOpenIndex) : undefined
    }
  >
    {faqs.map((faq, idx) => (
      <AccordionItem key={idx} value={String(idx)}>
        <AccordionTrigger className="text-lg font-medium text-bakery-pink-dark [&[data-state=open]]:text-bakery-pink">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-base text-gray-700 bg-bakery-pink-light/10 rounded-b px-4 py-2">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default FAQAccordion;
