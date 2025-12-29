import Link from "next/link";
import {
  Users,
  Palette,
  Heart,
  Gift,
  Building2,
  Briefcase,
  Home,
  Scale,
  Store,
  Globe,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";

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

  return (
    <div className="page-wrapper">
      <main className="page-content">
        <section className="relative bg-gradient-to-b from-bakery-pink-light/40 to-white py-20 md:py-28">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-800">
                Corporate Team-Building Cookie Decorating Classes
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Bring your team together for a fun, hands-on creative
                experience. No baking skills required — just a willingness to
                connect, collaborate, and have fun.
              </p>
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Request a Corporate Booking
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-bakery-offWhite">
          <div className="container-custom">
            <h2 className="section-heading">
              Why Cookie Decorating Works for Teams
            </h2>
            <p className="body-text text-center max-w-2xl mx-auto mb-12">
              Step away from the conference room and into a creative,
              stress-free environment that brings out the best in your team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white p-6 rounded-lg shadow-md text-center hover-card"
                >
                  <div className="w-16 h-16 bg-bakery-pink-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-bakery-pink-dark" />
                  </div>
                  <h3 className="font-fraunces text-xl mb-2 text-gray-800">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <h2 className="section-heading">What Teams Are Saying</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-bakery-pink">
                <p className="text-gray-700 italic mb-4">
                  &quot;This was the highlight of our quarterly offsite.
                  Everyone was laughing, helping each other, and genuinely
                  having fun — something rare for team events.&quot;
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  — HR Director, Tech Startup
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-bakery-pink">
                <p className="text-gray-700 italic mb-4">
                  &quot;Way better than another happy hour. Our team still talks
                  about the cookie decorating class months later. Already
                  booking our next session!&quot;
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  — Office Manager, Local Real Estate Team
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-bakery-pink">
                <p className="text-gray-700 italic mb-4">
                  &quot;Megan made it so easy and welcoming. Even our most
                  reserved team members opened up and got creative. Highly
                  recommend for any group.&quot;
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  — Founder, Small Business Team
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <h2 className="section-heading">How the Experience Works</h2>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {steps.map((step) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="font-fraunces text-4xl text-bakery-pink-dark">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-fraunces text-xl mb-2 text-gray-800">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-bakery-peach/30">
          <div className="container-custom">
            <h2 className="section-heading">Who This Experience Is For</h2>
            <p className="body-text text-center max-w-2xl mx-auto mb-12">
              Our corporate classes are designed for teams of all types and
              sizes.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
              {audiences.map((audience) => (
                <div
                  key={audience.label}
                  className="bg-white p-6 rounded-lg shadow-sm text-center hover-card"
                >
                  <audience.icon className="w-10 h-10 text-bakery-pink-dark mx-auto mb-3" />
                  <p className="font-medium text-gray-800 text-sm">
                    {audience.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="section-heading">Custom Pricing for Your Team</h2>
              <p className="body-text mb-6">
                Corporate events are custom-priced based on group size,
                location, and experience type. Whether you have a team of 10 or
                100, we&apos;ll create a package that fits your needs and
                budget.
              </p>
              <p className="text-gray-600">
                Reach out to discuss your event, and we&apos;ll provide a
                personalized quote.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-bakery-offWhite">
          <div className="container-custom">
            <h2 className="section-heading">Team-Building in Action</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="aspect-square rounded-lg overflow-hidden bg-bakery-pink-light/30">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop"
                  alt="Team collaborating on a creative project"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-bakery-pink-light/30">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop"
                  alt="Coworkers working together and smiling"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-bakery-pink-light/30">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=400&fit=crop"
                  alt="Team members enjoying a group activity"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-bakery-pink-light/30">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop"
                  alt="Collaborative team workshop in progress"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-bakery-pink-light/30">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop"
                  alt="Group participating in hands-on activity"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-bakery-pink-light/30">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"
                  alt="Team celebrating together"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-bakery-pink-light/50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-fraunces text-3xl md:text-4xl mb-4 text-gray-800">
                Ready to Plan Your Team Event?
              </h2>
              <p className="body-text mb-8">
                Let&apos;s create a memorable experience for your team. Share
                your details, and Megan will get back to you with options
                tailored to your group.
              </p>
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Request a Corporate Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CorporateTeamBuilding;
