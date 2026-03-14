import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";
import ardoriLogo from "@/assets/ardori-logo.png";
const PhilosophySection = () => {
  return (
    <section 
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#1A2332" }}
    >
      {/* Background Pattern - exact uploaded image */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url(${philosophyPattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        {/* Top Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          viewport={{ once: true }}
          className="font-sans text-[11px] lg:text-[12px] tracking-[0.35em] uppercase mb-6"
          style={{ color: "#8A9AAE" }}
        >
          THE ARDORI PHILOSOPHY
        </motion.p>
        
        {/* Two-line Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-serif text-[32px] lg:text-[42px] font-normal tracking-[0.08em] leading-[1.3] mb-10"
          style={{ color: "#F5F3F0" }}
        >
          Slow craft. Uncompromising quality.
        </motion.h2>
        
        {/* Monogram Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <img 
            src={ardoriLogo} 
            alt="ARDORI Monogram" 
            className="w-[100px] h-auto lg:w-[120px]"
          />
        </motion.div>
        
        {/* Gold Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full max-w-[500px] h-[1px] mx-auto mb-8"
          style={{ backgroundColor: "#B8975C" }}
        />
        
        {/* Body Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-serif text-[15px] lg:text-[17px] font-light leading-[1.8] mb-10 max-w-[650px] mx-auto"
          style={{ color: "#C5CCD6" }}
        >
          Our leather is made from surplus cow and sheep hide. They are vegetable-tanned using plant-based extracts instead of harsh chemicals, then shaped and finished by skilled artisans. The result is leather that ages beautifully and carries natural character in every grain.
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            to="/our-story"
            className="inline-block px-8 py-3 font-sans text-[12px] tracking-[0.2em] uppercase border transition-all duration-300 hover:brightness-125 hover:contrast-110"
            style={{ 
              color: "#F5F3F0",
              borderColor: "#F5F3F0",
              borderWidth: "1px",
            }}
          >
            Read Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
