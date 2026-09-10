import React from 'react';
import { ArrowRight, History, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GoogleColorDots } from '../common/GoogleLogo';

export const EditorialSection: React.FC = () => {
  const { navigateToPLPWithCategory, setFilters, setActiveView } = useShop();

  const handleShopRetro = () => {
    setFilters((prev) => ({
      ...prev,
      category: 'all',
      searchQuery: 'retro',
    }));
    setActiveView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white min-h-[480px] sm:min-h-[560px] flex items-center justify-start border border-neutral-800 shadow-2xl">
        
        {/* Background Vintage Stanford Garage Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1600&q=80"
            alt="Google 1998 Retro Archival Apparel Campaign"
            className="w-full h-full object-cover object-center opacity-45 scale-105 hover:scale-100 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/40"></div>
        </div>

        {/* Campaign Editorial Content */}
        <div className="relative z-10 p-8 sm:p-16 max-w-xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-[#FBBC05] font-mono border border-white/10">
            <History className="w-3.5 h-3.5" />
            <span>Featured Editorial • Stanford Garage 1998</span>
            <GoogleColorDots size="w-1 h-1" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
            1998 RETRO. <br />
            <span className="text-neutral-300 font-light text-2xl sm:text-4xl block mt-2">
              Old-school Google energy. <br />New-school fits.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            A tribute to the Stanford garage and early web pioneers. Archival felt varsity lettering, 400gsm combed fleece, heavy 16oz canvas market totes, and retro CRT computing nostalgia.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleShopRetro}
              className="px-8 py-4 bg-white text-black font-extrabold rounded-2xl text-xs sm:text-sm hover:bg-neutral-100 transition-all shadow-xl flex items-center justify-center space-x-2 group hover:ring-2 hover:ring-[#4285F4]/50"
            >
              <span>SHOP 1998 RETRO</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateToPLPWithCategory('apparel')}
              className="px-6 py-4 bg-neutral-900/80 backdrop-blur-md text-white font-semibold rounded-2xl text-xs sm:text-sm border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center"
            >
              EXPLORE APPAREL
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

