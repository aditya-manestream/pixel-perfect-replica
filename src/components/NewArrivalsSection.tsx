import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { isNewProduct, isBestSeller, formatPrice, selectNewArrivals } from "@/lib/shopify";

const NewArrivalsSection = () => {
  const { products, loading } = useShopifyProducts();

  // Tagged "new" products first; if nothing is tagged in Shopify yet, the most
  // recently published products stand in so the section is never empty.
  const newArrivals = selectNewArrivals(products, 3);

  // Only hide when the catalogue itself is empty
  if (!loading && newArrivals.length === 0) {
    return null;
  }


  return (
    <section 
      className="w-full py-16 lg:py-24"
      style={{ backgroundColor: "#F9F7F4" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 lg:mb-14">
          <div>
            <h2 
              className="font-serif text-[28px] lg:text-[36px] font-normal italic mb-2"
              style={{ color: "#2C2824" }}
            >
              New Arrivals
            </h2>
            <p 
              className="font-serif text-[14px] lg:text-[16px] font-light"
              style={{ color: "#7A7570" }}
            >
              Timeless silhouettes for the modern muse.
            </p>
          </div>
          <Link 
            to="/shop" 
            className="font-sans text-[12px] tracking-[0.15em] uppercase border-b transition-opacity hover:opacity-70 pb-1"
            style={{ 
              color: "#5A5550",
              borderColor: "#5A5550",
            }}
          >
            VIEW ALL
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div 
                  className="rounded-lg overflow-hidden"
                  style={{ border: "1px solid #E8E4DF", backgroundColor: "#FFFFFF" }}
                >
                  <div className="aspect-square bg-gray-200" />
                </div>
                <div className="pt-4">
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))
          ) : (
            newArrivals.map((product) => {
              const productNode = product.node;
              const imageUrl = productNode.images.edges[0]?.node.url;
              const imageAlt = productNode.images.edges[0]?.node.altText || productNode.title;
              const price = formatPrice(productNode.priceRange.minVariantPrice.amount);
              
              // Build badges array
              const badges: Array<{ label: string; type: "dark" | "terracotta" }> = [];
              if (isNewProduct(productNode)) {
                badges.push({ label: "NEW ARRIVAL", type: "dark" });
              }
              if (isBestSeller(productNode)) {
                badges.push({ label: "BEST SELLER", type: "terracotta" });
              }

              return (
                <Link 
                  to={`/product/${productNode.handle}`}
                  key={productNode.id}
                  className="group cursor-pointer block"
                >
                  {/* Card */}
                  <div 
                    className="rounded-lg overflow-hidden transition-shadow duration-300 group-hover:shadow-lg"
                    style={{ 
                      border: "1px solid #E8E4DF",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                      
                      {/* Badges */}
                      {badges.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {badges.map((badge, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 text-[10px] lg:text-[11px] font-sans font-medium tracking-[0.08em] uppercase"
                              style={{
                                backgroundColor: badge.type === "dark" ? "#2C3340" : "#9B6B5A",
                                color: "#FFFFFF",
                                borderRadius: "2px",
                              }}
                            >
                              {badge.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="pt-4">
                    <h3 
                      className="font-serif text-[18px] lg:text-[20px] font-normal mb-1"
                      style={{ color: "#2C2824" }}
                    >
                      {productNode.title}
                    </h3>
                    <p 
                      className="font-sans text-[15px] lg:text-[16px] font-medium"
                      style={{ color: "#B5734D" }}
                    >
                      {price}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
