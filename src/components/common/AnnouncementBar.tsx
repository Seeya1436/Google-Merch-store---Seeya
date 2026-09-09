import React, { useState } from 'react';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GoogleColorDots } from './GoogleLogo';

export const AnnouncementBar: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { navigateToPLPWithCategory } = useShop();

  if (isDismissed) return null;

  return (
    <div className="bg-neutral-900 text-white text-xs py-2 px-4 relative flex items-center justify-between border-b border-neutral-800 transition-all">
      <div className="flex-1 flex items-center justify-center space-x-3 text-center">
        <div className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] uppercase font-bold tracking-wider text-neutral-200">
          <GoogleColorDots size="w-1.5 h-1.5" />
          <span>Official Store</span>
        </div>
        <span className="font-medium text-neutral-200">
          FREE SHIPPING ON ORDERS OVER $75 • USE CODE <span className="text-[#4285F4] font-bold">GOOGLE20</span> FOR 20% OFF
        </span>
        <button
          onClick={() => navigateToPLPWithCategory('new')}
          className="text-[#4285F4] hover:text-white font-semibold text-xs ml-2 hidden md:inline-flex items-center transition-colors group"
        >
          <span>Shop New Drops</span>
          <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition-colors ml-2"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

