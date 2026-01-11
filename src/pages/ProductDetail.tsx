import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Heart, Minus, Plus, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import { getProductById, products } from "@/data/products";

const viewLabels = ["FRONT VIEW", "BACK VIEW", "SIDE VIEW", "DETAIL VIEW", "INTERIOR VIEW", "STRAP VIEW", "ANGLE VIEW"];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "1") || products[0];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [openAccordion, setOpenAccordion] = useState<string | null>("story");

  const galleryCount = product.galleryImages;
  const thumbnails = Array.from({ length: galleryCount }, (_, i) => i);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryCount);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryCount) % galleryCount);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZooming) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 lg:pt-24 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] lg:text-[13px] font-sans tracking-[0.02em] mb-8" style={{ color: "#7A7570" }}>
            <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
            <span>/</span>
            <Link to="/shop" className="hover:opacity-70 transition-opacity">{product.category}</Link>
            <span>/</span>
            <span style={{ color: "#2C2824" }}>{product.name}</span>
          </nav>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Gallery */}
            <div className="lg:col-span-7">
              {/* Main Image */}
              <div 
                className="relative aspect-[4/5] overflow-hidden mb-4"
                style={{ backgroundColor: "#EEEBE6" }}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                {/* View Label */}
                <div 
                  className="absolute top-4 left-4 z-10 px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.1em] uppercase"
                  style={{ backgroundColor: "#FFFFFF", color: "#3D3530" }}
                >
                  {viewLabels[currentImageIndex % viewLabels.length]}
                </div>

                {/* Placeholder Image */}
                <div 
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                  style={{
                    transform: isZooming ? `scale(1.5)` : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                >
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                  >
                    <svg 
                      width="32" 
                      height="32" 
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

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                  style={{ backgroundColor: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                >
                  <ChevronLeft size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                  style={{ backgroundColor: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                >
                  <ChevronRight size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                </button>

                {/* Hover to Zoom */}
                <div 
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded font-sans text-[11px] tracking-[0.05em]"
                  style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "#6A655F" }}
                >
                  <Search size={14} strokeWidth={1.5} />
                  Hover to zoom
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {thumbnails.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-20 lg:w-20 lg:h-24 flex items-center justify-center transition-all ${
                      currentImageIndex === index ? "ring-2 ring-offset-1 ring-[#2C2824]" : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: "#EEEBE6" }}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#9A958E" 
                      strokeWidth="1.5"
                      className="opacity-50"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21,15 16,10 5,21" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-5">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {product.isNew && (
                  <span
                    className="px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.1em] uppercase"
                    style={{ backgroundColor: "#2C2824", color: "#FFFFFF" }}
                  >
                    NEW
                  </span>
                )}
                {product.isBestSeller && (
                  <span
                    className="px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.1em] uppercase"
                    style={{ backgroundColor: "#C9A86C", color: "#FFFFFF" }}
                  >
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Category */}
              <p 
                className="font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "#7A7570" }}
              >
                {product.category}
              </p>

              {/* Product Name */}
              <h1 
                className="font-serif font-normal mb-3"
                style={{ color: "#2C2824", fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <p 
                className="font-serif text-[22px] lg:text-[26px] font-normal mb-6"
                style={{ color: "#2C2824" }}
              >
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              {/* Tagline */}
              <p 
                className="font-serif text-[16px] lg:text-[18px] font-light italic leading-relaxed mb-8"
                style={{ color: "#5A5550" }}
              >
                "{product.tagline}"
              </p>

              {/* Colour Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="font-sans text-[11px] lg:text-[12px] tracking-[0.15em] uppercase"
                    style={{ color: "#3D3530" }}
                  >
                    COLOUR
                  </span>
                  <span 
                    className="font-sans text-[13px] tracking-[0.02em]"
                    style={{ color: "#3D3530" }}
                  >
                    {product.colors[selectedColor].name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor === index ? "ring-2 ring-offset-2 ring-[#2C2824]" : ""
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        border: color.hex === "#E8DFC9" || color.hex === "#F5EFE0" ? "1px solid #D4D0CB" : "none"
                      }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <span 
                  className="block font-sans text-[11px] lg:text-[12px] tracking-[0.15em] uppercase mb-3"
                  style={{ color: "#3D3530" }}
                >
                  QUANTITY
                </span>
                <div 
                  className="inline-flex items-center"
                  style={{ border: "1px solid #E8E4DF" }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center transition-colors hover:bg-gray-50"
                    style={{ color: "#3D3530" }}
                  >
                    <Minus size={16} strokeWidth={1.5} />
                  </button>
                  <span 
                    className="w-12 h-12 flex items-center justify-center font-sans text-[15px]"
                    style={{ color: "#2C2824", borderLeft: "1px solid #E8E4DF", borderRight: "1px solid #E8E4DF" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center transition-colors hover:bg-gray-50"
                    style={{ color: "#3D3530" }}
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* CTA Row */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  className="flex-1 h-14 font-sans text-[12px] lg:text-[13px] tracking-[0.15em] uppercase transition-all hover:opacity-90"
                  style={{ backgroundColor: "#2C2824", color: "#FFFFFF" }}
                >
                  ADD TO BAG
                </button>
                <button
                  className="w-14 h-14 flex items-center justify-center transition-colors hover:bg-gray-50"
                  style={{ border: "1px solid #E8E4DF", color: "#3D3530" }}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Shipping Note */}
              <p 
                className="font-sans text-[12px] lg:text-[13px] tracking-[0.02em] pb-8 mb-8"
                style={{ color: "#7A7570", borderBottom: "1px solid #E8E4DF" }}
              >
                ✦ Free shipping across India · Ships within 5–8 business days
              </p>

              {/* Accordion Sections */}
              <div className="space-y-0">
                {/* Story Section */}
                <div style={{ borderBottom: "1px solid #E8E4DF" }}>
                  <button
                    onClick={() => toggleAccordion("story")}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <h3 
                      className="font-serif text-[18px] lg:text-[20px] font-normal"
                      style={{ color: "#2C2824" }}
                    >
                      The Story Behind {product.name}
                    </h3>
                    {openAccordion === "story" ? (
                      <ChevronUp size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                    ) : (
                      <ChevronDown size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                    )}
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === "story" ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                  >
                    <p 
                      className="font-serif text-[14px] lg:text-[15px] font-light leading-relaxed mb-5"
                      style={{ color: "#5A5550" }}
                    >
                      {product.story}
                    </p>
                    <blockquote 
                      className="pl-4 font-serif text-[14px] lg:text-[15px] font-light italic leading-relaxed"
                      style={{ color: "#6A655F", borderLeft: "2px solid #C9A86C" }}
                    >
                      {product.storyQuote}
                    </blockquote>
                  </div>
                </div>

                {/* Specifications */}
                <div style={{ borderBottom: "1px solid #E8E4DF" }}>
                  <button
                    onClick={() => toggleAccordion("specs")}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <h3 
                      className="font-serif text-[18px] lg:text-[20px] font-normal"
                      style={{ color: "#2C2824" }}
                    >
                      Specifications
                    </h3>
                    {openAccordion === "specs" ? (
                      <ChevronUp size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                    ) : (
                      <ChevronDown size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                    )}
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === "specs" ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-2">
                      {product.specifications.map((spec, index) => (
                        <li 
                          key={index}
                          className="font-sans text-[13px] lg:text-[14px] leading-relaxed"
                          style={{ color: "#5A5550" }}
                        >
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Craftsmanship */}
                <div style={{ borderBottom: "1px solid #E8E4DF" }}>
                  <button
                    onClick={() => toggleAccordion("craft")}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <h3 
                      className="font-serif text-[18px] lg:text-[20px] font-normal"
                      style={{ color: "#2C2824" }}
                    >
                      Craftsmanship & Materials
                    </h3>
                    {openAccordion === "craft" ? (
                      <ChevronUp size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                    ) : (
                      <ChevronDown size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                    )}
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === "craft" ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-2">
                      {product.craftsmanship.map((item, index) => (
                        <li 
                          key={index}
                          className="font-sans text-[13px] lg:text-[14px] leading-relaxed"
                          style={{ color: "#5A5550" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Care Instructions */}
                <div style={{ borderBottom: "1px solid #E8E4DF" }}>
                  <button
                    onClick={() => toggleAccordion("care")}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <h3 
                      className="font-serif text-[18px] lg:text-[20px] font-normal"
                      style={{ color: "#2C2824" }}
                    >
                      Care Instructions
                    </h3>
                    {openAccordion === "care" ? (
                      <ChevronUp size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                    ) : (
                      <ChevronDown size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                    )}
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === "care" ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                  >
                    <ul className="space-y-2">
                      {product.careInstructions.map((item, index) => (
                        <li 
                          key={index}
                          className="font-sans text-[13px] lg:text-[14px] leading-relaxed"
                          style={{ color: "#5A5550" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust Badges Section */}
      <TrustBadgesSection />

      <Footer />
    </div>
  );
};

export default ProductDetail;
