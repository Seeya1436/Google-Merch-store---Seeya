import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GoogleGIcon, GoogleColorDots, GoogleColorStripe } from '../common/GoogleLogo';

export const PromoBanner: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-16 border border-neutral-800 shadow-2xl">
        
        {/* Four Color Geometric Ambient Lighting Accent in Authentic Google Tones */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4285F4]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#EA4335]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-[#FBBC05]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-[#34A853]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top subtle 4-color strip */}
        <div className="absolute top-0 left-0 right-0">
          <GoogleColorStripe className="h-1 w-full" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-neutral-200 font-mono uppercase tracking-wider border border-white/10">
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5">
              <GoogleGIcon className="w-full h-full" />
            </div>
            <span>Mountain View Originals</span>
            <GoogleColorDots size="w-1.5 h-1.5" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            ADD A LITTLE <br />
            <span className="font-black">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>{' '}
            <span className="text-neutral-400 font-light">TO YOUR EVERYDAY.</span>
          </h2>

          <p className="text-base text-neutral-300 leading-relaxed font-normal">
            From everyday minimalist hoodies to collector-worthy limited-edition Android figurines and developer journals. Crafted for longevity.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => navigateToPLPWithCategory('all')}
              className="px-8 py-4 bg-white text-black font-bold rounded-2xl text-xs sm:text-sm hover:bg-neutral-100 transition-all shadow-xl flex items-center space-x-2 group hover:ring-2 hover:ring-[#4285F4]/40"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-xs text-neutral-400 font-mono">
              ★ 4.9/5 Rating across 1,200+ verified buyers
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
