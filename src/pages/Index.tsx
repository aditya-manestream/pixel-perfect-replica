import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/Navbar";
import CategorySection from "@/components/CategorySection";
import PhilosophySection from "@/components/PhilosophySection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import CuratedSection from "@/components/CuratedSection";
import ValuesSection from "@/components/ValuesSection";
import CraftSection from "@/components/CraftSection";
import PromiseSection from "@/components/PromiseSection";
import WatchShopSection from "@/components/WatchShopSection";
import UnboxingSection from "@/components/UnboxingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="w-full">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={heroBg}
          alt="ARDORI - Timeless Silhouettes, Enduring Craft"
          className="absolute inset-0 w-full h-full object-cover" />
        
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          {/* Headline with fluid typography */}
          <h1
            className="font-serif font-normal tracking-wide mb-4 sm:mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#E8E4DF",
              fontSize: "clamp(2rem, 5vw + 1rem, 4.5rem)",
              lineHeight: 1.1,
              maxWidth: "90vw"
            }}>
            Nature, shaped to fit your grip
          </h1>

          {/* Subheadline */}
          <p
            className="font-serif font-light max-w-xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#E8E4DF",
              opacity: 0.85,
              fontSize: "clamp(0.875rem, 1.5vw + 0.5rem, 1.25rem)",
              lineHeight: 1.6,
              marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
              padding: "0 clamp(0.5rem, 2vw, 1rem)"
            }}>
            
            Handcrafted leather handbags inspired by India’s flora and fauna, made in small, intentional batches.

          </p>

          {/* Buttons - responsive: side-by-side on desktop, stacked on mobile */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
            style={{
              padding: "0 clamp(1rem, 4vw, 2rem)"
            }}>
            
            <Link
              to="/shop"
              className="w-full sm:w-auto font-sans text-[11px] sm:text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90 text-center"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: "#1A1A1A",
                backgroundColor: "#E8E4DF",
                padding: "clamp(0.875rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)",
                minWidth: "180px"
              }}>
              
              Shop Collection
            </Link>
            <Link
              to="/our-story"
              className="w-full sm:w-auto font-sans text-[11px] sm:text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/10 text-center"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: "#E8E4DF",
                border: "1px solid rgba(232, 228, 223, 0.5)",
                padding: "clamp(0.875rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)",
                minWidth: "180px"
              }}>
              
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <CategorySection />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* New Arrivals Section */}
      <NewArrivalsSection />

      {/* Curated For You Section */}
      <CuratedSection />

      {/* Our Values Section */}
      <ValuesSection />

      {/* The Craft Section */}
      <CraftSection />

      {/* Watch & Shop Section */}
      <WatchShopSection />

      {/* The Ardori Promise Section */}
      <PromiseSection />

      {/* Unboxing Section */}
      <UnboxingSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Instagram Section */}
      <InstagramSection />

      {/* Footer */}
      <Footer />
    </div>);

};

export default Index;