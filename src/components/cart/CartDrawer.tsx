import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Tag, Plus, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    freeShippingThreshold,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    cartTotal,
    addToCart,
    setIsCheckoutOpen,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const freeShipProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Recommendations to complete the look
  const crossSells = PRODUCTS.filter(
    (p) => !cart.some((ci) => ci.product.id === p.id)
  ).slice(0, 2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h3 className="font-extrabold text-neutral-900 text-base tracking-tight">
              YOUR SHOPPING BAG
            </h3>
            <span className="text-xs font-mono font-bold bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Calculator Progress Bar */}
        <div className="bg-neutral-900 text-white p-3.5 px-5 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            <span className="flex items-center">
              <Truck className="w-4 h-4 mr-1.5 text-blue-400" />
              {remainingForFreeShip > 0 ? (
                <span>
                  Add <strong className="text-blue-300">${remainingForFreeShip.toFixed(2)}</strong> for Free Express Shipping
                </span>
              ) : (
                <span className="text-emerald-400 font-bold">You unlocked FREE Express Shipping! 🎉</span>
              )}
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${freeShipProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 relative"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-neutral-200 shrink-0 border border-neutral-200"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between pr-6">
                      <h4 className="font-semibold text-neutral-900 text-xs truncate">
                        {item.product.name}
                      </h4>
                    </div>

                    <div className="text-[11px] text-neutral-500 space-x-2 mt-0.5">
                      <span>Color: {item.selectedColor.name}</span>
                      {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/60">
                    <div className="flex items-center border border-neutral-300 rounded-lg bg-white p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-neutral-100 rounded"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-neutral-100 rounded"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-extrabold text-xs text-neutral-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-3 right-3 text-neutral-400 hover:text-red-600 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-neutral-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-sm font-semibold text-neutral-800">Your bag is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Discover the latest Google hoodies, caps, desk setups and collectibles.
              </p>
            </div>
          )}

          {/* COMPLETE THE LOOK Recommendation Cards */}
          {cart.length > 0 && crossSells.length > 0 && (
            <div className="pt-4 border-t border-neutral-200">
              <h5 className="text-[11px] font-bold uppercase tracking-wider font-mono text-neutral-500 mb-3">
                COMPLETE THE LOOK
              </h5>
              <div className="space-y-2">
                {crossSells.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-neutral-200 shadow-xs"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-neutral-100 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h6 className="text-xs font-semibold text-neutral-900 truncate max-w-[160px]">
                          {p.name}
                        </h6>
                        <span className="text-xs font-bold text-neutral-900">${p.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 flex items-center space-x-1 shrink-0"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-neutral-50/80 space-y-3">
            
            {/* Promo Code Box */}
            {appliedPromo ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
                <span className="flex items-center">
                  <Tag className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% OFF)
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-emerald-700 hover:text-emerald-900 font-bold underline text-[10px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo Code (e.g. GOOGLE20)..."
                  className="flex-1 bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
                <button
                  type="submit"
                  className="bg-neutral-200 hover:bg-neutral-900 hover:text-white text-neutral-800 font-bold text-xs px-3 py-2 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promo Discount ({appliedPromo.discountPercent}%)</span>
                  <span>-${(cartSubtotal - cartTotal).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Express Shipping</span>
                <span className="font-medium text-neutral-900">
                  {cartSubtotal >= freeShippingThreshold ? 'FREE' : '$10.00'}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Estimated Total</span>
                <span>
                  ${(cartTotal + (cartSubtotal >= freeShippingThreshold ? 0 : 10)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-all"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
