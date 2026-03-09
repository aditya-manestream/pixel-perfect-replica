import { Instagram, ArrowRight } from "lucide-react";

import instagramImg1 from "@/assets/instagram-1.jpg";
import instagramImg2 from "@/assets/instagram-2.jpg";
import instagramImg3 from "@/assets/instagram-3.jpg";
import instagramImg4 from "@/assets/instagram-4.jpg";

const images = [
  { id: 1, src: instagramImg1, alt: "Leather tote bag lifestyle" },
  { id: 2, src: instagramImg2, alt: "Artisan craftsmanship" },
  { id: 3, src: instagramImg3, alt: "Product flat lay" },
  { id: 4, src: instagramImg4, alt: "Fashion editorial" },
];

const InstagramSection = () => {
  return (
    <section
      className="w-full py-20 lg:py-28"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16 px-6">
        {/* Eyebrow with decorative elements */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span style={{ color: "#C9A86C" }}>✦</span>
          <p
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase"
            style={{ color: "#7A7570" }}
          >
            FOLLOW OUR JOURNEY
          </p>
          <span style={{ color: "#C9A86C" }}>✦</span>
        </div>

        {/* Handle */}
        <h2
          className="font-serif text-[28px] lg:text-[36px] font-normal italic mb-4"
          style={{ color: "#2C2824" }}
        >
          @ardoridesigns
        </h2>

        {/* Supporting text */}
        <p
          className="font-serif text-[15px] lg:text-[17px] font-light max-w-[450px] mx-auto"
          style={{ color: "#7A7570" }}
        >
          Join our community and discover the stories behind every piece.
        </p>
      </div>

      {/* Image Grid - Desktop: 4 columns, Mobile: horizontal scroll */}
      <div className="mb-12 lg:mb-16">
        {/* Desktop Grid */}
        <div className="hidden md:flex justify-center gap-4 lg:gap-5 px-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-[200px] lg:w-[250px] h-[240px] lg:h-[300px] object-cover transition-all duration-400 ease-in-out group-hover:scale-[1.03] group-hover:contrast-[1.05]"
              />
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-6 w-max">
            {images.map((image) => (
              <div
                key={image.id}
                className="group cursor-pointer overflow-hidden flex-shrink-0"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-[200px] h-[240px] object-cover transition-all duration-400 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center px-6">
        <a
          href="https://www.instagram.com/ardoridesigns/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-sans text-[11px] lg:text-[12px] tracking-[0.2em] uppercase px-10 py-4 border transition-all duration-300 hover:border-[#3A3530] hover:text-[#2C2824]"
          style={{
            borderColor: "#9A958F",
            color: "#5A5550",
            backgroundColor: "transparent",
          }}
        >
          <Instagram size={16} strokeWidth={1.5} />
          FOLLOW ON INSTAGRAM
          <ArrowRight size={14} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;
