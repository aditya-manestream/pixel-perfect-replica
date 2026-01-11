import { useState, useEffect } from "react";
import { Search, ShoppingBag, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Handbag Care", href: "#" },
    { label: "Our Story", href: "#" },
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
            <a
              href="#"
              className="font-sans text-[11px] tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-100 font-light"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: "#E8E4DF",
                opacity: 0.9 
              }}
            >
              Contact
            </a>

            {/* Search Icon */}
            <button
              className="transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.9 }}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.3} />
            </button>

            {/* Cart Icon with Badge */}
            <button
              className="relative transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.9 }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.3} />
              {cartCount > 0 && (
                <span 
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-medium"
                  style={{ 
                    backgroundColor: "#C9A86C",
                    color: "#121B2D"
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile - Icons only */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              className="transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.9 }}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.3} />
            </button>
            <button
              className="relative transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.9 }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.3} />
              {cartCount > 0 && (
                <span 
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-medium"
                  style={{ 
                    backgroundColor: "#C9A86C",
                    color: "#121B2D"
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
