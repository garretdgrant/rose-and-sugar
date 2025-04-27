"use client";
import { useState } from "react";
import { Instagram, Mail, Phone } from "lucide-react";
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

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">Get in Touch</h1>

          <div className="content-container text-center mb-12">
            <p className="body-text-large">
              Have a question or just want to reach out? Fill out the form below
              and Megan will get back to you within 48 hours.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="w-full lg:w-2/3">
              <div className="content-card">
                <h2 className="font-bebas text-2xl mb-6">General Inquiry</h2>

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
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <input
                      type="text"
                      name="company" // honeypot field name
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <Button
                      type="submit"
                      className="w-full bg-bakery-pink hover:bg-bakery-pink-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="bg-bakery-cream p-6 rounded-lg shadow-sm mb-8">
                <h2 className="font-bebas text-2xl mb-4">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone size={20} className="text-bakery-pink-dark mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-700">916-337-8880</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail size={20} className="text-bakery-pink-dark mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-700">
                        roseandsugarcookies@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Instagram
                      size={20}
                      className="text-bakery-pink-dark mr-3"
                    />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <a
                        href="https://instagram.com/roseandsugarcookies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bakery-pink-dark hover:underline"
                      >
                        @roseandsugarcookies
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-bakery-pink-light/20 p-6 rounded-lg shadow-sm">
                <h2 className="font-bebas text-2xl mb-4">Response Time</h2>
                <p className="text-gray-700 mb-2">
                  Megan typically responds to inquiries within 48 hours.
                </p>
                <p className="text-gray-700">
                  For urgent requests, please call or text directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
