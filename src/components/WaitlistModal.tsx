"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isValidPhone } from "@/lib/validations";
import { referralSourceOptions } from "@/lib/referralSources";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().refine((value) => isValidPhone(value), {
    message: "Please provide a valid phone number",
  }),
  message: z.string().min(10, "Please provide your message"),
  referralSource: z.string().optional(),
  referralDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Decorative rose petal SVG component
const RosePetal = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 40 50"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path
      d="M20 0C8 0 0 15 0 28c0 12 8 22 20 22s20-10 20-22C40 15 32 0 20 0zm0 45c-9 0-15-7-15-17 0-10 6-23 15-23s15 13 15 23c0 10-6 17-15 17z"
      opacity="0.3"
    />
    <path d="M20 5c-9 0-15 12-15 23 0 8 5 14 12 16 1-2 2-5 3-8-4-1-7-5-7-10 0-7 4-16 10-16 5 0 8 6 8 12 0 4-2 8-5 10 1 4 2 7 4 10 6-3 10-9 10-16C40 17 32 5 20 5z" />
  </svg>
);

// Floating petals for success animation
const FloatingPetal = ({
  delay,
  startX,
}: {
  delay: number;
  startX: number;
}) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left: `${startX}%`,
      animation: `petalFloat 3s ease-out ${delay}s forwards`,
      opacity: 0,
    }}
  >
    <RosePetal
      className="w-4 h-5 text-bakery-pink"
      style={{
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  </div>
);

const WaitlistModal = ({ open, onOpenChange }: WaitlistModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "I'd like to join the class waitlist.",
      referralSource: "Google",
      referralDetails: "",
    },
  });

  const referralValue = form.watch("referralSource");

  // Trigger entrance animations when modal opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setShowSuccess(false);
    }
  }, [open]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const referralSource = data.referralSource?.trim() ?? "";
      const referralDetails = data.referralDetails?.trim() ?? "";
      const normalizedReferral =
        referralSource === "Other (describe below)" && referralDetails
          ? `Other: ${referralDetails}`
          : referralSource;

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        referralSource: normalizedReferral,
      };

      const response = await fetch("/api/contact/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Show success animation
      setShowSuccess(true);

      // Wait for animation, then close
      setTimeout(() => {
        form.reset({
          name: "",
          email: "",
          phone: "",
          message: "I'd like to join the class waitlist.",
          referralSource: "",
          referralDetails: "",
        });
        onOpenChange(false);
        toast({
          title: "You're on the list!",
          description: "We'll reach out when new classes are announced.",
        });
      }, 2000);
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-transparent border-none p-0 overflow-visible shadow-none">
        {/* Inject keyframes for petal animation */}
        <style jsx global>{`
          @keyframes petalFloat {
            0% {
              opacity: 0;
              transform: translateY(0) rotate(0deg) scale(0.5);
            }
            20% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(-120px) rotate(360deg) scale(1);
            }
          }
          @keyframes bloomPulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.4;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.6;
            }
          }
          @keyframes gentleFloat {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-6px) rotate(3deg);
            }
          }
          @keyframes inputGlow {
            0%,
            100% {
              box-shadow: 0 0 0 0 rgba(232, 173, 193, 0);
            }
            50% {
              box-shadow: 0 0 20px 2px rgba(232, 173, 193, 0.3);
            }
          }
        `}</style>

        <div
          className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Decorative background petals */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <RosePetal
              className="absolute -top-4 -right-4 w-24 h-28 text-bakery-pink-light/30"
              style={{ animation: "gentleFloat 6s ease-in-out infinite" }}
            />
            <RosePetal
              className="absolute -bottom-6 -left-6 w-20 h-24 text-bakery-peach/40"
              style={{
                animation: "gentleFloat 5s ease-in-out infinite 0.5s",
                transform: "rotate(180deg)",
              }}
            />
            <RosePetal
              className="absolute top-1/3 -left-3 w-12 h-14 text-bakery-pink/20"
              style={{
                animation: "gentleFloat 7s ease-in-out infinite 1s",
                transform: "rotate(90deg)",
              }}
            />
          </div>

          {/* Header with organic shape */}
          <div className="relative">
            {/* Curved bottom edge */}
            <div
              className="absolute bottom-0 left-0 right-0 h-8 bg-white"
              style={{
                clipPath: "ellipse(60% 100% at 50% 100%)",
              }}
            />

            {/* Header content */}
            <div className="relative bg-gradient-to-br from-bakery-pink-dark via-bakery-pink to-bakery-peach px-8 pt-8 pb-12">
              {/* Subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                    radial-gradient(circle at 80% 20%, white 1px, transparent 1px),
                                    radial-gradient(circle at 40% 80%, white 1px, transparent 1px)`,
                  backgroundSize: "60px 60px, 80px 80px, 100px 100px",
                }}
              />

              {/* Decorative accent */}
              <div className="absolute top-4 right-6 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/30"
                    style={{
                      animation: `bloomPulse 2s ease-in-out infinite ${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

              <DialogTitle
                className={`text-3xl md:text-4xl font-playfair text-white tracking-wide transition-all duration-700 delay-100 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Join Our Waitlist
              </DialogTitle>
              <DialogDescription
                className={`text-white/90 font-poppins mt-2 text-base transition-all duration-700 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Be the first to know when new classes open
              </DialogDescription>
            </div>
          </div>

          {/* Form content */}
          <div className="relative px-8 pt-4 pb-8">
            {/* Success overlay */}
            {showSuccess && (
              <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center">
                {/* Floating petals */}
                <div className="absolute inset-0 overflow-hidden">
                  {[10, 25, 40, 55, 70, 85].map((x, i) => (
                    <FloatingPetal key={i} delay={i * 0.15} startX={x} />
                  ))}
                </div>

                <div className="text-center animate-scale-in">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-bakery-pink to-bakery-pink-dark flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        className="animate-[dash_0.5s_ease-out_forwards]"
                        style={{
                          strokeDasharray: 24,
                          strokeDashoffset: 24,
                          animation: "dash 0.5s ease-out 0.2s forwards",
                        }}
                      />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl text-gray-800 mb-2">
                    You&apos;re In!
                  </h3>
                  <p className="text-gray-600 font-poppins">
                    We&apos;ll be in touch soon
                  </p>
                </div>
              </div>
            )}

            {/* Intro text */}
            <div
              className={`flex items-center gap-4 mb-6 p-4 rounded-2xl bg-bakery-cream/50 border border-bakery-pink-light/30 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bakery-pink-light to-bakery-peach flex items-center justify-center flex-shrink-0">
                <RosePetal className="w-6 h-7 text-bakery-pink-dark" />
              </div>
              <p className="text-sm text-gray-600 font-poppins leading-relaxed">
                Share your details and we&apos;ll notify you the moment new
                baking sessions go live.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Name field */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins text-gray-700 font-medium">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="h-12 rounded-xl border-bakery-pink-light/40 bg-bakery-cream/20 font-poppins placeholder:text-gray-400 focus:border-bakery-pink focus:ring-bakery-pink/20 transition-all duration-300 hover:border-bakery-pink-light"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-poppins text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email field */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins text-gray-700 font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            className="h-12 rounded-xl border-bakery-pink-light/40 bg-bakery-cream/20 font-poppins placeholder:text-gray-400 focus:border-bakery-pink focus:ring-bakery-pink/20 transition-all duration-300 hover:border-bakery-pink-light"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-poppins text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone field */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins text-gray-700 font-medium">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(123) 456-7890"
                            className="h-12 rounded-xl border-bakery-pink-light/40 bg-bakery-cream/20 font-poppins placeholder:text-gray-400 focus:border-bakery-pink focus:ring-bakery-pink/20 transition-all duration-300 hover:border-bakery-pink-light"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-poppins text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Referral Source dropdown */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "700ms" }}
                >
                  <FormField
                    control={form.control}
                    name="referralSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins text-gray-700 font-medium">
                          How did you hear about us?
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-12 w-full rounded-xl border border-bakery-pink-light/40 bg-bakery-cream/20 px-4 py-2 font-poppins text-base text-gray-700 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bakery-pink/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-bakery-pink-light cursor-pointer"
                          >
                            {referralSourceOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage className="font-poppins text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Conditional referral details */}
                {referralValue === "Other (describe below)" && (
                  <div className="animate-fade-in-up">
                    <FormField
                      control={form.control}
                      name="referralDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-poppins text-gray-700 font-medium">
                            Please describe (optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tell us where you heard about us"
                              className="h-12 rounded-xl border-bakery-pink-light/40 bg-bakery-cream/20 font-poppins placeholder:text-gray-400 focus:border-bakery-pink focus:ring-bakery-pink/20 transition-all duration-300 hover:border-bakery-pink-light"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="font-poppins text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Message field */}
                <div
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins text-gray-700 font-medium">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Let us know which classes you're interested in..."
                            className="min-h-[100px] rounded-xl border-bakery-pink-light/40 bg-bakery-cream/20 font-poppins placeholder:text-gray-400 focus:border-bakery-pink focus:ring-bakery-pink/20 transition-all duration-300 hover:border-bakery-pink-light resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-poppins text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit button */}
                <div
                  className={`pt-2 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "900ms" }}
                >
                  <Button
                    type="submit"
                    className="w-full h-14 rounded-2xl text-base font-poppins font-semibold bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-pink-dark bg-[length:200%_100%] text-white shadow-lg shadow-bakery-pink/25 hover:shadow-xl hover:shadow-bakery-pink/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 hover:bg-right"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Joining...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Join the Waitlist
                        <svg
                          className="w-5 h-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    )}
                  </Button>
                </div>

                {/* Privacy note */}
                <p
                  className={`text-center text-xs text-gray-400 font-poppins transition-all duration-700 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: "1000ms" }}
                >
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
