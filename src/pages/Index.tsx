import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img 
        src={heroBg}
        alt="ARDORI - Timeless Silhouettes, Enduring Craft"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default Index;
