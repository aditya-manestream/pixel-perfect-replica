import { useState } from "react";
import categoryMining from "@/assets/category-mining.jpg";
import categoryBaguette from "@/assets/category-baguette.jpg";
import categoryTote from "@/assets/category-tote.jpg";
import categoryCrossbody from "@/assets/category-crossbody.jpg";
import categoryPurse from "@/assets/category-purse.jpg";

const categories = [
  { id: "mining", label: "MINIBAG" },
  { id: "baguette", label: "BAGUETTE" },
  { id: "tote", label: "TOTE" },
  { id: "crossbody", label: "CROSSBODY" },
  { id: "purse", label: "PURSE / WALLET (UNISEX)" },
];

const categoryImages: Record<string, string> = {
  mining: categoryMining,
  baguette: categoryBaguette,
  tote: categoryTote,
  crossbody: categoryCrossbody,
  purse: categoryPurse,
};

// Each source photo frames the bag differently (most are shot with a lot of
// empty space above), so the crop has to be tuned per image or the bag gets
// cut off by the 4:3 container.
const categoryImagePosition: Record<string, string> = {
  mining: "center 80%",
  baguette: "center 60%",
  tote: "center 20%",
  crossbody: "center 80%",
  purse: "center 40%",
};

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("mining");

  return (
    <section 
      className="w-full py-20 lg:py-28"
      style={{ backgroundColor: "#F7F5F2" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Text */}
          <div className="pt-2 lg:pt-6">
            {/* Heading */}
            <h2 
              className="font-serif text-[26px] lg:text-[30px] font-normal italic leading-tight"
              style={{ color: "#3D3530" }}
            >
              The Collection
            </h2>
            <p 
              className="font-serif text-[15px] lg:text-[17px] font-light italic mt-1 mb-10 lg:mb-14"
              style={{ color: "#A8A096" }}
            >
              Curated to move with you
            </p>

            {/* Category List */}
            <nav className="flex flex-col gap-5 lg:gap-7">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  className="text-left transition-all duration-300 ease-out"
                  style={{ 
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: category.id === "purse" ? "18px" : "20px",
                    fontWeight: category.id === activeCategory ? 600 : 400,
                    color: category.id === activeCategory ? "#2C2824" : "#B5AFA6",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            {categories.map((category) => (
              <img
                key={category.id}
                src={categoryImages[category.id]}
                alt={category.label}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: category.id === activeCategory ? 1 : 0,
                  objectPosition: categoryImagePosition[category.id],
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
