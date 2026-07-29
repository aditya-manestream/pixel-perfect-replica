import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";
import ardoriMark from "@/assets/ardori-mark-light.png.asset.json";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    setEmail("");
  };

  return (
    <footer style={{ backgroundColor: "#18243E" }} data-dark-section>
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-16 lg:pt-20 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex justify-center mb-6 transition-opacity duration-300 hover:opacity-80" aria-label="Ardori">
              <img src={ardoriMark.url} alt="Ardori luxury leather handbags logo" className="h-12 lg:h-14 w-auto" />
            </Link>
            <p
              className="font-serif text-[14px] lg:text-[15px] font-light leading-[1.8] mb-8"
              style={{ color: "#C3BDB4" }}
            >
              Handcrafted luxury handbags inspired by India's flora and fauna.
              Ethically made with vegetable-tanned leather by skilled artisans
              who preserve generations of craftsmanship.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5">
              <a
                href="https://www.instagram.com/ardoridesigns/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:brightness-125"
                style={{ color: "#C3BDB4" }}
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={1.2} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61588155480760"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:brightness-125"
                style={{ color: "#C3BDB4" }}
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={1.2} />
              </a>
              <a
                href="mailto:love@ardorilabel.com"
                className="transition-all duration-300 hover:brightness-125"
                style={{ color: "#C3BDB4" }}
                aria-label="Email"
              >
                <Mail size={20} strokeWidth={1.2} />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="lg:col-span-1">
            <h3
              className="font-sans text-[11px] lg:text-[12px] tracking-[0.25em] uppercase mb-6"
              style={{ color: "#C9A86C" }}
            >
              EXPLORE
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/shop"
                  className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                  style={{ color: "#C3BDB4", opacity: 0.85 }}
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/our-story"
                  className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                  style={{ color: "#C3BDB4", opacity: 0.85 }}
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/handbag-care"
                  className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                  style={{ color: "#C3BDB4", opacity: 0.85 }}
                >
                  Handbag Care
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                  style={{ color: "#C3BDB4", opacity: 0.85 }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Assistance Column - Two Sub-columns */}
          <div className="lg:col-span-2">
            <h3
              className="font-sans text-[11px] lg:text-[12px] tracking-[0.25em] uppercase mb-6"
              style={{ color: "#C9A86C" }}
            >
              ASSISTANCE
            </h3>
            <div className="grid grid-cols-2 gap-x-10 gap-y-4">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/shipping"
                    className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                    style={{ color: "#C3BDB4", opacity: 0.85 }}
                  >
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                    style={{ color: "#C3BDB4", opacity: 0.85 }}
                  >
                    Return & Exchange Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                    style={{ color: "#C3BDB4", opacity: 0.85 }}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                    style={{ color: "#C3BDB4", opacity: 0.85 }}
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/warranty-policy"
                    className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                    style={{ color: "#C3BDB4", opacity: 0.85 }}
                  >
                    Warranty Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                    style={{ color: "#C3BDB4", opacity: 0.85 }}
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/track-order"
                    className="font-serif text-[14px] lg:text-[15px] font-light transition-opacity duration-300 hover:opacity-100"
                    style={{ color: "#C3BDB4", opacity: 0.85 }}
                  >
                    Track Your Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-16"
      >
        <div
          className="w-full h-px"
          style={{ backgroundColor: "#4A4540" }}
        />
      </div>

      {/* Lower Footer - Newsletter & Copyright */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Newsletter */}
          <div className="max-w-[420px]">
            <h4
              className="font-serif text-[16px] lg:text-[18px] font-normal italic mb-3"
              style={{ color: "#E8E4DF" }}
            >
              Get 2% off your order
            </h4>
            <p
              className="font-serif text-[13px] lg:text-[14px] font-light mb-6"
              style={{ color: "#B8B2A8" }}
            >
              Sign up with your email to receive an additional 2% off.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-transparent border-0 border-b pb-2 font-serif text-[14px] placeholder:font-serif focus:outline-none transition-all duration-300 focus:border-[#B8B2A8]"
                  style={{
                    color: "#C3BDB4",
                    borderColor: "#4A4540",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-100"
                style={{ color: "#E8E4DF", opacity: 0.9 }}
              >
                GET CODE
              </button>
            </form>
          </div>

          {/* Copyright */}
          <p
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.1em] uppercase"
            style={{ color: "#5A5550" }}
          >
            © 2025 ARDORI INDIA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
