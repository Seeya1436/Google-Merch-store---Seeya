import React from 'react';
import { ArrowUpRight, Globe, ShieldCheck, Truck, RefreshCw, Heart, Award } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GoogleGIcon, GoogleColoredText, GoogleColorDots, GoogleColorStripe } from './GoogleLogo';

export const Footer: React.FC = () => {
  const { navigateToPLPWithCategory } = useShop();

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-0 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar with Google 4 Colors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-neutral-800/80">
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-[#4285F4]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Carbon-Neutral Shipping</h4>
              <p className="text-neutral-400 text-xs mt-0.5">Free on all orders over $75 across the US.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-[#34A853]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#34A853]/10 text-[#34A853] flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Easy 30-Day Returns</h4>
              <p className="text-neutral-400 text-xs mt-0.5">Pre-paid return labels with instant credit.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-[#FBBC05]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FBBC05]/10 text-[#FBBC05] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Official Google Merch</h4>
              <p className="text-neutral-400 text-xs mt-0.5">Crafted with certified recycled materials.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-[#EA4335]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Member Rewards</h4>
              <p className="text-neutral-400 text-xs mt-0.5">Earn Google Store points on every order.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-md p-2">
                <GoogleGIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-brand font-bold text-white tracking-tight text-xl">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                  <span className="font-brand font-normal text-neutral-300 text-sm tracking-tight">
                    Merchandise Store
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Official Merchandise &amp; Collections
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-sans">
              The official merchandise platform designed for tech enthusiasts, creators, and Google fans worldwide. Engineered in Mountain View with purpose and sustainability.
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <GoogleColorDots size="w-2 h-2" />
              <span className="text-xs text-neutral-400 font-mono ml-1">Store Status: Online & Shipping Daily</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-mono">Shop Categories</h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => navigateToPLPWithCategory('new')} className="hover:text-white transition-colors">
                  New Drops
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('apparel')} className="hover:text-white transition-colors">
                  Apparel & Streetwear
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('accessories')} className="hover:text-white transition-colors">
                  Bags & Accessories
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('drinkware')} className="hover:text-white transition-colors">
                  Drinkware & Bottles
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('home')} className="hover:text-white transition-colors">
                  Desk & Home Setup
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('collectibles')} className="hover:text-white transition-colors">
                  Limited Collectibles
                </button>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-mono">Brand Collections</h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => navigateToPLPWithCategory('android')} className="hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] mr-2"></span>
                  Android Collection
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('youtube')} className="hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] mr-2"></span>
                  YouTube Creator Merch
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('cloud')} className="hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] mr-2"></span>
                  Google Cloud & Dev
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('chrome')} className="hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05] mr-2"></span>
                  Chrome Dinosaur
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('gemini')} className="hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2"></span>
                  Gemini AI Drops
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPLPWithCategory('best-sellers')} className="hover:text-white transition-colors">
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-mono">Help & Support</h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#help" className="hover:text-white transition-colors">Order Status & Tracking</a></li>
              <li><a href="#help" className="hover:text-white transition-colors">Shipping Information</a></li>
              <li><a href="#help" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#help" className="hover:text-white transition-colors">Size & Measurement Guide</a></li>
              <li><a href="#help" className="hover:text-white transition-colors">Sustainability Guarantee</a></li>
              <li><a href="#help" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-mono">About</h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#about" className="hover:text-white transition-colors flex items-center">About Google Store <ArrowUpRight className="w-3 h-3 ml-1 opacity-60" /></a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Google Design Labs</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & region bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-neutral-400">
              <Globe className="w-4 h-4 mr-1.5" /> United States ($ USD)
            </span>
            <span>© 2026 Google LLC. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6 text-neutral-400">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              YouTube
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              TikTok
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              X / Twitter
            </a>
          </div>
        </div>

      </div>

      {/* Signature Google Four Color Bar at bottom edge */}
      <div className="h-1.5 w-full mt-8 flex">
        <div className="h-full bg-[#4285F4] flex-1"></div>
        <div className="h-full bg-[#EA4335] flex-1"></div>
        <div className="h-full bg-[#FBBC05] flex-1"></div>
        <div className="h-full bg-[#34A853] flex-1"></div>
      </div>
    </footer>
  );
};
