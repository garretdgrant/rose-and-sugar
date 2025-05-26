"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
import { Button } from "@/components/ui/button";

interface ClassBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  month: string;
  day: string;
  description: string;
  price: string;
  classId: string;
  isWaitlist: boolean;
}

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  seats: z
    .number()
    .min(1)
    .max(10, { message: "Please select between 1-10 seats" }),
});

type FormValues = z.infer<typeof formSchema>;

const ClassBookingModal = ({
  open,
  onOpenChange,
  title,
  month,
  day,
  description,
  price,
  classId,
  isWaitlist,
}: ClassBookingModalProps) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      seats: 1,
    },
  });
  const { isSubmitting } = form.formState;
  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        classId,
        isWaitlist,
      };
      const response = await fetch("/api/contact/class-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/classes/thank-you");
      } else {
        console.error("Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-bakery-offWhite border-bakery-pink/20 p-0 overflow-hidden">
        {/* Date banner */}
        <div className="bg-bakery-pink/90 text-white py-4 px-6 flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="relative w-16 aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <div className="absolute inset-0 flex flex-col">
                <div className="bg-bakery-pink-dark text-white text-center py-0.5 font-bebas text-xs tracking-wider">
                  {month}
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <span className="font-bebas text-3xl text-gray-800">
                    {day}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <DialogTitle className="text-2xl font-bold font-bebas tracking-wide mb-1">
              {title}
            </DialogTitle>
            <DialogDescription className="text-white/90 text-sm">
              {price} • Limited Availability
            </DialogDescription>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-5">{description}</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full name"
                        {...field}
                        className="border-bakery-pink/20 focus-visible:ring-bakery-pink/40"
                      />
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
                    <FormLabel className="text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        className="border-bakery-pink/20 focus-visible:ring-bakery-pink/40"
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
                    <FormLabel className="text-gray-700">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(123) 456-7890"
                        {...field}
                        className="border-bakery-pink/20 focus-visible:ring-bakery-pink/40"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seats"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Number of Seats
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={value.toString()}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="flex h-10 w-full rounded-md border border-bakery-pink/20 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bakery-pink/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "seat" : "seats"}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-bakery-pink hover:bg-bakery-pink-dark text-white font-medium py-2 rounded-full transition-colors flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Complete Booking"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassBookingModal;
