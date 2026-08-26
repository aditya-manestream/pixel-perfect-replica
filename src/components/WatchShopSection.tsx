import { Link } from "react-router-dom";
import { useState } from "react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { isNewProduct, resolveHandle, shopifyImage } from "@/lib/shopify";
import styled1 from "@/assets/shop-product-1.jpg";
import styled2 from "@/assets/shop-product-2.jpg";
import styled3 from "@/assets/shop-product-3.jpg";
import styled4 from "@/assets/shop-product-4.jpg";
import styled5 from "@/assets/shop-product-5.jpg";

// Each styled photo shows a specific bag, so link it to that exact product
// instead of whatever order Shopify happens to return the catalogue in.
const STYLED_LOOKS = [
  { image: styled1, handle: "purnima-big", label: "Purnima" },
  { image: styled2, handle: "kaya-minibag", label: "Kaya" },
  { image: styled3, handle: "mandala-tote", label: "Mandala" },
  { image: styled4, handle: "parna-wallet", label: "Parna" },
  { image: styled5, handle: "kumi-small", label: "Kumi (Small)" },
];

interface StyledItem {
  id: string;
  handle: string;
  name: string;
  image: string;
  alt: string;
  isNew: boolean;
}

const WatchShopSection = () => {
  const { products, loading } = useShopifyProducts();
  const [isPaused, setIsPaused] = useState(false);

  // Styled photos whose product is still live in Shopify. A drafted or deleted
  // product (e.g. Kumi Small) drops out instead of linking to a dead page.
  const styledItems: StyledItem[] = STYLED_LOOKS.flatMap((look) => {
    const node = resolveHandle(products, look.handle);
    if (!node) return [];
    return [{
      id: look.handle,
      handle: node.handle,
      name: node.title,
      image: look.image,
      alt: `${node.title} styled by Ardori`,
      isNew: isNewProduct(node),
    }];
  });

  // Backfill from the live catalogue (using each product's own Shopify photo) so
  // the strip always stays full even when styled looks are dropped.
  const used = new Set(styledItems.map((i) => i.handle));
  const fillers: StyledItem[] = products
    .filter((p) => !used.has(p.node.handle))
    .map((p) => ({
      id: p.node.handle,
      handle: p.node.handle,
      name: p.node.title,
      image: shopifyImage(p.node.images.edges[0]?.node.url, 700),
      alt: p.node.images.edges[0]?.node.altText || `${p.node.title} by Ardori`,
      isNew: isNewProduct(p.node),
    }))
    .filter((i) => !!i.image);

  const items = [...styledItems, ...fillers].slice(0, Math.max(STYLED_LOOKS.length, 5));

  if (!loading && items.length === 0) return null;


  const duplicatedItems = [...items, ...items];

  return (
    <section
      className="w-full py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="text-center mb-12 lg:mb-16 px-6">
        <h2
          className="font-serif text-[36px] lg:text-[48px] font-normal italic mb-4"
          style={{ color: "#2C2824" }}
        >
          See it Styled
        </h2>
        <p
          className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto"
          style={{ color: "#7A7570" }}
        >
          How Ardori complements your daily life
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          className="flex gap-8 w-max"
          style={{
            animation: "scroll-left 40s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {duplicatedItems.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              to={`/product/${product.handle}`}
              className="block flex-shrink-0 cursor-pointer"
              aria-label={`View ${product.name}`}
            >
              <div
                className="relative w-[200px] lg:w-[260px] rounded-lg overflow-hidden"
                style={{ backgroundColor: "#F5F2ED" }}
              >
                {product.isNew && (
                  <div
                    className="absolute top-3 left-3 z-10 px-3 py-1 text-[10px] lg:text-[11px] font-sans tracking-[0.1em] uppercase"
                    style={{ backgroundColor: "#FFFFFF", color: "#3A3530" }}
                  >
                    NEW
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-[280px] lg:h-[360px] object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-10 lg:mt-14">
        <Link
          to="/shop"
          className="inline-block font-sans text-[12px] lg:text-[13px] tracking-[0.2em] uppercase border-b pb-1 transition-opacity hover:opacity-70"
          style={{ color: "#5A5550", borderColor: "#5A5550" }}
        >
          EXPLORE FULL COLLECTION
        </Link>
      </div>
    </section>
  );
};

export default WatchShopSection;
