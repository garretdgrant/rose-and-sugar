"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Heart,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Gift,
  Send,
} from "lucide-react";

const formSchema = z.object({
  // Your info (nominator)
  yourName: z.string().min(2, "Name must be at least 2 characters"),
  yourEmail: z.string().email("Please provide a valid email address"),
  yourPhone: z.string().min(10, "Please provide a valid phone number"),

  // Nominee info
  nomineeName: z.string().min(2, "Nominee name must be at least 2 characters"),
  nomineeRole: z
    .string()
    .min(3, "Please describe their role (e.g., 'Teacher at Oak Elementary')"),
  deliveryLocation: z
    .string()
    .min(5, "Please provide a delivery address or general area"),
  actOfKindness: z
    .string()
    .min(20, "Please share at least a brief description of their kindness"),

  // Honeypot
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const KindCookieProgramClient = () => {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: "",
      yourEmail: "",
      yourPhone: "",
      nomineeName: "",
      nomineeRole: "",
      deliveryLocation: "",
      actOfKindness: "",
      company: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/kind-cookie-nomination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit nomination");
      }

      toast({
        title: "Nomination Submitted! 💗",
        description:
          "Thank you for spreading kindness! We'll review your nomination for this week's drawing.",
      });

      form.reset();
      router.push("/cookies/thank-you");
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-bakery-peach/20" />

        {/* Large decorative blobs */}
        <div
          className={`absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-bakery-pink-light/70 to-bakery-peach/50 blur-3xl transition-all duration-1000 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />
        <div
          className={`absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-200/60 to-bakery-pink-light/40 blur-3xl transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />

        {/* Floating hearts */}
        <div
          className={`absolute top-1/4 right-1/4 text-bakery-pink-dark/30 transition-all duration-700 delay-400 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <Heart className="w-12 h-12 fill-current" />
        </div>
        <div
          className={`absolute top-1/3 left-1/5 text-rose-300/40 transition-all duration-700 delay-600 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
        >
          <Heart className="w-8 h-8 fill-current" />
        </div>
        <div
          className={`absolute bottom-1/4 right-1/3 text-bakery-pink/30 transition-all duration-700 delay-800 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 3.5s ease-in-out infinite 1s" }}
        >
          <Heart className="w-10 h-10 fill-current" />
        </div>

        <div className="container-custom relative z-10 py-32 md:py-40">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border-2 border-rose-200 shadow-sm mb-8 transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span className="text-base font-poppins font-semibold text-gray-700">
                Spreading Kindness, One Cookie at a Time
              </span>
            </div>

            {/* Main Headline - Inspired by the Instagram images */}
            <h1
              className={`font-bebas leading-[0.85] tracking-tight mb-8 transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-rose-500 drop-shadow-sm">
                KIND COOKIE
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-bakery-brown via-amber-700 to-bakery-brown bg-clip-text text-transparent">
                PROGRAM
              </span>
            </h1>

            {/* Cookie emoji decoration */}
            <div
              className={`flex items-center justify-center gap-3 mb-8 transition-all duration-700 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-4xl md:text-5xl animate-bounce-soft">
                🍪
              </span>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-bakery-pink to-transparent rounded-full" />
              <span
                className="text-4xl md:text-5xl animate-bounce-soft"
                style={{ animationDelay: "0.5s" }}
              >
                🍪
              </span>
            </div>

            {/* Subheadline */}
            <p
              className={`font-bebas text-2xl md:text-3xl lg:text-4xl text-gray-700 max-w-3xl mx-auto mb-10 leading-tight transition-all duration-700 delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              THANKING OUR COMMUNITY HELPERS ONE COOKIE AT A TIME!
            </p>

            {/* Supporting text */}
            <p
              className={`font-poppins text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Show someone you appreciate their act of kindness with a{" "}
              <span className="font-semibold text-bakery-pink-dark">
                free cookie gift box
              </span>
              . Think teachers, nurses, grocery clerks, postal workers, or even
              your neighbor. No act of kindness is too big or too small!
            </p>

            {/* Mr. Rogers quote */}
            <div
              className={`mt-10 transition-all duration-700 delay-700 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <blockquote className="font-playfair italic text-xl md:text-2xl text-bakery-pink-dark">
                &ldquo;Look for the helpers. There&apos;s always people
                helping.&rdquo;
              </blockquote>
              <p className="mt-2 font-poppins text-sm text-gray-500">
                — Mister Rogers
              </p>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-20 md:h-32"
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

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/40 border border-bakery-pink-light mb-6">
              <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                How It Works
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-4">
              HOW DOES IT{" "}
              <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                WORK?
              </span>
            </h2>
            <p className="font-poppins text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              This program is all about recognizing our community helpers and
              people that have gone the extra mile to be kind and make our
              community a better place!
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                icon: User,
                title: "Nominate a Helper",
                description:
                  "Submit your nominee any time during the week until COB Friday (beginning 2/6). Share their name and a little blurb about their act of kindness.",
                emoji: "✨",
              },
              {
                step: "2",
                icon: Heart,
                title: "Weekly Drawing",
                description:
                  "Every Friday evening, I'll randomly select a nominee to receive their free Kind Cookie Gift Box for delivery the following week!",
                emoji: "🎉",
              },
              {
                step: "3",
                icon: Gift,
                title: "Custom Cookies",
                description:
                  "Cookies can be slightly customized on a case-by-case basis to make them extra special for your nominee.",
                emoji: "🍪",
              },
              {
                step: "4",
                icon: MapPin,
                title: "Free Delivery",
                description:
                  "Free delivery offered within Folsom for nominees in Folsom and surrounding areas. Think of it as a cookie gram without any embarrassing singing!",
                emoji: "🚗",
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className={`group transition-all duration-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${100 + idx * 100}ms` }}
              >
                <div className="relative h-full bg-gradient-to-br from-white to-bakery-cream/30 rounded-3xl p-8 shadow-md hover:shadow-xl border border-bakery-pink-light/30 hover:border-bakery-pink transition-all duration-300">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-bakery-pink-dark to-rose-500 flex items-center justify-center shadow-lg">
                    <span className="font-bebas text-2xl text-white">
                      {item.step}
                    </span>
                  </div>

                  {/* Emoji decoration */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-bakery-pink-light/50 to-rose-100/50 mb-5 group-hover:from-bakery-pink-dark group-hover:to-rose-500 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-bakery-pink-dark group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bebas text-2xl text-gray-800 tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional info box */}
          <div
            className={`mt-16 max-w-3xl mx-auto bg-gradient-to-br from-rose-50 to-bakery-pink-light/30 rounded-3xl p-8 md:p-10 border-2 border-bakery-pink-light shadow-lg transition-all duration-700 delay-600 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                </div>
              </div>
              <div>
                <h3 className="font-bebas text-2xl text-gray-800 mb-2">
                  Want to show someone your appreciation?
                </h3>
                <p className="font-poppins text-gray-700 leading-relaxed">
                  This is an ongoing weekly giveaway, so you can nominate
                  someone anytime. Anyone can submit a nominee in Folsom or the
                  surrounding areas, with free delivery offered within Folsom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NOMINATION FORM SECTION ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/30 to-bakery-pink-light/20" />

        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-200/40 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/40 to-transparent blur-3xl" />

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-20 md:h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="container-custom relative z-10 pt-12">
          <div className="max-w-3xl mx-auto">
            {/* Form Header */}
            <div className="text-center mb-12">
              <h2
                className={`font-bebas text-5xl md:text-6xl text-gray-800 tracking-tight mb-4 transition-all duration-700 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Nominate a{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark to-rose-500 bg-clip-text text-transparent">
                  Community Hero
                </span>
              </h2>
              <p
                className={`mt-4 text-gray-600 font-poppins text-lg transition-all duration-700 delay-100 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Fill out the form below to nominate someone special for this
                week&apos;s Kind Cookie drawing!
              </p>
            </div>

            {/* Form Card */}
            <div
              className={`relative transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-rose-300/60 via-bakery-pink-light/60 to-bakery-peach/60 rounded-[2rem] transform rotate-0.5" />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-10"
                  >
                    {/* Honeypot field */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <div style={{ display: "none" }}>
                          <Input
                            type="text"
                            autoComplete="off"
                            tabIndex={-1}
                            {...field}
                          />
                        </div>
                      )}
                    />

                    {/* Your Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b-2 border-bakery-pink-light/40">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-rose-500 flex items-center justify-center shadow-md">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bebas text-3xl text-gray-800">
                            Your Information
                          </h3>
                          <p className="text-sm text-gray-500 font-poppins">
                            So we can contact you about your nomination
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="yourName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-semibold flex items-center gap-2 text-base">
                              <User className="w-4 h-4 text-bakery-pink-dark" />
                              Your Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="border-bakery-pink-light/50 focus:border-bakery-pink focus:ring-bakery-pink/30 rounded-xl py-6 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="yourEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-poppins font-semibold flex items-center gap-2 text-base">
                                <Mail className="w-4 h-4 text-bakery-pink-dark" />
                                Your Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your.email@example.com"
                                  className="border-bakery-pink-light/50 focus:border-bakery-pink focus:ring-bakery-pink/30 rounded-xl py-6 text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="yourPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-poppins font-semibold flex items-center gap-2 text-base">
                                <Phone className="w-4 h-4 text-bakery-pink-dark" />
                                Your Phone
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="(123) 456-7890"
                                  className="border-bakery-pink-light/50 focus:border-bakery-pink focus:ring-bakery-pink/30 rounded-xl py-6 text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Nominee Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b-2 border-bakery-pink-light/40">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-bakery-pink-dark flex items-center justify-center shadow-md">
                          <Heart className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div>
                          <h3 className="font-bebas text-3xl text-gray-800">
                            Who Are You Nominating?
                          </h3>
                          <p className="text-sm text-gray-500 font-poppins">
                            Tell us about your community helper
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="nomineeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-semibold flex items-center gap-2 text-base">
                              <User className="w-4 h-4 text-bakery-pink-dark" />
                              Nominee&apos;s Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Their name"
                                className="border-bakery-pink-light/50 focus:border-bakery-pink focus:ring-bakery-pink/30 rounded-xl py-6 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nomineeRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-semibold flex items-center gap-2 text-base">
                              <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                              Their Role
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 'Teacher at Oak Elementary' or 'Postal Worker on Main Street'"
                                className="border-bakery-pink-light/50 focus:border-bakery-pink focus:ring-bakery-pink/30 rounded-xl py-6 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-sm text-gray-500">
                              Help us understand who they are and what they do
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deliveryLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-semibold flex items-center gap-2 text-base">
                              <MapPin className="w-4 h-4 text-bakery-pink-dark" />
                              Delivery Location
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="General area (e.g., 'Temple Coffee Folsom')"
                                className="border-bakery-pink-light/50 focus:border-bakery-pink focus:ring-bakery-pink/30 rounded-xl py-6 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-sm text-gray-500">
                              Where can we deliver the cookies? (Free delivery
                              within Folsom)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="actOfKindness"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-semibold flex items-center gap-2 text-base">
                              <MessageSquare className="w-4 h-4 text-bakery-pink-dark" />
                              Their Act of Kindness
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share the story of what made this person stand out. What did they do that made a difference? Why do they deserve recognition? The more details, the better!"
                                className="min-h-[180px] border-bakery-pink-light/50 focus:border-bakery-pink focus:ring-bakery-pink/30 rounded-xl text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-sm text-gray-500">
                              Tell us their story! What kindness did they show?
                              How did they help?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-7 text-lg rounded-2xl bg-gradient-to-r from-bakery-pink-dark via-rose-500 to-bakery-pink-dark hover:shadow-2xl hover:shadow-rose-300/50 disabled:opacity-50 transition-all duration-300 font-bebas text-2xl tracking-wide"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-pulse">
                              Submitting Nomination...
                            </span>
                          </>
                        ) : (
                          <>
                            <Heart className="w-6 h-6 mr-3 fill-white" />
                            Submit Nomination
                            <Send className="w-6 h-6 ml-3" />
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-gray-500 mt-6 font-poppins leading-relaxed">
                        Nominations are accepted until COB Friday each week. The
                        weekly winner will be randomly selected and notified for
                        delivery the following week!
                      </p>
                    </div>
                  </form>
                </Form>
              </div>
            </div>

            {/* Bottom note with decorative hearts */}
            <div
              className={`mt-12 text-center transition-all duration-700 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-50 via-bakery-pink-light/30 to-rose-50 rounded-full border-2 border-bakery-pink-light/50">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                <p className="font-poppins text-gray-700 font-medium">
                  Thank you for spreading kindness in our community!
                </p>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KindCookieProgramClient;
