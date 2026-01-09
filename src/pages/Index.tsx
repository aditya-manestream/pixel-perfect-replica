import heroBg from "@/assets/hero-bg.jpg";
import CategorySection from "@/components/CategorySection";

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
    </div>
  );
};

export default Index;
