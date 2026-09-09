import React from 'react';
import { X, RotateCcw, Check, Sparkles, Leaf, Tag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES, LIFESTYLE_COLLECTIONS } from '../../data/categories';
import { CategoryId, LifestyleTag } from '../../types';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const { filters, setFilters, resetFilters } = useShop();

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-bold text-neutral-900 text-sm uppercase font-mono tracking-wider">
            Filter & Sort Products
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono mb-3">
              Categories
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border ${
                  filters.category === 'all'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'border-neutral-200 text-neutral-800'
                }`}
              >
                All Items
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilters((prev) => ({ ...prev, category: cat.id }))}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border ${
                    filters.category === cat.id
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'border-neutral-200 text-neutral-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Badges */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <label className="flex items-center justify-between text-xs font-semibold text-neutral-800 py-1">
              <span className="flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-2 text-blue-600" /> New Arrivals
              </span>
              <input
                type="checkbox"
                checked={filters.onlyNew}
                onChange={(e) => setFilters((prev) => ({ ...prev, onlyNew: e.target.checked }))}
                className="rounded text-neutral-900 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between text-xs font-semibold text-neutral-800 py-1">
              <span className="flex items-center">
                <Tag className="w-3.5 h-3.5 mr-2 text-red-600" /> Discounted / Sale
              </span>
              <input
                type="checkbox"
                checked={filters.onlySale}
                onChange={(e) => setFilters((prev) => ({ ...prev, onlySale: e.target.checked }))}
                className="rounded text-neutral-900 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between text-xs font-semibold text-neutral-800 py-1">
              <span className="flex items-center">
                <Leaf className="w-3.5 h-3.5 mr-2 text-emerald-600" /> Sustainable Eco Gear
              </span>
              <input
                type="checkbox"
                checked={filters.onlyEco}
                onChange={(e) => setFilters((prev) => ({ ...prev, onlyEco: e.target.checked }))}
                className="rounded text-neutral-900 w-4 h-4"
              />
            </label>
          </div>

          {/* Color & Size */}
          <div className="pt-2 border-t border-neutral-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono mb-3">
              Size
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {ALL_SIZES.map((size) => {
                const isSelected = filters.sizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        sizes: isSelected
                          ? prev.sizes.filter((s) => s !== size)
                          : [...prev.sizes, size],
                      }))
                    }
                    className={`py-2 text-xs font-semibold rounded-xl border ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'border-neutral-200 text-neutral-800'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center space-x-3">
          <button
            onClick={resetFilters}
            className="px-4 py-3 border border-neutral-300 text-neutral-800 font-bold rounded-xl text-xs"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-neutral-900 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
};
