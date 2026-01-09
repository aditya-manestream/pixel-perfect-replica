import { Leaf, Heart, Shield } from "lucide-react";
import craftVideo from "@/assets/craft-video.mp4";

const CraftSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={craftVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
        {/* Content Card */}
        <div 
          className="w-full max-w-[600px] px-10 py-14 lg:px-16 lg:py-20 text-center"
          style={{ backgroundColor: "#1E2A3A" }}
        >
          {/* Eyebrow */}
          <p 
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.35em] uppercase mb-6"
            style={{ color: "#C9A86C" }}
          >
            THE CRAFT
          </p>

          {/* Heading */}
          <h2 
            className="font-serif text-[32px] lg:text-[44px] font-normal italic leading-[1.2] mb-6"
            style={{ color: "#FFFFFF" }}
          >
            The Art of<br />
            Vegetable Tanning
          </h2>

          {/* Paragraph */}
          <p 
            className="font-serif text-[14px] lg:text-[16px] font-light leading-[1.7] mb-10 max-w-[480px] mx-auto"
            style={{ color: "#A8B4C0" }}
          >
            In a world of fast fashion, we choose the path of patience. Vegetable tanning is an organic method relying on natural tannins from bark and leaves. It takes up to 40 days to complete, resulting in leather that is rich in character, biodegradable, and uniquely yours.
          </p>

          {/* Icon Bullet Points */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <Leaf 
                size={18} 
                strokeWidth={1.5}
                style={{ color: "#C9A86C" }}
              />
              <span 
                className="font-sans text-[13px] lg:text-[14px]"
                style={{ color: "#D0D8E0" }}
              >
                Chromium-free and hypoallergenic
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Heart 
                size={18} 
                strokeWidth={1.5}
                style={{ color: "#C9A86C" }}
              />
              <span 
                className="font-sans text-[13px] lg:text-[14px]"
                style={{ color: "#D0D8E0" }}
              >
                Develops a rich patina over time
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Shield 
                size={18} 
                strokeWidth={1.5}
                style={{ color: "#C9A86C" }}
              />
              <span 
                className="font-sans text-[13px] lg:text-[14px]"
                style={{ color: "#D0D8E0" }}
              >
                Durable and biodegradable
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#"
            className="inline-block font-sans text-[11px] lg:text-[12px] tracking-[0.25em] uppercase px-10 py-4 border transition-all duration-300 hover:brightness-110"
            style={{ 
              color: "#FFFFFF",
              borderColor: "#4A5568",
              backgroundColor: "transparent",
            }}
          >
            LEARN MORE
          </a>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
