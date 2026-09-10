import { Product, CartItem, Order } from '../types';

export interface GA4EventRecord {
  id: string;
  timestamp: string;
  eventName: string;
  params: Record<string, any>;
}

type EventListener = (record: GA4EventRecord) => void;
const listeners: EventListener[] = [];
const eventLog: GA4EventRecord[] = [];

export function subscribeToGA4Events(listener: EventListener) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

export function getRecentGA4Events(): GA4EventRecord[] {
  return [...eventLog];
}

export function clearGA4Events() {
  eventLog.length = 0;
}

export function logGA4Event(eventName: string, params: Record<string, any> = {}) {
  // 1. Prepare record
  const record: GA4EventRecord = {
    id: 'ev-' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    eventName,
    params,
  };

  eventLog.unshift(record);
  if (eventLog.length > 50) eventLog.pop();

  // 2. Push to window.dataLayer (Standard GA4 / GTM integration)
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventName,
      ecommerce: params,
      _timestamp: Date.now(),
    });
  }

  // 3. Console logger with colorful badge
  console.log(
    `%c[GA4 Ecommerce] %c${eventName}`,
    'background: #4285F4; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
    'color: #0F9D58; font-weight: bold;',
    params
  );

  // 4. Notify UI subscribers
  listeners.forEach((l) => l(record));
}

// -------------------------------------------------------------
// Specialized GA4 Ecommerce Event Helpers (PRD Section 27)
// -------------------------------------------------------------

export function trackPageView(pagePath: string, pageTitle: string) {
  logGA4Event('page_view', {
    page_location: window.location.href,
    page_path: pagePath,
    page_title: pageTitle,
  });
}

export function trackViewItemList(items: Product[], listName: string = 'Product Grid') {
  logGA4Event('view_item_list', {
    item_list_name: listName,
    items: items.slice(0, 10).map((p, index) => ({
      item_id: p.id,
      item_name: p.name,
      item_category: p.category,
      item_brand: p.brand || 'Google',
      price: p.price,
      index: index + 1,
    })),
  });
}

export function trackSelectItem(product: Product, listName: string = 'Product Grid') {
  logGA4Event('select_item', {
    item_list_name: listName,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_brand: product.brand || 'Google',
        price: product.price,
      },
    ],
  });
}

export function trackViewItem(product: Product) {
  logGA4Event('view_item', {
    currency: 'USD',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_brand: product.brand || 'Google',
        price: product.price,
      },
    ],
  });
}

export function trackSearch(search_term: string) {
  logGA4Event('search', {
    search_term,
  });
}

export function trackAddToCart(item: CartItem) {
  logGA4Event('add_to_cart', {
    currency: 'USD',
    value: item.product.price * item.quantity,
    items: [
      {
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        item_brand: item.product.brand || 'Google',
        item_variant: `${item.selectedColor.name}${item.selectedSize ? ' / ' + item.selectedSize : ''}`,
        price: item.product.price,
        quantity: item.quantity,
      },
    ],
  });
}

export function trackViewCart(items: CartItem[], totalValue: number) {
  logGA4Event('view_cart', {
    currency: 'USD',
    value: totalValue,
    items: items.map((ci) => ({
      item_id: ci.product.id,
      item_name: ci.product.name,
      item_category: ci.product.category,
      price: ci.product.price,
      quantity: ci.quantity,
    })),
  });
}

export function trackRemoveFromCart(item: CartItem) {
  logGA4Event('remove_from_cart', {
    currency: 'USD',
    value: item.product.price * item.quantity,
    items: [
      {
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      },
    ],
  });
}

export function trackBeginCheckout(items: CartItem[], totalValue: number) {
  logGA4Event('begin_checkout', {
    currency: 'USD',
    value: totalValue,
    items: items.map((ci) => ({
      item_id: ci.product.id,
      item_name: ci.product.name,
      item_category: ci.product.category,
      price: ci.product.price,
      quantity: ci.quantity,
    })),
  });
}

export function trackAddPaymentInfo(paymentType: string, totalValue: number) {
  logGA4Event('add_payment_info', {
    currency: 'USD',
    value: totalValue,
    payment_type: paymentType,
  });
}

export function trackPurchase(order: Order) {
  logGA4Event('purchase', {
    transaction_id: order.id,
    currency: 'USD',
    value: order.total,
    shipping: order.shipping,
    tax: 0,
    items: order.items.map((i) => ({
      item_id: i.productId,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
      item_variant: i.color,
    })),
  });
}

export function trackAddToWishlist(product: Product) {
  logGA4Event('add_to_wishlist', {
    currency: 'USD',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      },
    ],
  });
}
