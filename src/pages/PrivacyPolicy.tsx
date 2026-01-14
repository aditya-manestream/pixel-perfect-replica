import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const anchorLinks = [
  { label: "Information We Collect", id: "information-collect" },
  { label: "How We Use Your Information", id: "how-we-use" },
  { label: "Data Security", id: "data-security" },
  { label: "Sharing of Information", id: "sharing" },
  { label: "Your Rights", id: "your-rights" },
  { label: "Cookies", id: "cookies" },
  { label: "Updates", id: "updates" },
  { label: "Contact", id: "contact" },
];

const policySections = [
  {
    id: "information-collect",
    title: "Information We Collect",
    content: (
      <>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          When you visit our website or place an order, we may collect:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              <strong style={{ color: "#1A1A1A" }}>Personal details:</strong> Name, address, email, phone number
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              <strong style={{ color: "#1A1A1A" }}>Payment information:</strong> Processed securely via third-party payment gateways (we do not store card details)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              <strong style={{ color: "#1A1A1A" }}>Usage data:</strong> Site visits, device information, cookies
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            To process and deliver your orders
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            To improve our website and customer experience
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            To communicate order updates, promotions, and offers (only with your consent)
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            For fraud prevention and security
          </span>
        </li>
      </ul>
    )
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            All transactions use secure encryption (SSL)
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Only a limited team has access to order-related information for fulfillment purposes
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            We employ industry-standard security measures to protect your data
          </span>
        </li>
      </ul>
    )
  },
  {
    id: "sharing",
    title: "Sharing of Information",
    content: (
      <>
        <p className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          We do not sell your personal data. We are dedicated to maintaining the privacy and security of our customers.
        </p>
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
          We may share limited information with:
        </p>
        <ul className="space-y-3 ml-4">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Shipping and delivery partners (to fulfill orders)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Payment gateways (to process transactions)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
              Verified marketing tools (e.g., Klaviyo, Google Analytics, Meta Pixel) to improve service
            </span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <ul className="space-y-3 ml-4">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Access, modify, or delete your personal information
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Opt out of marketing emails at any time
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: "#8B7355" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.8" }}>
            Request clarification on how your data is used
          </span>
        </li>
      </ul>
    )
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.
      </p>
    )
  },
  {
    id: "updates",
    title: "Updates to Privacy Policy",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        We may update this policy from time to time. Changes will be posted on this page with an updated revision date.
      </p>
    )
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4A4A4A", fontSize: "17px", lineHeight: "1.9" }}>
        For privacy-related questions or to exercise your rights, contact us at{" "}
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

const PrivacyPolicy = () => {
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
        className="relative w-full min-h-[40vh] lg:min-h-[45vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#121B2D" }}
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
            Privacy Policy
          </h1>
          <p className="font-serif text-[14px] lg:text-[16px] font-light max-w-[500px] mx-auto" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
            Your data is protected and handled responsibly.
          </p>
        </motion.div>
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

          {/* Policy Sections */}
          <div className="space-y-12">
            {policySections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="pb-12 scroll-mt-32"
                style={{ borderBottom: index < policySections.length - 1 ? "1px solid #E8E4DF" : "none" }}
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

export default PrivacyPolicy;
