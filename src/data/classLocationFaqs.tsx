import Link from "next/link";
import { ReactNode } from "react";

export type ClassLocationFaq = {
  question: string;
  answer: ReactNode;
  answerText: string;
};

export const buildClassLocationFaqs = (
  city: string
): ClassLocationFaq[] => [
  {
    question: `Are there cookie decorating classes in ${city}?`,
    answerText: `Yes, Rose & Sugar hosts classes for ${city} guests with all supplies included.`,
    answer: (
      <>
        Yes, Rose & Sugar hosts classes for {city} guests with all supplies
        included. See{" "}
        <Link className="text-bakery-pink-dark" href="/classes">
          upcoming classes
        </Link>
        .
      </>
    ),
  },
  {
    question: "Is this a good cooking class for beginners?",
    answerText:
      "Yes. Classes are beginner-friendly and include guided instruction.",
    answer: (
      <>
        Yes. Classes are beginner-friendly and include guided instruction. View{" "}
        <Link className="text-bakery-pink-dark" href="/classes">
          class sessions
        </Link>
        .
      </>
    ),
  },
  {
    question: "What is included in the class?",
    answerText:
      "You'll receive cookies, icing, tools, packaging, and step-by-step guidance.",
    answer: (
      <>
        You&apos;ll receive cookies, icing, tools, packaging, and step-by-step
        guidance. For full details,{" "}
        <Link className="text-bakery-pink-dark" href="/classes">
          view upcoming classes
        </Link>
        .
      </>
    ),
  },
  {
    question: `Do you offer custom cookies in ${city}?`,
    answerText: `Yes, custom cookie orders are available for ${city} celebrations and events.`,
    answer: (
      <>
        Yes, custom cookie orders are available for {city} celebrations and
        events. Start at{" "}
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
    question: `Where is the ${city} class held?`,
    answerText: `Classes are hosted near ${city}. You'll receive exact details after booking.`,
    answer: (
      <>
        Classes are hosted near {city}. You&apos;ll receive exact location
        details after booking. Browse{" "}
        <Link className="text-bakery-pink-dark" href="/classes">
          upcoming classes
        </Link>{" "}
        for the current schedule.
      </>
    ),
  },
  {
    question: `Can I book a private event in ${city}?`,
    answerText: `Yes, private classes are available for ${city} teams and celebrations.`,
    answer: (
      <>
        Yes, private classes are available for {city} teams and celebrations.
        Reach out via our{" "}
        <Link className="text-bakery-pink-dark" href="/contact">
          contact page
        </Link>{" "}
        to plan a custom event.
      </>
    ),
  },
];
