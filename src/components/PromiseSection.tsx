import { Leaf, Heart, Users, TreePine, Shield, Box } from "lucide-react";
import navyPatternBg from "@/assets/navy-pattern-bg.jpg";

const promises = [
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
    icon: TreePine,
    title: "Nature-Inspired",
    description: "Flora & fauna designs",
  },
  {
    icon: Shield,
    title: "8-Month Warranty",
    description: "Quality guaranteed",
  },
  {
    icon: Box,
    title: "Small Batch",
    description: "Limited production",
  },
];

const PromiseSection = () => {
  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${navyPatternBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className="font-serif text-[36px] lg:text-[48px] font-normal italic mb-4"
            style={{ color: "#E8E4DF" }}
          >
            The Ardori Promise
          </h2>
          <p
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto"
            style={{ color: "rgba(232, 228, 223, 0.75)" }}
          >
            Every bag we create embodies our commitment to quality, ethics, and
            timeless design
          </p>
        </div>

        {/* Grid - 6 columns on desktop, 3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 lg:gap-x-10 gap-y-12 lg:gap-y-0">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group cursor-default"
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-full border flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-white/50"
                  style={{
                    borderColor: "rgba(232, 228, 223, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.2}
                    style={{ color: "#E8E4DF" }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-serif text-[17px] lg:text-[19px] font-normal mb-2 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: "#E8E4DF", opacity: 0.95 }}
                >
                  {promise.title}
                </h3>

                {/* Description */}
                <p
                  className="font-sans text-[13px] lg:text-[14px] font-light"
                  style={{ color: "rgba(232, 228, 223, 0.7)" }}
                >
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
