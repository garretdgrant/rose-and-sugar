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
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import {
  ArrowRight,
  Sparkles,
  Cookie,
  Calendar,
  Package,
  MessageSquare,
  User,
  Mail,
  Phone,
  Check,
  DollarSign,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(10, "Please provide a valid phone number"),
  eventDate: z
    .string()
    .min(1, "Please provide the date when cookies are needed"),
  quantity: z.enum(["2", "3", "4", "5", "6", "7", "8", "9", "10", "11+"], {
    errorMap: () => ({ message: "Please select a quantity between 2 and 10" }),
  }),
  flavorPreference: z
    .array(
      z.enum([
        "vanilla",
        "lemon",
        "almond",
        "confetti",
        "gf",
        "maple",
        "chocolate-chip",
        "undecided",
      ]),
    )
    .min(1, "Please select at least one flavor"),
  packaging: z.enum(["sealed", "ribbon", "undecided"]),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
  message: z.string().min(10, "Please provide details about your request"),
  dyefree: z.boolean(),
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const customOrderFaqs = [
  {
    question: "How far in advance should I order custom cookies?",
    answer: (
      <>
        We recommend placing your order at least 2-3 weeks in advance. Rush
        orders may be available for an additional fee, but cannot be guaranteed.
        For timing questions,{" "}
        <Link className="text-bakery-pink-dark hover:underline" href="/contact">
          contact us
        </Link>
        .
      </>
    ),
  },
  {
    question: "What's included in the base price per dozen?",
    answer: (
      <>
        Starting at $65 per dozen, each order includes up to five colors and
        basic to intermediate detail. Character cookies and logos start at $70
        per dozen. Additional colors, airbrushing, and intricate designs may
        increase pricing. For a custom quote,{" "}
        <Link className="text-bakery-pink-dark hover:underline" href="/contact">
          reach out
        </Link>
        .
      </>
    ),
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer: (
      <>
        Our cookies contain wheat, milk, eggs, and soy (in sprinkles). While we
        cannot guarantee allergen-free cookies, we&apos;re happy to discuss your
        specific needs.{" "}
        <Link className="text-bakery-pink-dark hover:underline" href="/contact">
          Contact us
        </Link>{" "}
        for details.
      </>
    ),
  },
  {
    question: "What are the payment and pickup options?",
    answer: (
      <>
        We accept Venmo, Zelle, and major credit cards. Payment is required at
        least two weeks before pickup to confirm your order. Pickup is available
        in Folsom, with preferred times on Saturdays.{" "}
        <Link className="text-bakery-pink-dark hover:underline" href="/contact">
          Contact us
        </Link>{" "}
        for scheduling.
      </>
    ),
  },
  {
    question: "How are the cookies packaged?",
    answer: (
      <>
        Cookies come individually heat-sealed for freshness at no additional
        cost. Ribbon-tied packaging is available for an additional charge per
        dozen. For packaging add-ons,{" "}
        <Link className="text-bakery-pink-dark hover:underline" href="/contact">
          reach out
        </Link>
        .
      </>
    ),
  },
];

const flavorOptions: {
  label: string;
  value: FormValues["flavorPreference"][number];
}[] = [
  { label: "Vanilla", value: "vanilla" },
  { label: "Lemon", value: "lemon" },
  { label: "Almond", value: "almond" },
  { label: "Confetti", value: "confetti" },
  { label: "GF Flour (+$6/dozen)", value: "gf" },
  { label: "Maple", value: "maple" },
  { label: "Chocolate Chip", value: "chocolate-chip" },
  { label: "Decide Later", value: "undecided" },
];

const steps = [
  { id: 1, title: "Your Info", icon: User },
  { id: 2, title: "Order Details", icon: Cookie },
  { id: 3, title: "Flavors & Packaging", icon: Package },
  { id: 4, title: "Your Vision", icon: MessageSquare },
];

const CustomOrderClient = () => {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      quantity: "2",
      flavorPreference: ["undecided"],
      packaging: "sealed",
      referralSource: "",
      message: "",
      dyefree: false,
      company: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/custom-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      toast({
        title: "Inquiry Submitted!",
        description:
          "Thank you for your message. Megan will be in touch within 48 hours.",
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

  const handleFlavorChange = (
    value: FormValues["flavorPreference"][number],
    isChecked: boolean,
    currentValues: FormValues["flavorPreference"],
  ) => {
    if (isChecked) {
      let updatedValues = [...currentValues, value];

      if (value !== "undecided") {
        updatedValues = updatedValues.filter((v) => v !== "undecided");
      } else {
        updatedValues = ["undecided"];
      }

      return updatedValues;
    } else {
      return currentValues.filter((v) => v !== value);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceedStep1 =
    form.watch("name") && form.watch("email") && form.watch("phone");
  const canProceedStep2 = form.watch("eventDate") && form.watch("quantity");
  const canProceedStep3 =
    form.watch("flavorPreference")?.length > 0 && form.watch("packaging");
  const messageValue = form.watch("message")?.trim() ?? "";
  const referralSourceValue = form.watch("referralSource")?.trim() ?? "";
  const canSubmit =
    Boolean(canProceedStep1 && canProceedStep2 && canProceedStep3) &&
    messageValue.length >= 10 &&
    referralSourceValue.length > 0;

  return (
    <main className="relative overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bakery-cream via-white to-bakery-peach/30" />

        {/* Large decorative blob - top right */}
        <div
          className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-bakery-pink-light/60 to-bakery-peach/40 blur-3xl transition-all duration-1000 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />

        {/* Medium blob - bottom left */}
        <div
          className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-bakery-peach/50 to-bakery-pink-light/30 blur-2xl transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        />

        {/* Floating accent shapes */}
        <div
          className={`absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-bakery-pink-dark/60 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 4s ease-in-out infinite" }}
        />
        <div
          className={`absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-bakery-brown/50 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
        />
        <div
          className={`absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-bakery-pink/70 transition-all duration-700 delay-900 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: "float 3.5s ease-in-out infinite 1s" }}
        />

        <div className="container-custom relative z-10 py-28 md:py-36">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50 shadow-sm mb-6 transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Sparkles className="w-4 h-4 text-bakery-pink-dark" />
              <span className="text-sm font-poppins font-medium text-gray-700">
                Custom Orders
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-6 transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block text-gray-800">Custom</span>
              <span className="block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                Cookie Orders
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`font-poppins text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Make your celebration extra sweet with custom-designed sugar
              cookies. Every set is handcrafted and tailored to your vision.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/cookies/signature-sugar-cookie-sets"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-poppins font-semibold rounded-full border-2 border-bakery-pink-light hover:border-bakery-pink hover:bg-bakery-pink-light/30 transition-all duration-300"
              >
                Looking for Signature Sets?
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* SVG wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 md:h-24"
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

      {/* ===== FORM SECTION ===== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bakery-cream/40 to-bakery-pink-light/30" />

        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bakery-pink-light/30 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-bakery-peach/30 to-transparent blur-3xl" />

        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-16 md:h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="container-custom relative z-10 pt-8">
          <div className="max-w-4xl mx-auto">
            {/* Form Header */}
            <div className="text-center mb-10">
              <h2
                className={`font-bebas text-4xl md:text-5xl text-gray-800 tracking-tight transition-all duration-700 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Request a{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark to-bakery-pink bg-clip-text text-transparent">
                  Custom Order
                </span>
              </h2>
              <p
                className={`mt-3 text-gray-600 font-poppins transition-all duration-700 delay-100 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Tell us about your event and we&apos;ll follow up within 48
                hours.
              </p>
            </div>

            {/* Step Indicator */}
            <div
              className={`flex items-center justify-center mb-10 transition-all duration-700 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-2 md:gap-4">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-disabled="true"
                      className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full font-poppins text-sm font-medium transition-all duration-300 cursor-default ${
                        currentStep === step.id
                          ? "bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white shadow-lg shadow-bakery-pink/30"
                          : currentStep > step.id
                            ? "bg-bakery-pink-light/50 text-bakery-pink-dark"
                            : "bg-white/80 text-gray-500 border border-bakery-pink-light/30"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                      <span className="hidden md:inline">{step.title}</span>
                    </button>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-6 md:w-10 h-0.5 mx-1 transition-colors duration-300 ${
                          currentStep > step.id
                            ? "bg-bakery-pink"
                            : "bg-bakery-pink-light/30"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div
              className={`relative transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Card shadow/border effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-bakery-pink-light/60 via-bakery-peach/40 to-bakery-pink-light/60 rounded-[2rem] transform rotate-0.5" />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
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

                    {/* Step 1: Personal Info */}
                    <div
                      className={`space-y-6 ${currentStep === 1 ? "block" : "hidden"}`}
                    >
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-bakery-pink-light/30">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bebas text-2xl text-gray-800">
                            Your Information
                          </h3>
                          <p className="text-sm text-gray-500 font-poppins">
                            How can we reach you?
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-medium flex items-center gap-2">
                              <User className="w-4 h-4 text-bakery-pink-dark" />
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="border-bakery-pink-light/40 focus:border-bakery-pink focus:ring-bakery-pink/20 rounded-xl py-3"
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-poppins font-medium flex items-center gap-2">
                                <Mail className="w-4 h-4 text-bakery-pink-dark" />
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your.email@example.com"
                                  className="border-bakery-pink-light/40 focus:border-bakery-pink focus:ring-bakery-pink/20 rounded-xl py-3"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-poppins font-medium flex items-center gap-2">
                                <Phone className="w-4 h-4 text-bakery-pink-dark" />
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="(123) 456-7890"
                                  className="border-bakery-pink-light/40 focus:border-bakery-pink focus:ring-bakery-pink/20 rounded-xl py-3"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Step 2: Order Details */}
                    <div
                      className={`space-y-6 ${currentStep === 2 ? "block" : "hidden"}`}
                    >
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-bakery-pink-light/30">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center">
                          <Cookie className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bebas text-2xl text-gray-800">
                            Order Details
                          </h3>
                          <p className="text-sm text-gray-500 font-poppins">
                            When and how many?
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="eventDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-poppins font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-bakery-pink-dark" />
                                Event Date / When Needed
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  className="border-bakery-pink-light/40 focus:border-bakery-pink focus:ring-bakery-pink/20 rounded-xl py-3"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-poppins font-medium">
                                How Many Dozen?
                              </FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="w-full rounded-xl border border-bakery-pink-light/40 bg-white px-4 py-3 text-sm focus:border-bakery-pink focus:outline-none focus:ring-2 focus:ring-bakery-pink/20 transition-all"
                                >
                                  <option value="" disabled>
                                    Select quantity
                                  </option>
                                  {[
                                    "2",
                                    "3",
                                    "4",
                                    "5",
                                    "6",
                                    "7",
                                    "8",
                                    "9",
                                    "10",
                                    "11+",
                                  ].map((num) => (
                                    <option key={num} value={num}>
                                      {num} dozen
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormDescription className="text-xs text-gray-500">
                                Minimum 2 dozen for custom orders
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="dyefree"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-medium">
                              Dye-Free Icing (+$10/dozen)
                            </FormLabel>
                            <div className="flex gap-4 mt-2">
                              <label
                                className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                                  field.value
                                    ? "border-bakery-pink bg-bakery-pink-light/30"
                                    : "border-bakery-pink-light/40 hover:border-bakery-pink-light"
                                }`}
                              >
                                <input
                                  type="radio"
                                  value="true"
                                  checked={field.value === true}
                                  onChange={() => field.onChange(true)}
                                  className="sr-only"
                                />
                                <span
                                  className={`font-poppins font-medium ${
                                    field.value
                                      ? "text-bakery-pink-dark"
                                      : "text-gray-600"
                                  }`}
                                >
                                  Yes, dye-free please
                                </span>
                              </label>

                              <label
                                className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                                  !field.value
                                    ? "border-bakery-pink bg-bakery-pink-light/30"
                                    : "border-bakery-pink-light/40 hover:border-bakery-pink-light"
                                }`}
                              >
                                <input
                                  type="radio"
                                  value="false"
                                  checked={field.value === false}
                                  onChange={() => field.onChange(false)}
                                  className="sr-only"
                                />
                                <span
                                  className={`font-poppins font-medium ${
                                    !field.value
                                      ? "text-bakery-pink-dark"
                                      : "text-gray-600"
                                  }`}
                                >
                                  Standard colors
                                </span>
                              </label>
                            </div>
                            <FormDescription className="text-xs text-gray-500 mt-2">
                              Dye-free colors will be more muted and natural.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Step 3: Flavors & Packaging */}
                    <div
                      className={`space-y-6 ${currentStep === 3 ? "block" : "hidden"}`}
                    >
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-bakery-pink-light/30">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bebas text-2xl text-gray-800">
                            Flavors & Packaging
                          </h3>
                          <p className="text-sm text-gray-500 font-poppins">
                            Customize your order
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="flavorPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-medium">
                              Flavor Preferences
                            </FormLabel>
                            <FormDescription className="text-xs text-gray-500 mb-3">
                              Select all that apply
                            </FormDescription>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {flavorOptions.map((option) => {
                                const isSelected = field.value?.includes(
                                  option.value,
                                );
                                return (
                                  <label
                                    key={option.value}
                                    className={`flex items-center justify-center px-4 py-3 rounded-xl cursor-pointer border-2 transition-all duration-300 text-center ${
                                      isSelected
                                        ? "border-bakery-pink bg-bakery-pink-light/30"
                                        : "border-bakery-pink-light/40 hover:border-bakery-pink-light"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      value={option.value}
                                      checked={isSelected}
                                      onChange={(e) => {
                                        const value = e.target
                                          .value as FormValues["flavorPreference"][number];
                                        const isChecked = e.target.checked;
                                        const updatedValues =
                                          handleFlavorChange(
                                            value,
                                            isChecked,
                                            field.value || [],
                                          );
                                        field.onChange(updatedValues);
                                      }}
                                      className="sr-only"
                                    />
                                    <span
                                      className={`font-poppins text-sm font-medium ${
                                        isSelected
                                          ? "text-bakery-pink-dark"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      {option.label}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="packaging"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-medium">
                              Packaging Preference
                            </FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                              {[
                                {
                                  value: "sealed",
                                  label: "Heat-Sealed",
                                  desc: "Individually wrapped",
                                },
                                {
                                  value: "ribbon",
                                  label: "Ribbon-Tied",
                                  desc: "+$6/dozen",
                                },
                                {
                                  value: "undecided",
                                  label: "Decide Later",
                                  desc: "We'll discuss",
                                },
                              ].map((option) => (
                                <label
                                  key={option.value}
                                  className={`flex flex-col items-center px-4 py-4 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                                    field.value === option.value
                                      ? "border-bakery-pink bg-bakery-pink-light/30"
                                      : "border-bakery-pink-light/40 hover:border-bakery-pink-light"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    className="sr-only"
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() =>
                                      field.onChange(option.value)
                                    }
                                  />
                                  <span
                                    className={`font-poppins font-medium ${
                                      field.value === option.value
                                        ? "text-bakery-pink-dark"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {option.label}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1">
                                    {option.desc}
                                  </span>
                                </label>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Step 4: Message */}
                    <div
                      className={`space-y-6 ${currentStep === 4 ? "block" : "hidden"}`}
                    >
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-bakery-pink-light/30">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bebas text-2xl text-gray-800">
                            Share Your Vision
                          </h3>
                          <p className="text-sm text-gray-500 font-poppins">
                            Tell us about your event
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="referralSource"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-medium">
                              How did you hear about us?{" "}
                              <span className="text-bakery-pink-dark">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Instagram, friend, Google, etc."
                                className="border-bakery-pink-light/40 focus:border-bakery-pink focus:ring-bakery-pink/20 rounded-xl py-3"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-poppins font-medium">
                              Tell us about your order
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please share details about your event, design ideas, color themes, or any questions you have. Feel free to describe your vision or link to inspiration images!"
                                className="min-h-[150px] border-bakery-pink-light/40 focus:border-bakery-pink focus:ring-bakery-pink/20 rounded-xl"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-gray-500">
                              We can always make updates later. Share your
                              vision and we&apos;ll work together to bring it to
                              life!
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-bakery-pink-light/30">
                      {currentStep > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="px-6 py-3 rounded-full border-bakery-pink-light hover:bg-bakery-pink-light/20"
                        >
                          Back
                        </Button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 4 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={
                            (currentStep === 1 && !canProceedStep1) ||
                            (currentStep === 2 && !canProceedStep2) ||
                            (currentStep === 3 && !canProceedStep3)
                          }
                          className="px-8 py-3 rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white hover:shadow-lg hover:shadow-bakery-pink/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting || !canSubmit}
                          className="px-8 py-3 rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white hover:shadow-lg hover:shadow-bakery-pink/30 disabled:opacity-50 transition-all"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-pulse">Sending...</span>
                            </>
                          ) : (
                            <>
                              Submit Inquiry
                              <Sparkles className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>

                <p className="text-center text-sm text-gray-500 mt-6 font-poppins">
                  After you submit, Megan will follow up within 48 hours with an
                  invoice and next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS SECTION ===== */}
      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Starting at $65/dz",
                desc: "Custom cookies with up to 5 colors",
              },
              {
                icon: Clock,
                title: "2 Week Lead Time",
                desc: "Rush orders available on request",
              },
              {
                icon: MapPin,
                title: "Folsom Pickup",
                desc: "Saturdays preferred",
              },
              {
                icon: CreditCard,
                title: "Easy Payment",
                desc: "Venmo, Zelle, and credit cards accepted",
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className={`group relative transition-all duration-500 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${100 + idx * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-bakery-pink-light via-bakery-peach to-bakery-pink-light rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-bakery-pink-light/20 group-hover:border-transparent text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-bakery-pink-light/50 to-bakery-peach/30 mb-4 group-hover:scale-110 group-hover:from-bakery-pink-dark group-hover:to-bakery-pink transition-all duration-300">
                    <item.icon className="w-6 h-6 text-bakery-pink-dark group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bebas text-xl text-gray-900 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 font-poppins">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d286a0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute top-20 -right-32 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-bakery-pink-light/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -left-32 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-bakery-peach/20 to-transparent blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bakery-pink-light/30 border border-bakery-pink-light/50 mb-4">
                <MessageSquare className="w-4 h-4 text-bakery-pink-dark" />
                <span className="text-sm font-poppins font-medium text-gray-700">
                  Common Questions
                </span>
              </div>
              <h2 className="font-bebas text-4xl md:text-5xl text-gray-800 tracking-tight">
                Frequently{" "}
                <span className="bg-gradient-to-r from-bakery-pink-dark to-bakery-pink bg-clip-text text-transparent">
                  Asked Questions
                </span>
              </h2>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-bakery-pink/5 border border-bakery-pink-light/20">
              <FAQAccordion faqs={customOrderFaqs} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomOrderClient;
