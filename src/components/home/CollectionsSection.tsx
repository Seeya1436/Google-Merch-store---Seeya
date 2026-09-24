import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryId } from '../../types';
import { GoogleColorDots } from '../common/GoogleLogo';

interface CollectionItem {
  id: CategoryId;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  heroProduct: string;
  price: string;
  bgGradient: string;
}

export const CollectionsSection: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  const COLLECTIONS: CollectionItem[] = [
    {
      id: '1998-retro',
      title: '1998 Retro Collection',
      subtitle: 'Nostalgic garage roots, retro pickleball rallies, and archival varsity fleece.',
      badge: 'ARCHIVAL DROP',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGFBB265399.jpg',
      heroProduct: '1998 Pickleball Set & Marine Layer Pullover',
      price: 'From $18',
      bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-300/40',
    },
    {
      id: 'chrome-dino',
      title: 'Chrome Dino Universe',
      subtitle: 'The legendary offline runner dinosaur in vinyl figures, umbrellas, mugs & socks.',
      badge: 'FAN FAVORITE',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGABJ125299.jpg',
      heroProduct: 'Collectible Figurines & Game Over Mug',
      price: 'From $14',
      bgGradient: 'from-neutral-800/10 via-neutral-700/5 to-transparent border-neutral-300/50',
    },
    {
      id: 'super-g',
      title: 'Super G Collection',
      subtitle: 'Dynamic full-spectrum gradients on vacuum hydrators, tees, and enamel pins.',
      badge: 'GRADIENT TECH',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGDHB210199.jpg',
      heroProduct: 'Laser Etched Bottle & Gradient Tee',
      price: 'From $7',
      bgGradient: 'from-blue-500/10 via-purple-500/5 to-transparent border-blue-300/40',
    },
    {
      id: 'google-bike',
      title: 'Google Campus Bike',
      subtitle: 'Celebrating the iconic multi-colored cruisers seen cycling across Mountain View.',
      badge: 'CAMPUS HERITAGE',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGAKC171799.jpg',
      heroProduct: 'Google Bike Socks & Bandana',
      price: 'From $14',
      bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-300/40',
    },
  ];

  return (
    <section id="official-collections" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <GoogleColorDots size="w-1.5 h-1.5" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
              Thematic Merchandise Series
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            OFFICIAL COLLECTIONS
          </h2>
          <p className="text-sm text-neutral-500 mt-1 max-w-xl">
            Special capsules created around Google's culture, history, and internet icons.
          </p>
        </div>

        <button
          onClick={() => navigateToPLPWithCategory('1998-retro')}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 uppercase tracking-wider group"
        >
          <span>Explore 1998 Retro</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COLLECTIONS.map((col) => (
          <div
            key={col.id}
            onClick={() => navigateToPLPWithCategory(col.id)}
            className={`group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${col.bgGradient} border cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden`}
          >
            {/* Left Content */}
            <div className="flex-1 space-y-3 z-10">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/90 shadow-xs border border-neutral-200 text-[10px] font-bold tracking-wider uppercase text-neutral-800">
                <Sparkles className="w-3 h-3 text-[#FBBC05]" />
                <span>{col.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">
                {col.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm">
                {col.subtitle}
              </p>

              <div className="pt-2 flex items-center justify-between sm:justify-start sm:space-x-4">
                <span className="text-xs font-mono font-bold text-neutral-900">
                  {col.price}
                </span>
                <span className="text-xs font-extrabold text-blue-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

            {/* Right Real Product Hero Image */}
            <div className="w-40 sm:w-48 aspect-square relative shrink-0 bg-white/90 rounded-2xl p-3 shadow-md border border-neutral-200/80 group-hover:scale-105 transition-transform duration-500">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-contain object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGFBB265399.jpg';
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 text-center bg-black/70 backdrop-blur-sm text-[9px] font-mono font-medium text-white px-1.5 py-0.5 rounded">
                Official Google Store
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
