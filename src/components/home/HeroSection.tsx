import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GoogleGIcon, GoogleColorDots } from '../common/GoogleLogo';

export const HeroSection: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-4 lg:my-6 shadow-2xl border border-neutral-800">
      
      {/* Background Hero Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_google_lifestyle_1786590853279.jpg"
          alt="Google Merchandise Fashion Campaign"
          className="w-full h-full object-cover object-center opacity-60 scale-105 transition-transform duration-1000 hover:scale-100"
          referrerPolicy="no-referrer"
        />
        {/* Gradients for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-20 sm:py-28 lg:py-36 flex flex-col justify-end min-h-[520px] sm:min-h-[620px]">
        <div className="max-w-2xl space-y-6">
          
          {/* Badge with Google G Logo */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide shadow-sm">
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5">
              <GoogleGIcon className="w-full h-full" />
            </div>
            <span>Official Google Collection • 2026 Drop 01</span>
            <GoogleColorDots size="w-1.5 h-1.5" />
          </div>

          {/* Headline with Google signature styling */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
            <span className="inline-flex items-center">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">O</span>
              <span className="text-[#FBBC05]">O</span>
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#34A853]">L</span>
              <span className="text-[#EA4335]">E</span>
            </span>{' '}
            MERCH, <br />
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] bg-clip-text text-transparent">
              BUT MAKE IT YOURS.
            </span>
          </h1>

          {/* Supporting Copy - Exact PRD Subtext */}
          <p className="text-lg sm:text-2xl text-neutral-200 font-medium leading-relaxed max-w-xl">
            Fresh drops. Iconic colours. Internet-approved essentials.
          </p>

          {/* CTAs - Exact PRD Labels */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
            <button
              onClick={() => navigateToPLPWithCategory('new')}
              className="px-8 py-4 bg-white text-black font-extrabold rounded-2xl text-sm sm:text-base hover:bg-neutral-100 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 group hover:ring-2 hover:ring-[#4285F4]/50"
            >
              <span>SHOP NEW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('official-collections') || document.getElementById('shop-by-category');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateToPLPWithCategory('1998-retro');
                }
              }}
              className="px-8 py-4 bg-neutral-900/80 backdrop-blur-md text-white font-semibold rounded-2xl text-sm sm:text-base border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center"
            >
              EXPLORE COLLECTIONS
            </button>
          </div>

          {/* Brand Accent Indicators with official Google colors */}
          <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-300 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] shadow-xs"></span>
              <span>Organic Cotton</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] shadow-xs"></span>
              <span>Limited Drops</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] shadow-xs"></span>
              <span>Member Perks</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] shadow-xs"></span>
              <span>100% Carbon Neutral</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
