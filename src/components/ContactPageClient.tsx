"use client";

import { useEffect, useState } from "react";
import {
  Instagram,
  Mail,
  Phone,
  Sparkles,
  Clock,
  MessageCircle,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
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
import { useRouter } from "next/navigation";
import { isValidPhone } from "@/lib/validations";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().refine((value) => isValidPhone(value), {
    message: "Please provide a valid phone number",
  }),
  message: z.string().min(10, "Please provide your message"),
  referralSource: z.string().optional(),
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPageClient = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      referralSource: "",
      company: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/general", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      form.reset();
      router.push("/cookies/thank-you");
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
    <div className="min-h-screen bg-gradient-to-b from-bakery-cream/40 via-white to-bakery-pink-light/30">
      <main className="relative overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-bakery-pink-light/40 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-0 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-bakery-peach/40 to-transparent blur-3xl" />

        {/* Hero Intro */}
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6 transition-all duration-700 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Let&apos;s Connect
                </span>
              </div>

              <h1
                className={`font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight transition-all duration-700 delay-100 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <span className="text-gray-800">Get in</span>{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>

              <p
                className={`mt-6 font-poppins text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Have a question or a sweet idea to bring to life? Send us a note
                and Megan will follow up within 48 hours.
              </p>

              <div
                className={`mt-8 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-300 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-bakery-pink-light/30 text-sm font-poppins text-gray-600">
                  <Clock className="w-4 h-4 text-bakery-pink-dark" />
                  Replies in 48 hours
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-bakery-pink-light/30 text-sm font-poppins text-gray-600">
                  <MessageCircle className="w-4 h-4 text-bakery-pink-dark" />
                  Friendly, personal help
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative pb-20 md:pb-28">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-12 items-start">
              {/* Contact Form */}
              <div
                className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/10 border border-bakery-pink-light/30 transition-all duration-700 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center shadow-lg shadow-bakery-pink/30">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bebas text-3xl text-gray-800">
                      General Inquiry
                    </h2>
                    <p className="font-poppins text-sm text-gray-500">
                      We&apos;ll guide you to the right next step.
                    </p>
                  </div>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="(123) 456-7890"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="referralSource"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              How did you hear about us? (optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Instagram, friend, Google, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please let us know how we can help you!"
                              className="min-h-[140px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <input
                      type="text"
                      name="company"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <Button
                      type="submit"
                      className="w-full rounded-full py-6 text-base font-semibold bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-8">
                <div
                  className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg border border-bakery-pink-light/20 transition-all duration-700 delay-150 ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <h2 className="font-bebas text-2xl text-gray-800 mb-5">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bakery-pink-light/50 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-bakery-pink-dark" />
                      </div>
                      <p className="text-gray-700 font-poppins">916-337-8880</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bakery-pink-light/50 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-bakery-pink-dark" />
                      </div>
                      <p className="text-gray-700 font-poppins">
                        roseandsugarcookies@gmail.com
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bakery-pink-light/50 flex items-center justify-center">
                        <Instagram className="h-4 w-4 text-bakery-pink-dark" />
                      </div>
                      <a
                        href="https://www.instagram.com/roseandsugarcookies/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 font-poppins hover:text-bakery-pink-dark transition-colors"
                      >
                        @roseandsugarcookies
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-gradient-to-br from-bakery-cream via-white to-bakery-pink-light/20 rounded-3xl p-6 md:p-8 shadow-lg border border-bakery-pink-light/20 transition-all duration-700 delay-300 ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <h2 className="font-bebas text-2xl text-gray-800 mb-4">
                    Business Hours
                  </h2>
                  <div className="space-y-2 text-gray-700 font-poppins">
                    <p>Monday - Friday: 9am - 6pm</p>
                    <p>Saturday: 10am - 4pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-poppins text-bakery-pink-dark">
                    <Clock className="w-4 h-4" />
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

export default ContactPageClient;
