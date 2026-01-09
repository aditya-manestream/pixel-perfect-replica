import heroBg from "@/assets/hero-bg.jpg";
import CategorySection from "@/components/CategorySection";
import PhilosophySection from "@/components/PhilosophySection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import CuratedSection from "@/components/CuratedSection";
import ValuesSection from "@/components/ValuesSection";

const Index = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <img 
          src={heroBg}
          alt="ARDORI - Timeless Silhouettes, Enduring Craft"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
    </div>
  );
};

export default Index;
