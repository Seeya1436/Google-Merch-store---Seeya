import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Check, TrendingDown } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { GoogleGIcon, GoogleColorDots } from '../common/GoogleLogo';

export const WishlistView: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickAddProduct,
    navigateToPLPWithCategory,
  } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Personalized recommendations based on wishlist items
  const recommendedProducts = PRODUCTS.filter(
    (p) => !wishlist.includes(p.id) && (p.isBestSeller || p.isNew)
  ).slice(0, 4);

  const handleMoveToBag = (product: (typeof PRODUCTS)[0]) => {
    if (product.sizes && product.sizes.length > 0) {
      setQuickAddProduct(product);
    } else {
      addToCart(product, product.colors[0], undefined, 1);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-neutral-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest font-mono text-neutral-400 mb-1.5">
            <GoogleColorDots size="w-1.5 h-1.5" />
            <span>Saved For Later • Local Persistence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight flex items-center space-x-3">
            <span>YOUR WISHLIST</span>
            <span className="text-lg sm:text-2xl font-mono font-bold text-neutral-400">
              ({wishlistedProducts.length})
            </span>
          </h1>
        </div>

        <button
          onClick={() => navigateToPLPWithCategory('all')}
          className="mt-4 sm:mt-0 text-xs sm:text-sm font-bold text-neutral-700 hover:text-black flex items-center space-x-1 group"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Wishlist Items Grid */}
      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {wishlistedProducts.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;

            return (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-500 hover:text-red-500 shadow-sm transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {hasDiscount && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-red-500 text-white flex items-center space-x-1">
                        <TrendingDown className="w-3 h-3" />
                        <span>Price Drop</span>
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider bg-white/90 backdrop-blur-md text-neutral-800">
                      {product.brand || 'Google'}
                    </span>
                  </div>

                  {/* Stock Indicator */}
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>In Stock</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-base font-extrabold text-neutral-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Bag Action */}
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-dashed border-neutral-300 p-8 mb-16">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <Heart className="w-8 h-8 stroke-1" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">Your wishlist is currently empty</h2>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
            Tap the heart icon on any Google hoodie, cap, tumbler, or collectible to save items for quick access later.
          </p>
          <button
            onClick={() => navigateToPLPWithCategory('all')}
            className="px-8 py-3.5 bg-neutral-900 text-white text-xs font-bold rounded-2xl hover:bg-neutral-800 transition-all shadow-md"
          >
            DISCOVER MERCHANDISE
          </button>
        </div>
      )}

      {/* Cross-Sell Recommendations */}
      <div className="pt-10 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold font-mono text-neutral-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
              <span>Recommended For You</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
              POPULAR WITH GOOGLE FANS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
