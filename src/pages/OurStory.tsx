import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Heart, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramSection from "@/components/InstagramSection";
import storyHero from "@/assets/story-hero.jpg";
import storyFounder from "@/assets/founder-eesha.jpg";
import storyCraft from "@/assets/story-craft.jpg";
import storyLeatherTexture from "@/assets/story-leather-texture.jpg";
import navyPatternBg from "@/assets/navy-pattern-bg.jpg";

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20
  },
  whileInView: {
    opacity: 1,
    y: 0
  },
  viewport: {
    once: true
  },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1] as const
  }
};

const values = [{
  icon: Leaf,
  title: "Sustainability",
  description: "Working with nature, not against it. Every material choice is biodegradable and eco-conscious."
}, {
  icon: Heart,
  title: "Craftsmanship",
  description: "Handmade by skilled artisans who've perfected the trade over generations, using techniques passed down for centuries."
}, {
  icon: Scale,
  title: "Ethics",
  description: "We're invested in wages, advocacy, working conditions, and dignified livelihoods in the hands that make our bags."
}];

const OurStory = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={storyHero} alt="Ardori leather craftsmanship" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div 
          className="relative z-10 text-center px-6" 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p 
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-4" 
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            THE ARDORI JOURNEY
          </p>
          <h1 
            className="font-serif text-[42px] md:text-[56px] lg:text-[72px] font-normal mb-6" 
            style={{ color: "#FFFFFF" }}
          >
            Our Story
          </h1>
          <p 
            className="font-serif text-[16px] lg:text-[18px] font-light max-w-[500px] mx-auto" 
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            A celebration of India's natural beauty and artisanal heritage,
            crafted for the modern woman.
          </p>
        </motion.div>
      </section>

      {/* Section 1: Rooted in Nature. Designed for Life. */}
      <section className="py-20 lg:py-28 px-6" style={{ backgroundColor: "#FAF8F5" }}>
        <motion.div {...fadeInUp} className="text-center max-w-[700px] mx-auto">
          <h2 
            className="font-serif text-[28px] md:text-[36px] lg:text-[42px] font-normal mb-8 leading-[1.3]" 
            style={{ color: "#2C2824" }}
          >
            The Land. The Art. The Ardor.
          </h2>
          <p 
            className="font-serif text-[15px] lg:text-[16px] font-light leading-[1.7]" 
            style={{ color: "#7A7570" }}
          >
            India's landscapes are layered — from Himalayan blooms to tropical coasts, from desert flora to monsoon forests.
          </p>
          <p 
            className="font-serif text-[15px] lg:text-[16px] font-light leading-[1.7] mt-2" 
            style={{ color: "#7A7570" }}
          >
            Ardori reinterprets and translates this richness into design. Each silhouette draws subtle cues from the natural world — curves, symmetry, texture, movement.
          </p>
          <p 
            className="font-serif text-[15px] lg:text-[16px] font-light leading-[1.7] mt-2" 
            style={{ color: "#7A7570" }}
          >
            Our collections are released in small, capsule drops — intentional in quantity and deliberate in design.
          </p>
          <p 
            className="font-serif text-[15px] lg:text-[16px] font-light leading-[1.7] mt-2" 
            style={{ color: "#7A7570" }}
          >
            Ardori takes its name from "Ardor" — a fierce devotion to preserving the world around us while celebrating the art of the handmade.
          </p>
        </motion.div>
      </section>

      {/* Section 2: Our Founder (Navy Pattern Background) */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${navyPatternBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 text-center px-6">
          <motion.p 
            {...fadeInUp} 
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-10" 
            style={{ color: "#C9A86C" }}
          >
            A NOTE FROM THE FOUNDER — EESHA
          </motion.p>

          <motion.div 
            {...fadeInUp} 
            transition={{ duration: 0.8, delay: 0.1 }} 
            className="w-[200px] h-[240px] mx-auto mb-10 overflow-hidden" 
            style={{ backgroundColor: "#FAF8F5" }}
          >
            <img src={storyFounder} alt="Founder" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            {...fadeInUp} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="w-16 h-[1px] mx-auto mb-8" 
            style={{ backgroundColor: "#C9A86C" }} 
          />

          <motion.p 
            {...fadeInUp} 
            transition={{ duration: 0.8, delay: 0.3 }} 
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto leading-[1.8]" 
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Ardori was born from my love for India's landscapes and a devotion to thoughtful design.
          </motion.p>
          <motion.p 
            {...fadeInUp} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto leading-[1.8] mt-6" 
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Every bag is made in limited batches, using responsibly sourced leather that is crafted to last. We stand in quiet contrast to fast fashion through considerate creation, lending each Ardori piece an organic yet undeniably sophisticated character.
          </motion.p>
          <motion.p 
            {...fadeInUp} 
            transition={{ duration: 0.8, delay: 0.5 }} 
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto leading-[1.8] mt-6" 
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            This is why our leathers are strictly procured as a mindful byproduct and treated using natural, slow processes that take weeks to perfect. It requires patience, but it is the only way to create pieces that truly respect the environment, support our artisans, and grow more beautiful with the life you live.
          </motion.p>
          <motion.p 
            {...fadeInUp} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto leading-[1.8] mt-6" 
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Ardori is my love letter to India, its craftsmanship and its rich nature. I hope this love translates well enough to you.
          </motion.p>
        </div>
      </section>

      {/* Section 3: Quote Section */}
      <section className="py-20 lg:py-28 px-6" style={{ backgroundColor: "#FAF8F5" }}>
        <motion.div {...fadeInUp} className="text-center max-w-[800px] mx-auto">
          <blockquote 
            className="font-serif text-[22px] md:text-[28px] lg:text-[32px] font-normal italic leading-[1.5] mb-8" 
            style={{ color: "#2C2824" }}
          >
            True luxury bridges the gap between nature's organic beauty and the uncompromising precision of the artisan's hands.
          </blockquote>
          <Link 
            to="/shop" 
            className="inline-block font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase pb-1 border-b transition-all duration-300 hover:opacity-70" 
            style={{ color: "#5A5550", borderColor: "#9A958F" }}
          >
            EXPLORE THE COLLECTION
          </Link>
        </motion.div>
      </section>

      {/* Section 4: Editorial Image + Insight Layout with Navy Backgrounds */}
      <section className="px-6 py-20 lg:py-28" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column */}
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="overflow-hidden">
                <img src={storyCraft} alt="Artisan craftsmanship" className="w-full h-[400px] lg:h-[500px] object-cover" />
              </div>
              {/* Slow Luxury Card - Navy Pattern Background */}
              <div 
                className="relative p-6 lg:p-8 overflow-hidden"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${navyPatternBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="relative z-10">
                  <h3
                    className="font-serif text-[22px] lg:text-[26px] font-semibold mb-2"
                    style={{ color: "#E0B978" }}
                  >
                    Slow Luxury
                  </h3>
                  <p
                    className="font-serif text-[15px] font-normal"
                    style={{ color: "rgba(255,255,255,0.92)" }}
                  >
                    We don't believe in mass production or synthetic elegance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              {...fadeInUp} 
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="space-y-4"
            >
              {/* A Texture Born of Time - Navy Pattern Background */}
              <div 
                className="relative px-4 py-3 text-center overflow-hidden"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${navyPatternBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <p 
                  className="relative z-10 font-sans text-[11px] tracking-[0.2em] uppercase" 
                  style={{ color: "#C9A86C" }}
                >
                  A Texture Born of Time, Expression, and Environment
                </p>
              </div>
              {/* Large leather texture image */}
              <div className="overflow-hidden">
                <img src={storyLeatherTexture} alt="Leather texture" className="w-full h-[500px] lg:h-[600px] object-cover object-bottom" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Sustainability / Craftsmanship / Ethics (Navy Pattern Background) */}
      <section className="relative py-16 lg:py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${navyPatternBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((value, index) => (
              <motion.div 
                key={value.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                className="text-center"
              >
                <div 
                  className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center border" 
                  style={{ borderColor: "rgba(232, 228, 223, 0.3)" }}
                >
                  <value.icon size={24} strokeWidth={1} style={{ color: "#E8E4DF" }} />
                </div>
                <h3 
                  className="font-serif text-[16px] lg:text-[18px] font-normal mb-3" 
                  style={{ color: "#E8E4DF" }}
                >
                  {value.title}
                </h3>
                <p 
                  className="font-serif text-[13px] lg:text-[14px] font-light leading-[1.7]" 
                  style={{ color: "rgba(232, 228, 223, 0.75)" }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <InstagramSection />

      <Footer />
    </div>
  );
};

export default OurStory;