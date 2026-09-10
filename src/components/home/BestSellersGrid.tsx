import React, { useState } from 'react';
import { ArrowRight, Flame, Sparkles, TrendingUp, Award } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { useShop } from '../../context/ShopContext';
import { GoogleColorDots } from '../common/GoogleLogo';

export const BestSellersGrid: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();
  const [filter, setFilter] = useState<'all' | 'most-wanted' | 'best-sellers' | 'favourites'>('all');

  const trendingProducts = PRODUCTS.filter((p) => {
    if (filter === 'most-wanted') return p.rating >= 4.9 && p.reviewCount > 120;
    if (filter === 'best-sellers') return p.isBestSeller;
    if (filter === 'favourites') return p.tags?.includes('featured') || p.tags?.includes('heritage') || p.isNew;
    return p.isBestSeller || p.rating >= 4.8;
  }).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-1.5 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest mb-1">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>High Engagement &amp; Viral Drops</span>
            <GoogleColorDots size="w-1 h-1" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            TRENDING NOW
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-1">
            The Google merch everyone wants right now.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1.5 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All Trending
          </button>
          <button
            onClick={() => setFilter('most-wanted')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'most-wanted'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Most Wanted
          </button>
          <button
            onClick={() => setFilter('best-sellers')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'best-sellers'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Best Sellers
          </button>
          <button
            onClick={() => setFilter('favourites')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'favourites'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Internet Favourites
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 text-center">
        <button
          onClick={() => navigateToPLPWithCategory('best-sellers')}
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-900 font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-neutral-200"
        >
          <span>EXPLORE ALL TRENDING MERCHANDISE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};

