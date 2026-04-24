"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  yourName: z.string().min(2, "Name must be at least 2 characters"),
  yourEmail: z.string().email("Please provide a valid email address"),
  yourPhone: z.string().min(10, "Please provide a valid phone number"),
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
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const KindCookieProgramClient = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
    <div className="relative opacity-0 transition-all duration-700 animate-fade-in-up animation-delay-200">
      <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-rose-300/60 via-bakery-pink-light/60 to-bakery-peach/60" />

      <div className="relative rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
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

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-bakery-pink-light/40 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink-dark to-rose-500 shadow-md">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bebas text-3xl text-gray-800">
                    Your Information
                  </h3>
                  <p className="font-poppins text-sm text-gray-500">
                    So we can contact you about your nomination
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="yourName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-poppins font-semibold text-gray-700">
                      <User className="h-4 w-4 text-bakery-pink-dark" />
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        className="rounded-xl border-bakery-pink-light/50 py-6 text-base focus:border-bakery-pink focus:ring-bakery-pink/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="yourEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-poppins font-semibold text-gray-700">
                        <Mail className="h-4 w-4 text-bakery-pink-dark" />
                        Your Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          className="rounded-xl border-bakery-pink-light/50 py-6 text-base focus:border-bakery-pink focus:ring-bakery-pink/30"
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
                      <FormLabel className="flex items-center gap-2 text-base font-poppins font-semibold text-gray-700">
                        <Phone className="h-4 w-4 text-bakery-pink-dark" />
                        Your Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(123) 456-7890"
                          className="rounded-xl border-bakery-pink-light/50 py-6 text-base focus:border-bakery-pink focus:ring-bakery-pink/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-bakery-pink-light/40 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-bakery-pink-dark shadow-md">
                  <Heart className="h-6 w-6 fill-white text-white" />
                </div>
                <div>
                  <h3 className="font-bebas text-3xl text-gray-800">
                    Who Are You Nominating?
                  </h3>
                  <p className="font-poppins text-sm text-gray-500">
                    Tell us about your community helper
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="nomineeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-poppins font-semibold text-gray-700">
                      <User className="h-4 w-4 text-bakery-pink-dark" />
                      Nominee&apos;s Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Their name"
                        className="rounded-xl border-bakery-pink-light/50 py-6 text-base focus:border-bakery-pink focus:ring-bakery-pink/30"
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
                    <FormLabel className="flex items-center gap-2 text-base font-poppins font-semibold text-gray-700">
                      <Sparkles className="h-4 w-4 text-bakery-pink-dark" />
                      Their Role
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Teacher at Oak Elementary' or 'Postal Worker on Main Street'"
                        className="rounded-xl border-bakery-pink-light/50 py-6 text-base focus:border-bakery-pink focus:ring-bakery-pink/30"
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
                    <FormLabel className="flex items-center gap-2 text-base font-poppins font-semibold text-gray-700">
                      <MapPin className="h-4 w-4 text-bakery-pink-dark" />
                      Delivery Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="General area (e.g., 'Temple Coffee Folsom')"
                        className="rounded-xl border-bakery-pink-light/50 py-6 text-base focus:border-bakery-pink focus:ring-bakery-pink/30"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      Where can we deliver the cookies? (Free delivery within
                      Folsom)
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
                    <FormLabel className="flex items-center gap-2 text-base font-poppins font-semibold text-gray-700">
                      <MessageSquare className="h-4 w-4 text-bakery-pink-dark" />
                      Their Act of Kindness
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share the story of what made this person stand out. What did they do that made a difference? Why do they deserve recognition? The more details, the better!"
                        className="min-h-[180px] rounded-xl border-bakery-pink-light/50 text-base focus:border-bakery-pink focus:ring-bakery-pink/30"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      Tell us their story! What kindness did they show? How did
                      they help?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-gradient-to-r from-bakery-pink-dark via-rose-500 to-bakery-pink-dark py-7 font-bebas text-2xl tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-rose-300/50 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">
                    Submitting Nomination...
                  </span>
                ) : (
                  <>
                    <Heart className="mr-3 h-6 w-6 fill-white" />
                    Submit Nomination
                    <Send className="ml-3 h-6 w-6" />
                  </>
                )}
              </Button>

              <p className="mt-6 text-center font-poppins text-sm leading-relaxed text-gray-500">
                Nominations are accepted until COB Friday each week. The weekly
                winner will be randomly selected and notified for delivery the
                following week!
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default KindCookieProgramClient;
