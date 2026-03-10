import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "We ship within 10 business days across India."
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes, we offer complimentary shipping on all orders above ₹5,000 within India."
      },
      {
        q: "Can I track my order?",
        a: "Yes, once your order ships, you'll receive a tracking number via email. You can also track your order through our Track Your Order page."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 48 hours of delivery for unused items in original packaging. Please visit our Returns Page for complete details."
      },
      {
        q: "How do I initiate a return?",
        a: "Email us at love@ardorilabel.com with your order number and reason for return. Our team will guide you through the process."
      }
    ]
  },
  {
    category: "Product Care",
    questions: [
      {
        q: "How do I care for my leather bag?",
        a: "Store in the provided dust bag, avoid direct sunlight, clean with a soft dry cloth, and condition the leather every 3–6 months. Visit our Handbag Care page for detailed instructions."
      },
      {
        q: "Will the leather change over time?",
        a: "Yes, our vegetable-tanned leather develops a beautiful patina over time. This is a natural characteristic and adds to the unique beauty of your bag."
      }
    ]
  },
  {
    category: "Warranty",
    questions: [
      {
        q: "What does the warranty cover?",
        a: "Our 8-month warranty covers manufacturing defects including stitching issues, hardware defects, and glue failures. Normal wear and tear is not covered."
      },
      {
        q: "How do I claim warranty?",
        a: "Email us at love@ardorilabel.com with your order number, photos of the issue, and a description of the problem."
      }
    ]
  }
];

const FAQs = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
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
            Frequently Asked Questions
          </h1>
          <p className="font-serif text-[14px] lg:text-[16px] font-light max-w-[500px] mx-auto" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
            Find answers to common questions about our products and services.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          {faqs.map((category, catIndex) => (
            <motion.div 
              key={category.category}
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="font-serif text-[22px] lg:text-[26px] font-normal mb-6" style={{ color: "#2C2824" }}>
                {category.category}
              </h2>
              
              <div className="space-y-0">
                {category.questions.map((faq, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isOpen = openItems[key];
                  
                  return (
                    <div key={key} style={{ borderBottom: qIndex < category.questions.length - 1 ? "1px solid #E8E4DF" : "none" }}>
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between py-5 text-left"
                      >
                        <span className="font-sans text-[14px] lg:text-[15px] pr-4" style={{ color: "#3D3530" }}>
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={18} strokeWidth={1.5} style={{ color: "#7A7570" }} />
                        ) : (
                          <ChevronDown size={18} strokeWidth={1.5} style={{ color: "#7A7570" }} />
                        )}
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}>
                        <p className="font-serif text-[14px] lg:text-[15px] font-light leading-relaxed" style={{ color: "#6A655F" }}>
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Contact CTA */}
          <motion.div 
            className="text-center pt-8 mt-8"
            style={{ borderTop: "1px solid #E8E4DF" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-serif text-[16px] lg:text-[18px] font-light mb-4" style={{ color: "#5A5550" }}>
              Still have questions?
            </p>
            <a
              href="mailto:ardori.work@gmail.com"
              className="inline-block font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: "#2C2824",
                color: "#FFFFFF",
                padding: "14px 32px",
              }}
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;
