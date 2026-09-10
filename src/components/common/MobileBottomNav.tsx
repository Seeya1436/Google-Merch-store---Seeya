import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    setIsSearchOpen,
    setIsCartOpen,
    navigateToPLPWithCategory,
  } = useShop();

  const handleHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShop = () => {
    navigateToPLPWithCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlist = () => {
    setActiveView('wishlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-neutral-200/80 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      aria-label="Mobile Navigation Bar"
    >
      {/* Home */}
      <button
        onClick={handleHome}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
          activeView === 'home' ? 'text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-900'
        }`}
      >
        <Home className={`w-5 h-5 ${activeView === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] tracking-tight mt-0.5">Home</span>
      </button>

      {/* Shop / Catalog */}
      <button
        onClick={handleShop}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
          activeView === 'plp' ? 'text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-900'
        }`}
      >
        <Compass className={`w-5 h-5 ${activeView === 'plp' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] tracking-tight mt-0.5">Shop</span>
      </button>

      {/* Search */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-neutral-500 hover:text-neutral-900 transition-all"
      >
        <Search className="w-5 h-5 stroke-2" />
        <span className="text-[10px] tracking-tight mt-0.5">Search</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
          activeView === 'wishlist' ? 'text-red-500 font-bold' : 'text-neutral-500 hover:text-neutral-900'
        }`}
      >
        <div className="relative">
          <Heart
            className={`w-5 h-5 ${
              activeView === 'wishlist' || wishlist.length > 0
                ? 'fill-red-500 text-red-500'
                : 'stroke-2'
            }`}
          />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">Wishlist</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-neutral-500 hover:text-neutral-900 transition-all relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 stroke-2" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-neutral-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">Cart</span>
      </button>
    </nav>
  );
};
