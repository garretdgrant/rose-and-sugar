"use client";
import { useEffect, useState } from "react";
import ClassProductCard from "@/components/ClassProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import {
  Check,
  Users,
  Sparkles,
  Clock,
  Package,
  Heart,
  Calendar,
  Mail,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ClientClasses = () => {
  const [upcomingClasses, setUpcomingClasses] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const classFeatures = [
    "Hands-on instruction perfect for all skill levels",
    "All supplies included (cookies, icing, tools, and packaging)",
    "Small group setting with maximum 15 attendees",
    "Learn multiple decorating techniques",
    "Take home your beautiful cookie creations",
    "Fun, relaxed atmosphere with lots of creative freedom",
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: "Expert Guidance",
      desc: "Learn from Megan with step-by-step instruction",
    },
    {
      icon: Clock,
      title: "1.5-2 Hours",
      desc: "Relaxed pace with plenty of creative time",
    },
    {
      icon: Package,
      title: "All Included",
      desc: "Cookies, icing, tools & take-home box",
    },
    {
      icon: Heart,
      title: "Beginner Friendly",
      desc: "No experience needed to create beautiful cookies",
    },
  ];

  useEffect(() => {
    const loadClasses = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const products = await fetchProducts(
          20,
          'product_type:"Cookie Decorating Class"',
        );
        setUpcomingClasses(products);
      } catch (error) {
        console.error("Failed to load classes:", error);
        setLoadError("We couldn't load upcoming classes right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadClasses();
  }, []);

  return (
    <div className="min-h-screen bg-bakery-cream">
      {/* Subtle paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.4] z-0"
        style={{
          backgroundImage: `url("/paper-texture.svg")`,
        }}
      />

      <main className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-gray-900 leading-[0.9]">
              Cookie Decorating
              <span className="block text-bakery-pink-dark">Classes</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-600 font-poppins max-w-2xl mx-auto leading-relaxed">
              Join Megan for a fun, creative cookie decorating experience.
              Small-group classes designed for all skill levels in a warm,
              supportive environment.
            </p>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="mt-16 container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full bg-bakery-peach rounded-2xl" />
              <Image
                src="/roseSugarClassCropped.webp"
                alt="Cookie decorating class in progress"
                width={900}
                height={500}
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover lg:h-[520px]"
                priority
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-4 md:bottom-6 md:-left-6 bg-white rounded-xl p-4 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bakery-pink-light flex items-center justify-center">
                    <Users className="w-5 h-5 text-bakery-pink-dark" />
                  </div>
                  <div>
                    <p className="font-bebas text-xl text-bakery-pink-dark">
                      Small Groups
                    </p>
                    <p className="text-sm text-gray-600 font-poppins">
                      Max 15 attendees
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Row */}
        <section className="mt-24 container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bakery-pink-light/50 mb-3 group-hover:bg-bakery-pink-light transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-bakery-pink-dark" />
                  </div>
                  <h3 className="font-bebas text-lg text-gray-900 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 font-poppins">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book a Class Section - The Main Calendar Section */}
        <section className="mt-28 relative py-20">
          {/* Decorative background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-bakery-cream via-bakery-pink-light/30 to-bakery-cream" />
            {/* Decorative shapes */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-bakery-peach/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-bakery-pink-light/30 rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Section header */}
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-poppins text-bakery-pink-dark border border-bakery-pink-light/50 shadow-sm mb-6">
                  <Calendar className="w-4 h-4" />
                  Upcoming Sessions
                </span>
                <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight">
                  Book a Decorating Class
                </h2>
                <p className="mt-4 text-lg text-gray-600 font-poppins max-w-xl mx-auto">
                  Select from our upcoming cookie decorating classes and reserve
                  your spot today
                </p>
              </div>

              {/* Class Cards Grid - Now without wrapper card for cleaner look */}
              {isLoading ? (
                <div className="flex justify-center items-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-bakery-pink-dark" />
                </div>
              ) : loadError ? (
                <div className="text-center py-12 bg-white/70 rounded-2xl border border-bakery-pink-light/40">
                  <p className="text-gray-600">{loadError}</p>
                </div>
              ) : upcomingClasses.length === 0 ? (
                <div className="text-center py-12 bg-white/70 rounded-2xl border border-bakery-pink-light/40">
                  <p className="text-gray-600">
                    No upcoming classes at the moment. Check back soon for new
                    dates!
                  </p>
                </div>
              ) : (
                <div
                  className={`grid gap-6 lg:gap-8 ${
                    upcomingClasses.length === 1
                      ? "grid-cols-1 max-w-md mx-auto"
                      : upcomingClasses.length === 2
                        ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {upcomingClasses.map((classItem) => (
                    <ClassProductCard
                      key={classItem.node.id}
                      product={classItem}
                    />
                  ))}
                </div>
              )}

              {/* Waitlist CTA - Elevated card design */}
              <div className="mt-14">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-bakery-pink-dark" />
                      </div>
                      <div className="text-center md:text-left">
                        <p className="font-bebas text-xl text-gray-900">
                          Don&apos;t miss out
                        </p>
                        <p className="text-sm text-gray-600 font-poppins">
                          Get notified when new classes are added
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-bakery-pink-dark text-white px-6 py-3 rounded-full font-poppins font-medium shadow-md shadow-bakery-pink-dark/20 hover:shadow-lg hover:shadow-bakery-pink-dark/30 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                    >
                      Join Waitlist
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="mt-28 container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-bebas text-4xl md:text-5xl text-center text-gray-900 tracking-tight mb-12">
              What&apos;s Included
            </h2>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-full bg-bakery-pink-light flex items-center justify-center">
                  <Users className="w-6 h-6 text-bakery-pink-dark" />
                </div>
                <span className="font-bebas text-2xl md:text-3xl text-gray-900">
                  Small-Group Experience
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {classFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-bakery-cream/50 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-bakery-pink-light/50 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-bakery-pink-dark" />
                    </div>
                    <p className="text-gray-700 font-poppins">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Class Experience Section */}
        <section className="mt-28 container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-bebas text-4xl md:text-5xl text-center text-gray-900 tracking-tight mb-12">
              The Class Experience
            </h2>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Content */}
              <div className="space-y-6">
                <p className="text-gray-700 font-poppins text-lg leading-relaxed">
                  Each Rose & Sugar class is designed to be both educational and
                  enjoyable. You&apos;ll learn various decorating methods
                  including outlining, flooding, detail piping, and wet-on-wet
                  designs. Each class begins with a practice cookie and practice
                  piping sheet before jumping into the set.
                </p>

                <p className="text-gray-700 font-poppins text-lg leading-relaxed">
                  Classes typically run for 1.5-2 hours, giving you plenty of
                  time to practice your skills and decorate 3-5 cookies that
                  you&apos;ll take home in a beautiful box. We keep our classes
                  small (maximum 15 people) to ensure everyone receives personal
                  attention.
                </p>

                <p className="text-gray-700 font-poppins text-lg leading-relaxed">
                  No experience necessary — just bring your creativity! Classes
                  are perfect for friends&apos; nights out, birthday
                  celebrations, or anyone looking to learn a new skill in a
                  supportive environment.
                </p>
              </div>

              {/* Testimonial Card */}
              <div className="relative">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-bakery-peach rounded-2xl" />
                <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="absolute -top-4 left-8">
                    <span className="text-6xl text-bakery-pink-light font-serif">
                      &ldquo;
                    </span>
                  </div>
                  <div className="pt-6">
                    <p className="text-gray-700 font-poppins text-lg italic leading-relaxed">
                      The cookie decorating class was so fun! It was
                      intimidating coming into the class but with Megan&apos;s
                      great instruction and being able to bring it down to an
                      entry level it was so much fun and we were able to create
                      really beautiful designs!
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-bakery-pink-light flex items-center justify-center">
                        <span className="font-bebas text-bakery-pink-dark">
                          B
                        </span>
                      </div>
                      <div>
                        <p className="font-poppins font-medium text-gray-900">
                          Brittany D.
                        </p>
                        <p className="text-sm text-gray-500">Class Attendee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Private Classes CTA */}
        <section className="mt-28 bg-bakery-pink-dark py-16 md:py-20 relative overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-bakery-pink/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-bakery-peach/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-poppins text-white mb-6">
                Private Events
              </span>
              <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
                Host a Private Class
              </h2>
              <p className="mt-6 text-lg text-white/90 font-poppins max-w-xl mx-auto">
                Looking for a unique activity for a bridal shower, team
                building, or birthday celebration? Private classes are tailored
                to your event with a minimum of 8 guests at $55 per person.
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-white text-bakery-pink-dark px-8 py-4 rounded-full font-poppins font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Inquire About Private Classes
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientClasses;
