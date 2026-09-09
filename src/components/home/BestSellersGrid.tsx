import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { useShop } from '../../context/ShopContext';

export const BestSellersGrid: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <div className="flex items-center space-x-1.5 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest mb-1">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>Community Favourites</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            THE ONES EVERYONE WANTS
          </h2>
        </div>

        <button
          onClick={() => navigateToPLPWithCategory('best-sellers')}
          className="mt-4 sm:mt-0 text-xs sm:text-sm font-bold text-neutral-900 hover:text-blue-600 flex items-center space-x-1 group"
        >
          <span>SHOP BEST SELLERS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
};
