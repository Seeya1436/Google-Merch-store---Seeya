import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryId } from '../../types';
import { GoogleGIcon, GoogleColoredText, GoogleColorStripe, GoogleColorDots } from './GoogleLogo';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    activeView,
    setActiveView,
    selectedCategory,
    navigateToPLPWithCategory,
    cartCount,
    wishlist,
    setIsSearchOpen,
    setIsCartOpen,
    setIsAccountOpen,
  } = useShop();

  const NAV_ITEMS: { id: CategoryId | 'all'; label: string; badge?: string; badgeColor?: string }[] = [
    { id: 'new', label: 'New', badge: 'Fresh', badgeColor: 'bg-[#4285F4]/10 text-[#4285F4]' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'drinkware', label: 'Drinkware' },
    { id: 'home', label: 'Home & Office' },
    { id: 'collectibles', label: 'Collectibles' },
    { id: 'android', label: 'Android', badge: 'Bot', badgeColor: 'bg-[#34A853]/15 text-[#34A853]' },
    { id: 'youtube', label: 'YouTube', badge: 'Play', badgeColor: 'bg-[#EA4335]/15 text-[#EA4335]' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'best-sellers', label: 'Best Sellers', badge: 'Top', badgeColor: 'bg-[#FBBC05]/20 text-neutral-900' },
    { id: 'sale', label: 'Sale', badge: 'Hot', badgeColor: 'bg-[#EA4335]/10 text-[#EA4335]' },
  ];

  const handleNavClick = (catId: CategoryId | 'all') => {
    navigateToPLPWithCategory(catId);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setActiveView('home');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all shadow-xs">
      {/* Google 4-Color Signature Top Stripe */}
      <GoogleColorStripe className="h-0.5 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo & Brand Identity in Original Google Font */}
          <div
            className="flex items-center space-x-3 cursor-pointer group select-none"
            onClick={handleLogoClick}
            title="Google Merchandise Store Home"
          >
            {/* Authentic Google Multi-Color G Emblem */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center p-2 group-hover:scale-105 group-hover:shadow-md transition-all duration-200">
              <GoogleGIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5">
                {/* Official Google Brand in Product Sans font */}
                <span className="font-brand font-bold text-lg sm:text-2xl tracking-tight inline-flex items-center">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
                <span className="font-brand font-medium text-[#5f6368] text-xs sm:text-base tracking-tight whitespace-nowrap">
                  Merchandise Store
                </span>
              </div>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <GoogleColorDots size="w-1 h-1" />
                <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 font-mono">
                  Mountain View, CA &bull; Official
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Category Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === 'plp' && selectedCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-medium transition-all relative flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-neutral-900 text-white font-semibold shadow-sm ring-2 ring-neutral-900/10'
                      : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.badgeColor || 'bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors relative"
              aria-label="Search merchandise"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2.5 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors hidden sm:flex items-center"
              aria-label="Account details"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setActiveView('wishlist')}
              className={`p-2.5 rounded-full hover:bg-neutral-100 transition-colors relative ${
                activeView === 'wishlist' ? 'text-red-600 bg-red-50' : 'text-neutral-700 hover:text-black'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-all shadow-sm hover:shadow flex items-center space-x-2 px-3 sm:px-4 group"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
              Shop Categories
            </div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === item.id && activeView === 'plp'
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

            <div className="border-t border-neutral-100 my-2 pt-2">
              <button
                onClick={() => {
                  setIsAccountOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-neutral-800 hover:bg-neutral-100 rounded-xl text-sm font-medium"
              >
                <User className="w-5 h-5 text-neutral-500" />
                <span>My Account & Orders</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
