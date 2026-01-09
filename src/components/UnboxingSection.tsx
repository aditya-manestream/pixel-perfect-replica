import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import unboxingImage from "@/assets/unboxing-packaging.jpg";

const UnboxingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 lg:py-28"
      style={{ backgroundColor: "#F5F2ED" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <p
              className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-6"
              style={{ color: "#7A7570" }}
            >
              THE ART OF GIVING
            </p>

            {/* Heading */}
            <h2
              className="font-serif text-[36px] lg:text-[44px] font-normal leading-[1.2] mb-6"
              style={{ color: "#2C2824" }}
            >
              An Unboxing
              <br />
              <span className="italic">to Remember</span>
            </h2>

            {/* Paragraph */}
            <p
              className="font-serif text-[15px] lg:text-[17px] font-light leading-[1.7] mb-10 max-w-[480px]"
              style={{ color: "#6A655F" }}
            >
              Each Ardori piece arrives in our signature packaging — a ceremony
              of tissue, ribbon, and care. Because receiving a handcrafted piece
              should feel as special as giving one.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Primary Button */}
              <a
                href="#"
                className="inline-flex items-center gap-2 font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 hover:brightness-110"
                style={{
                  backgroundColor: "#2C2824",
                  color: "#FFFFFF",
                }}
              >
                EXPLORE GIFT GUIDE
                <ArrowRight size={14} strokeWidth={1.5} />
              </a>

              {/* Secondary Button */}
              <a
                href="#"
                className="inline-flex items-center gap-2 font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase px-8 py-4 border transition-all duration-300 hover:border-[#3A3530] hover:text-[#2C2824]"
                style={{
                  borderColor: "#9A958F",
                  color: "#5A5550",
                  backgroundColor: "transparent",
                }}
              >
                PERSONALIZE YOURS
              </a>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="group cursor-pointer overflow-hidden rounded-sm">
              <img
                src={unboxingImage}
                alt="Ardori signature packaging"
                className="w-full h-auto object-cover transition-all duration-500 group-hover:brightness-105"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UnboxingSection;
