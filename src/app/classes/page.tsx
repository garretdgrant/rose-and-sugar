import CalendlyEmbed from "@/components/Calendly";
import SectionDivider from "@/components/ui/sectionDivider";
import { Calendar, Check, Users } from "lucide-react";
import Link from "next/link";

const Classes = () => {
  const classFeatures = [
    "Hands-on instruction perfect for all skill levels",
    "All supplies included (cookies, icing, tools, and packaging)",
    "Small group setting with maximum 15 attendees",
    "Learn multiple decorating techniques",
    "Take home your beautiful cookie creations",
    "Fun, relaxed atmosphere with lots of creative freedom",
  ];

  const upcomingMonths = ["June", "July"];

  return (
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">Cookie Decorating Classes</h1>

          <div className="content-container mb-12">
            <p className="body-text text-center">
              Join Megan for a fun, creative cookie decorating experience!
              Whether you&apos;re a complete beginner or looking to expand your
              skills, our small-group classes are the perfect way to learn the
              art of cookie decorating in a warm, supportive environment.
            </p>
          </div>

          {/* Class Image */}
          <div className="mb-16">
            <div className="relative max-w-2xl mx-auto">
              <div className="image-highlight"></div>
              <img
                src="https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597"
                alt="Cookie decorating class"
                className="image-wrapper"
              />
            </div>
          </div>

          <SectionDivider icon="chefHat" />

          {/* Class Features */}
          <div className="mt-16 mb-16">
            <h2 className="section-heading">What&apos;s Included</h2>

            <div className="feature-card">
              <div className="flex items-center justify-center mb-8">
                <Users size={32} className="text-primary-foreground mr-3" />
                <span className="section-subheading">
                  Small-Group Experience
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {classFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check
                      className="text-primary-foreground mr-3 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <p className="body-text">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SectionDivider icon="cookie" />

          {/* Class Description */}
          <div className="mt-16 mb-16">
            <h2 className="section-heading">The Class Experience</h2>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <div className="content-spacing">
                  <p className="body-text">
                    Each Rose & Sugar class is designed to be both educational
                    and enjoyable. You&apos;ll learn proper icing consistency,
                    coloring techniques, and various decorating methods
                    including flooding, piping, and wet-on-wet designs.
                  </p>

                  <p className="body-text">
                    Classes typically run for 2.5 hours, giving you plenty of
                    time to practice your skills and decorate 6-8 cookies that
                    you&apos;ll take home in a beautiful box. We keep our
                    classes small (maximum 15 people) to ensure everyone
                    receives personal attention.
                  </p>

                  <p className="body-text">
                    No experience necessary — just bring your creativity!
                    Classes are perfect for friends&apos; nights out, birthday
                    celebrations, or anyone looking to learn a new skill in a
                    supportive environment.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="section-subheading text-center">
                    What Past Attendees Say
                  </h3>

                  <div className="body-text italic mb-4">
                    &quot;Megan&apos;s class was so much fun! I&apos;ve never
                    decorated cookies before, and she made it approachable and
                    enjoyable. I was shocked at how professional my cookies
                    looked by the end!&quot;
                  </div>

                  <div className="text-right font-medium">— Lisa M.</div>
                </div>
              </div>
            </div>
          </div>

          <SectionDivider icon="flower2" />

          {/* Calendar Section */}
          <div className="mt-16 mb-16">
            <h2 className="section-heading">Upcoming Classes</h2>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center">
                <Calendar size={24} className="text-primary-foreground mr-2" />
                <h3 className="section-subheading inline-block">
                  {upcomingMonths.join(" & ")} {new Date().getFullYear()}
                </h3>
              </div>

              <p className="body-text mt-4">
                Rose & Sugar classes are returning in{" "}
                {upcomingMonths.join(" and ")}! Check back soon to see our full
                schedule and book your spot.
              </p>
            </div>
            {/* Calendly Placeholder */}
            <div className="border-2 border-dashed border-primary p-8 rounded-lg bg-muted mb-8">
              <div className="text-center content-spacing">
                <h3 className="section-subheading">
                  Book A Cookie Decorating Class!
                </h3>
                <CalendlyEmbed />
                {/* <p className="body-text">
                  This is where the Calendly booking calendar will be embedded
                  to allow easy class registration.
                </p>
                <p className="text-muted-foreground text-sm mt-4 italic">
                  (This placeholder will be replaced with an actual calendar.)
                </p> */}
              </div>
            </div>

            <div className="text-center">
              <p className="body-text mb-6">
                Want to be notified when new classes are added? Contact Megan to
                join the waiting list.
              </p>

              <Link href="/contact" className="btn-primary">
                Book a Class
              </Link>
            </div>
          </div>

          {/* Private Events */}
          <div className="bg-primary/30 p-8 rounded-lg">
            <h2 className="section-subheading text-center">
              Private Group Classes
            </h2>

            <p className="body-text text-center mb-6 max-w-2xl mx-auto">
              Looking for a unique activity for a bridal shower, team building,
              or birthday celebration? Rose & Sugar offers private decorating
              classes tailored to your event.
            </p>

            <div className="text-center">
              <Link href="/contact" className="btn-primary">
                Inquire About Private Classes
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Classes;
