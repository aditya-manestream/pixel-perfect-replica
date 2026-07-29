import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, Sun, Package, AlertTriangle, Sparkles, Wrench, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import navyPatternBg from "@/assets/navy-pattern-bg.jpg";
import careDaily from "@/assets/care-daily.jpg";
import careCleaning from "@/assets/story-craft.jpg";
import careStorage from "@/assets/unboxing-packaging.jpg";
import careAvoid from "@/assets/story-leather-texture.jpg";
import careLeather from "@/assets/care-leather.jpg";
import careProfessional from "@/assets/shop-product-4.jpg";
import careResources from "@/assets/care-resources.jpg";
import Seo from "@/components/Seo";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

const careSections = [
  {
    icon: Sparkles,
    title: "Daily Care",
    intro: "Simple habits to keep your bag looking fresh every day.",
    image: careDaily,
    items: [
      "Clean hands before handling",
      "Avoid overloading",
      "Empty bag regularly",
      "Use dust bag when not in use",
      "Keep away from direct sunlight/heat",
    ],
  },
  {
    icon: Droplets,
    title: "Cleaning & Maintenance",
    intro: "Proper cleaning techniques to maintain the leather's beauty.",
    image: careCleaning,
    items: [
      "Wipe gently with soft, dry cloth",
      "For spills: blot immediately, don't rub",
      "Use leather-specific cleaners (recommendations below)",
      "Condition leather every 6–12 months",
      "Avoid harsh chemicals, alcohol, or water-based cleaners",
    ],
  },
  {
    icon: Package,
    title: "Storage Tips",
    intro: "How to store your bag when not in use.",
    image: careStorage,
    items: [
      "Stuff with tissue paper to maintain shape",
      "Store in provided dust bag",
      "Keep in cool, dry place",
      "Avoid plastic bags (leather needs to breathe)",
      "Store away from direct sunlight",
    ],
  },
  {
    icon: AlertTriangle,
    title: "What to Avoid",
    intro: "Things that can damage your leather bag.",
    image: careAvoid,
    items: [
      "Water exposure (if wet, air dry naturally)",
      "Heat sources",
      "Perfumes and cosmetics directly on leather",
      "Sharp objects",
      "Overloading beyond capacity",
    ],
  },
];

const HandbagCare = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Seo
        title={"Handbag Care Guide for Leather Bags | Ardori"}
        description={"How to clean, condition and store your vegetable-tanned leather handbag so it ages into a beautiful patina instead of wearing out."}
        path="/handbag-care"
      />
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative py-16 sm:py-20 lg:py-36 flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${navyPatternBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "#C9A86C" }}
          >
            LEATHER CARE GUIDE
          </p>
          <h1
            className="font-serif text-[36px] md:text-[48px] lg:text-[60px] font-normal mb-6"
            style={{ color: "#FFFFFF" }}
          >
            Caring for Your Ardori
          </h1>
          <p
            className="font-serif text-[16px] lg:text-[18px] font-light max-w-[500px] mx-auto"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Keep your leather bag beautiful for years to come
          </p>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section
        className="py-16 lg:py-24 px-6"
        style={{ backgroundColor: "#FAF8F5" }}
      >
        <motion.div {...fadeInUp} className="text-center max-w-[680px] mx-auto">
          <p
            className="font-serif text-[15px] lg:text-[17px] font-light leading-[1.9]"
            style={{ color: "#5A5550" }}
          >
            Your Ardori bag is crafted from premium natural leather that will develop 
            character and patina over time. With proper care, it will remain your trusted 
            companion for years. Here's how to maintain its beauty.
          </p>
        </motion.div>
      </section>

      {/* Care Guide Sections - Alternating Layout */}
      <section
        className="pb-16 lg:pb-24 px-6"
        style={{ backgroundColor: "#FAF8F5" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {careSections.map((section, index) => {
            const isImageLeft = index % 2 === 1;
            
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-14 sm:mb-20 lg:mb-28"
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center ${isImageLeft ? '' : ''}`}>
                  {/* Text Content */}
                  <div className={`${isImageLeft ? 'md:order-2' : 'md:order-1'} order-2`}>
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center border"
                        style={{ borderColor: "#D4CFC8" }}
                      >
                        <section.icon
                          size={20}
                          strokeWidth={1.2}
                          style={{ color: "#7A7570" }}
                        />
                      </div>
                      <h2
                        className="font-serif text-[24px] lg:text-[30px] font-normal"
                        style={{ color: "#2C2824" }}
                      >
                        {section.title}
                      </h2>
                    </div>
                    <p
                      className="font-serif text-[14px] lg:text-[16px] font-light mb-6"
                      style={{ color: "#7A7570" }}
                    >
                      {section.intro}
                    </p>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="font-serif text-[14px] lg:text-[15px] font-light flex items-start gap-3"
                          style={{ color: "#5A5550" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: "#C9A86C" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image */}
                  <div className={`${isImageLeft ? 'md:order-1' : 'md:order-2'} order-1`}>
                    <div className="relative overflow-hidden rounded-sm shadow-sm">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px] object-cover"
                        style={{ objectPosition: "center top" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Section 6: Professional Care - 2 Column */}
          <motion.div
            {...fadeInUp}
            className="mb-14 sm:mb-20 lg:mb-28"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
              {/* Text Content - Left */}
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border"
                    style={{ borderColor: "#D4CFC8" }}
                  >
                    <Wrench size={20} strokeWidth={1.2} style={{ color: "#7A7570" }} />
                  </div>
                  <h2
                    className="font-serif text-[24px] lg:text-[30px] font-normal"
                    style={{ color: "#2C2824" }}
                  >
                    Professional Care
                  </h2>
                </div>
                <p
                  className="font-serif text-[15px] lg:text-[17px] font-light leading-[1.9]"
                  style={{ color: "#5A5550" }}
                >
                  For deep cleaning or repairs, contact us at{" "}
                  <a
                    href="mailto:love@ardorilabel.com"
                    className="underline underline-offset-2 transition-opacity hover:opacity-70"
                    style={{ color: "#2C2824" }}
                  >
                    love@ardorilabel.com
                  </a>
                  . Our artisan team can help restore your bag to its original glory.
                </p>
                <p
                  className="font-serif text-[14px] lg:text-[15px] font-light leading-[1.8] mt-4"
                  style={{ color: "#7A7570" }}
                >
                  We offer professional services including deep conditioning, stain removal, 
                  hardware polishing, and structural repairs performed by our skilled craftspeople.
                </p>
              </div>

              {/* Image - Right */}
              <div className="order-1 md:order-2">
                <div className="relative overflow-hidden rounded-sm shadow-sm">
                  <img
                    src={careProfessional}
                    alt="Professional Leather Care"
                    className="w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px] object-cover"
                    style={{ objectPosition: "center top" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 7: Resources & Guides - 2 Column */}
          <motion.div {...fadeInUp} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
              {/* Image - Left */}
              <div className="order-1">
                <div className="relative overflow-hidden rounded-sm shadow-sm">
                  <img
                    src={careResources}
                    alt="Leather Care Resources"
                    className="w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px] object-cover object-bottom"
                  />
                </div>
              </div>

              {/* Text Content - Right */}
              <div className="order-2">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border"
                    style={{ borderColor: "#D4CFC8" }}
                  >
                    <BookOpen size={20} strokeWidth={1.2} style={{ color: "#7A7570" }} />
                  </div>
                  <h2
                    className="font-serif text-[24px] lg:text-[30px] font-normal"
                    style={{ color: "#2C2824" }}
                  >
                    Resources & Guides
                  </h2>
                </div>
                <p
                  className="font-serif text-[14px] lg:text-[16px] font-light mb-6"
                  style={{ color: "#7A7570" }}
                >
                  Explore our curated collection of guides and resources.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      label: "Video Tutorials",
                      links: [
                        { label: "Vegetable-Tanned Leather Care", href: "https://www.youtube.com/watch?v=t7IP9NQSRt4" },
                        { label: "Leather Care Basics", href: "https://www.youtube.com/watch?v=bHxL-VAlSfM" },
                        { label: "Caring for Your Bag", href: "https://youtu.be/mv6okjH7TWs" },
                        { label: "Suede Care (Quick Tips)", href: "https://youtube.com/shorts/3_nNo9bOHME" },
                        { label: "More Suede Care Tips", href: "https://youtube.com/shorts/dK6aIQif2h8" },
                      ],
                    },
                    {
                      label: "Recommended Leather Care Products",
                      links: [
                        { label: "Leather Balm", href: "https://godbolegear.com/products/leather-balm" },
                        { label: "Ultimate Leather Grooming Kit", href: "https://heliosindia.com/products/the-ultimate-leather-grooming-kit" },
                        { label: "Leather Cream", href: "https://hidesign.com/products/100ml-cream-bottle-unisex-white-cream-bottle" },
                        { label: "Nubuck & Suede Shoe Care Kit", href: "https://heliosindia.com/products/nubuck-suede-shoe-care-kit" },
                        { label: "Suede & Leather Shoe Care", href: "https://www.birkenstock.in/products/suedeleather-shoecare-260131-0-0-u" },
                      ],
                    },
                    {
                      label: "Blog Articles on Leather Care",
                      links: [
                        { label: "Leather Goods and the Monsoon", href: "https://godbolegear.com/pages/leather-goods-and-the-monsoon" },
                        { label: "Taking Care of Leather Goods", href: "https://godbolegear.com/pages/taking-care-of-leather-goods" },
                        { label: "How to Care for Suede", href: "https://int.assemblylabel.com/pages/how-to-care-for-suede" },
                      ],
                    },
                  ].map((group) => (
                    <div key={group.label}>
                      <p
                        className="font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase mb-3"
                        style={{ color: "#C9A86C" }}
                      >
                        {group.label}
                      </p>
                      <ul className="space-y-2.5">
                        {group.links.map((link, i) => (
                          <li key={i}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-serif text-[14px] lg:text-[15px] font-light underline underline-offset-4 transition-opacity hover:opacity-70 flex items-center gap-2"
                              style={{ color: "#2C2824" }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: "#C9A86C" }}
                              />
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p
                  className="font-serif text-[12px] lg:text-[13px] font-light italic mt-8 leading-[1.7]"
                  style={{ color: "#9A958F" }}
                >
                  External resources and links are provided for educational purposes.
                  All trademarks, videos, and content belong to their respective owners.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Understanding Natural Leather - Navy Pattern Background */}
      <section
        className="relative py-20 lg:py-28 px-6 overflow-hidden"
        data-dark-section
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${navyPatternBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div {...fadeInUp} className="relative z-10 max-w-[700px] mx-auto text-center">
          {/* Gold Divider */}
          <div 
            className="w-12 h-[1px] mx-auto mb-8"
            style={{ backgroundColor: "#C9A86C" }}
          />
          
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              <Sun size={24} strokeWidth={1.2} style={{ color: "#C9A86C" }} />
            </div>
          </div>
          
          <h2
            className="font-serif text-[24px] lg:text-[32px] font-normal mb-6"
            style={{ color: "#FFFFFF" }}
          >
            Understanding Natural Leather
          </h2>
          
          <p
            className="font-serif text-[15px] lg:text-[17px] font-light leading-[1.9] italic"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            "Your leather bag is made from natural material. Small variations in grain, 
            slight creasing, and patina development are not defects—they're characteristics 
            that make your bag unique. As your bag ages, it develops its own personality, 
            becoming more beautiful with time."
          </p>
          
          {/* Gold Divider */}
          <div 
            className="w-12 h-[1px] mx-auto mt-8"
            style={{ backgroundColor: "#C9A86C" }}
          />
        </motion.div>
      </section>

      {/* Customer Care CTA Section - White Background */}
      <section
        className="py-16 lg:py-20 px-6"
        style={{ backgroundColor: "#FDFCFA" }}
      >
        <motion.div 
          {...fadeInUp} 
          className="max-w-[600px] mx-auto text-center py-10 lg:py-12 px-8 lg:px-12"
          style={{ 
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8E4DF"
          }}
        >
          <p
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "#C9A86C" }}
          >
            ✦ CUSTOMER CARE ✦
          </p>
          
          <p
            className="font-serif text-[20px] lg:text-[24px] font-normal mb-8"
            style={{ color: "#2C2824" }}
          >
            Questions? Contact Our Customer Care Team
          </p>
          
          <Link
            to="/contact"
            className="inline-block font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase px-10 py-4 border transition-all duration-300 hover:opacity-70"
            style={{ 
              color: "#2C2824", 
              borderColor: "#2C2824",
              backgroundColor: "transparent"
            }}
          >
            CONTACT US
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default HandbagCare;
