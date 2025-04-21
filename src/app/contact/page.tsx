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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(10, "Please provide a valid phone number"),
  eventDate: z
    .string()
    .min(1, "Please provide the date when cookies are needed"),
  quantity: z.string().min(1, "Please specify the quantity needed"),
  flavorPreference: z.string().optional(),
  packaging: z.enum(["sealed", "ribbon"]),
  referralSource: z.string().min(1, "Please let us know how you found us"),
  message: z.string().min(10, "Please provide details about your request"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      quantity: "",
      flavorPreference: "",
      packaging: "sealed",
      referralSource: "",
      message: "",
    },
  });

  const onSubmit = (_data: FormValues) => {
    setIsSubmitting(true);
    // This is where you would normally send the form data to a server
    // For now, we'll just simulate a submission with a timeout

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

  const faqs = [
    {
      question: "How far in advance should I order custom cookies?",
      answer:
        "We recommend placing your order at least 2-3 weeks in advance for custom designs. For major holidays or peak wedding season, earlier is better!",
    },
    {
      question: "Do you deliver or ship cookies?",
      answer:
        "We offer local pickup in Folsom. Shipping is available for an additional fee within California only, as we want to ensure your cookies arrive in perfect condition.",
    },
    {
      question: "How long do the cookies stay fresh?",
      answer:
        "Our cookies stay fresh for up to 3 weeks when stored in their sealed packaging at room temperature. Once opened, we recommend enjoying them within 5-7 days.",
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer:
        "While our standard recipes contain wheat, dairy, and eggs, we can discuss options for certain dietary needs. Please note that all cookies are prepared in a kitchen that processes nuts.",
    },
    {
      question: "How do I book a private decorating class?",
      answer:
        "Fill out our contact form with your preferred date, group size, and event details. Private classes require a minimum of 8 participants and can be hosted at your location or a reserved venue.",
    },
  ];

  return (
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">Get in Touch</h1>

          <div className="content-container text-center mb-12">
            <p className="body-text-large">
              Have a question or ready to place an order? Fill out the form
              below and Megan will get back to you within 48 hours to discuss
              your custom cookie needs.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="w-full lg:w-2/3">
              <div className="content-card">
                <h2 className="font-bebas text-2xl mb-6">
                  Custom Cookie Inquiry
                </h2>

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
                            <FormLabel>Phone Number</FormLabel>
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
                            <FormLabel>How Many Dozen?</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Number of dozens needed"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="flavorPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Flavor Preferences (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Any specific flavors?"
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
                                className={`w-4 h-4 border rounded-full mr-2 flex items-center justify-center ${field.value === "sealed" ? "border-bakery-pink bg-bakery-pink" : "border-gray-300"}`}
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
                                className={`w-4 h-4 border rounded-full mr-2 flex items-center justify-center ${field.value === "ribbon" ? "border-bakery-pink bg-bakery-pink" : "border-gray-300"}`}
                              >
                                {field.value === "ribbon" && (
                                  <span className="w-2 h-2 rounded-full bg-white"></span>
                                )}
                              </span>
                              <span>Ribbon-Tied</span>
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
                          <FormLabel>How did you hear about us?</FormLabel>
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
                            Feel free to describe your vision or link to
                            inspiration images.
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
                      <p className="text-gray-700">555-123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail size={20} className="text-bakery-pink-dark mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-700">megan@roseandsugar.com</p>
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
                        href="https://instagram.com/roseandsugar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bakery-pink-dark hover:underline"
                      >
                        @roseandsugar
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

          {/* FAQs Section */}
          <div className="mt-16">
            <h2 className="section-heading">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="font-bebas text-xl mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
