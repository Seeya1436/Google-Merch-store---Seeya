import React, { useState } from 'react';
import { Heart, Star, Plus, Eye, Sparkles, Leaf } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const { openProductDetail, toggleWishlist, isInWishlist, setQuickAddProduct } = useShop();

  const isWishlisted = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];
  const activeImage = isHovered ? secondaryImage : product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Product Image Stage */}
      <div
        className="relative aspect-square bg-white p-4 overflow-hidden cursor-pointer flex items-center justify-center border-b border-neutral-100"
        onClick={() => openProductDetail(product)}
      >
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2600.jpg';
          }}
        />

        {/* Badges Stack with authentic Google Colors */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-[#4285F4] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow-2xs flex items-center">
              <Sparkles className="w-2.5 h-2.5 mr-1" /> New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow-2xs">
              Best Seller
            </span>
          )}
          {product.badge && !product.isNew && !product.isBestSeller && (
            <span className="px-2 py-0.5 bg-[#FBBC05] text-neutral-900 text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow-2xs">
              {product.badge}
            </span>
          )}
          {product.isSale && (
            <span className="px-2 py-0.5 bg-[#EA4335] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow-2xs">
              Sale
            </span>
          )}
          {product.ecoFriendly && (
            <span className="px-2 py-0.5 bg-[#34A853] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow-2xs flex items-center">
              <Leaf className="w-2.5 h-2.5 mr-1" /> Eco
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all shadow-sm z-10 ${
            isWishlisted
              ? 'bg-red-50 text-red-500 hover:scale-110'
              : 'bg-white/80 backdrop-blur-md text-neutral-600 hover:text-black hover:bg-white hover:scale-110'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {/* Quick Add Overlay Bar */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickAddProduct(product);
            }}
            className="flex-1 bg-neutral-900/90 hover:bg-neutral-900 text-white text-xs font-bold py-2.5 px-3 rounded-2xl backdrop-blur-md transition-all shadow-lg flex items-center justify-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="p-2.5 bg-white/90 hover:bg-white text-neutral-900 rounded-2xl backdrop-blur-md transition-all shadow-lg"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Color Preview Swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center space-x-1.5 mb-2.5">
              {product.colors.slice(0, 4).map((color, idx) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIndex(idx);
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-transform ${
                    selectedColorIndex === idx ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-neutral-400 font-mono font-bold">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Collection / Category Label */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono block mb-1">
            {product.collection || product.subCategory || product.category}
          </span>

          {/* Title */}
          <h3
            onClick={() => openProductDetail(product)}
            className="font-semibold text-neutral-900 text-sm tracking-tight leading-snug hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer mb-1"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-neutral-800">{product.rating}</span>
            <span className="text-xs text-neutral-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-extrabold text-neutral-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => setQuickAddProduct(product)}
            className="text-xs font-bold text-neutral-900 hover:text-blue-600 flex items-center space-x-1 py-1 px-2.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <span>Add</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
