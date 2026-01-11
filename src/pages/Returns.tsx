import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import sectionPattern from "@/assets/section-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const sidebarLinks = [
  {
    category: "ORDER STATUS",
    links: [
      { label: "Track Order", href: "#" },
      { label: "Shipping Information", href: "#" },
    ]
  },
  {
    category: "RETURNS & EXCHANGES",
    links: [
      { label: "Return & Exchange Policy", href: "/returns", active: true },
    ]
  },
  {
    category: "CONTACT",
    links: [
      { label: "Contact Us", href: "/contact" },
    ]
  },
  {
    category: "CARE",
    links: [
      { label: "Handbag Care Guide", href: "/handbag-care" },
    ]
  },
];

const policySections = [
  {
    id: "eligibility",
    title: "Eligibility for Returns/Exchanges",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
          We accept exchanges and returns for refunds only if:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              A return request is raised within 48-72 hours of delivery
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              The product is unused, unworn, and in original condition
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              All tags, dust bag, fillers, and packaging are intact
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              The item is not part of a Sale, Custom Order, Monogrammed/Personalized piece, or Made-to-Order item
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "non-returnable",
    title: "Non-Returnable Items",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
            Discounted or sale products
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
            Items damaged due to improper use, exposure to water/chemicals, or lack of care
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
            Custom, personalized, or made-to-order pieces
          </span>
        </li>
      </ul>
    )
  },
  {
    id: "damaged",
    title: "Damaged or Defective Products",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
          If you receive a defective, damaged, or incorrect item:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              Raise a claim within 24 hours with photos + unboxing video (courier requirement)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              We will replace the piece at no extra cost after inspection
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "how-to",
    title: "How to Return or Exchange",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
          Email us at{" "}
          <a href="mailto:ardori.work@gmail.com" className="transition-opacity hover:opacity-70" style={{ color: "#8B7355" }}>
            ardori.work@gmail.com
          </a>
          {" "}with:
        </p>
        <ul className="space-y-3 ml-4 mb-6">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              Order number
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              Reason for return/exchange
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              Photos of the product
            </span>
          </li>
        </ul>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
          Once approved, we'll schedule a reverse pickup (where serviceable). After our quality check, your exchange/return is processed within 4-7 business days.
        </p>
      </>
    )
  },
  {
    id: "shipping",
    title: "Return Shipping",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
            One free return/exchange is allowed per order (for serviceable pincodes)
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
            For non-serviceable pincodes, customers must ship items back at their own cost
          </span>
        </li>
      </ul>
    )
  },
];

const Returns = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative pt-28 pb-12 md:pt-36 md:pb-16"
        style={{
          backgroundImage: `url(${sectionPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(250, 248, 245, 0.95)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-4"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1A1A1A"
            }}
          >
            Returns & Exchanges
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg font-light"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: "#6B6B6B"
            }}
          >
            Our policy for hassle-free returns and exchanges
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 transition-colors"
                style={{ 
                  border: "1px solid #D4C5B5",
                  backgroundColor: mobileMenuOpen ? "#F5F2EF" : "transparent"
                }}
              >
                <span 
                  className="text-sm uppercase tracking-[0.15em]"
                  style={{ fontFamily: "'Montserrat', sans-serif", color: "#1A1A1A" }}
                >
                  Customer Care
                </span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`}
                  style={{ color: "#8B7355" }}
                />
              </button>
              
              {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 px-4 py-4"
                  style={{ backgroundColor: "#F5F2EF" }}
                >
                  {sidebarLinks.map((section, idx) => (
                    <div key={section.category} className={idx > 0 ? "mt-6" : ""}>
                      <h4 
                        className="text-[11px] uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
                      >
                        {section.category}
                      </h4>
                      <ul className="space-y-2">
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              to={link.href}
                              className={`block text-sm transition-opacity hover:opacity-70 ${link.active ? 'font-medium' : ''}`}
                              style={{ 
                                fontFamily: "'Cormorant Garamond', serif",
                                color: link.active ? "#1A1A1A" : "#6B6B6B",
                                borderLeft: link.active ? "2px solid #8B7355" : "none",
                                paddingLeft: link.active ? "12px" : "0"
                              }}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Left Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h3 
                  className="text-xl font-light mb-8 tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1A1A1A"
                  }}
                >
                  Customer Care
                </h3>
                
                <nav className="space-y-8">
                  {sidebarLinks.map((section) => (
                    <div key={section.category}>
                      <h4 
                        className="text-[11px] uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
                      >
                        {section.category}
                      </h4>
                      <ul className="space-y-3">
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              to={link.href}
                              className={`block text-[15px] transition-all duration-200 hover:opacity-70 ${link.active ? 'font-medium' : ''}`}
                              style={{ 
                                fontFamily: "'Cormorant Garamond', serif",
                                color: link.active ? "#1A1A1A" : "#6B6B6B",
                                borderLeft: link.active ? "2px solid #8B7355" : "2px solid transparent",
                                paddingLeft: "12px",
                                marginLeft: "-12px"
                              }}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Content Area */}
            <main className="flex-1 min-w-0">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                {/* Page Title */}
                <h2 
                  className="text-2xl md:text-3xl font-light mb-6 tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1A1A1A"
                  }}
                >
                  Returns & Exchanges
                </h2>
                
                {/* Intro */}
                <p 
                  className="text-lg mb-8"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#4A4A4A",
                    lineHeight: "1.8"
                  }}
                >
                  We want you to love your Ardori bag. If you need to return or exchange your purchase, here's our policy:
                </p>

                {/* CTA Button */}
                <Link to="/contact">
                  <Button
                    className="mb-12 px-8 py-6 rounded-none text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-90"
                    style={{ 
                      backgroundColor: "#1A1A1A",
                      color: "#FAF8F5",
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    Start Your Return
                  </Button>
                </Link>

                {/* Policy Sections */}
                <div className="space-y-10">
                  {policySections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      id={section.id}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className="pb-10"
                      style={{ borderBottom: index < policySections.length - 1 ? "1px solid #E8E4DF" : "none" }}
                    >
                      <h3 
                        className="text-xl md:text-2xl font-light mb-6 tracking-wide"
                        style={{ 
                          fontFamily: "'Cormorant Garamond', serif",
                          color: "#1A1A1A"
                        }}
                      >
                        {section.title}
                      </h3>
                      {section.content}
                    </motion.div>
                  ))}
                </div>

                {/* Final Contact Line */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-12 pt-8"
                  style={{ borderTop: "1px solid #E8E4DF" }}
                >
                  <p 
                    className="text-lg italic"
                    style={{ 
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#6B6B6B"
                    }}
                  >
                    Questions? Contact us at{" "}
                    <a 
                      href="mailto:ardori.work@gmail.com" 
                      className="not-italic transition-opacity hover:opacity-70"
                      style={{ color: "#8B7355" }}
                    >
                      ardori.work@gmail.com
                    </a>
                  </p>
                </motion.div>
              </motion.div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Returns;
