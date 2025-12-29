"use client";
import { useState, useEffect } from "react";
import { Menu, X, Cookie, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <img
            src="/logo.png"
            alt="Rose & Sugar Logo"
            className="h-16 md:h-20 w-auto max-h-20"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
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
                className="font-poppins text-gray-700 hover:text-bakery-pink-dark transition-colors duration-300 flex items-center gap-1 px-1 py-1 rounded focus:outline-none"
                aria-label="Cookies menu"
              >
                <Cookie className="w-5 h-5 mr-1" />
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
                className="font-poppins text-gray-700 hover:text-bakery-pink-dark transition-colors duration-300 flex items-center gap-1 px-1 py-1 rounded focus:outline-none"
                aria-label="More menu"
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
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
          <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 md:hidden">
            <div className="flex flex-col space-y-3 px-4">
              <Link
                href="/"
                className="font-poppins text-gray-700 py-2 hover:text-bakery-pink-dark transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
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
                  <Cookie className="w-4 h-4" />
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
                  onClick={() => setMoreExpanded(!moreExpanded)}
                  className="font-poppins text-gray-700 py-2 flex items-center gap-1 w-full"
                >
                  More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      moreExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {moreExpanded && (
                  <div className="flex flex-col pl-4">
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
