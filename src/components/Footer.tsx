import { Instagram, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", label: "About" },
    { href: "/classes/locations", label: "Classes" },
    {
      href: "/private-cookie-classes-folsom-sacramento",
      label: "Private Classes",
    },
    { href: "/cookies/signature-sugar-cookie-sets", label: "Shop Cookies" },
    { href: "/cookies/order-custom-sugar-cookies", label: "Custom Orders" },
  ];

  const supportLinks = [
    { href: "/contact", label: "Contact" },
    { href: "/corporate-team-building", label: "Team Building" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <footer className="relative z-10">
      {/* Main Footer Content */}
      <div className="bg-gradient-to-b from-bakery-cream to-bakery-peach/40 pt-16 pb-12">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bakery-pink-light via-bakery-pink to-bakery-pink-light" />

        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr] gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-5 group">
                <span className="font-bebas text-3xl tracking-wide">
                  <span className="text-bakery-pink-dark group-hover:text-bakery-pink transition-colors">
                    Rose
                  </span>
                  <span className="text-gray-400 mx-1">&</span>
                  <span className="text-gray-700 group-hover:text-gray-600 transition-colors">
                    Sugar
                  </span>
                </span>
              </Link>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed mb-6 max-w-xs">
                Handcrafted custom cookies and decorating classes that bring
                sweetness and creativity to every celebration.
              </p>
              <a
                href="https://www.instagram.com/roseandsugarcookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white font-poppins text-sm font-medium hover:shadow-lg hover:shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Instagram size={18} aria-hidden="true" />
                <span>@roseandsugarcookies</span>
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bebas text-lg text-gray-800 tracking-widest uppercase mb-5">
                Shop & Learn
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-gray-600 font-poppins text-sm hover:text-bakery-pink-dark transition-colors"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-bakery-pink-dark mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-bebas text-lg text-gray-800 tracking-widest uppercase mb-5">
                Support
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-gray-600 font-poppins text-sm hover:text-bakery-pink-dark transition-colors"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-bakery-pink-dark mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bebas text-lg text-gray-800 tracking-widest uppercase mb-5">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-bakery-pink-light/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin
                      size={14}
                      className="text-bakery-pink-dark"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                    Serving Folsom
                    <br />& Surrounding Areas
                  </p>
                </div>
                <a
                  href="tel:916-337-8880"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-bakery-pink-light/60 flex items-center justify-center flex-shrink-0 group-hover:bg-bakery-pink-light transition-colors">
                    <Phone
                      size={14}
                      className="text-bakery-pink-dark"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-gray-600 font-poppins text-sm group-hover:text-bakery-pink-dark transition-colors">
                    916-337-8880
                  </p>
                </a>
                <a
                  href="mailto:roseandsugarcookies@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-bakery-pink-light/60 flex items-center justify-center flex-shrink-0 group-hover:bg-bakery-pink-light transition-colors">
                    <Mail
                      size={14}
                      className="text-bakery-pink-dark"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-gray-600 font-poppins text-sm group-hover:text-bakery-pink-dark transition-colors whitespace-nowrap">
                    roseandsugarcookies@gmail.com
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Dark section for EDC branding */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 font-poppins text-sm order-2 md:order-1">
              © {currentYear} Rose & Sugar. All rights reserved.
            </p>

            {/* EDC Attribution */}
            <a
              href="https://www.edcwebdesign.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 order-1 md:order-2 hover:opacity-90 transition-opacity"
            >
              <Image
                src="https://www.edcwebdesign.com/logo.png"
                alt="EDC Web Design"
                width={220}
                height={56}
                sizes="220px"
                quality={80}
                unoptimized
                className="h-14 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="flex items-center gap-1 text-gray-400 font-poppins text-xs group-hover:text-gray-300 transition-colors">
                Website by EDC
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
