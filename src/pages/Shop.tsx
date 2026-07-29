import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopifyProductGrid from "@/components/shop/ShopifyProductGrid";
import navyPatternBg from "@/assets/navy-pattern-bg.jpg";
import Seo from "@/components/Seo";

const Shop = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title={"Shop Leather Handbags | Ardori"}
        description={"Browse the Ardori collection of handcrafted vegetable-tanned leather handbags — totes, slings and everyday carry pieces made in India."}
        path="/shop"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative w-full min-h-[50vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden"
        data-dark-section
        style={{ 
          backgroundImage: `url(${navyPatternBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content */}
        <div className="relative z-10 text-center px-6 py-24 lg:py-32">
          {/* Eyebrow Text */}
          <p
            className="font-sans text-[11px] lg:text-[13px] tracking-[0.4em] uppercase mb-6"
            style={{ color: "#C4A164" }}
          >
            ✦ THE COLLECTION ✦
          </p>
          
          {/* Main Heading - Fluid Typography */}
          <h1
            className="font-serif font-normal tracking-[0.03em] leading-[1.1] mb-6"
            style={{ 
              color: "#FFFFFF",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            All Products
          </h1>
          
          {/* Subheading */}
          <p
            className="font-serif text-[15px] lg:text-[18px] font-light leading-[1.7] max-w-[600px] mx-auto"
            style={{ color: "rgba(255, 255, 255, 0.75)" }}
          >
            Each piece tells a story rooted in India's natural heritage — from misty
            mountains to sacred gardens.
          </p>
        </div>
      </section>
      
      {/* Shopify Product Grid */}
      <ShopifyProductGrid />
      
      <Footer />
    </div>
  );
};

export default Shop;
