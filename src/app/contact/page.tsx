import { buildPageMetadata } from "@/lib/metadata";
import ContactPageClient from "@/components/ContactPageClient";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Contact Rose & Sugar | Custom Cookies & Classes",
    description:
      "Get in touch with Rose & Sugar for custom cookies, classes, or general inquiries. We respond within 48 hours with details and next steps.",
    path: "/contact",
  });
}

const ContactPage = () => {
  return <ContactPageClient />;
};

export default ContactPage;
