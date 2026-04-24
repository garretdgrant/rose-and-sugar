import Link from "next/link";
import { Sparkles, Heart, Package, ArrowRight } from "lucide-react";

const sprinkles = [
  { left: "8%", top: "18%", color: "#E8ADC1", duration: 4, delay: "0s" },
  { left: "16%", top: "72%", color: "#FDE1D3", duration: 5, delay: "0.2s" },
  { left: "24%", top: "38%", color: "#D4B9A4", duration: 6, delay: "0.4s" },
  { left: "32%", top: "12%", color: "#FFDEE2", duration: 4, delay: "0.6s" },
  { left: "41%", top: "82%", color: "#E8ADC1", duration: 5, delay: "0.8s" },
  { left: "49%", top: "24%", color: "#FDE1D3", duration: 6, delay: "1s" },
  { left: "58%", top: "64%", color: "#D4B9A4", duration: 4, delay: "1.2s" },
  { left: "66%", top: "16%", color: "#FFDEE2", duration: 5, delay: "1.4s" },
  { left: "74%", top: "48%", color: "#E8ADC1", duration: 6, delay: "1.6s" },
  { left: "82%", top: "78%", color: "#FDE1D3", duration: 4, delay: "1.8s" },
  { left: "89%", top: "28%", color: "#D4B9A4", duration: 5, delay: "2s" },
  { left: "94%", top: "58%", color: "#FFDEE2", duration: 6, delay: "2.2s" },
] as const;

const ThankYou = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-bakery-cream via-bakery-peach/30 to-bakery-pink-light/40">
      {/* Decorative floating sprinkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sprinkles.map((sprinkle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-40"
            style={{
              left: sprinkle.left,
              top: sprinkle.top,
              backgroundColor: sprinkle.color,
              animation: `sprinkle-dance ${sprinkle.duration}s ease-in-out infinite`,
              animationDelay: sprinkle.delay,
            }}
          />
        ))}
      </div>

      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay opacity-30 pointer-events-none" />

      <main className="flex-grow flex items-center justify-center min-h-screen px-4 pt-32 pb-16 relative z-10">
        <div className="container mx-auto max-w-3xl">
          {/* Main card */}
          <div className="relative">
            {/* Decorative background blob */}
            <div className="absolute -inset-4 organic-blob bg-gradient-to-br from-bakery-pink/20 to-bakery-peach/20 blur-2xl" />

            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
              {/* Decorative top border */}
              <div className="h-2 bg-gradient-to-r from-bakery-pink via-bakery-peach to-bakery-brown" />

              <div className="p-6 md:p-8 lg:p-10">
                {/* Icon celebration */}
                <div className="mb-5 flex justify-center gap-4 opacity-0 animate-scale-in">
                  <div
                    className="cookie-float"
                    style={{ animationDelay: "0s" }}
                  >
                    <Sparkles
                      size={28}
                      className="text-bakery-pink-dark"
                      fill="currentColor"
                    />
                  </div>
                  <div
                    className="cookie-float"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <Heart
                      size={36}
                      className="text-bakery-pink"
                      fill="currentColor"
                    />
                  </div>
                  <div
                    className="cookie-float"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <Sparkles
                      size={28}
                      className="text-bakery-pink-dark"
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Headline with mixed typography */}
                <div className="text-center mb-5">
                  <h1
                    className="mb-2 font-fraunces text-4xl font-bold leading-tight text-bakery-pink-dark opacity-0 animate-fade-in-up md:text-5xl lg:text-6xl"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Your Inquiry is
                  </h1>
                  <p
                    className="mb-1 font-cookie text-5xl text-bakery-pink opacity-0 animate-fade-in-up md:text-6xl lg:text-7xl"
                    style={{ animationDelay: "0.4s" }}
                  >
                    received!
                  </p>
                  <div
                    className="flex justify-center gap-2 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-bakery-brown opacity-60"
                      />
                    ))}
                  </div>
                </div>

                {/* Main content */}
                <div className="space-y-4 mb-6">
                  <div
                    className="rounded-2xl border border-bakery-pink-light/50 bg-gradient-to-br from-bakery-peach/30 to-bakery-pink-light/30 p-5 opacity-0 animate-fade-in-up md:p-6"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">
                        <Package className="text-bakery-pink-dark" size={22} />
                      </div>
                      <div>
                        <h2 className="font-bebas text-xl text-bakery-pink-dark mb-2">
                          What Happens Next?
                        </h2>
                        <div className="space-y-2 text-gray-700">
                          <p className="text-base leading-relaxed">
                            Thank you for sharing your custom cookie request!
                            This submission is an{" "}
                            <span className="font-semibold text-bakery-pink-dark">
                              inquiry, not a confirmed order
                            </span>{" "}
                            just yet.
                          </p>
                          <p className="text-base leading-relaxed">
                            I&apos;ll be in touch within{" "}
                            <span className="font-semibold text-bakery-pink-dark">
                              1-2 business days
                            </span>{" "}
                            to review availability, talk through design details,
                            confirm pricing, and share the next steps for
                            booking.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal message */}
                  <div
                    className="text-center opacity-0 animate-fade-in-up"
                    style={{ animationDelay: "1s" }}
                  >
                    <p className="font-playfair text-lg md:text-xl text-gray-800 italic leading-relaxed mb-1">
                      &ldquo;I can&apos;t wait to hear more about your
                      celebration and see what we can create together!&rdquo;
                    </p>
                    <p className="font-cookie text-2xl md:text-3xl text-bakery-pink-dark">
                      — Megan
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Rose & Sugar Baker
                    </p>
                  </div>

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-3 py-2">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-bakery-pink" />
                    <Heart size={14} className="text-bakery-pink" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-bakery-pink" />
                  </div>

                  {/* Additional info */}
                  <div
                    className="text-center opacity-0 animate-fade-in-up"
                    style={{ animationDelay: "1.2s" }}
                  >
                    <p className="text-sm text-gray-600">
                      Questions in the meantime? Email me at{" "}
                      <a
                        href="mailto:hello@roseandsugarcookies.com"
                        className="text-bakery-pink-dark font-medium hover:underline"
                      >
                        hello@roseandsugarcookies.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div
                  className="text-center opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "1.4s" }}
                >
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-bakery-pink to-bakery-pink-dark text-white px-6 py-3 rounded-full font-poppins font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                  >
                    Back to Home
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>

                  <p className="text-xs text-gray-500 mt-3">
                    Browse more designs while I review your inquiry
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative elements */}
          <div
            className="mt-4 text-center opacity-0 animate-fade-in"
            style={{ animationDelay: "1.6s" }}
          >
            <div className="flex items-center justify-center gap-2 text-bakery-pink-dark/60">
              <Sparkles size={14} />
              <p className="text-xs font-medium">
                Handcrafted with love in every bite
              </p>
              <Sparkles size={14} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
