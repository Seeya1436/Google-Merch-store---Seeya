import React, { useState } from 'react';
import { ArrowRight, Sparkles, Layers, Box } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useShop } from '../../context/ShopContext';
import { GoogleColorDots } from '../common/GoogleLogo';

export const ShopByCategory: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'franchises' | 'departments'>('all');

  const franchiseIds = ['android', 'youtube', 'cloud', 'chrome', 'gemini'];
  const departmentIds = ['apparel', 'accessories', 'drinkware', 'home', 'collectibles'];

  const displayCategories = CATEGORIES.filter((c) => {
    if (activeTab === 'franchises') return franchiseIds.includes(c.id);
    if (activeTab === 'departments') return departmentIds.includes(c.id);
    return franchiseIds.includes(c.id) || departmentIds.includes(c.id);
  });

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <GoogleColorDots size="w-1.5 h-1.5" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
              Official Collections &amp; Departments
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-brand">
            SHOP BY COLLECTION
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center space-x-1.5 bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-neutral-900 shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All Collections ({CATEGORIES.filter((c) => franchiseIds.includes(c.id) || departmentIds.includes(c.id)).length})
          </button>

          <button
            onClick={() => setActiveTab('franchises')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 ${
              activeTab === 'franchises'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#FBBC05]" />
            <span>Brand Universes</span>
          </button>

          <button
            onClick={() => setActiveTab('departments')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'departments'
                ? 'bg-white text-neutral-900 shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Everyday Gear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCategories.map((category, index) => {
          const isFeaturedLarge = (activeTab === 'all' && (index === 0 || index === 5)) || (activeTab === 'franchises' && index === 0);
          const isBrandUniverse = franchiseIds.includes(category.id);

          return (
            <div
              key={category.id}
              onClick={() => navigateToPLPWithCategory(category.id)}
              className={`group relative rounded-3xl overflow-hidden bg-neutral-900 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-neutral-200/80 ${
                isFeaturedLarge ? 'md:col-span-2 h-[380px]' : 'h-[380px]'
              }`}
            >
              <img
                src={category.bannerImage}
                alt={category.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white">
                    {category.itemCount} Items
                  </span>
                  {isBrandUniverse && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4285F4]/30 text-blue-200 border border-blue-400/30">
                      Official Franchise
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 font-brand">
                  {category.name}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mb-4 line-clamp-2">
                  {category.shortDescription}
                </p>

                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-white group-hover:text-blue-300 transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
