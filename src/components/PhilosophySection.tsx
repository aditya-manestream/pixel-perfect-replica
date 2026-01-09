import { motion } from "framer-motion";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";

const PhilosophySection = () => {
  return (
    <section 
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#1A2332" }}
    >
      {/* Background Pattern - exact uploaded image */}
      <div 
        className="absolute inset-0"
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
          <span className="block" style={{ fontVariant: "small-caps" }}>Rooted in nature.</span>
          <span className="block" style={{ fontVariant: "small-caps" }}>Crafted for life.</span>
        </motion.h2>
        
        {/* Monogram Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-2"
        >
          <svg 
            width="100" 
            height="140" 
            viewBox="0 0 100 140" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="lg:w-[120px] lg:h-[165px]"
          >
            {/* Letter A - elegant thin strokes */}
            <path 
              d="M50 8 L15 132" 
              stroke="#F5F3F0" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M50 8 L85 132" 
              stroke="#F5F3F0" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            {/* Crossbar with curve */}
            <path 
              d="M28 85 Q50 75 72 85" 
              stroke="#F5F3F0" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            {/* Decorative 4-point star */}
            <path 
              d="M50 88 L46 98 L50 108 L54 98 Z" 
              fill="#F5F3F0"
            />
            <path 
              d="M44 98 L50 94 L56 98 L50 102 Z" 
              fill="#F5F3F0"
            />
          </svg>
        </motion.div>
        
        {/* Brand Name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="font-display text-[36px] lg:text-[48px] tracking-[0.12em] mb-6"
          style={{ color: "#F5F3F0" }}
        >
          ARDORI
        </motion.p>
        
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
          We believe true luxury lies in the harmony between nature and
          craftsmanship. Each Ardori piece is a celebration of slow fashion,
          ethically made using ancient vegetable-tanning techniques that
          honor the environment and the hands that create them.
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="#"
            className="inline-block px-8 py-3 font-sans text-[12px] tracking-[0.2em] uppercase border transition-all duration-300 hover:brightness-125 hover:contrast-110"
            style={{ 
              color: "#F5F3F0",
              borderColor: "#F5F3F0",
              borderWidth: "1px",
            }}
          >
            Read Our Story
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
