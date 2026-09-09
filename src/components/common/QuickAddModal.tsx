import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, HelpCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductColor } from '../../types';

export const QuickAddModal: React.FC = () => {
  const { quickAddProduct, setQuickAddProduct, addToCart, setIsSizeGuideOpen } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickAddProduct) {
      setSelectedColor(quickAddProduct.colors[0]);
      setSelectedSize(quickAddProduct.sizes ? quickAddProduct.sizes[0] : undefined);
      setQuantity(1);
    }
  }, [quickAddProduct]);

  if (!quickAddProduct || !selectedColor) return null;

  const handleAdd = () => {
    addToCart(quickAddProduct, selectedColor, selectedSize, quantity);
    setQuickAddProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setQuickAddProduct(null)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start space-x-4 mb-6">
          <img
            src={quickAddProduct.images[0]}
            alt={quickAddProduct.name}
            className="w-20 h-20 rounded-2xl object-cover bg-neutral-100 border border-neutral-200 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-neutral-400">
              Quick Add
            </span>
            <h3 className="font-semibold text-neutral-900 text-sm leading-snug truncate">
              {quickAddProduct.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="font-bold text-base text-neutral-900">
                ${quickAddProduct.price}
              </span>
              {quickAddProduct.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  ${quickAddProduct.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-5">
          <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2 font-mono">
            Color: <span className="text-neutral-900 font-sans font-medium">{selectedColor.name}</span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {quickAddProduct.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'ring-2 ring-neutral-900 ring-offset-2 scale-105' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        color.hex === '#FFFFFF' || color.hex === '#F2F2F7' || color.hex === '#F5F2EB'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Selection */}
        {quickAddProduct.sizes && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider font-mono">
                Select Size
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-blue-600 font-medium hover:underline flex items-center"
              >
                <HelpCircle className="w-3.5 h-3.5 mr-1" /> Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {quickAddProduct.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity Controls & Add Button */}
        <div className="flex items-center space-x-3 pt-2">
          <div className="flex items-center border border-neutral-200 rounded-xl p-1 bg-neutral-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-neutral-700 hover:bg-white hover:shadow-xs transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-bold font-mono">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-neutral-700 hover:bg-white hover:shadow-xs transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag — ${(quickAddProduct.price * quantity).toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
