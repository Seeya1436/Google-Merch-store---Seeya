import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { LIFESTYLE_COLLECTIONS } from '../../data/categories';
import { useShop } from '../../context/ShopContext';
import { GoogleColorDots, GoogleGIcon } from '../common/GoogleLogo';

export const FindYourFit: React.FC = () => {
  const { navigateToPLPWithLifestyle } = useShop();

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold font-mono uppercase tracking-widest mb-3 border border-neutral-200">
          <GoogleColorDots size="w-1.5 h-1.5" />
          <span>Lifestyle Curation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          FIND YOUR{' '}
          <span className="inline-flex items-center">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </span>{' '}
          FIT
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          Select a vibe tailored for your daily routine, developer setup, or weekend adventure.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LIFESTYLE_COLLECTIONS.map((option) => (
          <div
            key={option.id}
            onClick={() => navigateToPLPWithLifestyle(option.id)}
            className="group relative rounded-3xl overflow-hidden bg-neutral-900 h-64 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200 hover:border-[#4285F4]/50"
          >
            <img
              src={option.image}
              alt={option.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-85"
              referrerPolicy="no-referrer"
            />

            <div className={`absolute inset-0 bg-gradient-to-t ${option.bgGradient} mix-blend-multiply`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-blue-300 transition-colors">
                {option.title}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                {option.subtitle}
              </p>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-white">
                <span>Explore <ArrowRight className="w-3.5 h-3.5 inline ml-1 group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

