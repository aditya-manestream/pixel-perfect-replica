import { Leaf, Heart, Users, Flower2, Shield, Layers, Truck, Clock, RotateCcw, Package } from "lucide-react";
import sectionPattern from "@/assets/section-pattern.jpg";

const promiseItems = [
  {
    icon: Leaf,
    title: "Premium Leather",
    description: "Full-grain, ethically sourced",
  },
  {
    icon: Heart,
    title: "Vegetable Tanning",
    description: "Chemical-free, eco-friendly",
  },
  {
    icon: Users,
    title: "Indian Artisans",
    description: "Handcrafted with care",
  },
  {
    icon: Flower2,
    title: "Nature-Inspired",
    description: "Flora & fauna designs",
  },
  {
    icon: Shield,
    title: "8-Month Warranty",
    description: "Quality guaranteed",
  },
  {
    icon: Layers,
    title: "Small Batch",
    description: "Limited production",
  },
];

const serviceBenefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery across India on all orders",
  },
  {
    icon: Clock,
    title: "5–8 Business Days",
    description: "Carefully packed and shipped with love",
  },
  {
    icon: RotateCcw,
    title: "48–72 Hour Returns",
    description: "Hassle-free return window on unused items",
  },
  {
    icon: Package,
    title: "Secure Packaging",
    description: "Arrives in signature Ardori gift packaging",
  },
];

const TrustBadgesSection = () => {
  return (
    <section 
      className="relative w-full py-16 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#F5F2ED" }}
    >
      {/* Background Pattern Watermark */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url(${sectionPattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top Row: 6 Promise Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-16 lg:mb-20">
          {promiseItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Circle */}
                <div 
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mb-5 transition-opacity duration-300 group-hover:opacity-80"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                >
                  <IconComponent 
                    size={32} 
                    strokeWidth={1.2} 
                    style={{ color: "#3D3530" }}
                  />
                </div>
                {/* Title */}
                <h3 
                  className="font-serif text-[16px] lg:text-[18px] font-normal italic mb-2"
                  style={{ color: "#2C2824" }}
                >
                  {item.title}
                </h3>
                {/* Description */}
                <p 
                  className="font-sans text-[12px] lg:text-[13px] tracking-[0.02em]"
                  style={{ color: "#7A7570" }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Divider Line */}
        <div 
          className="w-full h-px mb-14 lg:mb-16"
          style={{ backgroundColor: "#D8D4CE" }}
        />

        {/* Second Row: 4 Service Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-14 lg:mb-16">
          {serviceBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 group"
              >
                {/* Icon */}
                <div className="flex-shrink-0 pt-1 transition-opacity duration-300 group-hover:opacity-70">
                  <IconComponent 
                    size={22} 
                    strokeWidth={1.3} 
                    style={{ color: "#5A5550" }}
                  />
                </div>
                {/* Text */}
                <div>
                  <h4 
                    className="font-serif text-[15px] lg:text-[16px] font-normal mb-1"
                    style={{ color: "#2C2824" }}
                  >
                    {benefit.title}
                  </h4>
                  <p 
                    className="font-sans text-[12px] lg:text-[13px] leading-relaxed"
                    style={{ color: "#7A7570" }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Policy Links */}
        <div className="flex items-center justify-center gap-8 lg:gap-12">
          <a 
            href="#"
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-70"
            style={{ color: "#5A5550" }}
          >
            SHIPPING POLICY
          </a>
          <a 
            href="#"
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-70"
            style={{ color: "#5A5550" }}
          >
            RETURNS & EXCHANGES
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
