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
          if (!product.isNew && !product.routes?.some((r) => r.includes('/shop/new'))) return false;
        } else if (filters.category === 'best-sellers') {
          if (!product.isBestSeller) return false;
        } else if (filters.category === 'sale' || filters.category === 'clearance') {
          if (!product.isSale && !product.routes?.some((r) => r.includes('clearance'))) return false;
        } else if (filters.category === 'featured') {
          if (!product.isBestSeller && !product.isNew && !product.tags?.includes('featured')) return false;
        } else if (filters.category === 'mens') {
          const isMens =
            product.category === 'mens' ||
            product.itemType?.toLowerCase().includes("men's") ||
            product.routes?.some((r) => r.includes('/shop/apparel/mens'));
          if (!isMens) return false;
        } else if (filters.category === 'womens') {
          const isWomens =
            product.category === 'womens' ||
            product.itemType?.toLowerCase().includes("women's") ||
            product.routes?.some((r) => r.includes('/shop/apparel/womens'));
          if (!isWomens) return false;
        } else if (filters.category === 'headgear') {
          const isHeadgear =
            product.category === 'headgear' ||
            product.itemType?.toLowerCase().includes('headgear') ||
            product.name.toLowerCase().includes('cap') ||
            product.name.toLowerCase().includes('hat') ||
            product.routes?.some((r) => r.includes('/shop/apparel/headgear'));
          if (!isHeadgear) return false;
        } else if (filters.category === 'socks') {
          const isSocks =
            product.category === 'socks' ||
            product.name.toLowerCase().includes('sock') ||
            product.routes?.some((r) => r.includes('/shop/apparel/socks'));
          if (!isSocks) return false;
        } else if (filters.category === 'bags') {
          const isBags =
            product.category === 'bags' ||
            product.itemType?.toLowerCase().includes('bags') ||
            product.name.toLowerCase().includes('tote') ||
            product.name.toLowerCase().includes('backpack') ||
            product.name.toLowerCase().includes('case') ||
            product.routes?.some((r) => r.includes('/shop/lifestyle/bags'));
          if (!isBags) return false;
        } else if (filters.category === 'drinkware') {
          const isDrinkware =
            product.category === 'drinkware' ||
            product.itemType?.toLowerCase().includes('drinkware') ||
            product.name.toLowerCase().includes('tumbler') ||
            product.name.toLowerCase().includes('mug') ||
            product.name.toLowerCase().includes('bottle') ||
            product.routes?.some((r) => r.includes('/shop/lifestyle/drinkware'));
          if (!isDrinkware) return false;
        } else if (filters.category === 'eco-friendly') {
          const isEco =
            product.category === 'eco-friendly' ||
            product.ecoFriendly === true ||
            product.routes?.some((r) => r.includes('/shop/lifestyle/eco-friendly'));
          if (!isEco) return false;
        } else if (filters.category === 'stationery') {
          const isStationery =
            product.category === 'stationery' ||
            product.itemType?.toLowerCase().includes('stationery') ||
            product.name.toLowerCase().includes('notebook') ||
            product.name.toLowerCase().includes('pencil') ||
            product.name.toLowerCase().includes('sticker') ||
            product.routes?.some((r) => r.includes('/shop/stationery'));
          if (!isStationery) return false;
        } else if (filters.category === 'kids') {
          const isKids =
            product.category === 'kids' ||
            product.itemType?.toLowerCase().includes('kids') ||
            product.name.toLowerCase().includes('youth') ||
            product.name.toLowerCase().includes('toddler') ||
            product.name.toLowerCase().includes('puzzle') ||
            product.name.toLowerCase().includes('pickleball') ||
            product.routes?.some((r) => r.includes('/shop/apparel/kids') || r.includes('fun-and-games'));
          if (!isKids) return false;
        } else if (filters.category === '1998-retro' || filters.category === 'retro') {
          const isRetro =
            product.category === '1998-retro' ||
            product.collection?.toLowerCase().includes('1998') ||
            product.name.toLowerCase().includes('1998') ||
            product.badge?.toLowerCase().includes('retro') ||
            product.routes?.some((r) => r.includes('1998-retro-collection'));
          if (!isRetro) return false;
        } else if (filters.category === 'chrome-dino' || filters.category === 'chrome') {
          const isDino =
            product.category === 'chrome-dino' ||
            product.collection?.toLowerCase().includes('dino') ||
            product.name.toLowerCase().includes('dino') ||
            product.routes?.some((r) => r.includes('chrome-dino'));
          if (!isDino) return false;
        } else if (filters.category === 'super-g') {
          const isSuperG =
            product.category === 'super-g' ||
            product.name.toLowerCase().includes('super g') ||
            product.routes?.some((r) => r.includes('super-g'));
          if (!isSuperG) return false;
        } else if (filters.category === 'google-bike') {
          const isBike =
            product.category === 'google-bike' ||
            product.name.toLowerCase().includes('bike') ||
            product.routes?.some((r) => r.includes('google-bike'));
          if (!isBike) return false;
        } else if (filters.category === 'android') {
          const isAndroid =
            product.category === 'android' ||
            product.brand === 'Android' ||
            product.name.toLowerCase().includes('android') ||
            product.routes?.some((r) => r.includes('/shop/shop-by-brand/android'));
          if (!isAndroid) return false;
        } else if (filters.category === 'youtube') {
          const isYt =
            product.category === 'youtube' ||
            product.brand === 'YouTube' ||
            product.name.toLowerCase().includes('youtube') ||
            product.routes?.some((r) => r.includes('/shop/shop-by-brand/youtube'));
          if (!isYt) return false;
        } else if (filters.category === 'cloud') {
          const isCloud =
            product.category === 'cloud' ||
            product.brand === 'Google Cloud' ||
            product.name.toLowerCase().includes('cloud') ||
            product.routes?.some((r) => r.includes('/shop/shop-by-brand/google-cloud'));
          if (!isCloud) return false;
        } else if (filters.category === 'google') {
          const isGoogle =
            product.brand === 'Google' ||
            product.routes?.some((r) => r.includes('/shop/shop-by-brand/google'));
          if (!isGoogle) return false;
        } else if (product.category !== filters.category && product.collection?.toLowerCase() !== filters.category) {
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
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesColl = product.collection ? product.collection.toLowerCase().includes(q) : false;
        const matchesBrand = product.brand ? product.brand.toLowerCase().includes(q) : false;
        const matchesSub = product.subCategory ? product.subCategory.toLowerCase().includes(q) : false;
        const matchesTags = product.tags ? product.tags.some((t) => t.toLowerCase().includes(q)) : false;
        if (!matchesName && !matchesTag && !matchesDesc && !matchesCat && !matchesColl && !matchesBrand && !matchesSub && !matchesTags) {
          return false;
        }
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
                Google Store Catalog
              </span>
              {filters.category !== 'all' && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center transition-colors"
                >
                  &larr; Back to All Merchandise
                </button>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
              {categoryTitle}
            </h1>
          </div>

          <div className="text-xs font-mono font-bold text-neutral-500">
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
            { id: '1998-retro', label: '1998 Retro Collection' },
            { id: 'mens', label: "Men's Apparel" },
            { id: 'womens', label: "Women's Apparel" },
            { id: 'headgear', label: 'Headgear & Caps' },
            { id: 'bags', label: 'Bags & Packs' },
            { id: 'drinkware', label: 'Drinkware' },
            { id: 'socks', label: 'Socks' },
            { id: 'accessories', label: 'Accessories' },
            { id: 'eco-friendly', label: 'Eco-Friendly' },
            { id: 'stationery', label: 'Stationery' },
            { id: 'kids', label: 'Kids & Games' },
            { id: 'chrome-dino', label: 'Chrome Dino' },
            { id: 'super-g', label: 'Super G' },
            { id: 'google-bike', label: 'Google Bike' },
            { id: 'android', label: 'Android' },
            { id: 'youtube', label: 'YouTube' },
            { id: 'cloud', label: 'Google Cloud' },
            { id: 'best-sellers', label: 'Best Sellers' },
            { id: 'sale', label: 'Clearance' },
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
