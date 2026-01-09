import { Search, ShoppingBag, User } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image - contains all hero content */}
      <img 
        src={heroBg}
        alt="ARDORI - Timeless Silhouettes, Enduring Craft"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Navigation Overlay */}
      <div className="absolute inset-x-0 top-0 z-10">
        <header className="w-full px-8 lg:px-16 py-6">
          <nav className="flex items-center justify-between">
            {/* Left Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              <li>
                <a 
                  href="#" 
                  className="font-sans text-[13px] font-medium tracking-[0.15em] text-white/90 hover:text-white transition-colors uppercase"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-sans text-[13px] font-medium tracking-[0.15em] text-white/90 hover:text-white transition-colors uppercase"
                >
                  Collection
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-sans text-[13px] font-medium tracking-[0.15em] text-white/90 hover:text-white transition-colors uppercase"
                >
                  Shop
                </a>
              </li>
            </ul>
            
            {/* Logo */}
            <div className="flex-1 lg:flex-none flex justify-center">
              <a href="#" className="font-display text-3xl lg:text-4xl text-white tracking-[0.08em]">
                ARDORI
              </a>
            </div>
            
            {/* Right Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-8">
                <li>
                  <a 
                    href="#" 
                    className="font-sans text-[13px] font-medium tracking-[0.15em] text-white/90 hover:text-white transition-colors uppercase"
                  >
                    Journal
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="font-sans text-[13px] font-medium tracking-[0.15em] text-white/90 hover:text-white transition-colors uppercase"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="font-sans text-[13px] font-medium tracking-[0.15em] text-white/90 hover:text-white transition-colors uppercase"
                  >
                    Contact
                  </a>
                </li>
              </ul>
              
              {/* Icons */}
              <div className="flex items-center gap-5 ml-4">
                <button className="text-white/90 hover:text-white transition-colors">
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button className="text-white/90 hover:text-white transition-colors">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button className="relative text-white/90 hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-[10px] font-sans font-semibold rounded-full flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>
            </div>
            
            {/* Mobile Icons */}
            <div className="flex lg:hidden items-center gap-4">
              <button className="text-white/90 hover:text-white transition-colors">
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button className="relative text-white/90 hover:text-white transition-colors">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-[10px] font-sans font-semibold rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Index;
