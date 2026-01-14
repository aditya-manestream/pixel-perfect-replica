import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Heart, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramSection from "@/components/InstagramSection";
import storyHero from "@/assets/story-hero.jpg";
import storyFounder from "@/assets/story-founder.jpg";
import storyCraft from "@/assets/story-craft.jpg";
import storyLeatherTexture from "@/assets/story-leather-texture.jpg";
import philosophyPattern from "@/assets/philosophy-pattern.jpg";
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
  return <div className="min-h-screen" style={{
    backgroundColor: "#FAF8F5"
  }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={storyHero} alt="Ardori leather craftsmanship" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div className="relative z-10 text-center px-6" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        delay: 0.2
      }}>
          <p className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-4" style={{
          color: "rgba(255,255,255,0.8)"
        }}>
            THE ARDORI JOURNEY
          </p>
          <h1 className="font-serif text-[42px] md:text-[56px] lg:text-[72px] font-normal mb-6" style={{
          color: "#FFFFFF"
        }}>
            Our Story
          </h1>
          <p className="font-serif text-[16px] lg:text-[18px] font-light max-w-[500px] mx-auto" style={{
          color: "rgba(255,255,255,0.85)"
        }}>
            A celebration of India's natural beauty and artisanal heritage,
            crafted for the modern woman.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Banner Section (Navy) */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0" style={{
        backgroundColor: "#2C2824"
      }} />
        <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "url(\"/lovable-uploads/bc05a32b-800c-41b5-9ed1-2b89439de8de.jpg\")",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />
        <div className="relative z-10 text-center px-6">
          <motion.p {...fadeInUp} className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-10" style={{
          color: "#C9A86C"
        }}>
            THE FOUNDER
          </motion.p>

          <motion.div {...fadeInUp} transition={{
          duration: 0.8,
          delay: 0.1
        }} className="w-[200px] h-[240px] mx-auto mb-10 overflow-hidden" style={{
          backgroundColor: "#FAF8F5"
        }}>
            <img src={storyFounder} alt="Founder" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div {...fadeInUp} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="w-16 h-[1px] mx-auto mb-8" style={{
          backgroundColor: "#C9A86C"
        }} />

          <motion.p {...fadeInUp} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto leading-[1.8]" style={{
          color: "rgba(255,255,255,0.8)"
        }}>
            We believe true luxury lies in the harmony between nature and
            craftsmanship. Each Ardori piece is a celebration of slow fashion,
            ethically made using ancient vegetable-tanning techniques that
            honor the environment and the hands that create them.
          </motion.p>
        </div>
      </section>

      {/* Editorial Text Section */}
      <section className="py-20 lg:py-28 px-6" style={{
      backgroundColor: "#FAF8F5"
    }}>
        <motion.div {...fadeInUp} className="text-center max-w-[700px] mx-auto">
          <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] font-normal mb-8 leading-[1.3]" style={{
          color: "#2C2824"
        }}>
            Rooted in Nature.
            <br />
            Designed for Life.
          </h2>
          <p className="font-serif text-[15px] lg:text-[16px] font-light leading-[1.9]" style={{
          color: "#7A7570"
        }}>
            Ardori was born from a desire to bridge the gap between timeless luxury and ethical
            responsibility. Our name, inspired by the concept of "Ardor"—a fierce devotion,
            reflects our commitment to preserving nature and celebrating craftsmanship.
            We draw our inspiration from India's diverse flora and fauna — from the gentle lotus
            of tranquil ponds to the exotic peacock of Indian hills. These natural elements
            influence our textures, colors, and structure, resulting in bags that feel organic yet
            sophisticated.
          </p>
        </motion.div>
      </section>

      {/* Editorial Image + Insight Layout */}
      <section className="px-6 pb-20 lg:pb-28" style={{
      backgroundColor: "#FAF8F5"
    }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column */}
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="overflow-hidden">
                <img src={storyCraft} alt="Artisan craftsmanship" className="w-full h-[400px] lg:h-[500px] object-cover" />
              </div>
              {/* Small Quote Card */}
              <div className="p-6 lg:p-8 bg-primary" style={{
              backgroundColor: "#F5F2ED"
            }}>
                <h3 className="font-serif text-[18px] lg:text-[20px] font-normal mb-2 text-primary-foreground" style={{
                color: "#2C2824"
              }}>
                  Slow Luxury
                </h3>
                <p className="font-serif text-[14px] font-light text-primary-foreground" style={{
                color: "#7A7570"
              }}>
                  We don't believe in mass production or synthetic elegance.
                </p>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div {...fadeInUp} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="space-y-4">
              {/* Small highlight strip */}
              <div className="px-4 py-3 text-center bg-primary text-white" style={{
              backgroundColor: "#F5F2ED"
            }}>
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-primary-foreground" style={{
                color: "#7A7570"
              }}>
                  A Texture Born of Time, Expression, and Environment
                </p>
              </div>
              {/* Large leather texture image */}
              <div className="overflow-hidden">
                <img src={storyLeatherTexture} alt="Leather texture" className="w-full h-[500px] lg:h-[600px] object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 Icon Values Row */}
      <section className="py-16 lg:py-20 px-6" style={{
      backgroundColor: "#FAF8F5"
    }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {values.map((value, index) => <motion.div key={value.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center border" style={{
              borderColor: "#D4CFC8"
            }}>
                  <value.icon size={24} strokeWidth={1} style={{
                color: "#7A7570"
              }} />
                </div>
                <h3 className="font-serif text-[16px] lg:text-[18px] font-normal mb-3" style={{
              color: "#2C2824"
            }}>
                  {value.title}
                </h3>
                <p className="font-serif text-[13px] lg:text-[14px] font-light leading-[1.7]" style={{
              color: "#7A7570"
            }}>
                  {value.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Signature Quote Section */}
      <section className="py-20 lg:py-28 px-6 bg-primary" style={{
      backgroundColor: "#FAF8F5"
    }}>
        <motion.div {...fadeInUp} className="text-center max-w-[800px] mx-auto">
          <blockquote className="font-serif text-[22px] md:text-[28px] lg:text-[32px] font-normal italic leading-[1.5] mb-8 text-[#b18d59]" style={{
          color: "#2C2824"
        }}>
            "We believe that true luxury is a reflection of
            the time, care, and hands that created it."
          </blockquote>
          <Link to="/shop" className="inline-block font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase pb-1 border-b transition-all duration-300 hover:opacity-70 text-[#b18d59]" style={{
          color: "#5A5550",
          borderColor: "#9A958F"
        }}>
            EXPLORE THE COLLECTION
          </Link>
        </motion.div>
      </section>

      {/* Instagram Section - Reused */}
      <InstagramSection />

      <Footer />
    </div>;
};
export default OurStory;