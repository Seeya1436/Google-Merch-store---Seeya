import React from 'react';
import { ArrowRight, Monitor, Laptop } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const EditorialSection: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white min-h-[480px] sm:min-h-[560px] flex items-center justify-start border border-neutral-800 shadow-2xl">
        
        {/* Background Desk Setup Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/desk_google_lifestyle_1786590865405.jpg"
            alt="Google Desk Lifestyle Workspace"
            className="w-full h-full object-cover object-center opacity-70 scale-105 hover:scale-100 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-16 max-w-xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
            <Monitor className="w-3.5 h-3.5" />
            <span>Workspace & Desk Culture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            MORE THAN MERCH. <br />
            <span className="text-neutral-300 font-light">
              BUILT FOR YOUR DESK. <br />
              MADE FOR YOUR DAY.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            From acoustic merino wool desk mats to double-walled ceramic mugs, transform your workstation into a clean, distraction-free environment.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigateToPLPWithCategory('home')}
              className="px-8 py-4 bg-white text-black font-bold rounded-2xl text-xs sm:text-sm hover:bg-neutral-100 transition-all shadow-xl flex items-center space-x-2 group"
            >
              <span>SHOP DESK ESSENTIALS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
