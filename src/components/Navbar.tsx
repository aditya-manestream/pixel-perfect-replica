import { useState, useEffect } from "react";
import { Search, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Handbag Care", href: "/handbag-care" },
    { label: "Our Story", href: "/our-story" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
      style={{
        backgroundColor: isScrolled ? "#121B2D" : "transparent",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Left - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-sans text-[11px] tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-100 font-light"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#E8E4DF",
                  opacity: 0.9 
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center - Logo */}
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2 font-serif text-xl sm:text-2xl lg:text-[26px] font-normal tracking-[0.15em] transition-opacity duration-300 hover:opacity-80"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: "#E8E4DF",
              letterSpacing: "0.2em"
            }}
          >
            ARDORI
          </Link>

          {/* Right - Currency, Contact, Icons */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Currency Dropdown */}
            <button
              className="flex items-center gap-1 font-sans text-[11px] tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-100 font-light"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: "#E8E4DF",
                opacity: 0.9 
              }}
            >
              INR
              <ChevronDown size={12} strokeWidth={1.5} className="opacity-70" />
            </button>

            {/* Contact Link */}
            <Link
              to="/contact"
              className="font-sans text-[11px] tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-100 font-light"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: "#E8E4DF",
                opacity: 0.9 
              }}
            >
              Contact
            </Link>

            {/* Search Icon */}
            <button
              className="transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.9 }}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.3} />
            </button>

            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className="relative transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.9 }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.3} />
              {itemCount > 0 && (
                <span 
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-medium"
                  style={{ 
                    backgroundColor: "#C9A86C",
                    color: "#121B2D"
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile - Hamburger Menu */}
          <div className="flex lg:hidden items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="transition-opacity duration-300 hover:opacity-100"
                  style={{ color: "#E8E4DF", opacity: 0.9 }}
                  aria-label="Open menu"
                >
                  <Menu size={22} strokeWidth={1.3} />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-[320px] border-none p-0"
                style={{ backgroundColor: "#121B2D" }}
              >
                <div className="flex flex-col h-full">
                  {/* Close Button */}
                  <div className="flex justify-end p-6">
                    <SheetClose asChild>
                      <button
                        className="transition-opacity duration-200 hover:opacity-70"
                        style={{ color: "#E8E4DF" }}
                        aria-label="Close menu"
                      >
                        <X size={24} strokeWidth={1.3} />
                      </button>
                    </SheetClose>
                  </div>

                  {/* Main Navigation Links */}
                  <nav className="flex flex-col px-8 py-6 gap-6">
                    {[
                      { label: "Shop", href: "/shop" },
                      { label: "Handbag Care", href: "/handbag-care" },
                      { label: "Our Story", href: "/our-story" },
                      { label: "Contact", href: "/contact" },
                    ].map((link) => (
                      <SheetClose asChild key={link.label}>
                        <Link
                          to={link.href}
                          className="font-sans text-[13px] tracking-[0.2em] uppercase transition-opacity duration-200 hover:opacity-70 font-light"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#E8E4DF"
                          }}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Divider */}
                  <div className="mx-8 border-t" style={{ borderColor: "rgba(232, 228, 223, 0.15)" }} />

                  {/* Secondary Links */}
                  <div className="flex flex-col px-8 py-6 gap-5">
                    {/* Search */}
                    <SheetClose asChild>
                      <button
                        className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-70"
                        style={{ color: "#E8E4DF", opacity: 0.8 }}
                        aria-label="Search"
                      >
                        <Search size={18} strokeWidth={1.3} />
                        <span 
                          className="font-sans text-[12px] tracking-[0.15em] uppercase font-light"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          Search
                        </span>
                      </button>
                    </SheetClose>

                    {/* Cart */}
                    <SheetClose asChild>
                      <Link
                        to="/cart"
                        className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-70"
                        style={{ color: "#E8E4DF", opacity: 0.8 }}
                        aria-label="Cart"
                      >
                        <div className="relative">
                          <ShoppingBag size={18} strokeWidth={1.3} />
                          {itemCount > 0 && (
                            <span 
                              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-medium"
                              style={{ 
                                backgroundColor: "#C9A86C",
                                color: "#121B2D"
                              }}
                            >
                              {itemCount}
                            </span>
                          )}
                        </div>
                        <span 
                          className="font-sans text-[12px] tracking-[0.15em] uppercase font-light"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          Cart {itemCount > 0 && `(${itemCount})`}
                        </span>
                      </Link>
                    </SheetClose>

                    {/* Currency */}
                    <div 
                      className="flex items-center gap-3"
                      style={{ color: "#E8E4DF", opacity: 0.8 }}
                    >
                      <span 
                        className="font-sans text-[12px] tracking-[0.15em] uppercase font-light"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Currency: INR
                      </span>
                      <ChevronDown size={14} strokeWidth={1.5} className="opacity-60" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
