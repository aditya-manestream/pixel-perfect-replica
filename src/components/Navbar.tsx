import { useState, useEffect } from "react";
import { Search, User, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Shop", "Collections", "Story", "Journal"];

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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left - Logo */}
          <a
            href="/"
            className="font-serif text-xl sm:text-2xl lg:text-[28px] font-normal tracking-wide transition-opacity duration-300 hover:opacity-80"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: "#E8E4DF" 
            }}
          >
            Ardori
          </a>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-100"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#E8E4DF",
                  opacity: 0.85 
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">
            <button
              className="transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.85 }}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.3} className="lg:w-5 lg:h-5" />
            </button>
            <button
              className="transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.85 }}
              aria-label="Account"
            >
              <User size={18} strokeWidth={1.3} className="lg:w-5 lg:h-5" />
            </button>
            <button
              className="transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.85 }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.3} className="lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
