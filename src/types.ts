export type CategoryId = 
  | 'new'
  | 'apparel'
  | 'accessories'
  | 'drinkware'
  | 'home'
  | 'collectibles'
  | 'retro'
  | 'android'
  | 'youtube'
  | 'cloud'
  | 'chrome'
  | 'gemini'
  | 'pixel'
  | 'google'
  | 'office'
  | 'lifestyle'
  | 'featured'
  | 'best-sellers'
  | 'sale'
  | 'mens'
  | 'womens'
  | 'kids'
  | 'headgear'
  | 'socks'
  | 'bags'
  | 'eco-friendly'
  | 'stationery'
  | 'collections'
  | 'shop-by-brand'
  | '1998-retro'
  | 'super-g'
  | 'google-bike'
  | 'chrome-dino'
  | 'clearance';

export type LifestyleTag = 
  | 'desk'
  | 'commute'
  | 'weekend'
  | 'coffee'
  | 'fit'
  | 'collection'
  | 'creator'
  | 'campus';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  code?: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: CategoryId;
  collection?: string;
  brand?: string;
  subCategory?: string;
  lifestyleCollection?: LifestyleTag[];
  colors: ProductColor[];
  sizes?: string[];
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags?: string[];
  details: string[];
  materials?: string;
  careInstructions?: string;
  ecoFriendly?: boolean;
  reviews?: Review[];
  sourceUrl?: string;
  relatedProductIds?: string[];
  frequentlyBoughtTogetherIds?: string[];
  itemType?: string;
  badge?: string;
  routes?: string[];
}

export interface CartItem {
  id: string; // unique cart item id (product.id + color + size)
  product: Product;
  selectedColor: ProductColor;
  selectedSize?: string;
  quantity: number;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortDescription: string;
  bannerImage: string;
  itemCount: number;
}

export interface LifestyleOption {
  id: LifestyleTag;
  title: string;
  subtitle: string;
  bgGradient: string;
  image: string;
}

export interface FilterState {
  category: CategoryId | 'all';
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  lifestyle: LifestyleTag | 'all';
  onlyInStock: boolean;
  onlySale: boolean;
  onlyNew: boolean;
  onlyEco: boolean;
  searchQuery: string;
}

export type SortOption = 'recommended' | 'newest' | 'best-selling' | 'price-low' | 'price-high' | 'rating';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'error';
  productImage?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  tier: string;
  points: number;
  savedAddresses: Array<{
    id: string;
    label: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
  }>;
}
