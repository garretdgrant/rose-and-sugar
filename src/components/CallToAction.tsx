import { Phone, Calendar, Mail } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-b from-white to-bakery-pink-light/70"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-heading">Ready to Create Something Sweet?</h2>
          <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
            Whether you&apos;re planning a celebration or want to join a
            decorating class, we&apos;d love to hear from you!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/contact"
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-bakery-pink flex items-center justify-center mb-4">
                <Phone size={20} className="text-white" />
              </div>
              <h3 className="font-fraunces text-lg font-medium mb-2">
                Call or Text
              </h3>
              <p className="text-gray-600">555-123-4567</p>
            </Link>

            <Link
              href="/classes"
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-bakery-pink flex items-center justify-center mb-4">
                <Calendar size={20} className="text-white" />
              </div>
              <h3 className="font-fraunces text-lg font-medium mb-2">
                Book a Class
              </h3>
              <p className="text-gray-600">June & July Sessions</p>
            </Link>

            <Link
              href="/contact"
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-bakery-pink flex items-center justify-center mb-4">
                <Mail size={20} className="text-white" />
              </div>
              <h3 className="font-fraunces text-lg font-medium mb-2">
                Send a Message
              </h3>
              <p className="text-gray-600">megan@roseandsugar.com</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
