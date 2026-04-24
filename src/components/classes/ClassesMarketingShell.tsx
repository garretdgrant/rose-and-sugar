import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  Heart,
  Package,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

interface ClassesMarketingShellProps {
  badgeIcon: LucideIcon;
  badgeText: string;
  breadcrumb?: ReactNode;
  children: ReactNode;
  ctaHref: string;
  ctaLabel: string;
  description: ReactNode;
  titleLead: string;
  titleAccent: string;
}

const highlights = [
  {
    icon: Sparkles,
    title: "Expert Guidance",
    desc: "Learn from Megan with step-by-step instruction",
  },
  {
    icon: Clock,
    title: "1.5-2.5 Hours",
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
] as const;

const classFeatures = [
  "Hands-on instruction perfect for all skill levels",
  "All supplies included (cookies, icing, tools, and packaging)",
  "Small group setting with maximum 15 attendees",
  "Learn multiple decorating techniques",
  "Take home your beautiful cookie creations",
  "Fun, relaxed atmosphere with lots of creative freedom",
] as const;

const ClassesMarketingShell = ({
  badgeIcon: BadgeIcon,
  badgeText,
  breadcrumb,
  children,
  ctaHref,
  ctaLabel,
  description,
  titleLead,
  titleAccent,
}: ClassesMarketingShellProps) => {
  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bakery-cream via-white to-bakery-peach/30" />
        <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-bakery-pink-light/60 to-bakery-peach/40 opacity-0 blur-3xl transition-all duration-1000 animate-scale-in" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-bakery-peach/50 to-bakery-pink-light/30 opacity-0 blur-2xl transition-all duration-1000 animate-scale-in animation-delay-200" />
        <div
          className="absolute right-1/4 top-1/4 h-4 w-4 rounded-full bg-bakery-pink-dark/60 opacity-0 transition-all duration-700 animate-fade-in animation-delay-500"
          style={{ animation: "float 4s ease-in-out infinite" }}
        />
        <div
          className="absolute left-1/4 top-1/3 h-3 w-3 rounded-full bg-bakery-brown/50 opacity-0 transition-all duration-700 animate-fade-in animation-delay-700"
          style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 h-2 w-2 rounded-full bg-bakery-pink/70 opacity-0 transition-all duration-700 animate-fade-in animation-delay-900"
          style={{ animation: "float 3.5s ease-in-out infinite 1s" }}
        />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("/paper-texture.svg")`,
          }}
        />

        <div className="container-custom relative z-10 py-32 md:py-40">
          {breadcrumb ? (
            <div className="mb-8 opacity-0 transition-all duration-700 animate-fade-in-up">
              {breadcrumb}
            </div>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center opacity-0 transition-all duration-1000 animate-fade-in-up lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/50 bg-white/80 px-4 py-2 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-700 animate-fade-in-up animation-delay-200">
                <BadgeIcon className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  {badgeText}
                </span>
              </div>

              <h1 className="mb-6 font-bebas text-5xl leading-[0.9] tracking-tight opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-300 sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="block text-gray-800">{titleLead}</span>
                <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  {titleAccent}
                </span>
              </h1>

              <div className="mx-auto mb-8 max-w-md font-poppins text-lg leading-relaxed text-gray-600 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-400 lg:mx-0 md:text-xl">
                {description}
              </div>

              <div className="flex flex-col justify-center gap-4 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-500 lg:justify-start sm:flex-row">
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink px-8 py-4 font-poppins font-semibold text-white shadow-lg shadow-bakery-pink/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-bakery-pink/40"
                >
                  {ctaLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="mt-10 flex items-center justify-center gap-8 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-600 lg:justify-start">
                <div className="text-center">
                  <p className="font-bebas text-3xl text-bakery-pink-dark">
                    50+
                  </p>
                  <p className="font-poppins text-sm text-gray-500">
                    Classes Taught
                  </p>
                </div>
                <div className="w-px h-10 bg-bakery-pink-light" />
                <div className="text-center">
                  <p className="font-bebas text-3xl text-bakery-pink-dark">
                    15
                  </p>
                  <p className="font-poppins text-sm text-gray-500">
                    Max Group Size
                  </p>
                </div>
                <div className="w-px h-10 bg-bakery-pink-light" />
                <div className="text-center">
                  <p className="font-bebas text-3xl text-bakery-pink-dark">
                    $65
                  </p>
                  <p className="font-poppins text-sm text-gray-500">
                    Minimum Price
                  </p>
                </div>
              </div>
            </div>

            <div className="relative opacity-0 transition-all duration-1000 animate-slide-in-right animation-delay-300">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-[90%] w-[90%] rounded-full border-2 border-dashed border-bakery-pink-light/40 animate-spin-slow" />
              </div>

              <div className="relative z-10 mx-auto max-w-lg lg:max-w-none">
                <div className="absolute inset-4 rotate-3 rounded-[3rem] bg-gradient-to-br from-bakery-peach via-bakery-pink-light/50 to-bakery-cream" />

                <div className="relative -rotate-2 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-bakery-pink/20 transition-transform duration-500 hover:rotate-0">
                  <Image
                    src="/roseSugarClassCropped.webp"
                    alt="Cookie decorating class in progress"
                    width={600}
                    height={500}
                    priority
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={80}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bakery-pink-dark/20 via-transparent to-transparent" />
                </div>

                <div
                  className="absolute -right-4 -top-4 rotate-6 rounded-2xl bg-white p-4 opacity-0 shadow-xl transition-all duration-700 animate-fade-in-up animation-delay-700 md:right-0 md:top-4"
                  style={{ animation: "float 4s ease-in-out infinite" }}
                >
                  <div className="text-center">
                    <p className="font-bebas text-3xl text-bakery-pink-dark">
                      All Supplies
                    </p>
                    <p className="text-xs font-poppins text-gray-600">
                      Included
                    </p>
                  </div>
                </div>

                <div
                  className="absolute -bottom-2 -left-2 -rotate-6 rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink p-4 text-white opacity-0 shadow-xl transition-all duration-700 animate-fade-in-up animation-delay-800 md:bottom-8 md:-left-8"
                  style={{ animation: "float 5s ease-in-out infinite 1s" }}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-poppins font-semibold text-sm">
                      Small Groups
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 md:h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d286a0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-bakery-pink-light/20 bg-gradient-to-br from-bakery-cream to-white p-6 text-center shadow-sm transition-all duration-300 hover:border-bakery-pink-light hover:shadow-lg hover:shadow-bakery-pink/10"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-bakery-peach/30 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-6 w-6 text-bakery-pink-dark" />
                  </div>
                  <h3 className="font-bebas text-xl tracking-wide text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-poppins text-sm text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {children}

      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="absolute top-20 -right-32 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="font-bebas text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-gray-800">What&apos;s</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Included
                </span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rotate-1 rounded-[2rem] bg-gradient-to-br from-bakery-peach/30 to-bakery-pink-light/30" />
              <div className="relative rounded-3xl border border-bakery-pink-light/20 bg-white p-8 shadow-xl md:p-12">
                <div className="mb-10 flex items-center justify-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink shadow-lg shadow-bakery-pink/30">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <span className="font-bebas text-2xl tracking-wide text-gray-900 md:text-3xl">
                    Small-Group Experience
                  </span>
                </div>

                <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
                  {classFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="group flex items-start gap-4 rounded-xl bg-bakery-cream/50 p-4 transition-colors duration-300 hover:bg-bakery-pink-light/30"
                    >
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-bakery-pink-light to-bakery-peach transition-transform duration-300 group-hover:scale-110">
                        <Check className="h-4 w-4 text-bakery-pink-dark" />
                      </div>
                      <p className="font-poppins leading-relaxed text-gray-700">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20 py-24 md:py-32">
        <div className="absolute top-20 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-bakery-peach/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 h-[300px] w-[300px] rounded-full bg-gradient-to-bl from-bakery-pink-light/30 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="font-bebas text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-gray-800">The Class</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
            </div>

            <div className="grid items-start gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <p className="font-poppins text-lg leading-relaxed text-gray-700">
                  Each Rose & Sugar class is designed to be both educational and
                  enjoyable. You&apos;ll learn various decorating methods
                  including outlining, flooding, detail piping, and wet-on-wet
                  designs. Each class begins with a practice cookie and practice
                  piping sheet before jumping into the set.
                </p>

                <p className="font-poppins text-lg leading-relaxed text-gray-700">
                  Classes typically run for 1.5-2.5 hours, giving you plenty of
                  time to practice your skills and decorate 3-5 cookies that
                  you&apos;ll take home in a beautiful box. We keep our classes
                  small (maximum 15 people) to ensure everyone receives personal
                  attention, and pricing starts at $65 per person.
                </p>

                <p className="font-poppins text-lg leading-relaxed text-gray-700">
                  No experience necessary — just bring your creativity! Classes
                  are perfect for friends&apos; nights out, birthday
                  celebrations, or anyone looking to learn a new skill in a
                  supportive environment.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-2 rotate-2 rounded-3xl bg-gradient-to-br from-bakery-peach to-bakery-pink-light/50" />
                  <div className="relative rounded-2xl bg-white p-8 shadow-lg">
                    <div className="absolute left-8 -top-4">
                      <span className="font-serif text-6xl text-bakery-pink-light">
                        &ldquo;
                      </span>
                    </div>
                    <div className="pt-6">
                      <p className="font-poppins text-lg italic leading-relaxed text-gray-700">
                        The cookie decorating class was so fun! It was
                        intimidating coming into the class but with Megan&apos;s
                        great instruction and being able to bring it down to an
                        entry level it was so much fun and we were able to
                        create really beautiful designs!
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-bakery-pink-light to-bakery-peach">
                          <span className="font-bebas text-lg text-bakery-pink-dark">
                            B
                          </span>
                        </div>
                        <div>
                          <p className="font-poppins font-medium text-gray-900">
                            Brittany D.
                          </p>
                          <p className="text-sm text-gray-500">
                            Class Attendee
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bakery-pink-dark py-20 md:py-28">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bakery-pink/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-bakery-peach/20 blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Users className="h-4 w-4 text-white" />
              <span className="text-sm font-poppins font-medium text-white">
                Private Events
              </span>
            </div>
            <h2 className="font-bebas text-4xl tracking-tight text-white md:text-5xl lg:text-6xl">
              Plan a Private Cookie Class
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-poppins text-lg text-white/90">
              Planning a birthday, shower, or team celebration? Private classes
              are customized for your group and available across Folsom and the
              greater Sacramento area.
            </p>
            <div className="mt-10">
              <Link
                href="/private-cookie-classes-folsom-sacramento"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-poppins font-semibold text-bakery-pink-dark shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore Private Classes
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClassesMarketingShell;
