import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const sidebarLinks = [
  {
    category: "ORDER STATUS",
    links: [
      { label: "Track Order", href: "#" },
      { label: "Shipping Information", href: "/shipping", active: true },
    ]
  },
  {
    category: "RETURNS & EXCHANGES",
    links: [
      { label: "Return & Exchange Policy", href: "/returns" },
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

const shippingSections = [
  {
    id: "within-india",
    title: "Shipping Within India",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
        We offer free standard shipping across India.
      </p>
    )
  },
  {
    id: "processing",
    title: "Processing Time",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
        Orders are dispatched within 2-4 business days of order confirmation.
      </p>
    )
  },
  {
    id: "delivery",
    title: "Delivery Time",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
        Delivery typically takes 3-10 working days, depending on your pincode and location.
      </p>
    )
  },
  {
    id: "tracking",
    title: "Order Tracking",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
          Once your order is shipped, you'll receive an email/SMS with:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              Tracking number
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              Courier partner details
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.7" }}>
              Link to track your shipment
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "taxes",
    title: "Taxes",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
        All prices listed on our website are inclusive of GST. There are no additional taxes or hidden charges at checkout.
      </p>
    )
  },
  {
    id: "non-serviceable",
    title: "Non-Serviceable Areas",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
        If our courier partners cannot service your pincode, our customer care team will contact you to explore alternative shipping options.
      </p>
    )
  },
  {
    id: "partners",
    title: "Shipping Partners",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
        We work with India's leading courier services to ensure safe and timely delivery.
      </p>
    )
  },
  {
    id: "issues",
    title: "Delivery Issues",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "16px", lineHeight: "1.8" }}>
        If you experience any delivery issues, please contact us immediately at{" "}
        <a href="mailto:love@ardorilabel.com" className="transition-opacity hover:opacity-70" style={{ color: "#8B7355" }}>
          love@ardorilabel.com
        </a>
        {" "}with your order number.
      </p>
    )
  },
];

const Shipping = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        className="relative w-full min-h-[40vh] lg:min-h-[45vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#121B2D" }}
        data-dark-section
      >
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${philosophyPattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        
        <motion.div 
          className="relative z-10 text-center px-6 py-20 lg:py-24"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="font-sans text-[11px] lg:text-[12px] tracking-[0.4em] uppercase mb-4" style={{ color: "#C4A164" }}>
            ✦ SUPPORT ✦
          </p>
          <h1 className="font-serif font-normal tracking-[0.02em] leading-[1.1] mb-4" style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Shipping Information
          </h1>
          <p className="font-serif text-[14px] lg:text-[16px] font-light max-w-[500px] mx-auto" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
            Free shipping across India with secure delivery updates.
          </p>
        </motion.div>
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
                  Shipping Information
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
                  Below are Ardori's shipping timelines and delivery details for orders within India.
                </p>

                {/* CTA Button */}
                <Link to="#">
                  <Button
                    className="mb-12 px-8 py-6 rounded-none text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-90"
                    style={{ 
                      backgroundColor: "#1A1A1A",
                      color: "#FAF8F5",
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    Track Your Order
                  </Button>
                </Link>

                {/* Shipping Sections */}
                <div className="space-y-10">
                  {shippingSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      id={section.id}
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className="pb-10"
                      style={{ borderBottom: index < shippingSections.length - 1 ? "1px solid #E8E4DF" : "none" }}
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
                    Need help with your order? Contact us at{" "}
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

export default Shipping;
