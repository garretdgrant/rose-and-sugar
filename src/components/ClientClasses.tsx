"use client";
import ClassCalendarCard from "@/components/ClassCalendarCard";
import SectionDivider from "@/components/ui/sectionDivider";
import { FetchedClass } from "@/lib/fetchSanity";
import { urlFor } from "@/lib/sanityImage";
import { Calendar, Check, Users } from "lucide-react";
import Link from "next/link";

interface ClientClassesProps {
  upcomingClasses: FetchedClass[];
}

const ClientClasses = ({ upcomingClasses }: ClientClassesProps) => {
  const classFeatures = [
    "Hands-on instruction perfect for all skill levels",
    "All supplies included (cookies, icing, tools, and packaging)",
    "Small group setting with maximum 15 attendees",
    "Learn multiple decorating techniques",
    "Take home your beautiful cookie creations",
    "Fun, relaxed atmosphere with lots of creative freedom",
  ];

  const upcomingMonths = ["June", "July"];
  console.log(upcomingClasses);

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
                src="/roseSugarClassCropped.webp"
                alt="Cookie decorating class"
                className="image-wrapper"
              />
            </div>
          </div>

          <SectionDivider icon="flower" />

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

              <p className="body-text mt-4 mb-10">
                Select from our upcoming cookie decorating classes and book your
                spot today!
              </p>
            </div>
            {/* Calendly Placeholder */}
            <div className="border-2 border-dashed border-primary py-8 px-2 rounded-lg bg-muted mb-8">
              <div className="text-center content-spacing">
                <h3 className="section-subheading">
                  Book A Cookie Decorating Class!
                </h3>
                {/* Class Calendar Cards */}
                <div
                  className={`grid gap-8 max-w-5xl mx-auto mb-12 ${
                    upcomingClasses.length === 1
                      ? "grid-cols-1 justify-center"
                      : upcomingClasses.length === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-3"
                  }`}
                >
                  {upcomingClasses.map((classItem) => (
                    <ClassCalendarCard
                      key={classItem._id}
                      month={classItem.month}
                      day={classItem.day}
                      title={classItem.title}
                      description={classItem.description}
                      price={classItem.price}
                      address={classItem.address}
                      time={classItem.time}
                      imageUrl={
                        classItem.image
                          ? urlFor(classItem.image).url()
                          : "/openDefault.webp"
                      }
                      seatsLeft={classItem.seatsLeft}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="body-text mb-6">
                Want to be notified when new classes are added? Contact Megan to
                join the waiting list.
              </p>

              <Link href="/contact" className="btn-primary">
                Join Waitlist
              </Link>
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
                    and enjoyable. You&apos;ll learn various decorating methods
                    including outlining, flooding, some detail piping, and
                    wet-on-wet designs. Each class begins with a practice cookie
                    and practice piping sheet before jumping into the set.
                  </p>

                  <p className="body-text">
                    Classes typically run for 1.5-2 hours, giving you plenty of
                    time to practice your skills and decorate 3-5 cookies that
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
                    &quot;The cookie decorating class was so fun! It was
                    intimidating coming into the class but with Megan&apos;s
                    great instruction and being able to bring it down to an
                    entry level it was so much fun and we were able to create
                    really beautiful designs!&quot;
                  </div>

                  <div className="text-right font-medium">— Brittany D.</div>
                </div>
              </div>
            </div>
          </div>

          <SectionDivider icon="flower2" />

          {/* Private Events */}
          <div className="mt-8 bg-primary/30 p-8 rounded-lg">
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

export default ClientClasses;
