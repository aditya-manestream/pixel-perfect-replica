import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";
import Seo from "@/components/Seo";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Journal = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
      <Seo
        title={"Journal — Notes on Craft & Leather | Ardori"}
        description={"Stories from the Ardori atelier: vegetable tanning, design inspiration from India's flora and fauna, and the making of each handbag."}
        path="/journal"
      />
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
            ✦ STORIES & INSPIRATIONS ✦
          </p>
          <h1 className="font-serif font-normal tracking-[0.02em] leading-[1.1] mb-4" style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            The Ardori Journal
          </h1>
          <p className="font-serif text-[14px] lg:text-[16px] font-light max-w-[500px] mx-auto" style={{ color: "rgba(255, 255, 255, 0.65)" }}>
            Stories of craft, heritage, and the artisans behind each piece.
          </p>
        </motion.div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[600px] mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{ backgroundColor: "#F8F6F3" }}
            >
              <span className="font-serif text-[32px]" style={{ color: "#C9A86C" }}>✦</span>
            </div>
            
            <h2 className="font-serif text-[28px] lg:text-[36px] font-normal mb-6" style={{ color: "#2C2824" }}>
              Coming Soon
            </h2>
            
            <p className="font-serif text-[16px] lg:text-[18px] font-light leading-relaxed mb-8" style={{ color: "#6A655F" }}>
              We're crafting stories about our artisans, the heritage behind our designs, 
              and the inspiration drawn from India's natural beauty.
            </p>
            
            <p className="font-serif text-[14px] lg:text-[15px] font-light italic" style={{ color: "#9A958F" }}>
              Subscribe to our newsletter to be the first to know when we launch.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Journal;
