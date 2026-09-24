import React, { useState } from 'react';
import { X, ShieldCheck, Check, Truck, CreditCard, ArrowRight, Download, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { GoogleGIcon, GoogleColorStripe, GoogleColorDots } from '../common/GoogleLogo';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    freeShippingThreshold,
    appliedPromo,
    cartTotal,
    placeOrder,
    userProfile,
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');

  const [formData, setFormData] = useState({
    fullName: userProfile.name,
    email: userProfile.email,
    street: '1600 Amphitheatre Pkwy',
    city: 'Mountain View',
    state: 'CA',
    zip: '94043',
    country: 'United States',
    paymentMethod: 'gpay',
    cardNumber: '•••• •••• •••• 4242',
  });

  const [placedOrderInfo, setPlacedOrderInfo] = useState<any>(null);

  if (!isCheckoutOpen) return null;

  const shippingCost = cartSubtotal >= freeShippingThreshold ? 0 : 10;
  const grandTotal = cartTotal + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const order = placeOrder({
      fullName: formData.fullName,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country,
    });
    setPlacedOrderInfo(order);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative my-8 max-h-[90vh] overflow-y-auto overflow-hidden">
        {/* Google 4-Color Accent Line */}
        <div className="absolute top-0 left-0 right-0">
          <GoogleColorStripe className="h-1 w-full" />
        </div>

        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        {step !== 'confirmation' && (
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-6">
            <span className={step === 'shipping' ? 'text-neutral-900 font-extrabold' : 'text-emerald-600'}>
              1. Shipping Address
            </span>
            <span>→</span>
            <span className={step === 'payment' ? 'text-neutral-900 font-extrabold' : ''}>
              2. Express Payment
            </span>
          </div>
        )}

        {/* STEP 1: SHIPPING ADDRESS */}
        {step === 'shipping' && (
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
              Express Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 uppercase font-mono mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 uppercase font-mono mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 uppercase font-mono mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase font-mono mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase font-mono mb-1">State & ZIP</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-16 bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 font-bold"
                  />
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="flex-1 bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Order Brief Summary */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2 mt-4">
              <div className="font-mono font-bold uppercase text-[10px] text-neutral-400">
                Order Items ({cart.reduce((a, b) => a + b.quantity, 0)})
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {cart.map((it) => (
                  <div key={it.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={it.product.images[0]}
                        alt=""
                        className="w-7 h-7 rounded-lg object-contain bg-white p-0.5 border border-neutral-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2600.jpg';
                        }}
                      />
                      <span className="truncate text-neutral-800 font-medium">
                        {it.product.name} <span className="text-neutral-400">×{it.quantity}</span>
                      </span>
                    </div>
                    <span className="font-mono font-bold text-neutral-900 shrink-0">
                      ${(it.product.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Shipping:</span>
                <span className="text-emerald-700">{shippingCost === 0 ? 'FREE' : `${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-extrabold text-neutral-900 text-sm">
                <span>Grand Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white font-bold py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 'payment' && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
              Select Payment Method
            </h2>

            <div className="space-y-3">
              {/* Google Pay Mock */}
              <div
                onClick={() => setFormData({ ...formData, paymentMethod: 'gpay' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  formData.paymentMethod === 'gpay'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-900 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center p-2 shadow-xs shrink-0">
                    <GoogleGIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4 className="font-bold text-xs uppercase font-mono">Google Pay One-Touch</h4>
                      <GoogleColorDots size="w-1 h-1" />
                    </div>
                    <p className="text-[10px] opacity-80">Instant 1-click checkout with Google Account</p>
                  </div>
                </div>
                {formData.paymentMethod === 'gpay' && <Check className="w-5 h-5 text-emerald-400" />}
              </div>

              {/* Credit Card */}
              <div
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  formData.paymentMethod === 'card'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-900 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6" />
                  <div>
                    <h4 className="font-bold text-xs uppercase font-mono">Credit or Debit Card</h4>
                    <p className="text-[10px] opacity-80">{formData.cardNumber}</p>
                  </div>
                </div>
                {formData.paymentMethod === 'card' && <Check className="w-5 h-5 text-emerald-400" />}
              </div>
            </div>

            {/* Total Breakdown */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount ({appliedPromo.code})</span>
                  <span>-${(cartSubtotal - cartTotal).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-sm text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Due</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="px-5 py-4 border border-neutral-300 rounded-2xl text-xs font-bold text-neutral-700"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CONFIRM & PAY ${grandTotal.toFixed(2)}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION */}
        {step === 'confirmation' && placedOrderInfo && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold font-mono text-emerald-600 uppercase tracking-widest block mb-1">
                Order Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                THANK YOU FOR YOUR ORDER!
              </h2>
              <p className="text-xs text-neutral-500 mt-1 font-mono">
                Order ID: <strong className="text-neutral-900">{placedOrderInfo.id}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-left space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Address:</span>
                <span className="font-bold text-neutral-900">{formData.street}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Arrival:</span>
                <span className="font-bold text-emerald-700">3 Business Days (Express)</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Tracking Number:</span>
                <span className="font-mono text-neutral-900">{placedOrderInfo.trackingNumber}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="w-full bg-neutral-900 text-white font-bold py-4 rounded-2xl text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Back to Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
