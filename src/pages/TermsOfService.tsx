import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import sectionPattern from "@/assets/section-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const anchorLinks = [
  { label: "Use of Website", id: "use-of-website" },
  { label: "Product Information", id: "product-information" },
  { label: "Pricing & Availability", id: "pricing" },
  { label: "Intellectual Property", id: "intellectual-property" },
  { label: "Orders & Payment", id: "orders-payment" },
  { label: "Limitation of Liability", id: "liability" },
  { label: "Warranty", id: "warranty" },
  { label: "Governing Law", id: "governing-law" },
  { label: "Changes to Terms", id: "changes" },
  { label: "Contact", id: "contact" },
];

const termsSections = [
  {
    id: "use-of-website",
    title: "Use of Website",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          You may browse and purchase products through our website. You may not:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Misuse our website or any data received from it
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Attempt to steal data or engage in fraudulent activity
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Use automated systems (bots, scrapers) to access our site
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "product-information",
    title: "Product Information",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            All items are handcrafted from natural leather
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Variations in leather grain, texture, or colour are normal characteristics and not defects
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Product images are for representation; actual products may vary slightly due to natural leather qualities
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            We strive to display accurate colors, but slight variations may occur due to screen settings
          </span>
        </li>
      </ul>
    )
  },
  {
    id: "pricing",
    title: "Pricing & Availability",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            All prices are in Indian Rupees (INR) and inclusive of GST
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            We reserve the right to modify prices, discontinue products, or run promotions at our discretion
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Product availability is subject to change without notice
          </span>
        </li>
      </ul>
    )
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          All content on this website, including but not limited to photographs, designs, videos, logos, and text, are the exclusive property of Ardori and its registered trademark. This content cannot be used, reproduced, distributed, or displayed without explicit written permission.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          Unauthorized use of any intellectual property may result in legal action as per Indian law.
        </p>
      </>
    )
  },
  {
    id: "orders-payment",
    title: "Orders & Payment",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            All orders are subject to acceptance and availability
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Payment must be completed to confirm your order
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            We use secure third-party payment gateways
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            We do not store your credit/debit card information
          </span>
        </li>
      </ul>
    )
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          We at Ardori are committed to providing an exceptional customer experience. However, Ardori is not responsible for:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Delays due to courier services or unforeseen circumstances
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Losses arising from misuse of products
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Damage caused after delivery
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Indirect, incidental, or consequential damages
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "warranty",
    title: "Warranty",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        Our products come with an 8-month workmanship warranty. See our{" "}
        <Link 
          to="/warranty-policy" 
          className="transition-opacity hover:opacity-70"
          style={{ color: "#8B7355" }}
        >
          Warranty Policy
        </Link>
        {" "}for details.
      </p>
    )
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Mumbai, India.
      </p>
    )
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        We may update these Terms of Service from time to time. Continued use of the website after changes constitutes acceptance of the new terms.
      </p>
    )
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        For questions about these terms, contact us at{" "}
        <a 
          href="mailto:ardori.work@gmail.com" 
          className="transition-opacity hover:opacity-70"
          style={{ color: "#8B7355" }}
        >
          ardori.work@gmail.com
        </a>
        .
      </p>
    )
  },
];

const TermsOfService = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          style={{ backgroundColor: "rgba(250, 248, 245, 0.94)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.1em] mb-4"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1A1A1A"
            }}
          >
            TERMS OF SERVICE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[13px] uppercase tracking-[0.15em] mb-6"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: "#8B7355"
            }}
          >
            Last updated: January 2025
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg md:text-xl font-light max-w-2xl mx-auto"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: "#4A4A4A",
              lineHeight: "1.7"
            }}
          >
            By accessing and using the Ardori website, you agree to be bound by these Terms of Service.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Anchor Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16 pb-8"
            style={{ borderBottom: "1px solid #E8E4DF" }}
          >
            <p 
              className="text-[11px] uppercase tracking-[0.2em] mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "#8B7355" }}
            >
              Quick Navigation
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {anchorLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[15px] transition-opacity hover:opacity-70"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#6B6B6B"
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>

          {/* Terms Sections */}
          <div className="space-y-12">
            {termsSections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="pb-12 scroll-mt-32"
                style={{ borderBottom: index < termsSections.length - 1 ? "1px solid #E8E4DF" : "none" }}
              >
                <h2 
                  className="text-xl md:text-2xl font-light mb-6 tracking-wide"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1A1A1A"
                  }}
                >
                  {section.title}
                </h2>
                {section.content}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
