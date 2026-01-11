import { Leaf, Heart, Users, TreePine, Shield, Box } from "lucide-react";
import promisePattern from "@/assets/promise-pattern.jpg";

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
    <section
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#F5F2ED" }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url(${promisePattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className="font-serif text-[36px] lg:text-[48px] font-normal italic mb-4"
            style={{ color: "#2C2824" }}
          >
            The Ardori Promise
          </h2>
          <p
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto"
            style={{ color: "#7A7570" }}
          >
            Every bag we create embodies our commitment to quality, ethics, and
            timeless design
          </p>
        </div>

        {/* Grid - 2 rows × 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-16 lg:gap-y-20">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group cursor-default"
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-full border flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-[#7A7570]"
                  style={{
                    borderColor: "#D0CBC5",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.2}
                    style={{ color: "#5A5550" }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-serif text-[17px] lg:text-[19px] font-normal mb-2 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: "#3A3530", opacity: 0.9 }}
                >
                  {promise.title}
                </h3>

                {/* Description */}
                <p
                  className="font-sans text-[13px] lg:text-[14px] font-light"
                  style={{ color: "#8A857F" }}
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
