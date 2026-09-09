import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useShop } from '../../context/ShopContext';

export const ShopByCategory: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  // Filter main categories for homepage grid (Apparel, Accessories, Drinkware, Home, Collectibles)
  const displayCategories = CATEGORIES.filter((c) =>
    ['apparel', 'accessories', 'drinkware', 'home', 'collectibles'].includes(c.id)
  );

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono block mb-1">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            SHOP BY CATEGORY
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mt-2 md:mt-0">
          Designed with intention. Built with premium materials. Inspired by Google technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCategories.map((category, index) => {
          const isFeaturedLarge = index === 0; // First item gets 2-col span on desktop if desired
          return (
            <div
              key={category.id}
              onClick={() => navigateToPLPWithCategory(category.id)}
              className={`group relative rounded-3xl overflow-hidden bg-neutral-900 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-neutral-200/80 ${
                isFeaturedLarge ? 'md:col-span-2 lg:col-span-2 h-[380px]' : 'h-[380px]'
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
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  {category.name.toUpperCase()}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mb-4 line-clamp-2">
                  {category.shortDescription}
                </p>

                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-white group-hover:text-blue-300 transition-colors">
                  <span>Shop Collection</span>
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
