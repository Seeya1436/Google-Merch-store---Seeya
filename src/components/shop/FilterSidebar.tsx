import React from 'react';
import { RotateCcw, Check, Sparkles, Leaf, Tag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES, LIFESTYLE_COLLECTIONS } from '../../data/categories';
import { CategoryId, LifestyleTag } from '../../types';

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters } = useShop();

  const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  const ALL_COLORS = [
    { name: 'Black / Onyx', hex: '#1C1C1E' },
    { name: 'White / Chalk', hex: '#FFFFFF' },
    { name: 'Google Blue', hex: '#4285F4' },
    { name: 'Google Red', hex: '#EA4335' },
    { name: 'Google Yellow', hex: '#FBBC05' },
    { name: 'Google Green', hex: '#34A853' },
    { name: 'Grey / Slate', hex: '#8E8E93' },
  ];

  const handleCategoryToggle = (catId: CategoryId | 'all') => {
    setFilters((prev) => ({ ...prev, category: catId }));
  };

  const handleLifestyleToggle = (lifeId: LifestyleTag | 'all') => {
    setFilters((prev) => ({ ...prev, lifestyle: lifeId }));
  };

  const handleColorToggle = (colorName: string) => {
    setFilters((prev) => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter((c) => c !== colorName)
          : [...prev.colors, colorName],
      };
    });
  };

  const handleSizeToggle = (size: string) => {
    setFilters((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists
          ? prev.sizes.filter((s) => s !== size)
          : [...prev.sizes, size],
      };
    });
  };

  return (
    <aside className="w-64 shrink-0 space-y-6 hidden lg:block pr-6 border-r border-neutral-200/80">
      
      {/* Header & Clear All */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
          Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-neutral-500 hover:text-black flex items-center space-x-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Special Badges Toggles */}
      <div className="space-y-2 pb-4 border-b border-neutral-200">
        <label className="flex items-center justify-between text-xs font-semibold text-neutral-800 cursor-pointer p-2 rounded-xl hover:bg-neutral-100 transition-colors">
          <span className="flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-blue-600" /> New Drops Only
          </span>
          <input
            type="checkbox"
            checked={filters.onlyNew}
            onChange={(e) => setFilters((prev) => ({ ...prev, onlyNew: e.target.checked }))}
            className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
          />
        </label>

        <label className="flex items-center justify-between text-xs font-semibold text-neutral-800 cursor-pointer p-2 rounded-xl hover:bg-neutral-100 transition-colors">
          <span className="flex items-center">
            <Tag className="w-3.5 h-3.5 mr-2 text-red-600" /> Sale Items
          </span>
          <input
            type="checkbox"
            checked={filters.onlySale}
            onChange={(e) => setFilters((prev) => ({ ...prev, onlySale: e.target.checked }))}
            className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
          />
        </label>

        <label className="flex items-center justify-between text-xs font-semibold text-neutral-800 cursor-pointer p-2 rounded-xl hover:bg-neutral-100 transition-colors">
          <span className="flex items-center">
            <Leaf className="w-3.5 h-3.5 mr-2 text-emerald-600" /> Sustainable / Eco
          </span>
          <input
            type="checkbox"
            checked={filters.onlyEco}
            onChange={(e) => setFilters((prev) => ({ ...prev, onlyEco: e.target.checked }))}
            className="rounded text-neutral-900 focus:ring-neutral-900 w-4 h-4"
          />
        </label>
      </div>

      {/* Categories */}
      <div className="pb-4 border-b border-neutral-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono mb-3">
          Category
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => handleCategoryToggle('all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
              filters.category === 'all'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>All Products</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryToggle(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lifestyle Filter */}
      <div className="pb-4 border-b border-neutral-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono mb-3">
          Lifestyle Collection
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => handleLifestyleToggle('all')}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filters.lifestyle === 'all'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            All Routines
          </button>
          {LIFESTYLE_COLLECTIONS.map((life) => (
            <button
              key={life.id}
              onClick={() => handleLifestyleToggle(life.id)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filters.lifestyle === life.id
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {life.title}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="pb-4 border-b border-neutral-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono mb-3">
          Color Family
        </h4>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => {
            const isSelected = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => handleColorToggle(c.name)}
                className={`w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center transition-all ${
                  isSelected ? 'ring-2 ring-neutral-900 ring-offset-2 scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      c.hex === '#FFFFFF' ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="pb-4 border-b border-neutral-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono mb-3">
          Size
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {ALL_SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono mb-2">
          <span>Max Price</span>
          <span className="text-neutral-900 font-mono font-extrabold">${filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="10"
          max="200"
          step="5"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], parseInt(e.target.value)],
            }))
          }
          className="w-full accent-neutral-900 cursor-pointer"
        />
      </div>

    </aside>
  );
};
