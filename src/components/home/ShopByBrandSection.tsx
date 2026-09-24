import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryId } from '../../types';
import { GoogleColorDots } from '../common/GoogleLogo';

interface BrandCardItem {
  id: CategoryId;
  name: string;
  tagline: string;
  itemCount: number;
  image: string;
  badge: string;
  colorBorder: string;
}

export const ShopByBrandSection: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  const BRANDS: BrandCardItem[] = [
    {
      id: 'google',
      name: 'Google Heritage',
      tagline: 'Classic 4-color Mountain View campus essentials',
      itemCount: 24,
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2600.jpg',
      badge: 'OFFICIAL 1998',
      colorBorder: 'hover:border-[#4285F4]',
    },
    {
      id: 'android',
      name: 'Android',
      tagline: 'Bugdroid classic plushies, socks & collectibles',
      itemCount: 8,
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEAFDH232399.jpg',
      badge: 'BUGDROID',
      colorBorder: 'hover:border-[#34A853]',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      tagline: 'Icon mugs, cotton creator totes & athletic shorts',
      itemCount: 8,
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEYDWB210799.jpg',
      badge: 'CREATOR GEAR',
      colorBorder: 'hover:border-[#EA4335]',
    },
    {
      id: 'chrome-dino',
      name: 'Chrome Dino',
      tagline: 'Offline runner vinyls, magic umbrellas & game mugs',
      itemCount: 14,
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGABJ125299.jpg',
      badge: 'OFFLINE RUNNER',
      colorBorder: 'hover:border-neutral-800',
    },
    {
      id: 'cloud',
      name: 'Google Cloud',
      tagline: 'Onyx zip hoodies, iconic stripe socks & pins',
      itemCount: 8,
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOECXXX1898.jpg',
      badge: 'DEV & CLOUD',
      colorBorder: 'hover:border-[#4285F4]',
    },
    {
      id: 'accessories',
      name: 'Google Maps',
      tagline: 'Iconic pin patches, reflective stickers & tags',
      itemCount: 4,
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GMSSGCBA105799.jpg',
      badge: 'EXPLORER',
      colorBorder: 'hover:border-[#34A853]',
    },
  ];

  return (
    <section id="shop-by-brand" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <GoogleColorDots size="w-1.5 h-1.5" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
              Ecosystem & Brands
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            SHOP BY BRAND
          </h2>
          <p className="text-sm text-neutral-500 mt-1 max-w-xl">
            Direct access to official gear across Google's global product families.
          </p>
        </div>

        <button
          onClick={() => navigateToPLPWithCategory('all')}
          className="text-xs font-bold text-neutral-700 hover:text-black flex items-center space-x-1 uppercase tracking-wider group"
        >
          <span>All Brand Families</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {BRANDS.map((brand) => (
          <div
            key={brand.id + brand.name}
            onClick={() => navigateToPLPWithCategory(brand.id)}
            className={`group bg-white rounded-2xl p-4 border border-neutral-200 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${brand.colorBorder} flex flex-col justify-between`}
          >
            <div className="relative aspect-square w-full rounded-xl bg-neutral-50 p-2 overflow-hidden mb-3 border border-neutral-100 flex items-center justify-center">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2600.jpg';
                }}
              />
              <span className="absolute top-1.5 left-1.5 text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white/90 shadow-2xs text-neutral-800">
                {brand.badge}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-neutral-900 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </h3>
              <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2 leading-snug">
                {brand.tagline}
              </p>
              <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-neutral-600">
                <span>{brand.itemCount} items</span>
                <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
