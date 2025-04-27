"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { isValidPhone } from "@/lib/validations";

interface OrderFormProps {
  selectedDesigns: {
    id: string;
    name: string;
    quantity: number;
    price: string;
  }[];
}

// Define the Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().refine((value) => isValidPhone(value), {
    message: "Please provide a valid phone number",
  }),
  pickupDate: z.string().min(1, "Please select a pickup date"),
  referralSource: z.string().optional(),
  specialInstructions: z.string().optional(),
  company: z.string().optional(), // honeypot field
});

type FormValues = z.infer<typeof formSchema>;

const OrderForm = ({ selectedDesigns }: OrderFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const simplifiedDesigns = selectedDesigns
    .filter((design) => design.quantity > 0)
    .map((design) => ({
      id: design.id,
      quantity: design.quantity,
      price: design.price,
    }));

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      pickupDate: "",
      referralSource: "",
      specialInstructions: "",
      company: "", // honeypot
    },
  });

  const totalSets = selectedDesigns.reduce(
    (sum, design) => sum + design.quantity,
    0,
  );

  const onSubmit = async (data: FormValues) => {
    if (totalSets === 0) {
      toast({
        title: "Please select at least one design",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...data,
      designs: simplifiedDesigns,
    };

    try {
      const response = await fetch("/api/contact/predesign-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      toast({
        title: "Order Submitted!",
        description: "We'll be in touch within 48 hours to confirm your order.",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot */}
        <input
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          {...form.register("company")}
        />

        {/* Selected Designs Summary */}
        {selectedDesigns.length > 0 && (
          <div className="bg-accent/20 p-4 rounded-lg mb-6">
            <h4 className="font-medium mb-2">Selected Designs:</h4>
            <ul className="space-y-2">
              {selectedDesigns.map((design) =>
                design.quantity > 0 ? (
                  <li key={design.id} className="flex justify-between">
                    <span>{design.name}</span>
                    <span>{design.quantity} sets</span>
                  </li>
                ) : null,
              )}
            </ul>
            <div className="mt-4 pt-4 border-t border-accent">
              <div className="flex justify-between font-medium">
                <span>Total Sets:</span>
                <span>{totalSets}</span>
              </div>
            </div>
          </div>
        )}

        {/* Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Pickup Date */}
        <FormField
          control={form.control}
          name="pickupDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Pickup Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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

        {/* Notes */}
        <FormField
          control={form.control}
          name="specialInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Instructions (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special requests or notes for your order..."
                  {...field}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={isSubmitting || totalSets === 0}
        >
          {isSubmitting ? "Submitting..." : "Submit Order"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
