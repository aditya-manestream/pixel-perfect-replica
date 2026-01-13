import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// Product data
const allProducts = [
  {
    id: "1",
    name: "Mor",
    category: "Baguette",
    price: 12500,
    colors: ["#2C2824", "#4A6741", "#E8DFC9"],
    isNew: true,
    isBestSeller: true,
    featured: 1,
  },
  {
    id: "2",
    name: "Kamal",
    category: "Wallet",
    price: 4500,
    colors: ["#E8DFC9", "#4A6741", "#8B4513"],
    isNew: false,
    isBestSeller: true,
    featured: 2,
  },
  {
    id: "3",
    name: "Ashoka",
    category: "Tote",
    price: 18500,
    colors: ["#E8DFC9", "#1E3A5F", "#C4785A"],
    isNew: false,
    isBestSeller: true,
    featured: 3,
  },
  {
    id: "4",
    name: "Parijat",
    category: "Minibag",
    price: 8500,
    colors: ["#F5EFE0", "#2C2824", "#C9A86C"],
    isNew: true,
    isBestSeller: false,
    featured: 4,
  },
  {
    id: "5",
    name: "Nilgiri",
    category: "Crossbody",
    price: 9500,
    colors: ["#4A6741", "#E8DFC9", "#5C4033"],
    isNew: true,
    isBestSeller: false,
    featured: 5,
  },
  {
    id: "6",
    name: "Shalimar",
    category: "Bucket",
    price: 11500,
    colors: ["#C4785A", "#1E3A5F", "#F5EFE0"],
    isNew: true,
    isBestSeller: false,
    featured: 6,
  },
  {
    id: "7",
    name: "Champak",
    category: "Clutch",
    price: 6500,
    colors: ["#F5EFE0", "#C9A86C", "#2C2824"],
    isNew: false,
    isBestSeller: false,
    featured: 7,
  },
  {
    id: "8",
    name: "Koel",
    category: "Satchel",
    price: 14500,
    colors: ["#2C2824", "#C9A86C", "#4A6741"],
    isNew: false,
    isBestSeller: false,
    featured: 8,
  },
];

const categories = ["All", "Baguette", "Wallet", "Tote", "Minibag", "Crossbody", "Clutch"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹15,000", min: 10000, max: 15000 },
  { label: "Above ₹15,000", min: 15000, max: Infinity },
];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const ProductListing = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(0);
  const [newArrivalsFilter, setNewArrivalsFilter] = useState(false);
  const [bestSellersFilter, setBestSellersFilter] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  
  // Dropdown states
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Price filter
    const range = priceRanges[priceFilter];
    result = result.filter((p) => p.price >= range.min && p.price < range.max);

    // New arrivals filter
    if (newArrivalsFilter) {
      result = result.filter((p) => p.isNew);
    }

    // Best sellers filter
    if (bestSellersFilter) {
      result = result.filter((p) => p.isBestSeller);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => a.featured - b.featured);
        break;
    }

    return result;
  }, [categoryFilter, priceFilter, newArrivalsFilter, bestSellersFilter, sortBy]);

  const closeAllDropdowns = () => {
    setCategoryOpen(false);
    setPriceOpen(false);
    setSortOpen(false);
  };

  return (
    <section 
      className="w-full py-8 lg:py-12"
      style={{ backgroundColor: "#FDFCFA" }}
      onClick={closeAllDropdowns}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: "#E8E4DF" }}>
          {/* Left side - Filters */}
          <div className="flex flex-wrap items-center gap-3 lg:gap-6">
            {/* Category Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setCategoryOpen(!categoryOpen);
                  setPriceOpen(false);
                  setSortOpen(false);
                }}
                className="flex items-center gap-2 font-sans text-[12px] lg:text-[13px] tracking-[0.08em] transition-opacity hover:opacity-70"
                style={{ color: "#3D3530" }}
              >
                Category
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
              </button>
              {categoryOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 py-2 min-w-[160px] rounded shadow-lg z-50"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E4DF" }}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat);
                        setCategoryOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-sans text-[12px] tracking-[0.05em] transition-colors hover:bg-gray-50 ${
                        categoryFilter === cat ? "font-medium" : ""
                      }`}
                      style={{ color: categoryFilter === cat ? "#2C2824" : "#6A655F" }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setPriceOpen(!priceOpen);
                  setCategoryOpen(false);
                  setSortOpen(false);
                }}
                className="flex items-center gap-2 font-sans text-[12px] lg:text-[13px] tracking-[0.08em] transition-opacity hover:opacity-70"
                style={{ color: "#3D3530" }}
              >
                Price
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${priceOpen ? "rotate-180" : ""}`} />
              </button>
              {priceOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 py-2 min-w-[180px] rounded shadow-lg z-50"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E4DF" }}
                >
                  {priceRanges.map((range, index) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        setPriceFilter(index);
                        setPriceOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-sans text-[12px] tracking-[0.05em] transition-colors hover:bg-gray-50 ${
                        priceFilter === index ? "font-medium" : ""
                      }`}
                      style={{ color: priceFilter === index ? "#2C2824" : "#6A655F" }}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNewArrivalsFilter(!newArrivalsFilter)}
                className={`px-4 py-2 font-sans text-[11px] lg:text-[12px] tracking-[0.1em] uppercase transition-all duration-200 rounded-sm ${
                  newArrivalsFilter ? "shadow-sm" : ""
                }`}
                style={{
                  backgroundColor: newArrivalsFilter ? "#2C2824" : "transparent",
                  color: newArrivalsFilter ? "#FFFFFF" : "#3D3530",
                  border: "1px solid #D4D0CB",
                }}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setBestSellersFilter(!bestSellersFilter)}
                className={`px-4 py-2 font-sans text-[11px] lg:text-[12px] tracking-[0.1em] uppercase transition-all duration-200 rounded-sm ${
                  bestSellersFilter ? "shadow-sm" : ""
                }`}
                style={{
                  backgroundColor: bestSellersFilter ? "#2C2824" : "transparent",
                  color: bestSellersFilter ? "#FFFFFF" : "#3D3530",
                  border: "1px solid #D4D0CB",
                }}
              >
                Best Sellers
              </button>
            </div>
          </div>

          {/* Right side - Sort */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setSortOpen(!sortOpen);
                setCategoryOpen(false);
                setPriceOpen(false);
              }}
              className="flex items-center gap-2 font-sans text-[12px] lg:text-[13px] tracking-[0.08em] transition-opacity hover:opacity-70"
              style={{ color: "#3D3530" }}
            >
              Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
              <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div 
                className="absolute top-full right-0 mt-2 py-2 min-w-[180px] rounded shadow-lg z-50"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E4DF" }}
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 font-sans text-[12px] tracking-[0.05em] transition-colors hover:bg-gray-50 ${
                      sortBy === option.value ? "font-medium" : ""
                    }`}
                    style={{ color: sortBy === option.value ? "#2C2824" : "#6A655F" }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Count */}
        <p 
          className="pt-6 pb-8 font-sans text-[13px] tracking-[0.02em]"
          style={{ color: "#7A7570" }}
        >
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group block"
            >
              {/* Product Card */}
              <div className="relative aspect-square overflow-hidden rounded-sm mb-4 transition-shadow duration-300 group-hover:shadow-xl"
                style={{ backgroundColor: "#EEEBE6" }}
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                  {product.isNew && (
                    <span
                      className="px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.08em] uppercase"
                      style={{
                        backgroundColor: "#2C2824",
                        color: "#FFFFFF",
                      }}
                    >
                      NEW
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span
                      className="px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.08em] uppercase"
                      style={{
                        backgroundColor: "#C9A86C",
                        color: "#FFFFFF",
                      }}
                    >
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Placeholder Image Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#9A958E" 
                      strokeWidth="1.5"
                      className="opacity-60"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21,15 16,10 5,21" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 
                    className="font-serif text-[16px] lg:text-[18px] font-normal"
                    style={{ color: "#2C2824" }}
                  >
                    {product.name}
                  </h3>
                  <p 
                    className="font-sans text-[12px] tracking-[0.02em]"
                    style={{ color: "#9A958E" }}
                  >
                    {product.category}
                  </p>
                </div>
                <p 
                  className="font-sans text-[14px] lg:text-[15px] font-medium"
                  style={{ color: "#2C2824" }}
                >
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Color Swatches */}
              <div className="flex items-center gap-2 mt-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: color,
                      border: color === "#E8DFC9" || color === "#F5EFE0" ? "1px solid #D4D0CB" : "none"
                    }}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p 
              className="font-serif text-[18px] mb-2"
              style={{ color: "#6A655F" }}
            >
              No products found
            </p>
            <p 
              className="font-sans text-[13px]"
              style={{ color: "#9A958E" }}
            >
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListing;
