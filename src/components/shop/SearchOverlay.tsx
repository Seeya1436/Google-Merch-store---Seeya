import React, { useEffect, useRef } from 'react';
import { Search, X, TrendingUp, History, ArrowRight, Folder, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from './ProductCard';
import { GoogleGIcon, GoogleColorStripe, GoogleColorDots } from '../common/GoogleLogo';
import { trackSearch } from '../../utils/analytics';

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
    navigateToPLPWithCategory,
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

  const POPULAR_SEARCHES = ['1998 Retro', 'Google Hoodie', 'Pixel Cap', 'Mugs', 'Desk Mat', 'Collectibles', 'Tote Bag'];

  const q = searchQuery.trim().toLowerCase();

  // 1. Matched Products
  const matchedProducts = q
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.collection && p.collection.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }).slice(0, 6)
    : [];

  // 2. Matched Categories
  const matchedCategories = q
    ? CATEGORIES.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
    : [];

  // 3. Matched Collections
  const ALL_COLLECTIONS = [
    { name: '1998 Retro Collection', slug: 'retro', term: 'retro' },
    { name: 'Google Brand Collection', slug: 'google', term: 'google' },
    { name: 'Google Pixel Collection', slug: 'pixel', term: 'pixel' },
    { name: 'Android Bugdroid Collection', slug: 'android', term: 'android' },
    { name: 'YouTube Creator Collection', slug: 'youtube', term: 'youtube' },
    { name: 'Google Cloud & Dev', slug: 'cloud', term: 'cloud' },
  ];
  const matchedCollections = q
    ? ALL_COLLECTIONS.filter((col) => col.name.toLowerCase().includes(q) || col.term.toLowerCase().includes(q))
    : [];

  // 4. Suggested Related Searches
  const contextualSuggestions = q
    ? ['Retro', 'Hoodie', 'Mug', 'Cap', 'Desk Mat', 'Tote', 'Keychain', 'Stickers']
        .filter((s) => s.toLowerCase().includes(q) || q.includes(s.toLowerCase()))
    : [];

  const handleSelectSearch = (term: string) => {
    trackSearch(term);
    setSearchQuery(term);
    addRecentSearch(term);
    setFilters((prev) => ({ ...prev, searchQuery: term, category: 'all' }));
    setActiveView('plp');
    setIsSearchOpen(false);
  };

  const handleSelectCategory = (catId: any) => {
    trackSearch(`category:${catId}`);
    navigateToPLPWithCategory(catId);
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      trackSearch(searchQuery.trim());
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-white border border-neutral-200 shadow-xs flex items-center justify-center p-1">
              <GoogleGIcon className="w-full h-full" />
            </div>
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-neutral-600">
              Smart Search • Official Google Merchandise
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
        <div className="py-6 sm:py-8">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 font-mono mb-3">
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
              placeholder="Search hoodie, 1998 retro, cap, desk mat, mug..."
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

        {/* PRD Section 16 Grouped Results Preview */}
        {searchQuery.trim() ? (
          <div className="space-y-8">
            
            {/* 1. Categorical & Collection suggestions bar */}
            {(matchedCategories.length > 0 || matchedCollections.length > 0 || contextualSuggestions.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-3xl bg-neutral-50 border border-neutral-200">
                {/* CATEGORIES */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center space-x-1">
                    <Folder className="w-3 h-3 text-blue-500" />
                    <span>CATEGORIES</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedCategories.length > 0 ? (
                      matchedCategories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleSelectCategory(c.id)}
                          className="px-2.5 py-1 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                          {c.name}
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-400">No categories</span>
                    )}
                  </div>
                </div>

                {/* COLLECTIONS */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>COLLECTIONS</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedCollections.length > 0 ? (
                      matchedCollections.map((col) => (
                        <button
                          key={col.slug}
                          onClick={() => handleSelectSearch(col.term)}
                          className="px-2.5 py-1 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-amber-500 hover:text-amber-600 transition-colors"
                        >
                          {col.name}
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-400">No collections</span>
                    )}
                  </div>
                </div>

                {/* TRENDING SEARCHES */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span>TRENDING SEARCHES</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {contextualSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSelectSearch(s)}
                        className="px-2.5 py-1 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. MATCHING PRODUCTS */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-700">
                  PRODUCTS ({matchedProducts.length})
                </h3>
                <button
                  onClick={() => handleSelectSearch(searchQuery)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center"
                >
                  View All Products ({matchedProducts.length}) <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
                <div className="text-center py-12 text-neutral-500 text-sm bg-neutral-50 rounded-3xl border border-neutral-200 p-6">
                  No merchandise matched "<strong>{searchQuery}</strong>". Try searching for "hoodie", "1998 retro", "cap", or "bottle".
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Popular & Recent Searches when input is empty */
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
