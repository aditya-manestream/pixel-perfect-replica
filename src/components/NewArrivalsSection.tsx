import productLotus1 from "@/assets/product-lotus-1.jpg";
import productLotus2 from "@/assets/product-lotus-2.jpg";
import productLotus3 from "@/assets/product-lotus-3.jpg";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  badges: Array<{ label: string; type: "dark" | "terracotta" }>;
}

const products: Product[] = [
  {
    id: "1",
    name: "The Lotus",
    price: "₹18,500",
    image: productLotus1,
    badges: [
      { label: "NEW ARRIVAL", type: "dark" },
      { label: "BEST SELLER", type: "terracotta" },
    ],
  },
  {
    id: "2",
    name: "The Lotus",
    price: "₹18,500",
    image: productLotus2,
    badges: [
      { label: "NEW ARRIVAL", type: "dark" },
      { label: "BEST SELLER", type: "terracotta" },
    ],
  },
  {
    id: "3",
    name: "The Lotus",
    price: "₹18,500",
    image: productLotus3,
    badges: [
      { label: "NEW ARRIVAL", type: "dark" },
      { label: "BEST SELLER", type: "terracotta" },
    ],
  },
];

const NewArrivalsSection = () => {
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
          <a 
            href="#" 
            className="font-sans text-[12px] tracking-[0.15em] uppercase border-b transition-opacity hover:opacity-70 pb-1"
            style={{ 
              color: "#5A5550",
              borderColor: "#5A5550",
            }}
          >
            VIEW ALL
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group cursor-pointer"
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
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.badges.map((badge, index) => (
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
                </div>
              </div>

              {/* Product Info */}
              <div className="pt-4">
                <h3 
                  className="font-serif text-[18px] lg:text-[20px] font-normal mb-1"
                  style={{ color: "#2C2824" }}
                >
                  {product.name}
                </h3>
                <p 
                  className="font-sans text-[15px] lg:text-[16px] font-medium"
                  style={{ color: "#B5734D" }}
                >
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
