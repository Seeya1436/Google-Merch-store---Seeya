import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryId } from '../../types';
import { GoogleColorDots } from '../common/GoogleLogo';

interface CategoryCardItem {
  id: CategoryId;
  name: string;
  tagline: string;
  image: string;
  accent: string;
  itemCount: number;
}

export const ShopByCategory: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  const CORE_CATEGORIES: CategoryCardItem[] = [
    {
      id: 'apparel',
      name: 'APPAREL',
      tagline: 'Heavyweight tees, recycled fleece & pullovers',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2600.jpg',
      accent: 'border-blue-500/20 hover:border-blue-500',
      itemCount: 28,
    },
    {
      id: 'accessories',
      name: 'ACCESSORIES',
      tagline: 'Bandanas, enamel pins, patches & lanyards',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGCBB258899.jpg',
      accent: 'border-red-500/20 hover:border-red-500',
      itemCount: 16,
    },
    {
      id: 'drinkware',
      name: 'DRINKWARE',
      tagline: 'Vacuum straw tumblers, ceramic mugs & bottles',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGDNH262199.jpg',
      accent: 'border-green-500/20 hover:border-green-500',
      itemCount: 14,
    },
    {
      id: 'bags',
      name: 'BAGS & PACKS',
      tagline: '100% recycled cotton totes & laptop cases',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GMSSGBJD112999.jpg',
      accent: 'border-yellow-500/20 hover:border-yellow-500',
      itemCount: 12,
    },
    {
      id: 'socks',
      name: 'SOCKS',
      tagline: 'Iconic jacquard knit crew & ankle socks',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGCXC264499.jpg',
      accent: 'border-purple-500/20 hover:border-purple-500',
      itemCount: 10,
    },
    {
      id: 'headgear',
      name: 'HEADGEAR',
      tagline: 'Washed chino dad hats, suede caps & beanies',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGHPB237810.jpg',
      accent: 'border-blue-500/20 hover:border-blue-500',
      itemCount: 6,
    },
    {
      id: 'stationery',
      name: 'STATIONERY',
      tagline: 'Recycled journals, rainbow pencils & stickers',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGOBA252899.jpg',
      accent: 'border-emerald-500/20 hover:border-emerald-500',
      itemCount: 12,
    },
    {
      id: 'kids',
      name: 'KIDS & GAMES',
      tagline: 'Pickleball sets, wooden puzzles & youth tees',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGFBB265399.jpg',
      accent: 'border-orange-500/20 hover:border-orange-500',
      itemCount: 10,
    },
  ];

  return (
    <section id="shop-by-category" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <GoogleColorDots size="w-1.5 h-1.5" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
              Official Store Taxonomy
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <p className="text-sm text-neutral-500 mt-1 max-w-xl">
            Explore authentic merchandise curated across official categories. Original photography from Mountain View.
          </p>
        </div>

        <button
          onClick={() => navigateToPLPWithCategory('all')}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 uppercase tracking-wider group"
        >
          <span>View All 58 Items</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {CORE_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigateToPLPWithCategory(cat.id)}
            className={`group relative rounded-2xl overflow-hidden bg-neutral-50 cursor-pointer border ${cat.accent} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col`}
          >
            {/* Image Container with high contrast backdrop */}
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 flex items-center justify-center p-4">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain object-center group-hover:scale-108 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2600.jpg';
                }}
              />
              <span className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-neutral-700 shadow-xs border border-neutral-200">
                {cat.itemCount} Items
              </span>
            </div>

            {/* Category Info */}
            <div className="p-4 bg-white flex-1 flex flex-col justify-between border-t border-neutral-100">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                  {cat.tagline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
