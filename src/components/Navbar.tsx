"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Cookie, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (mobileMenuOpen) {
      firstMobileLinkRef.current?.focus();
    } else {
      mobileMenuButtonRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Classes", path: "/classes" },
    { name: "Contact", path: "/contact" },
  ];

  const moreLinks = [
    { name: "Sweet Bakes", path: "/sweet-bakes/pre-designed" },
    { name: "Corporate Events", path: "/corporate-team-building" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Rose & Sugar Logo"
            width={200}
            height={80}
            priority
            sizes="(max-width: 768px) 160px, 200px"
            quality={70}
            className="h-16 md:h-20 w-auto max-h-20"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          ref={mobileMenuButtonRef}
          type="button"
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex space-x-6 items-center"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="font-poppins text-gray-700 hover:text-bakery-pink-dark transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-bakery-pink-dark after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Home
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="font-poppins text-gray-700 hover:text-bakery-pink-dark transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-bakery-pink-dark after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {link.name}
            </Link>
          ))}
          {/* Cookies dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="font-poppins text-gray-700 hover:text-bakery-pink-dark transition-colors duration-300 flex items-center gap-1 px-1 py-1 rounded focus:outline-none"
                aria-label="Cookies menu"
              >
                <Cookie className="w-5 h-5 mr-1" aria-hidden="true" />
                <span>Cookies</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-bakery-pink-light/30"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/cookies/custom-orders"
                  className="font-poppins px-3 py-2 block w-full hover:bg-bakery-pink-light/20"
                >
                  Custom Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/cookies/pre-designed"
                  className="font-poppins px-3 py-2 block w-full hover:bg-bakery-pink-light/20"
                >
                  Pre-Designed
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="font-poppins text-gray-700 hover:text-bakery-pink-dark transition-colors duration-300 flex items-center gap-1 px-1 py-1 rounded focus:outline-none"
                aria-label="More menu"
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-bakery-pink-light/30 min-w-[180px]"
            >
              {moreLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link
                    href={link.path}
                    className="font-poppins px-3 py-2 block w-full hover:bg-bakery-pink-light/20"
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute top-full left-0 w-full bg-white shadow-md py-4 md:hidden"
          >
            <div className="flex flex-col space-y-3 px-4">
              <Link
                href="/"
                className="font-poppins text-gray-700 py-2 hover:text-bakery-pink-dark transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
                ref={firstMobileLinkRef}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="font-poppins text-gray-700 py-2 hover:text-bakery-pink-dark transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* Cookies section on mobile */}
              <div className="border-b border-bakery-pink-light/40 pt-2">
                <div className="font-poppins text-gray-700 py-2 flex items-center gap-1">
                  <Cookie className="w-4 h-4" aria-hidden="true" />
                  Cookies
                </div>
                <div className="flex flex-col pl-4">
                  <Link
                    href="/cookies/custom-orders"
                    className="font-poppins text-gray-600 py-2 hover:text-bakery-pink-dark transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Custom Orders
                  </Link>
                  <Link
                    href="/cookies/pre-designed"
                    className="font-poppins text-gray-600 py-2 hover:text-bakery-pink-dark transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pre-Designed
                  </Link>
                </div>
              </div>
              <div className="border-b border-bakery-pink-light/40 pt-2">
                <button
                  type="button"
                  onClick={() => setMoreExpanded(!moreExpanded)}
                  className="font-poppins text-gray-700 py-2 flex items-center gap-1 w-full"
                  aria-expanded={moreExpanded}
                  aria-controls="mobile-more-links"
                >
                  More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      moreExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {moreExpanded && (
                  <div id="mobile-more-links" className="flex flex-col pl-4">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className="font-poppins text-gray-600 py-2 hover:text-bakery-pink-dark transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
