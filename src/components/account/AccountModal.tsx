import React, { useState } from 'react';
import { X, Package, Heart, MapPin, User, Check, Truck, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../shop/ProductCard';
import { PRODUCTS } from '../../data/products';
import { GoogleGIcon, GoogleColorStripe, GoogleColorDots } from '../common/GoogleLogo';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    userProfile,
    orders,
    wishlist,
    setActiveView,
  } = useShop();

  const [tab, setTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  if (!isAccountOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative my-8 max-h-[90vh] overflow-y-auto overflow-hidden">
        {/* Google 4-Color Accent Line */}
        <div className="absolute top-0 left-0 right-0">
          <GoogleColorStripe className="h-1 w-full" />
        </div>
        
        <button
          onClick={() => setIsAccountOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Header */}
        <div className="flex items-center space-x-4 pb-6 border-b border-neutral-200">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              AR
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center p-0.5">
              <GoogleGIcon className="w-full h-full" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">{userProfile.name}</h2>
              <span className="px-2 py-0.5 rounded-md bg-[#4285F4]/10 text-[#4285F4] text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                <GoogleColorDots size="w-1 h-1" />
                <span>{userProfile.tier}</span>
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">{userProfile.email} • {userProfile.points} Google Rewards Points</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 my-4 text-xs font-bold font-mono uppercase tracking-wider">
          <button
            onClick={() => setTab('orders')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              tab === 'orders' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-black'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setTab('wishlist')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              tab === 'wishlist' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-black'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setTab('profile')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              tab === 'profile' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-black'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {tab === 'orders' && (
          <div className="space-y-4 pt-2">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-neutral-900">Order #{order.id}</span>
                      <span className="text-[10px] text-neutral-400 ml-2">{order.date}</span>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-200/60">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-neutral-200" referrerPolicy="no-referrer" />
                          <div>
                            <h5 className="font-semibold text-neutral-900 truncate max-w-[200px]">{item.name}</h5>
                            <span className="text-[10px] text-neutral-500">{item.color} {item.size && `• ${item.size}`}</span>
                          </div>
                        </div>
                        <span className="font-bold text-neutral-900">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Tracking: <strong className="font-mono text-neutral-800">{order.trackingNumber}</strong></span>
                    <span className="font-extrabold text-neutral-900">Total: ${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-xs text-neutral-500">No past orders found.</p>
            )}
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {tab === 'wishlist' && (
          <div className="pt-2 space-y-4">
            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistedProducts.map((product) => (
                  <div key={product.id} onClick={() => setIsAccountOpen(false)}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-xs text-neutral-500">No saved items in your wishlist.</p>
            )}
          </div>
        )}

        {/* TAB 3: PROFILE */}
        {tab === 'profile' && (
          <div className="pt-2 space-y-4 text-xs text-neutral-700">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <h4 className="font-bold text-neutral-900 text-sm">Default Shipping Address</h4>
              <p>{userProfile.savedAddresses[0].street}</p>
              <p>{userProfile.savedAddresses[0].city}, {userProfile.savedAddresses[0].state} {userProfile.savedAddresses[0].zip}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
