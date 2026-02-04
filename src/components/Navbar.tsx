"use client";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Cookie,
  ChevronDown,
  Sparkles,
  Calendar,
  Gift,
  Users,
  MessageCircle,
  Home,
  ArrowRight,
  User,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import CartDrawer from "@/components/CartDrawer";
import CartCompletionWatcher from "@/components/CartCompletionWatcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
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
    { name: "Classes", path: "/classes", icon: Calendar },
    {
      name: "Shop Cookies",
      path: "/cookies/signature-sugar-cookie-sets",
      icon: Cookie,
    },
    {
      name: "Custom Cookies",
      path: "/cookies/order-custom-sugar-cookies",
      icon: Sparkles,
    },
    { name: "Free Cookies", path: "/kind-cookie-program", icon: Heart },
  ];

  const moreLinks = [
    {
      name: "Private Classes",
      path: "/private-cookie-classes-folsom-sacramento",
      icon: Gift,
    },
    { name: "Corporate Events", path: "/corporate-team-building", icon: Users },
    { name: "About", path: "/about", icon: Home },
    { name: "Contact", path: "/contact", icon: MessageCircle },
  ];

  return (
    <>
      <CartCompletionWatcher />
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
              className={`absolute -inset-3 rounded-2xl bg-bakery-pink-light/0 group-hover:bg-bakery-pink-light/30 transition-all duration-300 scale-100 ${
                isScrolled ? "md:scale-100" : "md:scale-95"
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
                  : "h-14 md:h-20 w-auto max-h-20"
              }`}
            />
          </Link>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3">
            <CartDrawer />
            <a
              href="https://account.roseandsugar.com/"
              target="_blank"
              rel="noreferrer"
              className="relative p-3 rounded-2xl bg-white border border-bakery-pink-light/50 text-gray-700 hover:bg-bakery-pink-light/30 hover:border-bakery-pink-light shadow-sm hover:shadow-md transition-all duration-300 group"
              aria-label="Open account portal in a new tab"
            >
              <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </a>
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className={`relative p-3 rounded-2xl transition-all duration-300 shadow-md ${
                mobileMenuOpen
                  ? "bg-gradient-to-br from-bakery-pink-dark to-bakery-pink text-white shadow-bakery-pink/30"
                  : "bg-white text-gray-700 hover:bg-bakery-pink-light/50 border border-bakery-pink-light/50"
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
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Primary"
          >
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

            {/* More dropdown */}
            <DropdownMenu open={moreOpen} onOpenChange={setMoreOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative px-4 py-2 font-poppins text-gray-700 font-medium text-sm rounded-full hover:text-bakery-pink-dark transition-all duration-300 flex items-center gap-1.5 group focus:outline-none"
                  aria-label="More menu"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
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
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
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

            <div className="flex items-center gap-3">
              <CartDrawer />
              <a
                href="https://account.roseandsugar.com/"
                target="_blank"
                rel="noreferrer"
                className="relative p-3 rounded-2xl bg-white border border-bakery-pink-light/50 text-gray-700 hover:bg-bakery-pink-light/30 hover:border-bakery-pink-light shadow-sm hover:shadow-md transition-all duration-300 group"
                aria-label="Open account portal in a new tab"
              >
                <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </nav>

          {/* Mobile Navigation - Full Screen Overlay */}
          <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
              mobileMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{ top: "0" }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu Drawer - Redesigned with solid background */}
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className={`fixed inset-0 h-dvh w-full md:hidden transition-transform duration-500 ease-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Solid background with gradient accent */}
            <div className="absolute inset-0 bg-white" />
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bakery-pink-light/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bakery-cream/50 to-transparent" />

            {/* Content wrapper */}
            <div className="relative h-full flex flex-col">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-5 border-b border-bakery-pink-light/40 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bakery-pink-dark to-bakery-pink flex items-center justify-center shadow-lg shadow-bakery-pink/30">
                    <Cookie className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bebas text-2xl tracking-wide">
                    <span className="text-bakery-pink-dark">Rose</span>
                    <span className="text-gray-300 mx-1">&</span>
                    <span className="text-gray-800">Sugar</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-bakery-pink-light hover:text-bakery-pink-dark transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Mobile menu content */}
              <div className="flex-1 p-5">
                {/* Primary Navigation Links */}
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className="flex items-center gap-4 font-poppins text-gray-800 font-medium py-4 px-5 rounded-2xl bg-white hover:bg-bakery-pink-light/40 border border-gray-100 hover:border-bakery-pink-light shadow-sm hover:shadow-md transition-all duration-300 group"
                      onClick={() => setMobileMenuOpen(false)}
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                    >
                      <span className="w-10 h-10 rounded-xl bg-bakery-pink-light/50 flex items-center justify-center group-hover:bg-bakery-pink-light transition-colors">
                        <link.icon className="w-5 h-5 text-bakery-pink-dark" />
                      </span>
                      <span className="flex-1">{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-bakery-pink-dark group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>

                {/* More section */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setMoreExpanded(!moreExpanded)}
                    className="flex items-center justify-between w-full font-poppins text-gray-800 font-medium py-4 px-5 rounded-2xl bg-white hover:bg-bakery-pink-light/40 border border-gray-100 hover:border-bakery-pink-light shadow-sm transition-all duration-300"
                    aria-expanded={moreExpanded}
                    aria-controls="mobile-more-links"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-xl bg-bakery-cream flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-bakery-brown" />
                      </span>
                      <span>More</span>
                    </div>
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
                      moreExpanded
                        ? "max-h-64 opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-2 pl-4">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.path}
                          className="flex items-center gap-3 font-poppins text-gray-700 py-3 px-4 rounded-xl bg-bakery-cream/30 hover:bg-bakery-pink-light/40 border border-transparent hover:border-bakery-pink-light/50 transition-all duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <link.icon className="w-4 h-4 text-bakery-brown" />
                          </span>
                          <span className="font-medium text-gray-800 text-sm">
                            {link.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA at bottom - Fixed */}
              <div className="flex-shrink-0 p-5 bg-white border-t border-bakery-pink-light/30">
                <Link
                  href="/classes"
                  className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink text-white font-poppins font-semibold rounded-2xl shadow-lg shadow-bakery-pink/30 hover:shadow-xl hover:shadow-bakery-pink/40 hover:-translate-y-0.5 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5" />
                  Book a Class
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-center text-xs text-gray-500 mt-3 font-poppins">
                  Hands-on cookie decorating experiences
                </p>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
