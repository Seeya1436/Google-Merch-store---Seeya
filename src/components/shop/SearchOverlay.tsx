import React, { useEffect, useRef } from 'react';
import { Search, X, TrendingUp, History, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { GoogleGIcon, GoogleColorStripe, GoogleColorDots } from '../common/GoogleLogo';

export const SearchOverlay: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    setFilters,
    setActiveView,
  } = useShop();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const POPULAR_SEARCHES = ['Google Hoodie', 'Pixel Cap', 'Mugs', 'Desk Mat', 'Collectibles', 'Tote Bag'];

  const matchedProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const handleSelectSearch = (term: string) => {
    setSearchQuery(term);
    addRecentSearch(term);
    setFilters((prev) => ({ ...prev, searchQuery: term, category: 'all' }));
    setActiveView('plp');
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      addRecentSearch(searchQuery);
      setFilters((prev) => ({ ...prev, searchQuery: searchQuery.trim(), category: 'all' }));
      setActiveView('plp');
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      {/* Google 4-Color Accent Line */}
      <GoogleColorStripe className="h-1 w-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-white border border-neutral-200 shadow-xs flex items-center justify-center p-1">
              <GoogleGIcon className="w-full h-full" />
            </div>
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-neutral-600">
              Search Official Google Store
            </span>
            <GoogleColorDots size="w-1 h-1" />
          </div>

          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Close search overlay"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="py-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 font-mono mb-3">
            WHAT ARE YOU LOOKING FOR?
          </h2>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <GoogleGIcon className="w-6 h-6 shrink-0" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search Google merch, hoodies, caps, desk mats..."
              className="w-full bg-neutral-100 border-2 border-transparent focus:border-[#4285F4] rounded-3xl pl-14 pr-12 py-4 sm:py-5 text-lg sm:text-2xl font-bold text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results Preview */}
        {searchQuery.trim() ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-700">
                Matching Products ({matchedProducts.length})
              </h3>
              <button
                onClick={() => handleSelectSearch(searchQuery)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center"
              >
                View All Results <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            {matchedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {matchedProducts.map((product) => (
                  <div key={product.id} onClick={() => setIsSearchOpen(false)}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500 text-sm">
                No merchandise matched "<strong>{searchQuery}</strong>". Try searching for "hoodie", "cap", "bottle", or "desk".
              </div>
            )}
          </div>
        ) : (
          /* Popular & Recent Searches */
          <div className="space-y-8 pt-4">
            
            {/* Popular Searches */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider font-mono text-neutral-500 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>POPULAR SEARCHES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectSearch(term)}
                    className="px-4 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 text-xs font-bold transition-colors border border-neutral-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider font-mono text-neutral-500 mb-3">
                  <div className="flex items-center space-x-2">
                    <History className="w-4 h-4 text-neutral-500" />
                    <span>RECENT SEARCHES</span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-[10px] text-neutral-400 hover:text-black font-semibold"
                  >
                    Clear History
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectSearch(term)}
                      className="px-3.5 py-2 rounded-xl bg-neutral-50 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-colors border border-neutral-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
