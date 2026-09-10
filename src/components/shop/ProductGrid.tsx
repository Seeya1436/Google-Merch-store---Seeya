import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid3X3, Grid2X2, RotateCcw, Search, X } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { FilterDrawer } from './FilterDrawer';
import { useShop } from '../../context/ShopContext';
import { SortOption } from '../../types';

export const ProductGrid: React.FC = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    selectedCategory,
    selectedLifestyle,
    sortOption,
    setSortOption,
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category & Collection filter
      if (filters.category !== 'all') {
        if (filters.category === 'new') {
          if (!product.isNew) return false;
        } else if (filters.category === 'best-sellers') {
          if (!product.isBestSeller) return false;
        } else if (filters.category === 'sale') {
          if (!product.isSale) return false;
        } else if (filters.category === 'android') {
          const isAndroid = product.category === 'android' || product.id.includes('android') || product.name.toLowerCase().includes('android') || product.name.toLowerCase().includes('bugdroid');
          if (!isAndroid) return false;
        } else if (filters.category === 'youtube') {
          const isYt = product.category === 'youtube' || product.id.includes('yt') || product.name.toLowerCase().includes('youtube');
          if (!isYt) return false;
        } else if (filters.category === 'cloud') {
          const isCloud = product.category === 'cloud' || product.id.includes('cloud') || product.name.toLowerCase().includes('cloud') || product.name.toLowerCase().includes('gopher');
          if (!isCloud) return false;
        } else if (filters.category === 'chrome') {
          const isChrome = product.category === 'chrome' || product.id.includes('dino') || product.name.toLowerCase().includes('chrome') || product.name.toLowerCase().includes('dinosaur');
          if (!isChrome) return false;
        } else if (filters.category === 'gemini') {
          const isGemini = product.category === 'gemini' || product.name.toLowerCase().includes('gemini');
          if (!isGemini) return false;
        } else if (product.category !== filters.category) {
          return false;
        }
      }

      // Lifestyle filter
      if (filters.lifestyle !== 'all') {
        if (!product.lifestyleCollection || !product.lifestyleCollection.includes(filters.lifestyle)) {
          return false;
        }
      }

      // Price range
      if (product.price > filters.priceRange[1]) return false;

      // Badges
      if (filters.onlyNew && !product.isNew) return false;
      if (filters.onlySale && !product.isSale) return false;
      if (filters.onlyEco && !product.ecoFriendly) return false;

      // Colors
      if (filters.colors.length > 0) {
        const hasMatchingColor = product.colors.some((c) =>
          filters.colors.some((fc) => c.name.toLowerCase().includes(fc.toLowerCase()))
        );
        if (!hasMatchingColor) return false;
      }

      // Sizes
      if (filters.sizes.length > 0) {
        if (!product.sizes) return false;
        const hasMatchingSize = product.sizes.some((s) => filters.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTag = product.tagline.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesTag && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortOption === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [filters, sortOption]);

  // Current category label
  const categoryTitle = useMemo(() => {
    if (filters.category === 'all') return 'ALL MERCHANDISE';
    const found = CATEGORIES.find((c) => c.id === filters.category);
    return found ? found.name.toUpperCase() : 'PRODUCTS';
  }, [filters.category]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Category Header Banner */}
      <div className="mb-8 pb-6 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono block mb-1">
              Google Store Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
              {categoryTitle}
            </h1>
          </div>

          <div className="mt-4 md:mt-0 text-xs font-mono font-bold text-neutral-500">
            SHOWING <span className="text-neutral-900 font-extrabold">{filteredProducts.length}</span> PRODUCTS
          </div>
        </div>

        {/* Active Filter Badges */}
        {(filters.category !== 'all' ||
          filters.lifestyle !== 'all' ||
          filters.colors.length > 0 ||
          filters.sizes.length > 0 ||
          filters.onlyNew ||
          filters.onlySale ||
          filters.onlyEco ||
          filters.searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral-100">
            <span className="text-xs font-bold text-neutral-400 font-mono mr-1">Active:</span>

            {filters.category !== 'all' && (
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-neutral-900 text-white">
                Cat: {filters.category}
                <X
                  className="w-3 h-3 ml-1.5 cursor-pointer hover:text-red-300"
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                />
              </span>
            )}

            {filters.lifestyle !== 'all' && (
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-blue-600 text-white">
                Vibe: {filters.lifestyle}
                <X
                  className="w-3 h-3 ml-1.5 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, lifestyle: 'all' }))}
                />
              </span>
            )}

            {filters.onlyNew && (
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                New Drops
                <X
                  className="w-3 h-3 ml-1.5 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, onlyNew: false }))}
                />
              </span>
            )}

            {filters.onlySale && (
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-800">
                Sale Only
                <X
                  className="w-3 h-3 ml-1.5 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, onlySale: false }))}
                />
              </span>
            )}

            {filters.searchQuery && (
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-neutral-200 text-neutral-900">
                Search: "{filters.searchQuery}"
                <X
                  className="w-3 h-3 ml-1.5 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                />
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs font-bold text-red-600 underline hover:text-red-800 ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Quick Collection Switcher Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-4 pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'new', label: 'New Drops' },
            { id: 'apparel', label: 'Apparel' },
            { id: 'accessories', label: 'Accessories' },
            { id: 'drinkware', label: 'Drinkware' },
            { id: 'home', label: 'Home & Office' },
            { id: 'collectibles', label: 'Collectibles' },
            { id: 'android', label: 'Android' },
            { id: 'youtube', label: 'YouTube' },
            { id: 'cloud', label: 'Google Cloud' },
            { id: 'chrome', label: 'Chrome Dino' },
            { id: 'gemini', label: 'Gemini AI' },
            { id: 'best-sellers', label: 'Best Sellers' },
            { id: 'sale', label: 'Sale' },
          ].map((pill) => {
            const isSelected = filters.category === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setFilters((prev) => ({ ...prev, category: pill.id as any }))}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all select-none ${
                  isSelected
                    ? 'bg-[#4285F4] text-white shadow-xs scale-105 font-bold'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex gap-8">
        
        {/* Desktop Sidebar */}
        <FilterSidebar />

        {/* Products Main View */}
        <div className="flex-1 min-w-0">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
            
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 bg-white hover:bg-neutral-50 shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {/* Layout Toggles (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1 border border-neutral-200 rounded-xl p-1 bg-neutral-50">
              <button
                onClick={() => setColumns(3)}
                className={`p-1.5 rounded-lg transition-colors ${
                  columns === 3 ? 'bg-white shadow-xs text-black font-bold' : 'text-neutral-400 hover:text-black'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1.5 rounded-lg transition-colors ${
                  columns === 4 ? 'bg-white shadow-xs text-black font-bold' : 'text-neutral-400 hover:text-black'
                }`}
                title="4 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Options Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-neutral-400 font-mono hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-white border border-neutral-300 text-neutral-900 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-xs cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest Drops</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>

          {/* Product Grid Render */}
          {filteredProducts.length > 0 ? (
            <div
              className={`grid gap-6 ${
                columns === 3
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-neutral-50 rounded-3xl border border-neutral-200 p-8 max-w-md mx-auto my-8">
              <Search className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-neutral-900">No merchandise found</h3>
              <p className="text-xs text-neutral-500 mt-1 mb-6">
                We couldn't find any items matching your selected criteria. Try adjusting your filters or price limit.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-neutral-900 text-white font-bold rounded-2xl text-xs flex items-center justify-center space-x-2 mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Drawer */}
      <FilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      />

    </div>
  );
};
