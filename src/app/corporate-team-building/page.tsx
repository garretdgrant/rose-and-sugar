import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  Users,
  Palette,
  Heart,
  Gift,
  Phone,
  Building2,
  Briefcase,
  Home,
  Scale,
  Store,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import FAQAccordion from "@/components/FAQAccordion";
import Testimonials from "@/components/Testimonials";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Corporate Team Building Cookie Decorating Classes | Rose & Sugar",
    description:
      "Book a unique corporate team-building cookie decorating experience. Hands-on workshops for teams of all sizes, hosted on-site at your workplace or event location.",
    path: "/corporate-team-building",
  });
}

const CorporateTeamBuilding = () => {
  const benefits = [
    {
      icon: Users,
      title: "Encourages Collaboration",
      description:
        "Team members work together, share tips, and bond over a creative experience.",
    },
    {
      icon: Palette,
      title: "Hands-On & Creative",
      description:
        "Step away from screens and engage in something tactile and fun.",
    },
    {
      icon: Heart,
      title: "Inclusive for All",
      description:
        "No prior experience needed — everyone can participate and succeed.",
    },
    {
      icon: Gift,
      title: "Tangible Takeaways",
      description:
        "Each participant leaves with beautifully decorated cookies to share or enjoy.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose a Date & Group Size",
      description:
        "Pick a date that works for your team. We accommodate groups of all sizes.",
    },
    {
      number: "02",
      title: "Customize Your Experience",
      description:
        "Select a theme, difficulty level, or add optional company branding to your cookies.",
    },
    {
      number: "03",
      title: "We Come to You",
      description:
        "Rose & Sugar brings everything on-site — no need for your team to travel.",
    },
    {
      number: "04",
      title: "Enjoy the Experience",
      description:
        "Megan leads a fun, guided session with all supplies included.",
    },
  ];

  const audiences = [
    { icon: Building2, label: "Corporate Teams" },
    { icon: Briefcase, label: "Startups" },
    { icon: Home, label: "Real Estate Offices" },
    { icon: Scale, label: "Law Firms" },
    { icon: Store, label: "Small Businesses" },
    { icon: Globe, label: "Remote Teams Meeting In-Person" },
  ];

  const teamTestimonials = [
    {
      id: 1,
      text: "I have taken two cookie decorating classes with Megan and they have been WONDERFUL! She is an excellent teacher, the atmosphere of the class is very relaxing. It&apos;s a perfect way to spend time with friends and learn a new skill. Highly recommend!",
      name: "Aubrey Byers",
      event: "Corporate Team Class",
      stars: 5,
    },
    {
      id: 2,
      text: "Highly recommend Megan&apos;s cookie decorating class!!! Super fun and easy to understand instructions! I feel like a pro decorator now! And the cookies are the best I&apos;ve ever tasted!!!!!",
      name: "Jenn Phippin",
      event: "Company Outing",
      stars: 5,
    },
    {
      id: 3,
      text: "I recently took a class at Rose &amp; Sugar, and I&apos;m still glowing from the experience! The experience was calming, and so thoughtfully curated&mdash;you feel inspired the moment you walk in.",
      name: "Rose & Sugar Guest",
      event: "Team Retreat",
      stars: 5,
    },
  ];

  const faqs = [
    {
      question: "How large can a corporate team-building class be?",
      answerText:
        "We can accommodate a wide range of group sizes and customize the setup to fit your team.",
      answer: (
        <>
          We can accommodate a wide range of group sizes and customize the setup
          to fit your team. For a tailored plan,{" "}
          <Link className="text-bakery-pink-dark" href="/contact">
            contact us
          </Link>
          .
        </>
      ),
    },
    {
      question: "Do you host classes on-site at our office?",
      answerText:
        "Yes. We bring the full cookie decorating experience to your location.",
      answer: (
        <>
          Yes. We bring the full cookie decorating experience to your location.
          Share your details on our{" "}
          <Link className="text-bakery-pink-dark" href="/contact">
            contact page
          </Link>
          .
        </>
      ),
    },
    {
      question: "What is included in the corporate class?",
      answerText:
        "All cookies, icing, tools, packaging, and guided instruction are included.",
      answer: (
        <>
          All cookies, icing, tools, packaging, and guided instruction are
          included. View{" "}
          <Link className="text-bakery-pink-dark" href="/classes">
            upcoming classes
          </Link>{" "}
          for a preview.
        </>
      ),
    },
    {
      question: "Can you customize cookies with company branding?",
      answerText:
        "Yes. We can incorporate logos, brand colors, or a custom theme.",
      answer: (
        <>
          Yes. We can incorporate logos, brand colors, or a custom theme. Start
          here for{" "}
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
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerText,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bakery-cream/40 via-white to-bakery-pink-light/30">
      <Script
        id="faq-jsonld-corporate"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("/paper-texture.svg")`,
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute -top-40 right-0 w-[460px] h-[460px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-bakery-peach/40 to-transparent blur-3xl" />

        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Corporate Experiences
                </span>
              </div>
              <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-gray-800">
                Corporate
                <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Team Building
                </span>
              </h1>
              <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-poppins">
                Bring your team together for a fun, hands-on creative
                experience. No baking skills required — just a willingness to
                connect, collaborate, and have fun.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:9163378880"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  Request Corporate Class
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-poppins font-semibold rounded-full border-2 border-bakery-pink-light hover:border-bakery-pink hover:bg-bakery-pink-light/30 transition-all duration-300"
                >
                  Ask a Question
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bakery-pink-light/35 via-bakery-cream/30 to-white" />
          <div className="absolute top-16 -left-32 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-bakery-peach/40 to-transparent blur-3xl" />
          <div className="absolute bottom-10 -right-24 w-[360px] h-[360px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 mb-6">
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Why It Works
                </span>
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-gray-800">
                Cookie Decorating Builds Better Teams
              </h2>
              <p className="mt-6 font-poppins text-lg text-gray-600">
                Step away from the conference room and into a creative,
                stress-free environment that brings out the best in your team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg shadow-bakery-pink/10 hover:shadow-xl transition-all duration-300 border border-bakery-pink-light/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bakery-pink-light/50 flex items-center justify-center group-hover:bg-bakery-pink-light transition-colors duration-300">
                      <benefit.icon className="w-5 h-5 text-bakery-pink-dark" />
                    </div>
                    <div>
                      <h3 className="font-bebas text-xl text-gray-800">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-gray-600 font-poppins">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials
          subheading="What corporate teams are saying"
          testimonials={teamTestimonials}
          showTrustIndicators={false}
        />

        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute -top-20 left-0 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-bakery-pink-light/35 to-transparent blur-3xl" />
          <div className="absolute bottom-10 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-bakery-peach/35 to-transparent blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 mb-6">
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Simple Process
                </span>
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-gray-800">
                How the Experience Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg shadow-bakery-pink/10 border border-bakery-pink-light/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-12 rounded-full bg-bakery-pink-light/60 text-bakery-pink-dark font-bebas text-2xl flex items-center justify-center">
                      {step.number}
                    </span>
                    <h3 className="font-bebas text-2xl text-gray-800">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 font-poppins">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bakery-peach/20 via-white to-bakery-pink-light/20" />
          <div className="absolute top-10 right-0 w-[320px] h-[320px] rounded-full bg-gradient-to-bl from-bakery-pink-light/35 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-bakery-cream/40 to-transparent blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 mb-6">
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Perfect Fit
                </span>
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-gray-800">
                Who This Experience Is For
              </h2>
              <p className="mt-6 font-poppins text-lg text-gray-600">
                Our corporate classes are designed for teams of all types and
                sizes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
              {audiences.map((audience) => (
                <div
                  key={audience.label}
                  className="bg-white/85 backdrop-blur-sm p-5 rounded-2xl shadow-lg shadow-bakery-pink/10 text-center border border-bakery-pink-light/30 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-bakery-pink-light/50 flex items-center justify-center mx-auto mb-3">
                    <audience.icon className="w-6 h-6 text-bakery-pink-dark" />
                  </div>
                  <p className="font-poppins font-semibold text-gray-700 text-sm">
                    {audience.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute -top-16 right-0 w-[320px] h-[320px] rounded-full bg-gradient-to-bl from-bakery-pink-light/35 to-transparent blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center bg-white/90 backdrop-blur-sm rounded-3xl border border-bakery-pink-light/40 shadow-xl shadow-bakery-pink/10 p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light/60 mb-6">
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Custom Quotes
                </span>
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl text-gray-800">
                Custom Pricing for Your Team
              </h2>
              <p className="mt-6 font-poppins text-lg text-gray-600">
                Corporate events are custom-priced based on group size,
                location, and experience type. Whether you have a team of 10 or
                100, we&apos;ll create a package that fits your needs and
                budget.
              </p>
              <p className="mt-4 text-gray-600 font-poppins">
                Reach out to discuss your event, and we&apos;ll provide a
                personalized quote.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Request a Corporate Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="tel:9163378880"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-poppins font-semibold rounded-full border-2 border-bakery-pink-light hover:border-bakery-pink hover:bg-bakery-pink-light/30 transition-all duration-300"
                >
                  Call Megan
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bakery-cream/40 via-white to-bakery-pink-light/30" />
          <div className="absolute -top-12 left-0 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-bakery-pink-light/35 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[340px] h-[340px] rounded-full bg-gradient-to-bl from-bakery-peach/35 to-transparent blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 mb-6">
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Gallery
                </span>
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-gray-800">
                Team-Building in Action
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                {
                  src: "/gallery/class1.jpg",
                  alt: "Class participants decorating cookies together",
                },
                {
                  src: "/predesigned/welcome-home.webp",
                  alt: "Welcome Home signature sugar cookie set",
                },
                {
                  src: "/roseSugarClassCropped.webp",
                  alt: "Megan teaching a cookie decorating class",
                },
              ].map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-bakery-pink-light/30 shadow-lg shadow-bakery-pink/10"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 240px, (min-width: 768px) 33vw, 50vw"
                    quality={70}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute -top-16 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 mb-6">
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  FAQs
                </span>
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-gray-800">
                Corporate Class FAQs
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion
                faqs={faqs.map((faq) => ({
                  question: faq.question,
                  answer: faq.answer,
                }))}
              />
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bakery-pink-light/40 via-bakery-cream/40 to-white" />
          <div className="absolute -top-20 left-0 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-bakery-pink-light/40 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-bakery-peach/40 to-transparent blur-3xl" />

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-3xl border border-bakery-pink-light/40 shadow-xl shadow-bakery-pink/10 p-8 md:p-12">
              <h2 className="font-bebas text-4xl md:text-5xl text-gray-800 mb-4">
                Ready to Plan Your Team Event?
              </h2>
              <p className="font-poppins text-lg text-gray-600 mb-8">
                Let&apos;s create a memorable experience for your team. Share
                your details, and Megan will get back to you with options
                tailored to your group.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-full shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Request a Corporate Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CorporateTeamBuilding;
