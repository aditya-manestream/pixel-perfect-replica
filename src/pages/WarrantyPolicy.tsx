import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import sectionPattern from "@/assets/section-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const anchorLinks = [
  { label: "What Is Covered", id: "what-is-covered" },
  { label: "What Is NOT Covered", id: "what-is-not-covered" },
  { label: "How to Claim Warranty", id: "how-to-claim" },
  { label: "Warranty Exclusions", id: "exclusions" },
  { label: "Beyond Warranty", id: "beyond-warranty" },
  { label: "Our Commitment", id: "commitment" },
];

const warrantySections = [
  {
    id: "what-is-covered",
    title: "What Is Covered",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          Our warranty covers manufacturing defects, including:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Stitching issues or seam failures
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Hardware defects (zippers, clasps, buckles, rings)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Glue or adhesive failures due to manufacturing
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "what-is-not-covered",
    title: "What Is NOT Covered",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          The warranty does not cover:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Normal wear and tear from regular use
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Leather aging, patina development, or slight creasing (natural for genuine leather)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Stains, cuts, scratches, or water damage
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Damage due to misuse, overloading, or improper care
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Color fading from sun exposure (a natural trait of leather)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Damage from exposure to water, chemicals, or harsh cleaners
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Alterations or repairs done by third parties
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "how-to-claim",
    title: "How to Claim Warranty",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          Email us at{" "}
          <a href="mailto:ardori.work@gmail.com" className="transition-opacity hover:opacity-70" style={{ color: "#8B7355" }}>
            ardori.work@gmail.com
          </a>
          {" "}with:
        </p>
        <ul className="space-y-3 ml-4 mb-6">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Order number
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Photos or videos showing the issue
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Description of the problem
            </span>
          </li>
        </ul>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          Our team will examine your claim and confirm if it's covered under warranty.
        </p>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          If approved, we will offer:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Free repair, or
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Replacement (if repair is not feasible)
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "exclusions",
    title: "Warranty Exclusions",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Proof of purchase is required for all warranty claims
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Products purchased from unauthorized sellers are not covered
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            The warranty is non-transferable
          </span>
        </li>
      </ul>
    )
  },
  {
    id: "beyond-warranty",
    title: "Beyond Warranty",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        After the 8-month warranty period, we still offer repair services for a nominal fee. Contact us to discuss options.
      </p>
    )
  },
  {
    id: "commitment",
    title: "Our Commitment",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        We take pride in the quality and craftsmanship of every Ardori bag. If you have any concerns about your purchase, please reach out — we're here to help.
      </p>
    )
  },
];

const WarrantyPolicy = () => {
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
            WARRANTY POLICY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[13px] uppercase tracking-[0.15em] mb-3"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: "#8B7355"
            }}
          >
            Warranty Duration: 8 Months
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[12px] uppercase tracking-[0.1em] mb-6"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: "#999"
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
            We stand behind the quality of our handcrafted bags and offer an 8-month workmanship warranty on all Ardori products.
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

          {/* Warranty Sections */}
          <div className="space-y-12">
            {warrantySections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="pb-12 scroll-mt-32"
                style={{ borderBottom: index < warrantySections.length - 1 ? "1px solid #E8E4DF" : "none" }}
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

          {/* CTA Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 pt-12 text-center"
            style={{ borderTop: "1px solid #E8E4DF" }}
          >
            <h3 
              className="text-2xl md:text-3xl font-light mb-6 tracking-wide"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1A1A1A"
              }}
            >
              Need help with a warranty claim?
            </h3>
            <a href="mailto:ardori.work@gmail.com">
              <Button
                className="px-10 py-6 rounded-none text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-90"
                style={{ 
                  backgroundColor: "#1A1A1A",
                  color: "#FAF8F5",
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                Email Customer Care
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WarrantyPolicy;
