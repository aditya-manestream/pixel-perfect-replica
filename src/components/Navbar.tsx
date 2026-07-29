import { useState, useEffect, useRef } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import ardoriMark from "@/assets/ardori-mark-light.png.asset.json";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = ({ forceScrolled = false }: { forceScrolled?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const showSolid = forceScrolled || isScrolled;
  const itemCount = useCartStore((state) => state.getItemCount());

  // Search: opens an inline overlay and hands the term to /shop?q=…
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchTerm.trim();
    setIsSearchOpen(false);
    setSearchTerm("");
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

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
        showSolid
          ? "backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
      style={{
        backgroundColor: showSolid ? "#121B2D" : "transparent",
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
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center transition-opacity duration-300 hover:opacity-80"
            aria-label="Ardori"
          >
            <img
              src={ardoriMark.url}
              alt="Ardori luxury leather handbags logo"
              className="h-8 sm:h-9 lg:h-10 w-auto"
            />
          </Link>

          {/* Right - Contact, Icons */}
          <div className="hidden lg:flex items-center gap-7">


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
              onClick={() => setIsSearchOpen((v) => !v)}
              className="transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.9 }}
              aria-label="Search"
              aria-expanded={isSearchOpen}
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

          {/* Mobile - Left Hamburger, Right Cart */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Left - Hamburger Menu */}
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
                side="left" 
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
                        onClick={() => setIsSearchOpen(true)}
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

                  </div>

                </div>
              </SheetContent>
            </Sheet>

            {/* Right - Cart Icon (Always Visible) */}
            <Link
              to="/cart"
              className="relative transition-opacity duration-300 hover:opacity-100"
              style={{ color: "#E8E4DF", opacity: 0.9 }}
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.3} />
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
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div
          className="absolute top-full left-0 right-0 border-t"
          style={{
            backgroundColor: "#121B2D",
            borderColor: "rgba(232, 228, 223, 0.15)",
          }}
        >
          <form
            onSubmit={submitSearch}
            className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex items-center gap-3"
          >
            <Search size={18} strokeWidth={1.3} style={{ color: "#E8E4DF", opacity: 0.7 }} />
            <input
              ref={searchInputRef}
              type="search"
              aria-label="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a bag…"
              className="flex-1 bg-transparent outline-none font-sans text-[14px] tracking-[0.05em]"
              style={{ color: "#F5F2ED" }}
            />
            <button
              type="submit"
              className="font-sans text-[11px] tracking-[0.2em] uppercase px-4 py-2 transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#C9A86C", color: "#121B2D" }}
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              className="transition-opacity hover:opacity-70"
              style={{ color: "#E8E4DF", opacity: 0.7 }}
            >
              <X size={18} strokeWidth={1.3} />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
