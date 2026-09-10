import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  ProductColor,
  CategoryId,
  LifestyleTag,
  FilterState,
  SortOption,
  ToastMessage,
  Order,
  UserProfile,
} from '../types';
import { PRODUCTS } from '../data/products';
import {
  trackAddToCart,
  trackRemoveFromCart,
  trackViewItem,
  trackAddToWishlist,
  trackPurchase,
  trackPageView,
} from '../utils/analytics';

interface ShopContextType {
  // Navigation & View
  activeView: 'home' | 'plp' | 'pdp' | 'wishlist' | 'orders';
  setActiveView: (view: 'home' | 'plp' | 'pdp' | 'wishlist' | 'orders') => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (category: CategoryId | 'all') => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  selectedLifestyle: LifestyleTag | 'all';
  setSelectedLifestyle: (lifestyle: LifestyleTag | 'all') => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color?: ProductColor, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  freeShippingThreshold: number;
  appliedPromo: { code: string; discountPercent: number; amount: number } | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickAddProduct: Product | null;
  setQuickAddProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Filters & Sorting
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'error', productImage?: string) => void;
  removeToast: (id: string) => void;

  // Orders & User Profile
  orders: Order[];
  placeOrder: (shippingAddress: Order['shippingAddress']) => Order;
  userProfile: UserProfile;

  // Quick helper
  navigateToPLPWithCategory: (category: CategoryId | 'all') => void;
  navigateToPLPWithLifestyle: (lifestyle: LifestyleTag | 'all') => void;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  priceRange: [0, 200],
  colors: [],
  sizes: [],
  lifestyle: 'all',
  onlyInStock: false,
  onlySale: false,
  onlyNew: false,
  onlyEco: false,
  searchQuery: '',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState<'home' | 'plp' | 'pdp' | 'wishlist' | 'orders'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedLifestyle, setSelectedLifestyle] = useState<LifestyleTag | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('g_merch_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; amount: number } | null>(null);

  // Wishlist State with localStorage persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('g_merch_wishlist');
      return saved ? JSON.parse(saved) : ['g-hoodie-01', 'g-waterbottle-05'];
    } catch {
      return ['g-hoodie-01', 'g-waterbottle-05'];
    }
  });

  // Recent Searches
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('g_merch_searches');
      return saved ? JSON.parse(saved) : ['Google Hoodie', 'Pixel Cap', 'Desk Mat', 'Android Collectible'];
    } catch {
      return ['Google Hoodie', 'Pixel Cap', 'Desk Mat', 'Android Collectible'];
    }
  });

  // UI Drawer / Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter & Sort State
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('g_merch_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'G-8492041',
          date: '2026-08-01',
          items: [
            {
              productId: 'g-hoodie-01',
              name: 'Google Minimalist Embroidery Hoodie',
              color: 'Charcoal Black',
              size: 'L',
              price: 68,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
            },
            {
              productId: 'g-waterbottle-05',
              name: 'Google HydroThermal Insulated Bottle 750ml',
              color: 'Google Yellow',
              price: 34,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
            },
          ],
          subtotal: 102,
          shipping: 0,
          discount: 10,
          total: 92,
          status: 'Delivered',
          trackingNumber: '1Z9999999999999999',
          shippingAddress: {
            fullName: 'Alex Rivera',
            street: '1600 Amphitheatre Pkwy',
            city: 'Mountain View',
            state: 'CA',
            zip: '94043',
            country: 'United States',
          },
        },
      ];
    } catch {
      return [];
    }
  });

  // User Profile
  const userProfile: UserProfile = {
    name: 'Alex Rivera',
    email: 'alex.rivera@gmail.com',
    memberSince: '2025',
    tier: 'Google Merch VIP',
    points: 450,
    savedAddresses: [
      {
        id: 'addr1',
        label: 'Home',
        street: '1600 Amphitheatre Pkwy',
        city: 'Mountain View',
        state: 'CA',
        zip: '94043',
        isDefault: true,
      },
    ],
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('g_merch_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('g_merch_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('g_merch_searches', JSON.stringify(recentSearches));
    } catch (e) {
      console.error(e);
    }
  }, [recentSearches]);

  useEffect(() => {
    try {
      localStorage.setItem('g_merch_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Toast Helper
  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success', productImage?: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type, productImage }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 75;

  let promoDiscount = 0;
  if (appliedPromo) {
    promoDiscount = (cartSubtotal * appliedPromo.discountPercent) / 100;
  }
  const cartTotal = Math.max(0, cartSubtotal - promoDiscount);

  // Page view tracking on activeView change
  useEffect(() => {
    trackPageView(`/${activeView}`, `Google Merch Store - ${activeView.toUpperCase()}`);
  }, [activeView]);

  // Cart Actions
  const addToCart = (product: Product, color?: ProductColor, size?: string, quantity: number = 1) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || (product.sizes ? product.sizes[0] : undefined);
    const cartItemId = `${product.id}-${chosenColor.name}-${chosenSize || 'default'}`;

    const newCartItem: CartItem = {
      id: cartItemId,
      product,
      selectedColor: chosenColor,
      selectedSize: chosenSize,
      quantity,
    };

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, newCartItem];
    });

    // GA4 add_to_cart event
    trackAddToCart(newCartItem);

    addToast(
      'Added to your bag ✓',
      `${product.name} (${chosenColor.name}${chosenSize ? `, ${chosenSize}` : ''})`,
      'success',
      product.images[0]
    );

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = cart.find((item) => item.id === cartItemId);
    if (itemToRemove) {
      trackRemoveFromCart(itemToRemove);
    }
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GOOGLE20') {
      setAppliedPromo({ code: cleanCode, discountPercent: 20, amount: 0 });
      addToast('Promo Code Applied!', '20% off your entire order', 'success');
      return true;
    } else if (cleanCode === 'WELCOME10') {
      setAppliedPromo({ code: cleanCode, discountPercent: 10, amount: 0 });
      addToast('Promo Code Applied!', '10% welcome discount applied', 'success');
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setAppliedPromo({ code: cleanCode, discountPercent: 15, amount: 0 });
      addToast('Free Shipping & 15% Off!', 'Special promotional rate applied', 'success');
      return true;
    }
    addToast('Invalid Promo Code', 'Try GOOGLE20 or WELCOME10', 'error');
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Promo Code Removed', '', 'info');
  };

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);

      if (exists) {
        addToast('Removed from Wishlist', product ? product.name : '', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (product) {
          trackAddToWishlist(product);
        }
        addToast('Saved to Wishlist ♡', product ? product.name : '', 'success', product?.images[0]);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Search Actions
  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== query.toLowerCase());
      return [query.trim(), ...filtered].slice(0, 6);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // View Navigation Helpers
  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    trackViewItem(product);
    setActiveView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPLPWithCategory = (category: CategoryId | 'all') => {
    setSelectedCategory(category);
    setSelectedLifestyle('all');
    setFilters((prev) => ({ ...prev, category, lifestyle: 'all' }));
    setActiveView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPLPWithLifestyle = (lifestyle: LifestyleTag | 'all') => {
    setSelectedLifestyle(lifestyle);
    setSelectedCategory('all');
    setFilters((prev) => ({ ...prev, lifestyle, category: 'all' }));
    setActiveView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSelectedCategory('all');
    setSelectedLifestyle('all');
  };

  const placeOrder = (shippingAddress: Order['shippingAddress']): Order => {
    const newOrder: Order = {
      id: `G-${Math.floor(1000000 + Math.random() * 9000000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        color: item.selectedColor.name,
        size: item.selectedSize,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      })),
      subtotal: cartSubtotal,
      shipping: cartSubtotal >= freeShippingThreshold ? 0 : 10,
      discount: promoDiscount,
      total: cartTotal + (cartSubtotal >= freeShippingThreshold ? 0 : 10),
      status: 'Processing',
      trackingNumber: `1Z${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      shippingAddress,
    };

    setOrders((prev) => [newOrder, ...prev]);
    trackPurchase(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    addToast('Order Confirmed! 🎉', `Order #${newOrder.id} has been placed.`, 'success');
    setActiveView('orders');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        openProductDetail,
        selectedLifestyle,
        setSelectedLifestyle,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        freeShippingThreshold,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartTotal,

        wishlist,
        toggleWishlist,
        isInWishlist,

        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,

        isCartOpen,
        setIsCartOpen,
        quickAddProduct,
        setQuickAddProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isAccountOpen,
        setIsAccountOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,

        filters,
        setFilters,
        resetFilters,
        sortOption,
        setSortOption,

        toasts,
        addToast,
        removeToast,

        orders,
        placeOrder,
        userProfile,

        navigateToPLPWithCategory,
        navigateToPLPWithLifestyle,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
