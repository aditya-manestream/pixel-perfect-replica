import { Link } from "react-router-dom";
import curatedHero from "@/assets/curated-hero.jpg";
import curatedLeft1 from "@/assets/curated-left-1.jpg";
import curatedLeft2 from "@/assets/curated-left-2.jpg";
import curatedDetail from "@/assets/curated-detail.jpg";
import curatedTote from "@/assets/curated-tote.jpg";
import curatedNavyPattern from "@/assets/curated-navy-pattern.jpg";

const CuratedSection = () => {
  return (
    <section 
      className="relative w-full py-20 lg:py-28 overflow-hidden"
      style={{ 
        backgroundImage: `url(${curatedNavyPattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p 
            className="font-sans text-[11px] lg:text-[12px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "#C7A46B" }}
          >
            HANDPICKED SELECTIONS
          </p>
          <h2 
            className="font-serif text-[36px] lg:text-[48px] font-normal italic mb-4"
            style={{ color: "#F5F1E8" }}
          >
            Curated for you
          </h2>
          <p 
            className="font-serif text-[15px] lg:text-[17px] font-light max-w-[600px] mx-auto"
            style={{ color: "rgba(245, 241, 232, 0.8)" }}
          >
            Discover our artisans' finest creations, each piece a celebration of heritage and luxury.
          </p>
        </div>

        {/* Asymmetric Image Grid */}
        <div className="flex justify-center gap-4 lg:gap-6 mb-12 lg:mb-16">
          {/* Left Column - Two Stacked Images */}
          <div className="flex flex-col gap-4 lg:gap-6 pt-8">
            <div className="group cursor-pointer overflow-hidden rounded-sm transition-shadow duration-300 hover:shadow-xl">
              <img 
                src={curatedLeft1}
                alt="Editorial fashion"
                className="w-[140px] lg:w-[180px] h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer overflow-hidden rounded-sm transition-shadow duration-300 hover:shadow-xl">
              <img 
                src={curatedLeft2}
                alt="Editorial fashion"
                className="w-[140px] lg:w-[180px] h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Center Column - Hero Image */}
          <div className="group cursor-pointer overflow-hidden rounded-sm transition-shadow duration-300 hover:shadow-xl">
            <img 
              src={curatedHero}
              alt="Featured collection"
              className="w-[240px] lg:w-[320px] h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Right Column - Detail + Tote */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="group cursor-pointer overflow-hidden rounded-sm transition-shadow duration-300 hover:shadow-xl">
              <img 
                src={curatedDetail}
                alt="Leather craftsmanship detail"
                className="w-[100px] lg:w-[130px] h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="group cursor-pointer overflow-hidden rounded-sm transition-shadow duration-300 hover:shadow-xl">
              <img 
                src={curatedTote}
                alt="Leather tote bag"
                className="w-[140px] lg:w-[180px] h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to="/shop" 
            className="inline-block font-sans text-[12px] lg:text-[13px] tracking-[0.2em] uppercase border-b pb-1 transition-opacity hover:opacity-70"
            style={{ 
              color: "#F5F1E8",
              borderColor: "#F5F1E8",
            }}
          >
            EXPLORE FULL COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CuratedSection;
