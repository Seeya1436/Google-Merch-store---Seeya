import React from 'react';
import { ArrowRight, History, Plus } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GoogleColorDots } from '../common/GoogleLogo';
import { PRODUCTS } from '../../data/products';

export const EditorialSection: React.FC = () => {
  const { navigateToPLPWithCategory, openProductDetail, addToCart } = useShop();

  const retroPickleball = PRODUCTS.find((p) => p.code === 'GGOEGFBB265399') || PRODUCTS[0];
  const retroPullover = PRODUCTS.find((p) => p.code === 'GGOEGXXX2631') || PRODUCTS[1];

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white min-h-[480px] sm:min-h-[520px] flex flex-col lg:flex-row items-center justify-between border border-neutral-800 shadow-2xl p-6 sm:p-12 lg:p-14 gap-8">
        
        {/* Background Subtle Gradient & Texture */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/30 via-neutral-950 to-neutral-950"></div>

        {/* Left Editorial Copy */}
        <div className="relative z-10 max-w-xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-[#FBBC05] font-mono border border-white/10">
            <History className="w-3.5 h-3.5" />
            <span>Stanford Garage 1998 Archival Capsule</span>
            <GoogleColorDots size="w-1 h-1" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
            GOOGLE 1998. <br />
            <span className="text-neutral-300 font-light text-2xl sm:text-4xl block mt-2">
              Old-school roots. <br />Center-court energy.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            Before billions of daily searches, there was Susan Wojcicki's garage in Menlo Park. The official 1998 Retro Drop pays homage to our founding era with custom composite pickleball paddles, heavyweight organic fleece, and vintage collegiate branding.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => navigateToPLPWithCategory('1998-retro')}
              className="px-8 py-4 bg-white text-black font-extrabold rounded-2xl text-xs sm:text-sm hover:bg-neutral-100 transition-all shadow-xl flex items-center justify-center space-x-2 group hover:ring-2 hover:ring-[#4285F4]/50"
            >
              <span>SHOP 1998 RETRO</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateToPLPWithCategory('new')}
              className="px-6 py-4 bg-neutral-900/80 backdrop-blur-md text-white font-semibold rounded-2xl text-xs sm:text-sm border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center"
            >
              EXPLORE ALL NEW
            </button>
          </div>
        </div>

        {/* Right Featured Official Products (Direct Conversion Cards) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto lg:shrink-0">
          {/* Card 1: 1998 Pickleball Set */}
          {retroPickleball && (
            <div className="bg-neutral-900/90 border border-neutral-700/70 rounded-2xl p-4 w-full sm:w-60 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 shadow-xl group">
              <div
                className="relative aspect-square bg-white rounded-xl p-3 overflow-hidden mb-3 cursor-pointer"
                onClick={() => openProductDetail(retroPickleball)}
              >
                <img
                  src={retroPickleball.images[0]}
                  alt={retroPickleball.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 text-[9px] font-mono font-bold bg-black/80 text-white px-1.5 py-0.5 rounded">
                  LIMITED DROP
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  {retroPickleball.code}
                </div>
                <h4
                  onClick={() => openProductDetail(retroPickleball)}
                  className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer mt-0.5"
                >
                  {retroPickleball.name}
                </h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800">
                  <span className="text-sm font-black text-white">
                    ${retroPickleball.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(retroPickleball, retroPickleball.colors[0], undefined, 1);
                    }}
                    className="px-3 py-1.5 bg-white text-black text-xs font-extrabold rounded-lg hover:bg-amber-300 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Marine Layer 1998 Pullover */}
          {retroPullover && (
            <div className="bg-neutral-900/90 border border-neutral-700/70 rounded-2xl p-4 w-full sm:w-60 flex flex-col justify-between hover:border-blue-400/60 transition-all duration-300 shadow-xl group">
              <div
                className="relative aspect-square bg-white rounded-xl p-3 overflow-hidden mb-3 cursor-pointer"
                onClick={() => openProductDetail(retroPullover)}
              >
                <img
                  src={retroPullover.images[0]}
                  alt={retroPullover.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 text-[9px] font-mono font-bold bg-[#4285F4] text-white px-1.5 py-0.5 rounded">
                  CAMPUS FLEECE
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                  {retroPullover.code}
                </div>
                <h4
                  onClick={() => openProductDetail(retroPullover)}
                  className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer mt-0.5"
                >
                  {retroPullover.name}
                </h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800">
                  <span className="text-sm font-black text-white">
                    ${retroPullover.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(retroPullover, retroPullover.colors[0], retroPullover.sizes ? retroPullover.sizes[1] : undefined, 1);
                    }}
                    className="px-3 py-1.5 bg-white text-black text-xs font-extrabold rounded-lg hover:bg-blue-300 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
