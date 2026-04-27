"use client";

import { useState } from "react";
import Link from "next/link";
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
  HeartHandshake,
  Smile,
} from "lucide-react";

const TWO_DOZEN_PRICE_PER_DOZEN = 75;
const STANDARD_PRICE_PER_DOZEN = 70;
const GLUTEN_FREE_PRICE_PER_DOZEN = 6;
const DYE_FREE_PRICE_PER_DOZEN = 10;
const RIBBON_PACKAGING_PRICE_PER_DOZEN = 6;
const EARLIEST_CUSTOM_ORDER_DATE = "2026-05-22";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please provide a valid email address"),
    phone: z.string().min(10, "Please provide a valid phone number"),
    eventDate: z
      .string()
      .min(1, "Please provide the date when cookies are needed"),
    quantity: z.enum(["2", "3", "4", "5", "6", "7", "8", "9", "10", "11+"], {
      errorMap: () => ({
        message: "Please select a quantity between 2 and 10",
      }),
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
        ]),
      )
      .min(1, "Please select at least one flavor"),
    packaging: z.enum(["sealed", "ribbon"], {
      errorMap: () => ({ message: "Please select a packaging option" }),
    }),
    referralSource: z.string().min(1, "Please tell us how you heard about us"),
    message: z.string().min(10, "Please provide details about your request"),
    tipPercentage: z.enum(["", "10", "15", "20", "custom"]),
    customTipAmount: z.string().optional(),
    dyefree: z.boolean(),
    company: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.tipPercentage !== "custom") {
      return;
    }

    const customTipAmount = Number(values.customTipAmount);

    if (
      values.customTipAmount === undefined ||
      values.customTipAmount.trim() === "" ||
      !Number.isFinite(customTipAmount) ||
      customTipAmount < 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customTipAmount"],
        message: "Enter a non-negative tip amount.",
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

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
];

const steps = [
  { id: 1, title: "Your Info", icon: User },
  { id: 2, title: "Order Details", icon: Cookie },
  { id: 3, title: "Flavors & Packaging", icon: Package },
  { id: 4, title: "Your Vision", icon: MessageSquare },
  { id: 5, title: "Tip", icon: HeartHandshake },
];

const tipOptions: {
  label: string;
  value: Exclude<FormValues["tipPercentage"], "">;
}[] = [
  { label: "10%", value: "10" },
  { label: "15%", value: "15" },
  { label: "20%", value: "20" },
  { label: "Custom/no tip", value: "custom" },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

const formatTipInputValue = (value: string) => {
  const sanitized = value.replace(/[^\d.]/g, "");
  const [dollars = "", ...decimalParts] = sanitized.split(".");

  if (decimalParts.length === 0) {
    return dollars;
  }

  return `${dollars}.${decimalParts.join("").slice(0, 2)}`;
};

const getQuantityValue = (quantity: FormValues["quantity"]) =>
  quantity === "11+" ? 11 : Number(quantity);

const getBasePricePerDozen = (quantity: number) =>
  quantity === 2 ? TWO_DOZEN_PRICE_PER_DOZEN : STANDARD_PRICE_PER_DOZEN;

const getEstimatedSubtotal = (values: Partial<FormValues>) => {
  const quantity = values.quantity ? getQuantityValue(values.quantity) : 0;
  const flavorPreference = values.flavorPreference ?? [];
  const packaging = values.packaging;
  const basePricePerDozen = getBasePricePerDozen(quantity);

  const addOnsPerDozen =
    (flavorPreference.includes("gf") ? GLUTEN_FREE_PRICE_PER_DOZEN : 0) +
    (values.dyefree ? DYE_FREE_PRICE_PER_DOZEN : 0) +
    (packaging === "ribbon" ? RIBBON_PACKAGING_PRICE_PER_DOZEN : 0);

  return quantity * (basePricePerDozen + addOnsPerDozen);
};

const getEstimatedTipAmount = (
  subtotal: number,
  tipPercentage: FormValues["tipPercentage"],
  customTipAmount?: string,
) => {
  if (tipPercentage === "custom") {
    const amount = Number(customTipAmount);
    return Number.isFinite(amount) && amount >= 0 ? amount : 0;
  }

  return subtotal * (Number(tipPercentage) / 100);
};

const CustomOrderClient = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      quantity: "2",
      flavorPreference: [],
      referralSource: "Google",
      message: "",
      tipPercentage: "",
      customTipAmount: "0",
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
      return [...currentValues, value];
    }
    return currentValues.filter((option) => option !== value);
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
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
  const selectedTipPercentage = form.watch("tipPercentage");
  const selectedCustomTipAmount = form.watch("customTipAmount")?.trim() ?? "";
  const parsedCustomTipAmount = Number(selectedCustomTipAmount);
  const hasValidCustomTipAmount =
    selectedTipPercentage !== "custom" ||
    (selectedCustomTipAmount !== "" &&
      Number.isFinite(parsedCustomTipAmount) &&
      parsedCustomTipAmount >= 0);
  const selectedAddOns = [
    form.watch("flavorPreference")?.includes("gf") ? "Gluten-free flour" : null,
    form.watch("dyefree") ? "Dye-free icing" : null,
    form.watch("packaging") === "ribbon" ? "Ribbon-tied packaging" : null,
  ].filter((addOn): addOn is string => Boolean(addOn));
  const estimatedSubtotal = getEstimatedSubtotal(form.watch());
  const estimatedTipAmount = getEstimatedTipAmount(
    estimatedSubtotal,
    selectedTipPercentage,
    selectedCustomTipAmount,
  );
  const estimatedTotal = estimatedSubtotal + estimatedTipAmount;
  const canProceedStep4 =
    Boolean(canProceedStep1 && canProceedStep2 && canProceedStep3) &&
    messageValue.length >= 10 &&
    referralSourceValue.length > 0;
  const canSubmit =
    canProceedStep4 && selectedTipPercentage !== "" && hasValidCustomTipAmount;
  const selectedTipDescription =
    selectedTipPercentage === ""
      ? "Choose a tip option before submitting."
      : selectedTipPercentage === "custom"
        ? hasValidCustomTipAmount
          ? "Custom tip will be added to the inquiry."
          : "Enter a non-negative custom tip amount."
        : `Thank you. Your ${selectedTipPercentage}% tip means so much.`;
  const handleFormSubmit = form.handleSubmit((data) => {
    if (currentStep !== steps.length || !canSubmit) {
      return;
    }

    return onSubmit(data);
  });

  return (
    <>
      <div
        className="mb-10 flex items-center justify-center opacity-0 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex items-center gap-2 md:gap-4">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <button
                type="button"
                tabIndex={-1}
                aria-disabled="true"
                className={`flex items-center gap-2 rounded-full px-3 py-2 font-poppins text-sm font-medium transition-all duration-300 md:px-4 md:py-2.5 ${
                  currentStep === step.id
                    ? "bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white shadow-lg shadow-bakery-pink/30"
                    : currentStep > step.id
                      ? "bg-bakery-pink-light/50 text-bakery-pink-dark"
                      : "border border-bakery-pink-light/30 bg-white/80 text-gray-500"
                } cursor-default`}
              >
                {currentStep > step.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
                <span className="hidden md:inline">{step.title}</span>
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`mx-1 h-0.5 w-6 transition-colors duration-300 md:w-10 ${
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

      <div
        className="relative opacity-0 animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        <div className="absolute -inset-1 rotate-0.5 rounded-[2rem] bg-gradient-to-br from-bakery-pink-light/60 via-bakery-peach/40 to-bakery-pink-light/60" />

        <div className="relative rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur-sm md:p-10">
          <Form {...form}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
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

              <div className="rounded-2xl border border-bakery-pink/20 bg-gradient-to-br from-bakery-cream via-white to-bakery-pink-light/20 p-5 shadow-sm">
                <p className="font-poppins text-sm leading-relaxed text-gray-700 md:text-[15px]">
                  Megan is currently sold out through the end of the month, and
                  new custom orders are not being accepted until{" "}
                  <span className="font-semibold text-bakery-pink-dark">
                    5/22
                  </span>
                  . If you&apos;d like a reminder when orders open back up,
                  please{" "}
                  <Link
                    href={{
                      pathname: "/contact",
                      query: {
                        message:
                          "Hi Megan! Please add me to your email list and send me a reminder when custom orders open back up.",
                      },
                    }}
                    className="font-semibold text-bakery-pink-dark underline decoration-bakery-pink/40 underline-offset-4 transition-colors hover:text-bakery-brown"
                  >
                    join the email list here
                  </Link>
                  . Looking for something sweet sooner? Megan also has a{" "}
                  <Link
                    href="/classes#book-class"
                    className="font-semibold text-bakery-pink-dark underline decoration-bakery-pink/40 underline-offset-4 transition-colors hover:text-bakery-brown"
                  >
                    cookie decorating class on May 9
                  </Link>
                  .
                </p>
              </div>

              {currentStep === 5 && (
                <div className="rounded-2xl border border-bakery-pink/20 bg-gradient-to-br from-bakery-cream via-white to-bakery-pink-light/20 p-5 shadow-sm">
                  <p className="font-poppins text-sm leading-relaxed text-gray-700 md:text-[15px]">
                    This is an{" "}
                    <span className="font-semibold text-bakery-pink-dark">
                      initial quote
                    </span>
                    . Megan will review your request and confirm{" "}
                    <span className="font-semibold text-bakery-pink-dark">
                      final pricing
                    </span>{" "}
                    based on design complexity, repeated cookie designs, order
                    size, and any available larger-order{" "}
                    <span className="font-semibold text-bakery-pink-dark">
                      adjustments or discounts
                    </span>
                    .
                  </p>
                </div>
              )}

              <div
                className={`space-y-6 ${currentStep === 1 ? "block" : "hidden"}`}
              >
                <div className="mb-6 flex items-center gap-3 border-b border-bakery-pink-light/30 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-gray-800">
                      Your Information
                    </h3>
                    <p className="font-poppins text-sm text-gray-500">
                      How can we reach you?
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-poppins font-medium text-gray-700">
                        <User className="h-4 w-4 text-bakery-pink-dark" />
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="rounded-xl border-bakery-pink-light/40 py-3 focus:border-bakery-pink focus:ring-bakery-pink/20"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-poppins font-medium text-gray-700">
                          <Mail className="h-4 w-4 text-bakery-pink-dark" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            className="rounded-xl border-bakery-pink-light/40 py-3 focus:border-bakery-pink focus:ring-bakery-pink/20"
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
                        <FormLabel className="flex items-center gap-2 font-poppins font-medium text-gray-700">
                          <Phone className="h-4 w-4 text-bakery-pink-dark" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(123) 456-7890"
                            className="rounded-xl border-bakery-pink-light/40 py-3 focus:border-bakery-pink focus:ring-bakery-pink/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div
                className={`space-y-6 ${currentStep === 2 ? "block" : "hidden"}`}
              >
                <div className="mb-6 flex items-center gap-3 border-b border-bakery-pink-light/30 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink">
                    <Cookie className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-gray-800">
                      Order Details
                    </h3>
                    <p className="font-poppins text-sm text-gray-500">
                      When and how many?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-poppins font-medium text-gray-700">
                          <Calendar className="h-4 w-4 text-bakery-pink-dark" />
                          Event Date / When Needed
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            min={EARLIEST_CUSTOM_ORDER_DATE}
                            className="rounded-xl border-bakery-pink-light/40 py-3 focus:border-bakery-pink focus:ring-bakery-pink/20"
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
                        <FormLabel className="font-poppins font-medium text-gray-700">
                          How Many Dozen?
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full rounded-xl border border-bakery-pink-light/40 bg-white px-4 py-3 text-sm transition-all focus:border-bakery-pink focus:outline-none focus:ring-2 focus:ring-bakery-pink/20"
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
                      <FormLabel className="font-poppins font-medium text-gray-700">
                        Dye-Free Icing (+$10/dozen)
                      </FormLabel>
                      <div className="mt-2 flex gap-4">
                        <label
                          className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-300 ${
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
                          className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-300 ${
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
                      <FormDescription className="mt-2 text-xs text-gray-500">
                        Dye-free colors will be more muted and natural.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={`space-y-6 ${currentStep === 3 ? "block" : "hidden"}`}
              >
                <div className="mb-6 flex items-center gap-3 border-b border-bakery-pink-light/30 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-gray-800">
                      Flavors & Packaging
                    </h3>
                    <p className="font-poppins text-sm text-gray-500">
                      Customize your order
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="flavorPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins font-medium text-gray-700">
                        Flavor Preferences
                      </FormLabel>
                      <FormDescription className="mb-3 text-xs text-gray-500">
                        Select all that apply
                      </FormDescription>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {flavorOptions.map((option) => {
                          const isSelected = field.value?.includes(
                            option.value,
                          );
                          return (
                            <label
                              key={option.value}
                              className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-3 text-center transition-all duration-300 ${
                                isSelected
                                  ? "border-bakery-pink bg-bakery-pink-light/30"
                                  : "border-bakery-pink-light/40 hover:border-bakery-pink-light"
                              }`}
                            >
                              <input
                                type="checkbox"
                                value={option.value}
                                checked={isSelected}
                                onChange={(event) => {
                                  const value = event.target
                                    .value as FormValues["flavorPreference"][number];
                                  const isChecked = event.target.checked;
                                  const updatedValues = handleFlavorChange(
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
                      <FormLabel className="font-poppins font-medium text-gray-700">
                        Packaging Preference
                      </FormLabel>
                      <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
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
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex cursor-pointer flex-col items-center rounded-xl border-2 px-4 py-4 transition-all duration-300 ${
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
                              onChange={() => field.onChange(option.value)}
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
                            <span className="mt-1 text-xs text-gray-500">
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

              <div
                className={`space-y-6 ${currentStep === 4 ? "block" : "hidden"}`}
              >
                <div className="mb-6 flex items-center gap-3 border-b border-bakery-pink-light/30 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-gray-800">
                      Share Your Vision
                    </h3>
                    <p className="font-poppins text-sm text-gray-500">
                      Tell us about your event
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="referralSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins font-medium text-gray-700">
                        How did you hear about us?{" "}
                        <span className="text-bakery-pink-dark">*</span>
                      </FormLabel>
                      <FormControl>
                        <select
                          className="w-full rounded-xl border border-bakery-pink-light/40 bg-white px-4 py-3 text-sm transition-all focus:border-bakery-pink focus:outline-none focus:ring-2 focus:ring-bakery-pink/20"
                          {...field}
                        >
                          <option value="Google">Google</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Friend">Friend</option>
                          <option value="Other">Other (tell us below)</option>
                        </select>
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
                      <FormLabel className="font-poppins font-medium text-gray-700">
                        Tell us about your order
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please share details about your event, design ideas, color themes, or any questions you have. Feel free to describe your vision or link to inspiration images!"
                          className="min-h-[150px] rounded-xl border-bakery-pink-light/40 focus:border-bakery-pink focus:ring-bakery-pink/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        We can always make updates later. Share your vision and
                        we&apos;ll work together to bring it to life!
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={`space-y-6 ${currentStep === 5 ? "block" : "hidden"}`}
              >
                <div className="mb-6 flex items-center gap-3 border-b border-bakery-pink-light/30 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink">
                    <HeartHandshake className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-gray-800">
                      Add a Tip
                    </h3>
                    <p className="font-poppins text-sm text-gray-500">
                      Support the time and detail behind your custom order
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="tipPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins font-medium text-gray-700">
                        Optional Tip
                      </FormLabel>
                      <FormDescription className="mb-3 text-xs text-gray-500">
                        Tips are calculated from an estimated order subtotal.
                        Final pricing will be confirmed by invoice.
                      </FormDescription>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {tipOptions.map((option) => {
                          const isSelected = field.value === option.value;
                          const isMostCommon = option.value === "15";
                          const optionLabel =
                            option.value === "custom" && isSelected
                              ? parsedCustomTipAmount > 0
                                ? "Custom tip"
                                : "No tip"
                              : option.label;
                          const optionTipAmount = getEstimatedTipAmount(
                            estimatedSubtotal,
                            option.value,
                          );

                          return (
                            <label
                              key={option.value}
                              className={`relative flex h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 px-4 py-4 text-center transition-all duration-300 ${
                                isSelected
                                  ? "border-bakery-pink bg-bakery-pink-light/30"
                                  : isMostCommon
                                    ? "border-bakery-pink/50 bg-gradient-to-br from-bakery-pink-light/35 via-white to-bakery-peach/45 shadow-md shadow-bakery-pink/10 hover:border-bakery-pink"
                                    : "border-bakery-pink-light/40 hover:border-bakery-pink-light"
                              }`}
                            >
                              {isMostCommon && (
                                <span className="absolute -top-3 rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink px-3 py-1 font-poppins text-[11px] font-semibold uppercase tracking-[0.08em] text-white shadow-md shadow-bakery-pink/25">
                                  Most common
                                </span>
                              )}
                              <input
                                type="radio"
                                className="sr-only"
                                value={option.value}
                                checked={isSelected}
                                onChange={() => {
                                  field.onChange(option.value);

                                  if (
                                    option.value === "custom" &&
                                    !form.getValues("customTipAmount")?.trim()
                                  ) {
                                    form.setValue("customTipAmount", "0", {
                                      shouldDirty: true,
                                      shouldValidate: true,
                                    });
                                  }
                                }}
                              />
                              <span
                                className={`font-poppins text-sm font-semibold ${
                                  isSelected
                                    ? "text-bakery-pink-dark"
                                    : "text-gray-700"
                                }`}
                              >
                                {optionLabel}
                              </span>
                              <span className="mt-1 text-xs text-gray-500">
                                {option.value === "custom"
                                  ? isSelected
                                    ? "Enter below"
                                    : "Enter amount"
                                  : formatCurrency(optionTipAmount)}
                              </span>
                              {option.value === "custom" && isSelected && (
                                <FormField
                                  control={form.control}
                                  name="customTipAmount"
                                  render={({ field: customTipField }) => (
                                    <FormItem className="mt-3 w-full">
                                      <FormControl>
                                        <div className="relative">
                                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-poppins text-sm font-semibold text-gray-500">
                                            $
                                          </span>
                                          <Input
                                            type="number"
                                            inputMode="decimal"
                                            min="0"
                                            step="1"
                                            placeholder="0.00"
                                            className="h-10 rounded-lg border-bakery-pink-light/50 bg-white pl-7 text-center font-poppins text-sm focus:border-bakery-pink focus:ring-bakery-pink/20"
                                            onClick={(event) =>
                                              event.stopPropagation()
                                            }
                                            value={customTipField.value ?? ""}
                                            onBlur={customTipField.onBlur}
                                            name={customTipField.name}
                                            ref={customTipField.ref}
                                            onChange={(event) =>
                                              customTipField.onChange(
                                                formatTipInputValue(
                                                  event.target.value,
                                                ),
                                              )
                                            }
                                          />
                                        </div>
                                      </FormControl>
                                      <FormMessage className="text-left text-[11px]" />
                                    </FormItem>
                                  )}
                                />
                              )}
                            </label>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-2xl border border-bakery-pink-light/40 bg-bakery-cream/70 p-5">
                  <div className="flex flex-col gap-3 font-poppins text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Estimated order subtotal
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Based on {form.watch("quantity")} dozen and selected
                        add-ons.
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-bakery-pink-dark">
                      {formatCurrency(estimatedSubtotal)}
                    </p>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="mt-4 rounded-xl border border-bakery-pink-light/30 bg-white/70 p-4 font-poppins text-sm text-gray-700">
                      <p className="font-semibold text-gray-800">
                        Included add-ons
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-gray-600">
                        {selectedAddOns.map((addOn) => (
                          <li key={addOn}>- {addOn}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4 flex flex-col gap-3 border-t border-bakery-pink-light/40 pt-4 font-poppins text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Selected tip
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {selectedTipDescription}
                      </p>
                    </div>
                    <p className="flex items-center gap-2 text-lg font-semibold text-bakery-pink-dark">
                      {selectedTipPercentage !== "" &&
                      estimatedTipAmount > 0 ? (
                        <Smile className="h-5 w-5" aria-label="Tip selected" />
                      ) : null}
                      {formatCurrency(estimatedTipAmount)}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 border-t border-bakery-pink-light/40 pt-4 font-poppins text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Estimated total
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Initial quote plus selected tip.
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-bakery-pink-dark">
                      {formatCurrency(estimatedTotal)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-bakery-pink-light/30 pt-6">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="rounded-full border-bakery-pink-light px-6 py-3 hover:bg-bakery-pink-light/20"
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !canProceedStep1) ||
                      (currentStep === 2 && !canProceedStep2) ||
                      (currentStep === 3 && !canProceedStep3) ||
                      (currentStep === 4 && !canProceedStep4)
                    }
                    className="rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink px-8 py-3 text-white transition-all hover:shadow-lg hover:shadow-bakery-pink/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || !canSubmit}
                    className="rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-pink px-8 py-3 text-white transition-all hover:shadow-lg hover:shadow-bakery-pink/30 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Submitting</span>
                    ) : !canSubmit ? (
                      "Select Tip"
                    ) : (
                      <>
                        Submit Inquiry
                        <Sparkles className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>

          <p className="mt-6 text-center font-poppins text-sm text-gray-500">
            After you submit, Megan will follow up within 48 hours with an
            invoice and next steps.
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomOrderClient;
