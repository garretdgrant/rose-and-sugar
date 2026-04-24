import { Suspense } from "react";
import { Clock, Instagram, MessageCircle, Phone, Sparkles } from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import ContactPageClient from "@/components/ContactPageClient";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Contact Rose & Sugar | Custom Cookies & Classes",
    description:
      "Get in touch with Rose & Sugar for custom cookies, classes, or general inquiries. We respond within 48 hours with details and next steps.",
    path: "/contact",
  });
}

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bakery-cream/40 via-white to-bakery-pink-light/30">
      <main className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("/paper-texture.svg")`,
          }}
        />

        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-bakery-peach/40 to-transparent blur-3xl" />

        <section className="relative pb-12 pt-28 md:pb-16 md:pt-36">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/50 bg-white/80 px-4 py-2 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-700 animate-fade-in-up">
                <Sparkles className="h-4 w-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Let&apos;s Connect
                </span>
              </div>

              <h1 className="font-bebas text-5xl leading-[0.95] tracking-tight opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-100 md:text-6xl lg:text-7xl">
                <span className="text-gray-800">Get in</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>

              <p className="mt-6 font-poppins text-lg leading-relaxed text-gray-600 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-200 md:text-xl">
                Have a question or a sweet idea to bring to life? Send us a note
                and Megan will follow up within 48 hours.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-300">
                <div className="inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/30 bg-white/70 px-4 py-2 text-sm font-poppins text-gray-600">
                  <Clock className="h-4 w-4 text-bakery-pink-dark" />
                  Replies in 48 hours
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/30 bg-white/70 px-4 py-2 text-sm font-poppins text-gray-600">
                  <MessageCircle className="h-4 w-4 text-bakery-pink-dark" />
                  Friendly, personal help
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-20 md:pb-28">
          <div className="container-custom">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              <Suspense
                fallback={
                  <div className="rounded-3xl border border-bakery-pink-light/30 bg-white/80 p-6 shadow-xl shadow-bakery-pink/10 backdrop-blur-sm md:p-10" />
                }
              >
                <ContactPageClient />
              </Suspense>

              <div className="space-y-8">
                <div className="rounded-3xl border border-bakery-pink-light/20 bg-white/90 p-6 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-700 animate-fade-in-up animation-delay-150 md:p-8">
                  <h2 className="mb-5 font-bebas text-2xl text-gray-800">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bakery-pink-light/50">
                        <Phone className="h-4 w-4 text-bakery-pink-dark" />
                      </div>
                      <p className="font-poppins text-gray-700">916-337-8880</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bakery-pink-light/50">
                        <MessageCircle className="h-4 w-4 text-bakery-pink-dark" />
                      </div>
                      <p className="font-poppins text-gray-700">
                        roseandsugarcookies@gmail.com
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bakery-pink-light/50">
                        <Instagram className="h-4 w-4 text-bakery-pink-dark" />
                      </div>
                      <a
                        href="https://www.instagram.com/roseandsugarcookies/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-poppins text-gray-700 transition-colors hover:text-bakery-pink-dark"
                      >
                        @roseandsugarcookies
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-bakery-pink-light/20 bg-gradient-to-br from-bakery-cream via-white to-bakery-pink-light/20 p-6 opacity-0 shadow-lg transition-all duration-700 animate-fade-in-up animation-delay-300 md:p-8">
                  <h2 className="mb-4 font-bebas text-2xl text-gray-800">
                    Business Hours
                  </h2>
                  <div className="space-y-2 font-poppins text-gray-700">
                    <p>Monday - Friday: 9am - 6pm</p>
                    <p>Saturday: 10am - 4pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-poppins text-bakery-pink-dark">
                    <Clock className="h-4 w-4" />
                    Response within 48 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
