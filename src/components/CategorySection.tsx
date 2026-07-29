import { useState } from "react";
import categoryMining from "@/assets/category-mining.jpg";
import categoryBaguette from "@/assets/category-baguette.jpg";
import categoryTote from "@/assets/category-tote.jpg";
import categoryCrossbody from "@/assets/category-crossbody.jpg";
import categoryPurse from "@/assets/category-purse.jpg";
import categoryWallet from "@/assets/values-product-3.jpg";

// The label is the category; the products that sit in it are shown as a
// sub-line so customers can connect a category to the pieces they've seen.
const categories = [
  { id: "minibag", label: "MINIBAG", products: "Kumi (Big & Small)" },
  { id: "clutches", label: "CLUTCHES", products: "Purnima (Big & Small)" },
  { id: "purse", label: "PURSE", products: "Kaya" },
  { id: "crossbody", label: "CROSSBODY", products: "Kalika" },
  { id: "wallet", label: "WALLET", products: "Parna" },
  { id: "tote", label: "TOTE", products: "Mandala" },
];

const categoryImages: Record<string, string> = {
  minibag: categoryMining,
  clutches: categoryBaguette,
  purse: categoryPurse,
  crossbody: categoryCrossbody,
  wallet: categoryWallet,
  tote: categoryTote,
};

// Each source photo frames the bag differently (most are shot with a lot of
// empty space above), so the crop has to be tuned per image or the bag gets
// cut off by the 4:3 container.
const categoryImagePosition: Record<string, string> = {
  minibag: "center 80%",
  clutches: "center 60%",
  purse: "center 40%",
  crossbody: "center 80%",
  wallet: "center 40%",
  tote: "center 20%",
};

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("minibag");

  return (
    <section 
      className="w-full py-20 lg:py-28"
      style={{ backgroundColor: "#F7F5F2" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
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
                  // Touch devices never fire mouseenter, so tapping has to switch
                  // the category too or the list is inert on phones/tablets.
                  onClick={() => setActiveCategory(category.id)}
                  onFocus={() => setActiveCategory(category.id)}
                  className="text-left transition-all duration-300 ease-out"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: category.id === activeCategory ? 600 : 400,
                    color: category.id === activeCategory ? "#2C2824" : "#B5AFA6",
                    letterSpacing: "0.06em",
                  }}
                >
                  <span
                    className="block text-[17px] sm:text-[18px] lg:text-[20px] uppercase"
                  >
                    {category.label}
                  </span>
                  <span
                    className="block font-serif italic normal-case text-[12px] lg:text-[13px] mt-0.5"
                    style={{
                      letterSpacing: "0.02em",
                      color: category.id === activeCategory ? "#8A8279" : "#C4BEB5",
                    }}
                  >
                    {category.products}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column - Image (matches text column height) */}
          <div className="relative w-full h-full min-h-[380px] lg:min-h-0 aspect-[4/3] lg:aspect-auto">
            {categories.map((category) => (
              <img
                key={category.id}
                src={categoryImages[category.id]}
                alt={`${category.label} leather handbags by Ardori`}
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
