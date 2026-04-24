"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { isValidPhone } from "@/lib/validations";
import { referralSourceOptions } from "@/lib/referralSources";
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
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPageClient = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledMessage = searchParams.get("message") ?? "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: prefilledMessage,
      referralSource: "Google",
      referralDetails: "",
      company: "",
    },
  });

  const referralValue = form.watch("referralSource");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const referralSource = data.referralSource?.trim() ?? "";
      const referralDetails = data.referralDetails?.trim() ?? "";
      const normalizedReferral =
        referralSource === "Other (describe below)" && referralDetails
          ? `Other: ${referralDetails}`
          : referralSource;

      const response = await fetch("/api/contact/general", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          referralSource: normalizedReferral,
        }),
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
    <div className="rounded-3xl border border-bakery-pink-light/30 bg-white/80 p-6 opacity-0 shadow-xl shadow-bakery-pink/10 backdrop-blur-sm transition-all duration-700 animate-fade-in-up md:p-10">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink shadow-lg shadow-bakery-pink/30">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-bebas text-3xl text-gray-800">General Inquiry</h2>
          <p className="font-poppins text-sm text-gray-500">
            We&apos;ll guide you to the right next step.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(123) 456-7890" {...field} />
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
                  <FormLabel>How did you hear about us? (Select One)</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-bakery-pink-light/40 bg-background px-3 py-2 text-base text-gray-700 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bakery-pink/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      {referralSourceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {referralValue === "Other (describe below)" ? (
            <FormField
              control={form.control}
              name="referralDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please describe (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tell us where you heard about us"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

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
            className="w-full rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink py-6 text-base font-semibold text-white shadow-lg shadow-bakery-pink/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-bakery-pink/40"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactPageClient;
