import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', '', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Welcome to Google Merch Club! 🎉', 'Use promo code WELCOME10 for 10% off!', 'success');
  };

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-neutral-100 rounded-3xl p-8 sm:p-14 border border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="max-w-xl space-y-3 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold font-mono text-blue-600 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Access</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            STAY IN THE GOOGLE LOOP
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Subscribe for secret product drops, developer launch invitations, and get <strong>10% OFF</strong> your first order with code <code className="bg-white px-2 py-0.5 rounded font-mono font-bold text-neutral-900">WELCOME10</code>.
          </p>
        </div>

        <div className="w-full md:w-auto min-w-[320px] max-w-md">
          {isSubmitted ? (
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-emerald-800 flex items-center space-x-3 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                <Check className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="block font-bold">You're on the list!</strong>
                Use promo code <span className="font-mono font-extrabold text-black">WELCOME10</span> at checkout.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 shrink-0"
              >
                <span>Join Club</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
