import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Grid3X3, LayoutGrid, ShoppingBag } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { formatPrice, isNewProduct, isBestSeller, getColorOptions, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ShopifyProductGridProps {
  showFilters?: boolean;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const filterOptions = [
  { value: "all", label: "All Products" },
  { value: "new", label: "New Arrivals" },
  { value: "best-seller", label: "Best Sellers" },
];

const ShopifyProductGrid = ({ showFilters = true }: ShopifyProductGridProps) => {
  const { products, loading, error } = useShopifyProducts();
  const { addItem } = useCartStore();
  
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [gridView, setGridView] = useState<2 | 3>(3);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (filterBy === "new") {
      result = result.filter(p => isNewProduct(p.node));
    } else if (filterBy === "best-seller") {
      result = result.filter(p => isBestSeller(p.node));
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => 
        parseFloat(a.node.priceRange.minVariantPrice.amount) - 
        parseFloat(b.node.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => 
        parseFloat(b.node.priceRange.minVariantPrice.amount) - 
        parseFloat(a.node.priceRange.minVariantPrice.amount)
      );
    }

    return result;
  }, [products, sortBy, filterBy]);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success(`${product.node.title} added to cart`, {
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#FDFCFA" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] mb-4" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-4 w-3/4 mb-2" style={{ backgroundColor: "#EEEBE6" }} />
                <div className="h-4 w-1/2" style={{ backgroundColor: "#EEEBE6" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#FDFCFA" }}>
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <p className="font-serif text-[16px]" style={{ color: "#E57373" }}>
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 lg:py-24" style={{ backgroundColor: "#FDFCFA" }}>
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: "#F8F6F3" }}
          >
            <ShoppingBag size={32} strokeWidth={1} style={{ color: "#9A958F" }} />
          </div>
          <h2 className="font-serif text-[24px] lg:text-[28px] font-normal mb-4" style={{ color: "#2C2824" }}>
            No Products Found
          </h2>
          <p className="font-serif text-[15px] font-light leading-relaxed mb-6" style={{ color: "#6A655F" }}>
            We're currently updating our collection. Please check back soon or create products in your Shopify store.
          </p>
          <p className="font-sans text-[13px]" style={{ color: "#9A958F" }}>
            To add products, tell me what products you'd like to create!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16" style={{ backgroundColor: "#FDFCFA" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Toolbar */}
        {showFilters && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6" style={{ borderBottom: "1px solid #E8E4DF" }}>
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowFilterDropdown(!showFilterDropdown);
                  setShowSortDropdown(false);
                }}
                className="flex items-center gap-2 font-sans text-[12px] tracking-[0.1em] uppercase transition-opacity hover:opacity-70"
                style={{ color: "#3D3530" }}
              >
                Filter: {filterOptions.find(f => f.value === filterBy)?.label}
                <ChevronDown size={14} strokeWidth={1.5} />
              </button>
              
              {showFilterDropdown && (
                <div 
                  className="absolute top-full left-0 mt-2 py-2 z-20 min-w-[160px]"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E4DF", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                >
                  {filterOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterBy(option.value);
                        setShowFilterDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 font-sans text-[12px] tracking-[0.05em] transition-colors hover:bg-gray-50"
                      style={{ 
                        color: filterBy === option.value ? "#C9A86C" : "#3D3530" 
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-6">
              {/* Grid Toggle */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setGridView(2)}
                  className="p-1.5 transition-opacity"
                  style={{ opacity: gridView === 2 ? 1 : 0.4 }}
                >
                  <LayoutGrid size={18} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                </button>
                <button
                  onClick={() => setGridView(3)}
                  className="p-1.5 transition-opacity"
                  style={{ opacity: gridView === 3 ? 1 : 0.4 }}
                >
                  <Grid3X3 size={18} strokeWidth={1.5} style={{ color: "#3D3530" }} />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
                    setShowFilterDropdown(false);
                  }}
                  className="flex items-center gap-2 font-sans text-[12px] tracking-[0.1em] uppercase transition-opacity hover:opacity-70"
                  style={{ color: "#3D3530" }}
                >
                  Sort: {sortOptions.find(s => s.value === sortBy)?.label}
                  <ChevronDown size={14} strokeWidth={1.5} />
                </button>
                
                {showSortDropdown && (
                  <div 
                    className="absolute top-full right-0 mt-2 py-2 z-20 min-w-[180px]"
                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E4DF", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  >
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 font-sans text-[12px] tracking-[0.05em] transition-colors hover:bg-gray-50"
                        style={{ 
                          color: sortBy === option.value ? "#C9A86C" : "#3D3530" 
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className={`grid grid-cols-2 gap-4 lg:gap-6 ${gridView === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
          {filteredAndSortedProducts.map((product, index) => {
            const { node } = product;
            const primaryImage = node.images.edges[0]?.node;
            const secondaryImage = node.images.edges[1]?.node;
            const isHovered = hoveredProduct === node.id;
            const colorOptions = getColorOptions(node);
            const priceInfo = node.priceRange.minVariantPrice;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group"
                onMouseEnter={() => setHoveredProduct(node.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link to={`/product/${node.handle}`}>
                  {/* Image Container */}
                  <div 
                    className="relative aspect-[3/4] overflow-hidden mb-4"
                    style={{ backgroundColor: "#EEEBE6" }}
                  >
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      {isNewProduct(node) && (
                        <span
                          className="px-2.5 py-1 font-sans text-[9px] lg:text-[10px] tracking-[0.1em] uppercase"
                          style={{ backgroundColor: "#2C2824", color: "#FFFFFF" }}
                        >
                          NEW
                        </span>
                      )}
                      {isBestSeller(node) && (
                        <span
                          className="px-2.5 py-1 font-sans text-[9px] lg:text-[10px] tracking-[0.1em] uppercase"
                          style={{ backgroundColor: "#C9A86C", color: "#FFFFFF" }}
                        >
                          BEST SELLER
                        </span>
                      )}
                    </div>

                    {/* Product Images */}
                    {primaryImage ? (
                      <>
                        <img
                          src={primaryImage.url}
                          alt={primaryImage.altText || node.title}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                          style={{ opacity: isHovered && secondaryImage ? 0 : 1 }}
                        />
                        {secondaryImage && (
                          <img
                            src={secondaryImage.url}
                            alt={secondaryImage.altText || node.title}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                            style={{ opacity: isHovered ? 1 : 0 }}
                          />
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingBag size={48} strokeWidth={1} style={{ color: "#9A958F" }} />
                      </div>
                    )}

                    {/* Quick Add */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-4 left-4 right-4 py-3 font-sans text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
                      style={{
                        backgroundColor: "#2C2824",
                        color: "#FFFFFF",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(8px)",
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>

                  {/* Product Info */}
                  <div>
                    <p 
                      className="font-sans text-[10px] lg:text-[11px] tracking-[0.15em] uppercase mb-1"
                      style={{ color: "#9A958F" }}
                    >
                      {node.productType || "Handbag"}
                    </p>
                    <h3 
                      className="font-serif text-[16px] lg:text-[18px] font-normal mb-1"
                      style={{ color: "#2C2824" }}
                    >
                      {node.title}
                    </h3>
                    <p 
                      className="font-serif text-[15px] lg:text-[16px] mb-3"
                      style={{ color: "#3D3530" }}
                    >
                      {formatPrice(priceInfo.amount, priceInfo.currencyCode)}
                    </p>

                    {/* Color Swatches */}
                    {colorOptions.length > 0 && (
                      <div className="flex items-center gap-2">
                        {colorOptions.slice(0, 4).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full"
                            style={{ 
                              backgroundColor: color.toLowerCase(),
                              border: "1px solid #E8E4DF" 
                            }}
                            title={color}
                          />
                        ))}
                        {colorOptions.length > 4 && (
                          <span className="font-sans text-[11px]" style={{ color: "#7A7570" }}>
                            +{colorOptions.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopifyProductGrid;
