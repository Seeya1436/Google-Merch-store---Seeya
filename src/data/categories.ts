import { CategoryInfo, CategoryId, LifestyleOption } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'apparel',
    name: 'Apparel',
    shortDescription: 'Hoodies, t-shirts, jackets and street-ready outerwear built for daily comfort.',
    bannerImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
    itemCount: 14,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    shortDescription: 'Caps, backpacks, tech organizers, and everyday carry essentials.',
    bannerImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    itemCount: 12,
  },
  {
    id: 'drinkware',
    name: 'Drinkware',
    shortDescription: 'Vacuum-insulated tumblers, ceramic mugs, and hydrators.',
    bannerImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    itemCount: 8,
  },
  {
    id: 'home',
    name: 'Home & Lifestyle',
    shortDescription: 'Minimalist desk mats, notebooks, pens, and workspace accents.',
    bannerImage: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=1200&q=80',
    itemCount: 10,
  },
  {
    id: 'collectibles',
    name: 'Collectibles',
    shortDescription: 'Limited-edition Android figurines, Chrome badges, and rare drops.',
    bannerImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    itemCount: 6,
  },
  {
    id: 'new',
    name: 'New Drops',
    shortDescription: 'Fresh merchandise landed straight from Google Design Labs.',
    bannerImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
    itemCount: 10,
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    shortDescription: 'The community favourites everyone is wearing and carrying right now.',
    bannerImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
    itemCount: 12,
  },
  {
    id: 'sale',
    name: 'Special Offers',
    shortDescription: 'Exclusive seasonal markdowns on authentic Google gear.',
    bannerImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    itemCount: 8,
  },
];

export const LIFESTYLE_COLLECTIONS: LifestyleOption[] = [
  {
    id: 'desk',
    title: 'For Your Desk',
    subtitle: 'Elevate your workspace with sleek mats, ceramic mugs, and notebooks.',
    bgGradient: 'from-blue-600/20 to-indigo-900/40',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'commute',
    title: 'For Your Commute',
    subtitle: 'Waterproof backpacks, travel tumblers, and noise-cancelling tech pouches.',
    bgGradient: 'from-emerald-600/20 to-teal-900/40',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'weekend',
    title: 'For Your Weekend',
    subtitle: 'Relaxed hoodies, classic caps, and durable canvas tote bags.',
    bgGradient: 'from-amber-600/20 to-orange-900/40',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'coffee',
    title: 'For Your Coffee',
    subtitle: 'Precision thermal flasks and double-walled borosilicate mugs.',
    bgGradient: 'from-rose-600/20 to-red-900/40',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fit',
    title: 'For Your Fit',
    subtitle: 'Minimalist embroidered streetwear designed with sustainable organic cotton.',
    bgGradient: 'from-purple-600/20 to-indigo-950/40',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'collection',
    title: 'For Your Collection',
    subtitle: 'Rare Android figurines, chrome edition pins, and limited developer drops.',
    bgGradient: 'from-cyan-600/20 to-blue-950/40',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  },
];
