/**
 * Meta Pixel Helper Library for loischloe.com.bd
 * Primary Pixel ID: 873149687270309
 * Catalog Pixel ID: 1148015303657843 (connected to Commerce Manager catalog)
 *
 * This module provides type-safe helpers for firing Meta Pixel events
 * directly from Next.js code — no GTM dependency required.
 *
 * Both pixels are initialized so that e-commerce events (Purchase, ViewContent,
 * AddToCart) fire to both — ensuring the catalog pixel receives content_ids
 * and other parameters needed for catalog matching.
 */

export const META_PIXEL_ID = "873149687270309";
export const META_CATALOG_PIXEL_ID = "1148015303657843";
// Extend Window to include fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

// ----- Pixel Initialization -----

/**
 * Initialize the Meta Pixel. Call this once in your root layout.
 * Includes Advanced Matching with customer data when available.
 */
export function initPixel(userData?: UserData) {
  if (typeof window === "undefined") return;

  // Load fbevents.js if not already loaded
  if (!window.fbq) {
    const n: any = (window.fbq = function (...args: any[]) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    });
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  // Init primary pixel with Advanced Matching data if provided
  if (userData && Object.keys(userData).length > 0) {
    window.fbq("init", META_PIXEL_ID, userData);
    window.fbq("init", META_CATALOG_PIXEL_ID, userData);
  } else {
    window.fbq("init", META_PIXEL_ID);
    window.fbq("init", META_CATALOG_PIXEL_ID);
  }

  // Fire initial PageView (fires for all initialized pixels)
  window.fbq("track", "PageView");
}

// ----- Event Tracking Helpers -----

/**
 * Track a standard Meta Pixel event.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (params) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }
}

/**
 * Track a custom Meta Pixel event.
 */
export function trackCustomEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (params) {
    window.fbq("trackCustom", eventName, params);
  } else {
    window.fbq("trackCustom", eventName);
  }
}

/**
 * Track a PageView event (use on client-side route changes in Next.js).
 */
export function trackPageView() {
  trackEvent("PageView");
}

// ----- E-commerce Event Helpers -----

export interface ProductData {
  content_ids?: string[];
  content_name?: string;
  content_type?: "product" | "product_group";
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
  currency?: string;
  value?: number;
  num_items?: number;
}

export interface UserData {
  em?: string;   // Email (will be hashed by pixel)
  fn?: string;   // First name
  ln?: string;   // Last name
  ph?: string;   // Phone number
  ct?: string;   // City
  st?: string;   // State
  zp?: string;   // Zip code
  country?: string;
  external_id?: string;
}

/**
 * Track when a user views a product page.
 */
export function trackViewContent(product: ProductData) {
  trackEvent("ViewContent", {
    content_ids: product.content_ids,
    content_name: product.content_name,
    content_type: product.content_type || "product",
    contents: product.contents,
    currency: product.currency || "BDT",
    value: product.value || 0,
  });
}

/**
 * Track when a user adds a product to the cart.
 */
export function trackAddToCart(product: ProductData) {
  trackEvent("AddToCart", {
    content_ids: product.content_ids,
    content_name: product.content_name,
    content_type: product.content_type || "product",
    contents: product.contents,
    currency: product.currency || "BDT",
    value: product.value || 0,
    num_items: product.num_items || 1,
  });
}

/**
 * Track when a user begins checkout.
 */
export function trackInitiateCheckout(data: ProductData) {
  trackEvent("InitiateCheckout", {
    content_ids: data.content_ids,
    contents: data.contents,
    currency: data.currency || "BDT",
    value: data.value || 0,
    num_items: data.num_items || 1,
  });
}

/**
 * Track when a user completes a purchase.
 * THIS IS THE CRITICAL EVENT — must fire on order confirmation.
 */
export function trackPurchase(data: ProductData & { order_id?: string }) {
  trackEvent("Purchase", {
    content_ids: data.content_ids,
    content_name: data.content_name,
    content_type: data.content_type || "product",
    contents: data.contents,
    currency: data.currency || "BDT",
    value: data.value || 0,
    num_items: data.num_items || 1,
  });

  // Also fire server-side via Conversions API for redundancy
  if (data.order_id) {
    sendServerEvent("Purchase", {
      content_ids: data.content_ids,
      currency: data.currency || "BDT",
      value: data.value || 0,
      order_id: data.order_id,
    });
  }
}

/**
 * Track a search event.
 */
export function trackSearch(searchString: string) {
  trackEvent("Search", {
    search_string: searchString,
  });
}

// ----- Server-side Conversions API Helper -----

/**
 * Send an event to Meta Conversions API via your Next.js API route.
 * This provides redundant tracking that doesn't rely on the browser pixel.
 */
async function sendServerEvent(
  eventName: string,
  params: Record<string, any>
) {
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventTime: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        ...params,
      }),
    });
  } catch (error) {
    // Silently fail — server event is a bonus, not critical
    console.warn("Meta CAPI event failed:", error);
  }
}
/**
 * Meta Pixel Helper Library for loischloe.com.bd
 * Pixel ID: 873149687270309
 *
 * This module provides type-safe helpers for firing Meta Pixel events
 * directly from Next.js code — no GTM dependency required.
 */

export const META_PIXEL_ID = "873149687270309";
// Extend Window to include fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

// ----- Pixel Initialization -----

/**
 * Initialize the Meta Pixel. Call this once in your root layout.
 * Includes Advanced Matching with customer data when available.
 */
export function initPixel(userData?: UserData) {
  if (typeof window === "undefined") return;

  // Load fbevents.js if not already loaded
  if (!window.fbq) {
    const n: any = (window.fbq = function (...args: any[]) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    });
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  // Init with Advanced Matching data if provided
  if (userData && Object.keys(userData).length > 0) {
    window.fbq("init", META_PIXEL_ID, userData);
  } else {
    window.fbq("init", META_PIXEL_ID);
  }

  // Fire initial PageView
  window.fbq("track", "PageView");
}

// ----- Event Tracking Helpers -----

/**
 * Track a standard Meta Pixel event.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (params) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }
}

/**
 * Track a custom Meta Pixel event.
 */
export function trackCustomEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (params) {
    window.fbq("trackCustom", eventName, params);
  } else {
    window.fbq("trackCustom", eventName);
  }
}

/**
 * Track a PageView event (use on client-side route changes in Next.js).
 */
export function trackPageView() {
  trackEvent("PageView");
}

// ----- E-commerce Event Helpers -----

export interface ProductData {
  content_ids?: string[];
  content_name?: string;
  content_type?: "product" | "product_group";
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
  currency?: string;
  value?: number;
  num_items?: number;
}

export interface UserData {
  em?: string;   // Email (will be hashed by pixel)
  fn?: string;   // First name
  ln?: string;   // Last name
  ph?: string;   // Phone number
  ct?: string;   // City
  st?: string;   // State
  zp?: string;   // Zip code
  country?: string;
  external_id?: string;
}

/**
 * Track when a user views a product page.
 */
export function trackViewContent(product: ProductData) {
  trackEvent("ViewContent", {
    content_ids: product.content_ids,
    content_name: product.content_name,
    content_type: product.content_type || "product",
    contents: product.contents,
    currency: product.currency || "BDT",
    value: product.value || 0,
  });
}

/**
 * Track when a user adds a product to the cart.
 */
export function trackAddToCart(product: ProductData) {
  trackEvent("AddToCart", {
    content_ids: product.content_ids,
    content_name: product.content_name,
    content_type: product.content_type || "product",
    contents: product.contents,
    currency: product.currency || "BDT",
    value: product.value || 0,
    num_items: product.num_items || 1,
  });
}

/**
 * Track when a user begins checkout.
 */
export function trackInitiateCheckout(data: ProductData) {
  trackEvent("InitiateCheckout", {
    content_ids: data.content_ids,
    contents: data.contents,
    currency: data.currency || "BDT",
    value: data.value || 0,
    num_items: data.num_items || 1,
  });
}

/**
 * Track when a user completes a purchase.
 * THIS IS THE CRITICAL EVENT — must fire on order confirmation.
 */
export function trackPurchase(data: ProductData & { order_id?: string }) {
  trackEvent("Purchase", {
    content_ids: data.content_ids,
    content_name: data.content_name,
    content_type: data.content_type || "product",
    contents: data.contents,
    currency: data.currency || "BDT",
    value: data.value || 0,
    num_items: data.num_items || 1,
  });

  // Also fire server-side via Conversions API for redundancy
  if (data.order_id) {
    sendServerEvent("Purchase", {
      content_ids: data.content_ids,
      currency: data.currency || "BDT",
      value: data.value || 0,
      order_id: data.order_id,
    });
  }
}

/**
 * Track a search event.
 */
export function trackSearch(searchString: string) {
  trackEvent("Search", {
    search_string: searchString,
  });
}

// ----- Server-side Conversions API Helper -----

/**
 * Send an event to Meta Conversions API via your Next.js API route.
 * This provides redundant tracking that doesn't rely on the browser pixel.
 */
async function sendServerEvent(
  eventName: string,
  params: Record<string, any>
) {
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventTime: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        ...params,
      }),
    });
  } catch (error) {
    // Silently fail — server event is a bonus, not critical
    console.warn("Meta CAPI event failed:", error);
  }
}
