import navyPatternBg from "@/assets/navy-pattern-bg.jpg";

const UnboxingSection = () => {
  return (
    <section
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#F5F2ED" }}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(${navyPatternBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center justify-center min-h-[200px]">
        <p
          className="font-serif text-center text-[22px] md:text-[28px] lg:text-[32px] font-light italic leading-relaxed tracking-wide"
          style={{ color: "#5A5550" }}
        >
          True luxury is about making the intentional choice to step away from fleeting trends and embrace purposeful signature pieces that suit your style.
        </p>
      </div>
    </section>
  );
};

export default UnboxingSection;
