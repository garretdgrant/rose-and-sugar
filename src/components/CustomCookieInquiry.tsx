"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(10, "Please provide a valid phone number"),
  eventDate: z
    .string()
    .min(1, "Please provide the date when cookies are needed"),
  quantity: z.string().min(1, "Please specify the quantity needed"),
  flavorPreference: z.array(
    z.enum([
      "vanilla",
      "lemon",
      "almond",
      "confetti",
      "gf",
      "maple",
      "undecided",
    ]),
  ),
  packaging: z.enum(["sealed", "ribbon", "undecided"]),
  referralSource: z.string().min(1, "Please let us know how you found us"),
  message: z.string().min(10, "Please provide details about your request"),
  dyefree: z.boolean(),
});

export type FormValues = z.infer<typeof formSchema>;

const CustomInquiryForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const flavorOptions: FormValues["flavorPreference"] extends (infer T)[]
    ? { label: string; value: T }[]
    : never = [
    { label: "Vanilla", value: "vanilla" },
    { label: "Lemon", value: "lemon" },
    { label: "Almond", value: "almond" },
    { label: "Confetti", value: "confetti" },
    { label: "GF Flour (+$6/dozen)", value: "gf" },
    { label: "Maple", value: "maple" },
    { label: "Decide Later", value: "undecided" },
  ];
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      quantity: "",
      flavorPreference: [],
      packaging: "sealed",
      referralSource: "",
      message: "",
      dyefree: false,
    },
  });

  const onSubmit = (_data: FormValues) => {
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Inquiry Submitted!",
        description:
          "Thank you for your message. Megan will be in touch within 48 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date / When Needed</FormLabel>
                <FormControl>
                  <Input placeholder="MM/DD/YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How Many Dozen? (2 minimum)</FormLabel>
                <FormControl>
                  <Input placeholder="Number of dozens needed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dyefree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dye-Free Icing (+$10/dozen)</FormLabel>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="true"
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                      className="accent-bakery-pink"
                    />
                    <span>Yes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="false"
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                      className="accent-bakery-pink"
                    />
                    <span>No</span>
                  </label>
                </div>
                <FormDescription className="text-sm text-muted-foreground">
                  Colors will be more muted and natural.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="flavorPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flavor Preferences</FormLabel>
              <FormDescription>Select all that apply</FormDescription>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {flavorOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={field.value?.includes(option.value)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          field.onChange([
                            ...(field.value || []),
                            option.value,
                          ]);
                        } else {
                          field.onChange(
                            (field.value || []).filter(
                              (val) => val !== option.value,
                            ),
                          );
                        }
                      }}
                      className="accent-bakery-pink"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
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
              <FormLabel>Packaging Preference</FormLabel>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="sr-only"
                    value="sealed"
                    checked={field.value === "sealed"}
                    onChange={() => field.onChange("sealed")}
                  />
                  <span
                    className={`w-4 h-4 border rounded-full mr-2 flex items-center justify-center ${
                      field.value === "sealed"
                        ? "border-bakery-pink bg-bakery-pink"
                        : "border-gray-300"
                    }`}
                  >
                    {field.value === "sealed" && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span>Heat-Sealed (individually wrapped)</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="sr-only"
                    value="ribbon"
                    checked={field.value === "ribbon"}
                    onChange={() => field.onChange("ribbon")}
                  />
                  <span
                    className={`w-4 h-4 border rounded-full mr-2 flex items-center justify-center ${
                      field.value === "ribbon"
                        ? "border-bakery-pink bg-bakery-pink"
                        : "border-gray-300"
                    }`}
                  >
                    {field.value === "ribbon" && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span>Ribbon-Tied (+$6)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="sr-only"
                    value="undecided"
                    checked={field.value === "undecided"}
                    onChange={() => field.onChange("undecided")}
                  />
                  <span
                    className={`w-4 h-4 border rounded-full mr-2 flex items-center justify-center ${
                      field.value === "undecided"
                        ? "border-bakery-pink bg-bakery-pink"
                        : "border-gray-300"
                    }`}
                  >
                    {field.value === "undecided" && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span>Decide Later</span>
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referralSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about us? (optional)</FormLabel>
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

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please share details about your event, design ideas, or any questions you have."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please tell us a little about what you&apos;re looking for, we
                can always make updates later. Feel free to describe your vision
                or link to inspiration images.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-bakery-pink hover:bg-bakery-pink-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </Button>
      </form>
    </Form>
  );
};

export default CustomInquiryForm;
