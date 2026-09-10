import React, { useState } from 'react';
import { ArrowRight, Instagram, Heart, Sparkles, TrendingUp, Star, Eye } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { GoogleColorDots } from '../common/GoogleLogo';

interface CreatorPost {
  id: string;
  creatorHandle: string;
  creatorName: string;
  avatar: string;
  image: string;
  caption: string;
  likes: string;
  productId: string;
}

const CREATOR_POSTS: CreatorPost[] = [
  {
    id: 'post-1',
    creatorHandle: '@maya_builds',
    creatorName: 'Maya Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    caption: 'The heavyweight Google embroidered hoodie is officially my new daily uniform 💻✨',
    likes: '4.8k',
    productId: 'g-hoodie-01',
  },
  {
    id: 'post-2',
    creatorHandle: '@dev_marcus',
    creatorName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    caption: '1998 Stanford garage retro crewneck fits insane. Vintage varsity embroidery is so clean.',
    likes: '6.2k',
    productId: 'g-sweatshirt-33',
  },
  {
    id: 'post-3',
    creatorHandle: '@pixel_daily',
    creatorName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    caption: 'Bugdroid ripstop sling bag + insulated flask = ultimate Mountain View commuter kit.',
    likes: '3.9k',
    productId: 'g-waterbottle-05',
  },
  {
    id: 'post-4',
    creatorHandle: '@alex_codes',
    creatorName: 'Alex Thorne',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80',
    caption: 'Desk setup upgrade with the official Google vegan leather mat and 3D Bugdroid stand 🤖',
    likes: '5.1k',
    productId: 'g-deskmat-06',
  },
];

export const SocialCommerceSection: React.FC = () => {
  const { openProductDetail, navigateToPLPWithCategory } = useShop();
  const [activeTab, setActiveTab] = useState<'internet' | 'favourites' | 'saved' | 'trending'>('internet');

  const customerFavourites = PRODUCTS.filter((p) => p.rating >= 4.8 && p.reviewCount > 100).slice(0, 4);
  const mostSaved = PRODUCTS.filter((p) => p.isBestSeller).slice(2, 6);
  const trendingThisWeek = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <GoogleColorDots size="w-1.5 h-1.5" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-mono">
              Social Commerce &amp; Creator Community
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            SEEN ON THE INTERNET
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-1">
            "Google merch we'd actually wear." Curated fits from developers, creators, and fans.
          </p>
        </div>

        {/* Discovery Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('internet')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'internet'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Creator Fits
          </button>
          <button
            onClick={() => setActiveTab('favourites')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'favourites'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Customer Favourites
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'saved'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Most Saved
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'trending'
                ? 'bg-neutral-900 text-white shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Trending This Week
          </button>
        </div>
      </div>

      {/* TAB 1: CREATOR SOCIAL POSTS */}
      {activeTab === 'internet' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREATOR_POSTS.map((post) => {
            const product = PRODUCTS.find((p) => p.id === post.productId) || PRODUCTS[0];

            return (
              <div
                key={post.id}
                className="group relative rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Creator Header */}
                <div className="p-4 flex items-center justify-between border-b border-neutral-100 bg-white">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={post.avatar}
                      alt={post.creatorName}
                      className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 leading-none">{post.creatorName}</h4>
                      <span className="text-[10px] text-neutral-400 font-mono">{post.creatorHandle}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-neutral-400 text-xs font-mono">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                {/* Creator Image */}
                <div className="relative aspect-4/5 overflow-hidden bg-neutral-100">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white text-xs">
                    <p className="line-clamp-2 leading-relaxed">{post.caption}</p>
                  </div>
                </div>

                {/* Linked Product & SHOP NOW */}
                <div className="p-4 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <h5 className="text-xs font-bold text-neutral-900 truncate">{product.name}</h5>
                    <span className="text-xs font-extrabold text-neutral-900">${product.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => openProductDetail(product)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shrink-0 shadow-sm flex items-center space-x-1 group-hover:bg-[#4285F4] transition-colors"
                  >
                    <span>SHOP NOW</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: CUSTOMER FAVOURITES */}
      {activeTab === 'favourites' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerFavourites.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* TAB 3: MOST SAVED */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mostSaved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* TAB 4: TRENDING THIS WEEK */}
      {activeTab === 'trending' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingThisWeek.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};
