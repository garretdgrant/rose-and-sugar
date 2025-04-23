import { Instagram, Home, Phone, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-bakery-cream py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Info */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-4">
              <span className="font-bebas text-2xl text-bakery-pink-dark">
                Rose <span className="text-gray-700">&</span> Sugar
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Bringing sweetness and creativity to every celebration.
            </p>
            <a
              href="https://www.instagram.com/roseandsugarcookies/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-bakery-pink-dark hover:text-bakery-pink transition-colors"
            >
              <Instagram size={20} className="mr-2" />
              <span>@roseandsugarcookies</span>
            </a>
          </div>

          {/* Column 2: Contact Info */}
          <div className="text-center">
            <h3 className="font-bebas text-xl mb-4 text-gray-800 tracking-wide">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <Home size={18} className="mr-2 text-bakery-pink-dark" />
                <p className="text-gray-600">
                  Serving Folsom & Surrounding Areas
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Phone size={18} className="mr-2 text-bakery-pink-dark" />
                <p className="text-gray-600">916-337-8880</p>
              </div>
              <div className="flex items-center justify-center">
                <Mail size={18} className="mr-2 text-bakery-pink-dark" />
                <p className="text-gray-600">roseandsugarcookies@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="font-bebas text-xl mb-4 text-gray-800 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-bakery-pink-dark transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-bakery-pink-dark transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 hover:text-bakery-pink-dark transition-colors"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/classes"
                  className="text-gray-600 hover:text-bakery-pink-dark transition-colors"
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-bakery-pink-dark transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Rose &amp; Sugar. All rights
              reserved.
            </p>
            <a
              href="https://www.edcwebdesign.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 group transition-colors"
            >
              <img
                src="https://www.edcwebdesign.com/assets/logo.webp"
                alt="EDC Web Design Logo"
                className="h-6 w-auto"
              />
              <p className="text-gray-600 font-medium text-sm group-hover:text-pink-500 transition-colors">
                Designed by EDC Web Design
              </p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
