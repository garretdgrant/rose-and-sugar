"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  id: number | string;
  text: string;
  name: string;
  event: string;
  stars: number;
};

type TrustIndicator = {
  value: string;
  label: string;
};

interface TestimonialsProps {
  headline?: React.ReactNode;
  subheading?: string;
  testimonials?: Testimonial[];
  showTrustIndicators?: boolean;
  trustIndicators?: TrustIndicator[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    text: "Megan's cookies are absolutely magical! She made the most beautiful set for my daughter's birthday party. Not only did they look stunning, but they tasted amazing too!",
    name: "Sarah J.",
    event: "Birthday Party",
    stars: 5,
  },
  {
    id: 2,
    text: "I took one of Megan's decorating classes with friends and it was SO much fun! She's patient, creative, and makes the whole experience enjoyable. Can't wait to go back!",
    name: "Lisa M.",
    event: "Decorating Class",
    stars: 5,
  },
  {
    id: 3,
    text: "The custom cookies Megan created for our baby shower were perfect. Everyone loved the delicate floral designs, and the packaging was beautiful. Highly recommend!",
    name: "Jessica & David",
    event: "Baby Shower",
    stars: 5,
  },
];

const defaultTrustIndicators: TrustIndicator[] = [
  { value: "200+", label: "Happy Customers" },
  { value: "5.0", label: "Average Rating" },
  { value: "100%", label: "Satisfaction" },
];

const defaultHeadline = (
  <>
    &ldquo;Megan&apos;s cookies are{" "}
    <span className="inline-block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent px-1 pb-2">
      pure magic
    </span>
    !&rdquo;
  </>
);

const Testimonials = ({
  headline = defaultHeadline,
  subheading = "What our happy customers are saying",
  testimonials = defaultTestimonials,
  showTrustIndicators = true,
  trustIndicators = defaultTrustIndicators,
}: TestimonialsProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTestimonials =
    testimonials.length >= 3 ? testimonials : defaultTestimonials;
  const resolvedTrustIndicators =
    trustIndicators.length > 0 ? trustIndicators : defaultTrustIndicators;

  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className="w-4 h-4 text-yellow-400 fill-yellow-400"
          aria-hidden="true"
        />
      ));
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bakery-pink-light/40 via-bakery-cream/30 to-white" />

      {/* Decorative elements */}
      <div
        className={`absolute top-1/4 -left-20 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-bakery-peach/30 to-transparent blur-3xl transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-1/4 -right-20 w-[350px] h-[350px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl transition-all duration-1000 delay-200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Large decorative quote marks */}
      <div
        className={`absolute top-20 left-[10%] transition-all duration-1000 delay-300 ${
          mounted ? "opacity-10" : "opacity-0"
        }`}
      >
        <Quote className="w-32 h-32 text-bakery-pink-dark transform -rotate-12" />
      </div>
      <div
        className={`absolute bottom-20 right-[10%] transition-all duration-1000 delay-500 ${
          mounted ? "opacity-10" : "opacity-0"
        }`}
      >
        <Quote className="w-24 h-24 text-bakery-brown transform rotate-12 scale-x-[-1]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="font-playfair text-4xl md:text-5xl lg:text-6xl italic text-gray-800 leading-tight"
            id="testimonials-heading"
          >
            {headline}
          </h2>
          <p className="mt-6 font-poppins text-lg text-gray-600">
            {subheading}
          </p>
        </div>

        {/* Testimonials grid - editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured testimonial - larger */}
          <div
            className={`md:col-span-7 transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="group h-full bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl border border-bakery-pink-light/20 hover:border-bakery-pink-light/50 transition-all duration-500 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-bakery-pink-dark via-bakery-pink to-bakery-peach rounded-l-3xl" />

              <div className="pl-4">
                {/* Quote icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-bakery-peach/50 flex items-center justify-center">
                    <Quote className="w-6 h-6 text-bakery-pink-dark" />
                  </div>
                </div>

                {/* Quote text */}
                <blockquote className="font-playfair text-2xl md:text-3xl text-gray-800 leading-relaxed mb-8">
                  &ldquo;{resolvedTestimonials[0].text}&rdquo;
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center">
                      <span className="font-bebas text-xl text-bakery-pink-dark">
                        {resolvedTestimonials[0].name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-gray-800">
                        {resolvedTestimonials[0].name}
                      </p>
                      <p className="font-poppins text-sm text-gray-500">
                        {resolvedTestimonials[0].event}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex gap-1"
                    role="img"
                    aria-label={`${resolvedTestimonials[0].stars} out of 5 stars`}
                  >
                    {renderStars(resolvedTestimonials[0].stars)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stacked testimonials */}
          <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
            {resolvedTestimonials.slice(1).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-1000 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg border border-bakery-pink-light/20 hover:border-bakery-pink-light/50 transition-all duration-500">
                  {/* Stars */}
                  <div
                    className="flex gap-1 mb-4"
                    role="img"
                    aria-label={`${testimonial.stars} out of 5 stars`}
                  >
                    {renderStars(testimonial.stars)}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-poppins text-gray-700 leading-relaxed mb-5">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bakery-peach to-bakery-cream flex items-center justify-center">
                      <span className="font-bebas text-sm text-bakery-brown">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-poppins font-medium text-sm text-gray-800">
                        {testimonial.name}
                      </p>
                      <p className="font-poppins text-xs text-gray-500">
                        {testimonial.event}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        {showTrustIndicators && (
          <div
            className={`mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12 transition-all duration-1000 delay-800 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {resolvedTrustIndicators.map((indicator, index) => (
              <div key={indicator.label} className="flex items-center gap-8">
                <div className="text-center">
                  <p className="font-bebas text-4xl text-bakery-pink-dark">
                    {indicator.value}
                  </p>
                  <p className="font-poppins text-sm text-gray-500">
                    {indicator.label}
                  </p>
                </div>
                {index < resolvedTrustIndicators.length - 1 && (
                  <div className="hidden md:block w-px h-12 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
