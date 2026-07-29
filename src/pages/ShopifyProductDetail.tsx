import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Heart, Minus, Plus, Search, ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductFAQ from "@/components/product/ProductFAQ";
import ProductReviewsCompact from "@/components/product/ProductReviewsCompact";
import RelatedProductsCarousel from "@/components/product/RelatedProductsCarousel";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { formatPrice, isNewProduct, isBestSeller, shopifyImage, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import navyPatternBg from "@/assets/navy-pattern-bg.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ShopifyProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { product, loading, error } = useShopifyProduct(handle);
  const { products: relatedProducts } = useShopifyProducts();
  const { addItem } = useCartStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [openAccordion, setOpenAccordion] = useState<string | null>("specs");

  // Product shots are 2:3 while the frame is wider, so showing the whole photo
  // leaves space at its sides. Filling that space with a flat neutral reads as
  // a pale border against the photos' pink/cream backdrops. The shots are also
  // vignetted — their edge runs dark at the top and lighter lower down — so a
  // single colour still seams. We therefore sample the photo's own left edge at
  // several heights and rebuild it as a vertical gradient, which meets the
  // image edge-to-edge with no visible join.
  const NEUTRAL_BACKDROP = "#EEEBE6";
  const [backdrop, setBackdrop] = useState(NEUTRAL_BACKDROP);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    try {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (!w || !h) return;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const stops = [0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = Math.min(h - 1, Math.max(0, Math.round(t * (h - 1))));
        const [r, g, b] = ctx.getImageData(1, y, 1, 1).data;
        return `rgb(${r}, ${g}, ${b}) ${Math.round(t * 100)}%`;
      });
      setBackdrop(`linear-gradient(180deg, ${stops.join(", ")})`);
    } catch {
      // Canvas is tainted (image served without CORS) — fall back to neutral.
      setBackdrop(NEUTRAL_BACKDROP);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
        <Navbar forceScrolled />
        <main className="pt-20 lg:pt-24 pb-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="w-full h-[58vh] sm:h-[62vh] lg:h-[calc(100vh-190px)] lg:max-h-[760px] lg:min-h-[460px] animate-pulse" style={{ backgroundColor: "#EEEBE6" }} />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="h-6 w-1/4 animate-pulse" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-10 w-3/4 animate-pulse" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-8 w-1/3 animate-pulse" style={{ backgroundColor: "#EEEBE6" }} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    // Handles change when products are renamed in Shopify, which turns older
    // links — including ones already live in ads — into dead ends. Offer the
    // closest current matches instead of stopping the visitor cold.
    const slugWords = (handle || "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2);
    const suggestions = relatedProducts
      .map((p) => {
        const hay = `${p.node.handle} ${p.node.title}`.toLowerCase();
        return { p, score: slugWords.filter((w) => hay.includes(w)).length };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => s.p);

    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
        <Navbar forceScrolled />
        <main className="pt-24 lg:pt-32 pb-16">
          <div className="max-w-[600px] mx-auto px-6 text-center">
            <h1 className="font-serif text-[28px] font-normal mb-4" style={{ color: "#2C2824" }}>
              This piece has moved
            </h1>
            <p className="font-serif text-[15px] font-light mb-8" style={{ color: "#6A655F" }}>
              {suggestions.length > 0
                ? "That link is out of date. You may be looking for one of these:"
                : "We couldn't find that piece — it may have been renamed or retired."}
            </p>

            {suggestions.length > 0 && (
              <div className="flex flex-col gap-3 mb-8">
                {suggestions.map((s) => (
                  <Link
                    key={s.node.id}
                    to={`/product/${s.node.handle}`}
                    className="flex items-center gap-4 p-3 text-left transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#F8F6F3", border: "1px solid #E8E4DF" }}
                  >
                    {s.node.images.edges[0]?.node?.url && (
                      <img
                        src={shopifyImage(s.node.images.edges[0].node.url, 160)}
                        alt={s.node.title}
                        className="w-14 h-16 object-cover flex-shrink-0"
                        loading="lazy"
                      />
                    )}
                    <span className="font-serif text-[16px]" style={{ color: "#2C2824" }}>
                      {s.node.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/shop"
              className="inline-block font-sans text-[11px] tracking-[0.2em] uppercase"
              style={{ backgroundColor: "#2C2824", color: "#FFFFFF", padding: "14px 32px" }}
            >
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const colorOption = product.options.find(opt => 
    opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colour'
  );

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

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      product: { node: product } as ShopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success(`${product.title} added to cart`, {
      position: "top-center",
    });
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // Filter related products (same type, different product)
  const filteredRelated = relatedProducts
    .filter(p => p.node.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFCFA" }}>
      <Navbar forceScrolled />

      <main className="pt-20 lg:pt-24 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] lg:text-[13px] font-sans tracking-[0.02em] mb-8" style={{ color: "#7A7570" }}>
            <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
            <span>/</span>
            <span style={{ color: "#2C2824" }}>{product.title}</span>
          </nav>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Gallery */}
            <motion.div 
              className="lg:col-span-7"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {/* Main Image — height is capped to the viewport so the whole
                  photo and the buy panel beside it are visible without
                  scrolling, and the backdrop is sampled from the photo itself
                  so no pale band shows around it. */}
              <div
                className="relative overflow-hidden mb-4 w-full h-[58vh] sm:h-[62vh] lg:h-[calc(100vh-190px)] lg:max-h-[760px] lg:min-h-[460px]"
                style={{ background: backdrop }}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                {images.length > 0 ? (
                  <img
                    key={images[currentImageIndex]?.node.url}
                    src={shopifyImage(images[currentImageIndex]?.node.url, 1400)}
                    alt={images[currentImageIndex]?.node.altText || product.title}
                    decoding="async"
                    crossOrigin="anonymous"
                    onLoad={handleImageLoad}
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-300"
                    style={{
                      backgroundColor: "#F5F1EA",
                      transform: isZooming ? `scale(1.5)` : "scale(1)",
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag size={48} strokeWidth={1} style={{ color: "#9A958F" }} />
                  </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
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
                  </>
                )}

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
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-20 lg:w-20 lg:h-24 overflow-hidden transition-all ${
                        currentImageIndex === index ? "ring-2 ring-offset-1 ring-[#2C2824]" : "opacity-70 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: "#EEEBE6" }}
                    >
                      <img
                        src={shopifyImage(img.node.url, 160)}
                        alt={img.node.altText || `View ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Column - Product Info */}
            <motion.div 
              className="lg:col-span-5"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {isNewProduct(product) && (
                  <span
                    className="px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.1em] uppercase"
                    style={{ backgroundColor: "#2C2824", color: "#FFFFFF" }}
                  >
                    NEW
                  </span>
                )}
                {isBestSeller(product) && (
                  <span
                    className="px-3 py-1.5 font-sans text-[10px] lg:text-[11px] tracking-[0.1em] uppercase"
                    style={{ backgroundColor: "#C9A86C", color: "#FFFFFF" }}
                  >
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Product Type */}
              <p 
                className="font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "#7A7570" }}
              >
                {product.productType || "Handbag"}
              </p>

              {/* Product Name */}
              <h1 
                className="font-serif font-normal mb-3"
                style={{ color: "#2C2824", fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {product.title}
              </h1>

              {/* Price */}
              <p 
                className="font-serif text-[22px] lg:text-[26px] font-normal mb-6"
                style={{ color: "#2C2824" }}
              >
                {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
              </p>

              {/* Description */}
              {product.description && (
                <p 
                  className="font-serif text-[15px] lg:text-[16px] font-light leading-relaxed mb-8"
                  style={{ color: "#5A5550" }}
                >
                  {product.description}
                </p>
              )}

              {/* Variant Selection */}
              {colorOption && colorOption.values.length > 1 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="font-sans text-[11px] lg:text-[12px] tracking-[0.15em] uppercase"
                      style={{ color: "#3D3530" }}
                    >
                      {colorOption.name}
                    </span>
                    <span 
                      className="font-sans text-[13px] tracking-[0.02em]"
                      style={{ color: "#3D3530" }}
                    >
                      {selectedVariant?.selectedOptions.find(o => o.name === colorOption.name)?.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {colorOption.values.map((color, index) => {
                      const variantIndex = variants.findIndex(v => 
                        v.node.selectedOptions.some(o => o.name === colorOption.name && o.value === color)
                      );
                      const isSelected = selectedVariantIndex === variantIndex;
                      
                      return (
                        <button
                          key={color}
                          onClick={() => variantIndex >= 0 && setSelectedVariantIndex(variantIndex)}
                          className={`px-4 py-2 font-sans text-[12px] tracking-[0.05em] transition-all ${
                            isSelected ? "ring-2 ring-offset-2 ring-[#2C2824]" : ""
                          }`}
                          style={{
                            border: "1px solid #E8E4DF",
                            backgroundColor: isSelected ? "#2C2824" : "transparent",
                            color: isSelected ? "#FFFFFF" : "#3D3530"
                          }}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                  className="flex-1 h-14 font-sans text-[12px] lg:text-[13px] tracking-[0.15em] uppercase transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: "#2C2824", color: "#FFFFFF" }}
                >
                  {selectedVariant?.availableForSale ? "ADD TO BAG" : "OUT OF STOCK"}
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
                {/* What Fits Inside - from Shopify metafield */}
                {(() => {
                  const metafield = product.metafields?.find(m => m?.key === "what_fits_inside");
                  if (!metafield?.value) return null;
                  let items: string[] = [];
                  try {
                    const parsed = JSON.parse(metafield.value);
                    items = Array.isArray(parsed) ? parsed : [metafield.value];
                  } catch {
                    items = metafield.value.split("\n").filter(Boolean);
                  }
                  if (items.length === 0) return null;
                  return (
                    <div style={{ borderBottom: "1px solid #E8E4DF" }}>
                      <button
                        onClick={() => toggleAccordion("fits")}
                        className="w-full flex items-center justify-between py-5"
                      >
                        <h3 
                          className="font-serif text-[18px] lg:text-[20px] font-normal"
                          style={{ color: "#2C2824" }}
                        >
                          What Fits Inside
                        </h3>
                        {openAccordion === "fits" ? (
                          <ChevronUp size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                        ) : (
                          <ChevronDown size={20} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                        )}
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          openAccordion === "fits" ? "max-h-96 pb-6" : "max-h-0"
                        }`}
                      >
                        <ul className="space-y-2">
                          {items.map((item, index) => (
                            <li key={index} className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}

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
                    <div
                      className="font-sans text-[13px] lg:text-[14px] leading-relaxed"
                      style={{ color: "#5A5550" }}
                      dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description || "Premium quality materials and expert craftsmanship." }}
                    />
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
                      <li className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                        Hand-stitched vegetable-tanned leather
                      </li>
                      <li className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                        Brass hardware with antique finish
                      </li>
                      <li className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                        Edge painting applied in 3 coats
                      </li>
                      <li className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                        Each bag takes 18-24 hours to craft
                      </li>
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
                      <li className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                        Store in the provided dust bag when not in use
                      </li>
                      <li className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                        Keep away from direct sunlight and heat
                      </li>
                      <li className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                        Clean with a soft, dry cloth
                      </li>
                      <li className="font-sans text-[13px] lg:text-[14px] leading-relaxed" style={{ color: "#5A5550" }}>
                        Condition leather every 3-6 months
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Promise Strip */}
          <motion.div 
            className="mt-16 lg:mt-24 py-8 px-6 lg:px-12"
            style={{ 
              backgroundImage: `url(${navyPatternBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            data-dark-section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="flex items-center gap-4">
                <Truck size={24} strokeWidth={1.2} style={{ color: "#C9A86C" }} />
                <div>
                  <p className="font-sans text-[12px] tracking-[0.1em] uppercase" style={{ color: "#FFFFFF" }}>
                    Free Shipping
                  </p>
                  <p className="font-serif text-[13px] font-light" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                    On orders above ₹5,000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Shield size={24} strokeWidth={1.2} style={{ color: "#C9A86C" }} />
                <div>
                  <p className="font-sans text-[12px] tracking-[0.1em] uppercase" style={{ color: "#FFFFFF" }}>
                    8-Month Warranty
                  </p>
                  <p className="font-serif text-[13px] font-light" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                    On all products
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <RotateCcw size={24} strokeWidth={1.2} style={{ color: "#C9A86C" }} />
                <div>
                  <p className="font-sans text-[12px] tracking-[0.1em] uppercase" style={{ color: "#FFFFFF" }}>
                    Easy Returns
                  </p>
                  <p className="font-serif text-[13px] font-light" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                    7-day return policy
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* You May Also Like - Related Products */}
      <RelatedProductsCarousel 
        currentProductId={product.id} 
        currentProductType={product.productType}
      />
      
      {/* Customer Reviews */}
      <ProductReviewsCompact />
      
      {/* FAQ Section */}
      <ProductFAQ />

      <Footer />
    </div>
  );
};

export default ShopifyProductDetail;
