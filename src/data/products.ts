export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: { hex: string; name: string }[];
  isNew: boolean;
  isBestSeller: boolean;
  featured: number;
  tagline: string;
  story: string;
  storyQuote: string;
  specifications: string[];
  craftsmanship: string[];
  careInstructions: string[];
  galleryImages: number; // Number of placeholder images
}

export const products: Product[] = [
  {
    id: "1",
    name: "Mor",
    category: "Baguette",
    price: 12500,
    colors: [
      { hex: "#2C2824", name: "Midnight" },
      { hex: "#4A6741", name: "Forest" },
      { hex: "#E8DFC9", name: "Ivory" },
    ],
    isNew: true,
    isBestSeller: true,
    featured: 1,
    tagline: "Bold curves that echo the grace of India's national bird.",
    story: "The Mor draws its silhouette from the majestic peacock's elegant neck curve. This baguette style is designed for the woman who moves through life with confidence, its structured form making a statement without saying a word.",
    storyQuote: "The peacock, or Mor in Hindi, represents grace, beauty, and dignity in Indian culture. The bag's distinctive curve mirrors the bird's arched neck, while subtle hardware details reference its iridescent plumage.",
    specifications: [
      "Dimensions: 28cm x 15cm x 8cm",
      "Strap drop: 20cm (adjustable)",
      "Weight: 450g",
      "Interior: One main compartment, one zip pocket",
      "Closure: Magnetic snap",
    ],
    craftsmanship: [
      "Hand-stitched vegetable-tanned leather",
      "Brass hardware with antique finish",
      "Edge painting applied in 3 coats",
      "Each bag takes 18-24 hours to craft",
    ],
    careInstructions: [
      "Store in the provided dust bag when not in use",
      "Keep away from direct sunlight and heat",
      "Clean with a soft, dry cloth",
      "Condition leather every 3-6 months",
      "Avoid contact with water and perfumes",
    ],
    galleryImages: 7,
  },
  {
    id: "2",
    name: "Kamal",
    category: "Wallet",
    price: 4500,
    colors: [
      { hex: "#E8DFC9", name: "Ivory" },
      { hex: "#4A6741", name: "Forest" },
      { hex: "#8B4513", name: "Cognac" },
    ],
    isNew: false,
    isBestSeller: true,
    featured: 2,
    tagline: "A lotus-inspired design that unfolds with purpose.",
    story: "The Kamal wallet embodies the sacred lotus, a symbol of purity and enlightenment. Its layered compartments unfold like petals, revealing thoughtful organization within a compact silhouette.",
    storyQuote: "Just as the lotus rises from muddy waters to bloom in pristine beauty, the Kamal wallet transforms the everyday act of carrying essentials into a moment of grace.",
    specifications: [
      "Dimensions: 19cm x 10cm x 2.5cm",
      "Card slots: 8",
      "Bill compartments: 2",
      "Coin pocket: 1 with zip closure",
    ],
    craftsmanship: [
      "Full-grain vegetable-tanned leather",
      "Hand-burnished edges",
      "Silk-screened interior lining",
      "Each piece takes 6-8 hours to craft",
    ],
    careInstructions: [
      "Store flat in provided pouch",
      "Avoid overstuffing to maintain shape",
      "Clean with soft cloth",
      "Condition annually",
    ],
    galleryImages: 5,
  },
  {
    id: "3",
    name: "Ashoka",
    category: "Tote",
    price: 18500,
    colors: [
      { hex: "#E8DFC9", name: "Ivory" },
      { hex: "#1E3A5F", name: "Navy" },
      { hex: "#C4785A", name: "Terracotta" },
    ],
    isNew: false,
    isBestSeller: true,
    featured: 3,
    tagline: "Inspired by the sacred Ashoka tree, symbol of love and devotion.",
    story: "The Ashoka tote captures the expansive canopy of the sacred Ashoka tree. With generous proportions and elegant lines, it offers sanctuary for all your daily essentials while maintaining a refined silhouette.",
    storyQuote: "The Ashoka tree, where Sita sought refuge in the Ramayana, represents protection and feminine strength. This tote embodies that sheltering spirit.",
    specifications: [
      "Dimensions: 38cm x 32cm x 14cm",
      "Strap drop: 24cm",
      "Weight: 780g",
      "Interior: Three compartments, two pockets",
    ],
    craftsmanship: [
      "Premium vegetable-tanned hide",
      "Reinforced base with protective feet",
      "Double-stitched handles",
      "Crafting time: 30+ hours",
    ],
    careInstructions: [
      "Store stuffed to maintain shape",
      "Rotate between bags to prevent wear",
      "Protect from rain and moisture",
      "Professional cleaning recommended annually",
    ],
    galleryImages: 6,
  },
  {
    id: "4",
    name: "Parijat",
    category: "Minibag",
    price: 8500,
    colors: [
      { hex: "#F5EFE0", name: "Pearl" },
      { hex: "#2C2824", name: "Midnight" },
      { hex: "#C9A86C", name: "Gold" },
    ],
    isNew: true,
    isBestSeller: false,
    featured: 4,
    tagline: "Delicate as the night-blooming jasmine, powerful in presence.",
    story: "Named after the celestial Parijat flower that blooms only at night, this minibag carries the essence of understated elegance. Small in size but significant in impact.",
    storyQuote: "Legend says the Parijat tree was brought from heaven. This bag captures that divine essence in its compact, precious form.",
    specifications: [
      "Dimensions: 18cm x 12cm x 6cm",
      "Chain strap: 110cm (detachable)",
      "Weight: 280g",
      "Interior: One compartment, card slot",
    ],
    craftsmanship: [
      "Buttery soft nappa leather",
      "Gold-plated chain hardware",
      "Hand-finished edges",
      "Crafting time: 12 hours",
    ],
    careInstructions: [
      "Handle with care - delicate leather",
      "Store in dust bag",
      "Avoid contact with cosmetics",
      "Condition monthly for suppleness",
    ],
    galleryImages: 5,
  },
  {
    id: "5",
    name: "Nilgiri",
    category: "Crossbody",
    price: 9500,
    colors: [
      { hex: "#4A6741", name: "Forest" },
      { hex: "#E8DFC9", name: "Ivory" },
      { hex: "#5C4033", name: "Umber" },
    ],
    isNew: true,
    isBestSeller: false,
    featured: 5,
    tagline: "Echoing the misty mountains of the Blue Hills.",
    story: "The Nilgiri crossbody draws from the rolling tea estates of South India's blue mountains. Its curved silhouette and relaxed structure evoke the easy freedom of hill country living.",
    storyQuote: "The Nilgiri hills, where mist meets mountain, inspire this bag's soft, approachable character.",
    specifications: [
      "Dimensions: 24cm x 18cm x 7cm",
      "Adjustable strap: 110-130cm",
      "Weight: 380g",
      "Interior: Main compartment, back pocket",
    ],
    craftsmanship: [
      "Pebbled vegetable-tanned leather",
      "Antique brass hardware",
      "Adjustable crossbody strap",
      "Crafting time: 16 hours",
    ],
    careInstructions: [
      "Wipe with damp cloth if needed",
      "Allow to dry naturally",
      "Condition as needed",
      "Store away from heat sources",
    ],
    galleryImages: 6,
  },
  {
    id: "6",
    name: "Shalimar",
    category: "Bucket",
    price: 11500,
    colors: [
      { hex: "#C4785A", name: "Terracotta" },
      { hex: "#1E3A5F", name: "Navy" },
      { hex: "#F5EFE0", name: "Pearl" },
    ],
    isNew: true,
    isBestSeller: false,
    featured: 6,
    tagline: "Garden of dreams, captured in leather.",
    story: "Inspired by the legendary Shalimar gardens of Kashmir, this bucket bag offers an oasis of calm organization. Its gathered top mimics the reflection of gardens in still waters.",
    storyQuote: "The Shalimar gardens were built as a sanctuary of beauty. This bag carries that spirit of curated tranquility.",
    specifications: [
      "Dimensions: 22cm x 26cm x 16cm",
      "Drawstring closure",
      "Weight: 520g",
      "Interior: Removable pouch",
    ],
    craftsmanship: [
      "Supple tumbled leather",
      "Leather drawstring with metal tips",
      "Suede lining",
      "Crafting time: 20 hours",
    ],
    careInstructions: [
      "Reshape when storing",
      "Keep drawstring untied when storing",
      "Protect suede lining from spills",
      "Professional cleaning for interior",
    ],
    galleryImages: 5,
  },
  {
    id: "7",
    name: "Champak",
    category: "Clutch",
    price: 6500,
    colors: [
      { hex: "#F5EFE0", name: "Pearl" },
      { hex: "#C9A86C", name: "Gold" },
      { hex: "#2C2824", name: "Midnight" },
    ],
    isNew: false,
    isBestSeller: false,
    featured: 7,
    tagline: "Evening elegance distilled to its essence.",
    story: "The Champak clutch is named for the fragrant golden flower that perfumes Indian evenings. Compact yet capacious, it transitions seamlessly from day to night.",
    storyQuote: "The Champak flower's golden petals and intoxicating fragrance inspired this clutch's warm, inviting presence.",
    specifications: [
      "Dimensions: 26cm x 14cm x 4cm",
      "Optional wrist strap",
      "Weight: 220g",
      "Interior: Main compartment, slip pocket",
    ],
    craftsmanship: [
      "Smooth calfskin leather",
      "Hand-stitched frame",
      "Gold-tone clasp closure",
      "Crafting time: 10 hours",
    ],
    careInstructions: [
      "Store flat or upright",
      "Avoid crushing",
      "Clean clasp with dry cloth",
      "Condition leather seasonally",
    ],
    galleryImages: 5,
  },
  {
    id: "8",
    name: "Koel",
    category: "Satchel",
    price: 14500,
    colors: [
      { hex: "#2C2824", name: "Midnight" },
      { hex: "#C9A86C", name: "Gold" },
      { hex: "#4A6741", name: "Forest" },
    ],
    isNew: false,
    isBestSeller: false,
    featured: 8,
    tagline: "The song of everyday elegance.",
    story: "Named after the Indian cuckoo whose melodious call announces the arrival of spring, the Koel satchel brings music to your daily routine. Its classic proportions and thoughtful details create harmony between form and function.",
    storyQuote: "The Koel's song is India's soundtrack to new beginnings. This satchel accompanies your daily journey with the same optimistic spirit.",
    specifications: [
      "Dimensions: 32cm x 24cm x 12cm",
      "Top handle drop: 12cm",
      "Detachable strap: 120cm",
      "Weight: 650g",
      "Interior: Two compartments, three pockets",
    ],
    craftsmanship: [
      "Full-grain bridle leather",
      "Hand-painted edges",
      "Custom brass buckles",
      "Crafting time: 26 hours",
    ],
    careInstructions: [
      "Condition monthly for bridle leather",
      "Polish hardware with soft cloth",
      "Store with handles upright",
      "Avoid prolonged sun exposure",
    ],
    galleryImages: 6,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.name.toLowerCase() === slug.toLowerCase());
};
