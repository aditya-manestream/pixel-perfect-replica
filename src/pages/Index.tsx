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
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div className="w-full">
      {/* Sticky Navbar */}
      <Seo
        title={"Ardori — Handcrafted Leather Handbags Inspired by Nature"}
        description={"Vegetable-tanned leather handbags handcrafted in India, shaped by the country's flora and fauna. Timeless silhouettes, slow luxury, enduring craft."}
        path="/"
      />
      <Navbar />

      {/* Hero Section */}
      {/* The hero photo is 3:2 landscape. A full-height hero on a portrait phone
          shows only ~31% of its width — an extreme crop into the model's face.
          Shortening the hero on small screens widens the visible slice, and the
          crop origin is tuned per breakpoint to keep the bag in frame. */}
      <div className="relative w-full h-[78vh] sm:h-[85vh] lg:h-screen min-h-[520px] overflow-hidden">
        <img
          src={heroBg}
          alt="ARDORI - Timeless Silhouettes, Enduring Craft"
          decoding="async"
          fetchPriority="high"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover object-[64%_58%] sm:object-[70%_56%] lg:object-[75%_55%]" />

        {/* Scrim so the headline stays readable regardless of what's behind it */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,14,20,0.45) 0%, rgba(10,14,20,0.30) 35%, rgba(10,14,20,0.45) 65%, rgba(10,14,20,0.55) 100%)",
          }}
        />

        {/* Hero Content Overlay - left aligned on desktop, centered on mobile */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center lg:items-start lg:text-left px-4 sm:px-6 lg:pl-[8vw] lg:pr-8">
          <div className="w-full max-w-[560px]">
            {/* Headline with fluid typography */}
            <h1
              className="font-serif font-normal tracking-wide mb-4 sm:mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#E8E4DF",
                fontSize: "clamp(2rem, 4vw + 1rem, 4rem)",
                lineHeight: 1.1,
              }}>
              Nature, shaped to fit your grip
            </h1>

            {/* Subheadline */}
            <p
              className="font-serif font-light"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#E8E4DF",
                opacity: 0.85,
                fontSize: "clamp(0.875rem, 1.2vw + 0.5rem, 1.25rem)",
                lineHeight: 1.6,
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
              }}>
              Handcrafted leather handbags inspired by India's flora and fauna, made in small, intentional batches.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4">
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