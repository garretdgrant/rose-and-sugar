"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Cookie, ChevronDown, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import CartDrawer from "@/components/CartDrawer";

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      {/* Decorative accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bakery-pink/30 to-transparent transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group relative">
          <div
            className={`absolute -inset-3 rounded-2xl bg-bakery-pink-light/0 group-hover:bg-bakery-pink-light/30 transition-all duration-300 ${
              isScrolled ? "scale-100" : "scale-95"
            }`}
          />
          <Image
            src="/logo.png"
            alt="Rose & Sugar Logo"
            width={200}
            height={80}
            priority
            sizes="(max-width: 768px) 160px, 200px"
            quality={70}
            className={`relative transition-all duration-300 ${
              isScrolled
                ? "h-14 md:h-16 w-auto max-h-16"
                : "h-16 md:h-20 w-auto max-h-20"
            }`}
          />
        </Link>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-2">
          <CartDrawer />
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className={`relative p-2.5 rounded-xl transition-all duration-300 ${
              mobileMenuOpen
                ? "bg-bakery-pink text-white"
                : "bg-bakery-pink-light/50 text-gray-700 hover:bg-bakery-pink-light"
            }`}
            onClick={toggleMobileMenu}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block transition-all duration-300 ${mobileMenuOpen ? "rotate-90 scale-110" : ""}`}
            >
              {mobileMenuOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="relative px-4 py-2 font-poppins text-gray-700 font-medium text-sm rounded-full hover:text-bakery-pink-dark transition-all duration-300 group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute inset-0 rounded-full bg-bakery-pink-light/0 group-hover:bg-bakery-pink-light/50 transition-all duration-300 scale-90 group-hover:scale-100" />
            </Link>
          ))}

          {/* Cookies dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="relative px-4 py-2 font-poppins text-gray-700 font-medium text-sm rounded-full hover:text-bakery-pink-dark transition-all duration-300 flex items-center gap-1.5 group focus:outline-none"
                aria-label="Cookies menu"
              >
                <span className="absolute inset-0 rounded-full bg-bakery-pink-light/0 group-hover:bg-bakery-pink-light/50 transition-all duration-300 scale-90 group-hover:scale-100" />
                <Cookie
                  className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300"
                  aria-hidden="true"
                />
                <span className="relative z-10">Cookies</span>
                <ChevronDown
                  className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="bg-white/95 backdrop-blur-md border border-bakery-pink-light/40 rounded-2xl shadow-xl shadow-bakery-pink/10 p-2 min-w-[200px]"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/cookies/custom-orders"
                  className="font-poppins text-sm px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-bakery-pink-light/40 transition-colors cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-full bg-bakery-peach/60 flex items-center justify-center">
                    <Sparkles
                      className="w-4 h-4 text-bakery-pink-dark"
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <span className="block font-medium text-gray-800">
                      Custom Orders
                    </span>
                    <span className="block text-xs text-gray-500">
                      Design your own
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/cookies/pre-designed"
                  className="font-poppins text-sm px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-bakery-pink-light/40 transition-colors cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-full bg-bakery-pink-light/60 flex items-center justify-center">
                    <Cookie
                      className="w-4 h-4 text-bakery-pink-dark"
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <span className="block font-medium text-gray-800">
                      Pre-Designed
                    </span>
                    <span className="block text-xs text-gray-500">
                      Ready to order
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="relative px-4 py-2 font-poppins text-gray-700 font-medium text-sm rounded-full hover:text-bakery-pink-dark transition-all duration-300 flex items-center gap-1.5 group focus:outline-none"
                aria-label="More menu"
              >
                <span className="absolute inset-0 rounded-full bg-bakery-pink-light/0 group-hover:bg-bakery-pink-light/50 transition-all duration-300 scale-90 group-hover:scale-100" />
                <span className="relative z-10">More</span>
                <ChevronDown
                  className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="bg-white/95 backdrop-blur-md border border-bakery-pink-light/40 rounded-2xl shadow-xl shadow-bakery-pink/10 p-2 min-w-[180px]"
            >
              {moreLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link
                    href={link.path}
                    className="font-poppins text-sm px-4 py-2.5 rounded-xl block hover:bg-bakery-pink-light/40 text-gray-700 hover:text-bakery-pink-dark transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Divider */}
          <div className="w-px h-6 bg-bakery-pink-light/60 mx-2" />

          <CartDrawer />
        </nav>

        {/* Mobile Navigation - Full Screen Overlay */}
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{ top: "0" }}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl md:hidden transition-transform duration-500 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-5 border-b border-bakery-pink-light/30">
            <span className="font-bebas text-2xl tracking-wide">
              <span className="text-bakery-pink-dark">Rose</span>
              <span className="text-gray-400 mx-1">&</span>
              <span className="text-gray-700">Sugar</span>
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-bakery-pink-light/50 text-gray-700 hover:bg-bakery-pink-light transition-colors"
              aria-label="Close menu"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Mobile menu content */}
          <div className="p-5 space-y-2 overflow-y-auto h-[calc(100%-80px)]">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.path}
                className="flex items-center gap-3 font-poppins text-gray-700 font-medium py-3.5 px-4 rounded-xl hover:bg-bakery-pink-light/40 hover:text-bakery-pink-dark transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
                ref={index === 0 ? firstMobileLinkRef : undefined}
              >
                {link.name}
              </Link>
            ))}

            {/* Cookies section */}
            <div className="pt-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <Cookie
                  className="w-4 h-4 text-bakery-pink-dark"
                  aria-hidden="true"
                />
                <span className="font-poppins text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Cookies
                </span>
              </div>
              <div className="space-y-1">
                <Link
                  href="/cookies/custom-orders"
                  className="flex items-center gap-3 font-poppins text-gray-600 py-3 px-4 rounded-xl hover:bg-bakery-pink-light/40 hover:text-bakery-pink-dark transition-all duration-300 ml-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-8 h-8 rounded-full bg-bakery-peach/50 flex items-center justify-center flex-shrink-0">
                    <Sparkles
                      className="w-4 h-4 text-bakery-pink-dark"
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <span className="block font-medium text-gray-700">
                      Custom Orders
                    </span>
                    <span className="block text-xs text-gray-500">
                      Design your own
                    </span>
                  </span>
                </Link>
                <Link
                  href="/cookies/pre-designed"
                  className="flex items-center gap-3 font-poppins text-gray-600 py-3 px-4 rounded-xl hover:bg-bakery-pink-light/40 hover:text-bakery-pink-dark transition-all duration-300 ml-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-8 h-8 rounded-full bg-bakery-pink-light/50 flex items-center justify-center flex-shrink-0">
                    <Cookie
                      className="w-4 h-4 text-bakery-pink-dark"
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <span className="block font-medium text-gray-700">
                      Pre-Designed
                    </span>
                    <span className="block text-xs text-gray-500">
                      Ready to order
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            {/* More section */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setMoreExpanded(!moreExpanded)}
                className="flex items-center justify-between w-full font-poppins text-gray-700 font-medium py-3.5 px-4 rounded-xl hover:bg-bakery-pink-light/40 transition-all duration-300"
                aria-expanded={moreExpanded}
                aria-controls="mobile-more-links"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    moreExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id="mobile-more-links"
                className={`overflow-hidden transition-all duration-300 ${
                  moreExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-1 pt-1">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className="block font-poppins text-gray-600 py-3 px-4 ml-4 rounded-xl hover:bg-bakery-pink-light/40 hover:text-bakery-pink-dark transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA at bottom */}
            <div className="pt-6 mt-4 border-t border-bakery-pink-light/30">
              <Link
                href="/classes"
                className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-2xl shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Class
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
