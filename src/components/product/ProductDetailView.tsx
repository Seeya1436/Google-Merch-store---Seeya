import React, { useState, useEffect } from 'react';
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  Leaf,
  Check,
  Share2,
  ZoomIn,
  X,
  MessageSquarePlus,
  Zap,
  Layers,
  Ruler,
  Clock,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductColor, Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { GoogleColorDots } from '../common/GoogleLogo';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsCheckoutOpen,
    addToast,
    navigateToPLPWithCategory,
  } = useShop();

  if (!selectedProduct) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(selectedProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    selectedProduct.sizes ? selectedProduct.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>('description');

  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewName, setNewReviewName] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Track recently viewed products in localStorage (PRD Section 15)
  useEffect(() => {
    if (selectedProduct) {
      try {
        const stored = JSON.parse(localStorage.getItem('g_merch_recent_pdp') || '[]');
        const filtered = stored.filter((id: string) => id !== selectedProduct.id);
        const updated = [selectedProduct.id, ...filtered].slice(0, 8);
        localStorage.setItem('g_merch_recent_pdp', JSON.stringify(updated));
        
        const fullProducts = PRODUCTS.filter((p) => updated.includes(p.id) && p.id !== selectedProduct.id);
        setRecentlyViewed(fullProducts);
      } catch (e) {
        console.error(e);
      }
    }
  }, [selectedProduct?.id]);

  const isWishlisted = isInWishlist(selectedProduct.id);

  // Complete The Look (Complementary styling products - PRD Section 15)
  const completeTheLookProducts = PRODUCTS.filter(
    (p) =>
      p.id !== selectedProduct.id &&
      (selectedProduct.category === 'apparel'
        ? p.category === 'accessories' || p.category === 'drinkware'
        : p.category === 'apparel' || p.category === 'home')
  ).slice(0, 3);

  // Recommended products cross-sell (YOU MAY ALSO LIKE - PRD Section 15)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
  ).slice(0, 4);

  // Frequently Bought Together Bundle Calculation (PRD Section 15 & Part 13)
  const fbtProducts = React.useMemo(() => {
    const ids = selectedProduct.frequentlyBoughtTogetherIds || [];
    const found = PRODUCTS.filter((p) => ids.includes(p.code || p.id));
    if (found.length >= 2) return found.slice(0, 2);
    // Fallback to complementary category items
    return PRODUCTS.filter(
      (p) => p.id !== selectedProduct.id && p.itemType !== selectedProduct.itemType
    ).slice(0, 2);
  }, [selectedProduct]);

  const [bundleChecked, setBundleChecked] = useState<Record<string, boolean>>({
    main: true,
    item1: true,
    item2: true,
  });

  // Bundle pricing
  const bundleItems = [
    { product: selectedProduct, key: 'main', active: bundleChecked.main },
    ...(fbtProducts[0] ? [{ product: fbtProducts[0], key: 'item1', active: bundleChecked.item1 }] : []),
    ...(fbtProducts[1] ? [{ product: fbtProducts[1], key: 'item2', active: bundleChecked.item2 }] : []),
  ];

  const bundleTotal = bundleItems
    .filter((b) => b.active)
    .reduce((sum, b) => sum + b.product.price, 0);

  const bundleSavings = bundleItems.filter((b) => b.active).length >= 2 ? bundleTotal * 0.1 : 0;
  const bundleDiscountedTotal = bundleTotal - bundleSavings;

  const handleAddBundleToCart = () => {
    let addedCount = 0;
    bundleItems.forEach((b) => {
      if (b.active) {
        addToCart(
          b.product,
          b.product.colors[0],
          b.product.sizes ? b.product.sizes[0] : undefined,
          1
        );
        addedCount++;
      }
    });
    addToast(
      `Bundle Added to Bag! (${addedCount} items)`,
      `Saved ${bundleSavings.toFixed(2)} with official bundle savings.`,
      'success',
      selectedProduct.images[0]
    );
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied to Clipboard!', 'Share this merch drop with friends.', 'info');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim() || !newReviewName.trim()) {
      addToast('Please fill in your name and review comment', '', 'error');
      return;
    }
    addToast('Thank you for your review!', 'Your feedback helps the Google Merch community.', 'success');
    setWriteReviewOpen(false);
    setNewReviewComment('');
    setNewReviewName('');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-neutral-500 mb-8 font-mono">
        <button onClick={() => navigateToPLPWithCategory('all')} className="hover:text-black">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateToPLPWithCategory(selectedProduct.category)}
          className="hover:text-black uppercase"
        >
          {selectedProduct.category}
        </button>
        <span>/</span>
        <span className="text-neutral-900 font-bold truncate max-w-xs">{selectedProduct.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        
        {/* LEFT: Multi-image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          
          {/* Thumbnails Sidebar */}
          {selectedProduct.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all bg-white p-1.5 flex items-center justify-center ${
                    selectedImageIndex === idx
                      ? 'border-neutral-900 ring-2 ring-neutral-900/20 scale-105'
                      : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2600.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Stage Image */}
          <div className="relative flex-1 aspect-square rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-xs group p-6 sm:p-10 flex items-center justify-center">
            <img
              src={selectedProduct.images[selectedImageIndex]}
              alt={selectedProduct.name}
              className="w-full h-full object-contain object-center cursor-zoom-in group-hover:scale-105 transition-transform duration-300"
              onClick={() => setLightboxOpen(true)}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2600.jpg';
              }}
            />

            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-md text-neutral-800 rounded-2xl shadow-md hover:bg-white transition-all opacity-80 group-hover:opacity-100 border border-neutral-200"
              title="Expand Image"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {selectedProduct.isNew && (
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> New Drop
                </span>
              )}
              {selectedProduct.ecoFriendly && (
                <span className="px-3 py-1 bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs flex items-center">
                  <Leaf className="w-3.5 h-3.5 mr-1" /> Eco-Friendly
                </span>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT: Product Details & Buying Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
                Official Google Merchandise
              </span>
              <button
                onClick={handleShare}
                className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1 leading-tight">
              {selectedProduct.name}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-medium">
              {selectedProduct.tagline}
            </p>

            {/* Rating Stars */}
            <div className="flex items-center space-x-2 mt-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-900">{selectedProduct.rating}</span>
              <span className="text-xs text-neutral-400">• {selectedProduct.reviewCount} Reviews</span>
            </div>
          </div>

          {/* Price Bar */}
          <div className="flex items-baseline space-x-3 pb-4 border-b border-neutral-200">
            <span className="text-3xl font-extrabold text-neutral-900">
              ${selectedProduct.price}
            </span>
            {selectedProduct.originalPrice && (
              <span className="text-base text-neutral-400 line-through font-medium">
                ${selectedProduct.originalPrice}
              </span>
            )}
            {selectedProduct.originalPrice && (
              <span className="text-xs font-bold px-2.5 py-1 bg-red-100 text-red-700 rounded-lg uppercase tracking-wider font-mono">
                Save ${selectedProduct.originalPrice - selectedProduct.price}
              </span>
            )}
          </div>

          {/* Color Selector Swatches */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-700 block mb-2">
              Color: <span className="text-neutral-900 font-sans">{selectedColor.name}</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {selectedProduct.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-neutral-900 ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 ${
                          color.hex === '#FFFFFF' || color.hex === '#F2F2F7' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          {selectedProduct.sizes && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-700">
                  Select Size
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center"
                >
                  <HelpCircle className="w-3.5 h-3.5 mr-1" /> Size Guide & Measurements
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {selectedProduct.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                          : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls & Primary CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <div className="flex items-center border border-neutral-300 rounded-2xl p-1 bg-neutral-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-neutral-700 hover:bg-white transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-neutral-700 hover:bg-white transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ADD TO CART — ${(selectedProduct.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Instant BUY NOW (PRD Section 14) */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-[#4285F4] hover:bg-blue-600 text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-all"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>BUY NOW — EXPRESS CHECKOUT</span>
            </button>

            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`w-full py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center justify-center space-x-2 ${
                isWishlisted
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'border-neutral-300 text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
              <span>{isWishlisted ? 'SAVED TO WISHLIST ♡' : 'ADD TO WISHLIST'}</span>
            </button>
          </div>

          {/* Delivery & Assurance Perks */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200 text-xs text-neutral-600">
            <div className="flex items-center space-x-2 p-3 rounded-xl bg-neutral-50">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Free US Shipping over $75</span>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-xl bg-neutral-50">
              <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free 30-Day Returns</span>
            </div>
          </div>

          {/* PRD Section 14 Expandable Product Information Accordions */}
          <div className="pt-4 border-t border-neutral-200 divide-y divide-neutral-200">
            
            {/* 1. DESCRIPTION */}
            <div className="py-3.5">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider font-mono text-neutral-900"
              >
                <span>DESCRIPTION</span>
                {activeAccordion === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'description' && (
                <div className="mt-3 text-xs text-neutral-600 leading-relaxed animate-in fade-in duration-200">
                  <p>{selectedProduct.description}</p>
                </div>
              )}
            </div>

            {/* 2. DETAILS */}
            <div className="py-3.5">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider font-mono text-neutral-900"
              >
                <span>DETAILS</span>
                {activeAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'details' && (
                <div className="mt-3 text-xs text-neutral-600 space-y-1.5 animate-in fade-in duration-200">
                  <ul className="list-disc pl-4 space-y-1 font-medium text-neutral-800">
                    {selectedProduct.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 3. MATERIAL */}
            <div className="py-3.5">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'material' ? '' : 'material')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider font-mono text-neutral-900"
              >
                <span>MATERIAL</span>
                {activeAccordion === 'material' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'material' && (
                <div className="mt-3 text-xs text-neutral-600 space-y-2 leading-relaxed animate-in fade-in duration-200">
                  <p><strong>Composition:</strong> {selectedProduct.materials || '100% Certified Heavyweight Combed Cotton / Recycled Performance Blends'}</p>
                  <p><strong>Care:</strong> {selectedProduct.careInstructions || 'Machine wash cold inside out. Tumble dry low.'}</p>
                </div>
              )}
            </div>

            {/* 4. SIZE GUIDE */}
            <div className="py-3.5">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'sizeguide' ? '' : 'sizeguide')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider font-mono text-neutral-900"
              >
                <span>SIZE GUIDE</span>
                {activeAccordion === 'sizeguide' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'sizeguide' && (
                <div className="mt-3 text-xs text-neutral-600 space-y-2 animate-in fade-in duration-200">
                  <p>Standard unisex streetwear fit. We recommend ordering true to size, or one size up for an oversized drop-shoulder aesthetic.</p>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center space-x-1 font-bold text-blue-600 hover:underline"
                  >
                    <Ruler className="w-3.5 h-3.5 mr-1" />
                    <span>Open Interactive Measurement Table</span>
                  </button>
                </div>
              )}
            </div>

            {/* 5. SHIPPING */}
            <div className="py-3.5">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider font-mono text-neutral-900"
              >
                <span>SHIPPING</span>
                {activeAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'shipping' && (
                <div className="mt-3 text-xs text-neutral-600 leading-relaxed animate-in fade-in duration-200 space-y-1">
                  <p>• Standard Delivery: 2–4 business days (FREE on orders over $75)</p>
                  <p>• Express Next-Day Courier: Available at checkout</p>
                  <p>• Dispatched in eco-friendly 100% recyclable FSC-certified packaging</p>
                </div>
              )}
            </div>

            {/* 6. RETURNS */}
            <div className="py-3.5">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'returns' ? '' : 'returns')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider font-mono text-neutral-900"
              >
                <span>RETURNS</span>
                {activeAccordion === 'returns' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'returns' && (
                <div className="mt-3 text-xs text-neutral-600 leading-relaxed animate-in fade-in duration-200">
                  <p>Free 30-day hassle-free returns on all unworn items with original tags. Pre-printed prepaid shipping label included inside your delivery box.</p>
                </div>
              )}
            </div>

            {/* 7. REVIEWS */}
            <div className="py-3.5">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'reviews' ? '' : 'reviews')}
                className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider font-mono text-neutral-900"
              >
                <span>REVIEWS ({selectedProduct.reviewCount})</span>
                {activeAccordion === 'reviews' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {activeAccordion === 'reviews' && (
                <div className="mt-3 text-xs text-neutral-600 space-y-2 animate-in fade-in duration-200">
                  <p>Rated <strong>{selectedProduct.rating} / 5.0</strong> by Google merchandise community members.</p>
                  <button
                    onClick={() => {
                      const el = document.getElementById('community-reviews-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Jump to Community Reviews ↓
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Frequently Bought Together Bundle Widget (PRD Part 13 & 15) */}
      {fbtProducts.length > 0 && (
        <div className="my-12 p-6 sm:p-8 bg-neutral-50 rounded-3xl border border-neutral-200 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#4285F4] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Bundle Deal • Save 10%</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mb-6">
            FREQUENTLY BOUGHT TOGETHER
          </h3>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            {/* Visual Products Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* Product 1: Current */}
              <div
                className={`relative w-28 sm:w-36 aspect-square rounded-2xl bg-white p-3 border-2 flex items-center justify-center transition-all ${
                  bundleChecked.main ? 'border-neutral-900 shadow-md' : 'border-neutral-200 opacity-40'
                }`}
              >
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-1 right-1 text-[9px] font-bold font-mono bg-neutral-900 text-white px-1.5 py-0.5 rounded">
                  This Item
                </span>
              </div>

              <span className="text-xl font-bold text-neutral-400">+</span>

              {/* Product 2: First companion */}
              {fbtProducts[0] && (
                <div
                  className={`relative w-28 sm:w-36 aspect-square rounded-2xl bg-white p-3 border-2 flex items-center justify-center transition-all ${
                    bundleChecked.item1 ? 'border-neutral-900 shadow-md' : 'border-neutral-200 opacity-40'
                  }`}
                >
                  <img
                    src={fbtProducts[0].images[0]}
                    alt={fbtProducts[0].name}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-bold font-mono bg-blue-600 text-white px-1.5 py-0.5 rounded">
                    Pair #1
                  </span>
                </div>
              )}

              {/* Product 3: Second companion */}
              {fbtProducts[1] && (
                <>
                  <span className="text-xl font-bold text-neutral-400">+</span>
                  <div
                    className={`relative w-28 sm:w-36 aspect-square rounded-2xl bg-white p-3 border-2 flex items-center justify-center transition-all ${
                      bundleChecked.item2 ? 'border-neutral-900 shadow-md' : 'border-neutral-200 opacity-40'
                    }`}
                  >
                    <img
                      src={fbtProducts[1].images[0]}
                      alt={fbtProducts[1].name}
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] font-bold font-mono bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                      Pair #2
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Checkbox Options and Bundle CTA */}
            <div className="flex-1 max-w-md w-full space-y-3">
              <div className="space-y-2 text-xs">
                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={bundleChecked.main}
                    onChange={(e) => setBundleChecked((prev) => ({ ...prev, main: e.target.checked }))}
                    className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300"
                  />
                  <span className="text-neutral-800 font-medium">
                    <strong>This item:</strong> {selectedProduct.name}{' '}
                    <span className="font-mono font-bold text-neutral-900">
                      (${selectedProduct.price.toFixed(2)})
                    </span>
                  </span>
                </label>

                {fbtProducts[0] && (
                  <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={bundleChecked.item1}
                      onChange={(e) => setBundleChecked((prev) => ({ ...prev, item1: e.target.checked }))}
                      className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300"
                    />
                    <span className="text-neutral-800 font-medium">
                      <strong>Add:</strong> {fbtProducts[0].name}{' '}
                      <span className="font-mono font-bold text-neutral-900">
                        (${fbtProducts[0].price.toFixed(2)})
                      </span>
                    </span>
                  </label>
                )}

                {fbtProducts[1] && (
                  <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={bundleChecked.item2}
                      onChange={(e) => setBundleChecked((prev) => ({ ...prev, item2: e.target.checked }))}
                      className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900 border-neutral-300"
                    />
                    <span className="text-neutral-800 font-medium">
                      <strong>Add:</strong> {fbtProducts[1].name}{' '}
                      <span className="font-mono font-bold text-neutral-900">
                        (${fbtProducts[1].price.toFixed(2)})
                      </span>
                    </span>
                  </label>
                )}
              </div>

              {/* Total & 1-Click Action */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase font-semibold">
                    Bundle Price
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-black text-neutral-900">
                      ${bundleDiscountedTotal.toFixed(2)}
                    </span>
                    {bundleSavings > 0 && (
                      <span className="text-xs text-neutral-400 line-through">
                        ${bundleTotal.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddBundleToCart}
                  disabled={bundleItems.filter((b) => b.active).length === 0}
                  className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-40"
                >
                  Add Selected to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div id="community-reviews-section" className="pt-12 border-t border-neutral-200 mb-16 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Community Reviews
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Verified feedback from Google Merch buyers.
            </p>
          </div>

          <button
            onClick={() => setWriteReviewOpen(true)}
            className="mt-4 sm:mt-0 px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors flex items-center space-x-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
            selectedProduct.reviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 text-sm">{rev.userName}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">{rev.date}</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">{rev.comment}</p>
                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 font-mono">
                    <Check className="w-3 h-3 mr-1" /> Verified Buyer
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-xs text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-200">
              No reviews yet for this product. Be the first to leave a review!
            </div>
          )}
        </div>
      </div>

      {/* PRD Section 15 Recommendations: 1. COMPLETE THE LOOK */}
      {completeTheLookProducts.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 mb-14">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
            <Layers className="w-4 h-4 text-blue-500" />
            <span>Curated Styling • Complementary Items</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mb-6">
            COMPLETE THE LOOK
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completeTheLookProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* PRD Section 15 Recommendations: 2. YOU MAY ALSO LIKE */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 mb-14">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Similar Category Drops</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mb-6">
            YOU MAY ALSO LIKE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* PRD Section 15 Recommendations: 3. RECENTLY VIEWED */}
      {recentlyViewed.length > 0 && (
        <div className="pt-12 border-t border-neutral-200">
          <div className="flex items-center space-x-2 text-xs font-bold font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
            <Clock className="w-4 h-4 text-neutral-500" />
            <span>Your Browsing History</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mb-6">
            RECENTLY VIEWED
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Image Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white hover:text-neutral-300 bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedProduct.images[selectedImageIndex]}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Write Review Modal */}
      {writeReviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 relative">
            <button
              onClick={() => setWriteReviewOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-4">
              Write a Review
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 uppercase font-mono mb-1">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-amber-400 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReviewRating ? 'fill-amber-400' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase font-mono mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase font-mono mb-1">
                  Review Comment
                </label>
                <textarea
                  required
                  rows={4}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your thoughts on fit, fabric quality, and aesthetics..."
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 text-white font-bold py-3 rounded-xl uppercase tracking-wider text-xs hover:bg-neutral-800 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Mobile Buy Bar (PRD Section 10 & 14) */}
      <div className="lg:hidden fixed bottom-14 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 z-30 shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-mono text-neutral-500 font-bold uppercase truncate max-w-[130px]">
            {selectedProduct.name}
          </div>
          <div className="text-base font-black text-neutral-900">
            ${selectedProduct.price.toFixed(2)}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAddToCart}
            className="px-3.5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-md active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="px-3.5 py-2.5 bg-[#4285F4] text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-md active:scale-95 transition-transform"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

    </div>
  );
};
