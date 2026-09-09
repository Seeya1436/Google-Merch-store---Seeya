import React from 'react';
import { X, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-1">
          Apparel & Sizing Guide
        </h3>
        <p className="text-xs text-neutral-500 mb-6">
          Google merchandise features modern relaxed fits. Measurements below are in inches.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-neutral-600 font-mono">Size</th>
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-neutral-600 font-mono">Chest (in)</th>
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-neutral-600 font-mono">Waist (in)</th>
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-neutral-600 font-mono">Length (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">XS</td>
                <td className="py-2.5 px-3 text-neutral-600">32 – 34</td>
                <td className="py-2.5 px-3 text-neutral-600">26 – 28</td>
                <td className="py-2.5 px-3 text-neutral-600">26.5</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">S</td>
                <td className="py-2.5 px-3 text-neutral-600">35 – 37</td>
                <td className="py-2.5 px-3 text-neutral-600">29 – 31</td>
                <td className="py-2.5 px-3 text-neutral-600">27.5</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="py-2.5 px-3 font-semibold text-blue-900">M (Standard)</td>
                <td className="py-2.5 px-3 text-blue-900 font-medium">38 – 40</td>
                <td className="py-2.5 px-3 text-blue-900 font-medium">32 – 34</td>
                <td className="py-2.5 px-3 text-blue-900 font-medium">28.5</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">L</td>
                <td className="py-2.5 px-3 text-neutral-600">41 – 43</td>
                <td className="py-2.5 px-3 text-neutral-600">35 – 37</td>
                <td className="py-2.5 px-3 text-neutral-600">29.5</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">XL</td>
                <td className="py-2.5 px-3 text-neutral-600">44 – 46</td>
                <td className="py-2.5 px-3 text-neutral-600">38 – 40</td>
                <td className="py-2.5 px-3 text-neutral-600">30.5</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-neutral-900">2XL</td>
                <td className="py-2.5 px-3 text-neutral-600">47 – 49</td>
                <td className="py-2.5 px-3 text-neutral-600">41 – 43</td>
                <td className="py-2.5 px-3 text-neutral-600">31.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-xs text-neutral-600 space-y-2 mb-6">
          <div className="flex items-center text-neutral-900 font-bold mb-1">
            <Check className="w-4 h-4 text-emerald-500 mr-1.5" /> How We Measure
          </div>
          <p>
            • <strong>Chest:</strong> Measure around the fullest part of your chest under arms.
          </p>
          <p>
            • <strong>Fit Note:</strong> Our streetwear hoodies and tees have a intentional dropped-shoulder boxy cut. If you prefer a tailored fit, we recommend sizing down.
          </p>
        </div>

        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="w-full bg-neutral-900 text-white font-semibold py-3 rounded-xl text-xs uppercase tracking-wider"
        >
          Got It
        </button>

      </div>
    </div>
  );
};
