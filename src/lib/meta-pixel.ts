/**
 * Meta Pixel Helper Library for loischloe.com.bd
 * Pixel ID: 1148015303657843 (connected to Commerce Manager catalog & ad account)
 *
 * SINGLE PIXEL setup to avoid duplicate event fires.
 * Every event includes an event_id for client↔CAPI deduplication.
 */

export const META_PIXEL_ID = "1148015303657843";

// Extend Window to include fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

// ----- Deduplication Helper -----

/**
 * Generate a unique event ID for deduplication between
 * browser pixel and Conversions API.
 */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

// ----- User Data Store (for CAPI enrichment) -----
// Stored at module level so every sendServerEvent call can include user PII.
// This dramatically improves Event Match Quality (EMQ) from ~6 to 8-9/10.

let storedUserData: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  external_id?: string;
} = {};

/**
 * Store user data for CAPI enrichment. Call this whenever user info becomes
 * available (login, checkout form, etc.). All subsequent CAPI events will
 * include this data for better matching.
 */
export function setUserData(data: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  external_id?: string;
}) {
  storedUserData = { ...storedUserData, ...data };
}

/**
 * Clear stored user data (call on logout).
 */
export function clearUserData() {
  storedUserData = {};
}

/**
 * Read Meta cookies (_fbp, _fbc) from the browser.
 * Sending these client-side as a backup ensures CAPI always gets them,
 * even if server-side cookie reading fails (e.g. on Vercel Edge).
 */
function getMetaCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};
  const cookies: Record<string, string> = {};
  document.cookie.split(";").forEach((c) => {
    const [key, val] = c.trim().split("=");
    if (key === "_fbp" || key === "_fbc") {
      cookies[key.slice(1)] = val; // strip leading underscore
    }
  });
  return cookies;
}

// ----- Pixel Initialization -----

export interface UserData {
  em?: string; // Email (will be hashed by pixel)
  fn?: string; // First name
  ln?: string; // Last name
  ph?: string; // Phone number
  ct?: string; // City
  st?: string; // State
  zp?: string; // Zip code
  country?: string;
  external_id?: string;
}

/**
 * Initialize the Meta Pixel. Call this once in your root layout.
 * Does NOT fire PageView — that's handled by the route-change effect
 * in MetaPixel.tsx to avoid double-firing on initial load.
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

  // Init single pixel with Advanced Matching data if provided
  if (userData && Object.keys(userData).length > 0) {
    window.fbq("init", META_PIXEL_ID, userData);
  } else {
    window.fbq("init", META_PIXEL_ID);
  }

  // NOTE: No PageView here — MetaPixel.tsx handles it via route effect
}

// ----- Event Tracking Helpers -----

/**
 * Track a standard Meta Pixel event with event_id for deduplication.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>,
  eventId?: string
) {
  if (typeof window === "undefined" || !window.fbq) return;
  const opts = eventId ? { eventID: eventId } : {};
  if (params) {
    window.fbq("track", eventName, params, opts);
  } else {
    window.fbq("track", eventName, {}, opts);
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
 * Fires both client pixel AND server CAPI with matching event_id.
 */
export function trackPageView() {
  const eventId = generateEventId();
  trackEvent("PageView", {}, eventId);
  sendServerEvent("PageView", {}, eventId);
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

/**
 * Track when a user views a product page.
 * Fires both client-side pixel AND server-side CAPI with deduplication.
 */
export function trackViewContent(product: ProductData) {
  const eventId = generateEventId();
  trackEvent(
    "ViewContent",
    {
      content_ids: product.content_ids,
      content_name: product.content_name,
      content_type: product.content_type || "product",
      contents: product.contents,
      currency: product.currency || "BDT",
      value: product.value || 0,
    },
    eventId
  );

  sendServerEvent(
    "ViewContent",
    {
      content_ids: product.content_ids,
      content_name: product.content_name,
      currency: product.currency || "BDT",
      value: product.value || 0,
    },
    eventId
  );
}

/**
 * Track when a user adds a product to the cart.
 */
export function trackAddToCart(product: ProductData) {
  const eventId = generateEventId();
  trackEvent(
    "AddToCart",
    {
      content_ids: product.content_ids,
      content_name: product.content_name,
      content_type: product.content_type || "product",
      contents: product.contents,
      currency: product.currency || "BDT",
      value: product.value || 0,
      num_items: product.num_items || 1,
    },
    eventId
  );

  sendServerEvent(
    "AddToCart",
    {
      content_ids: product.content_ids,
      content_name: product.content_name,
      currency: product.currency || "BDT",
      value: product.value || 0,
      num_items: product.num_items || 1,
    },
    eventId
  );
}

/**
 * Track when a user begins checkout.
 */
export function trackInitiateCheckout(data: ProductData) {
  const eventId = generateEventId();
  trackEvent(
    "InitiateCheckout",
    {
      content_ids: data.content_ids,
      contents: data.contents,
      currency: data.currency || "BDT",
      value: data.value || 0,
      num_items: data.num_items || 1,
    },
    eventId
  );

  sendServerEvent(
    "InitiateCheckout",
    {
      content_ids: data.content_ids,
      currency: data.currency || "BDT",
      value: data.value || 0,
      num_items: data.num_items || 1,
    },
    eventId
  );
}

/**
 * Track when a user completes a purchase.
 */
export function trackPurchase(data: ProductData & { order_id?: string }) {
  const eventId = generateEventId();
  trackEvent(
    "Purchase",
    {
      content_ids: data.content_ids,
      content_name: data.content_name,
      content_type: data.content_type || "product",
      contents: data.contents,
      currency: data.currency || "BDT",
      value: data.value || 0,
      num_items: data.num_items || 1,
    },
    eventId
  );

  sendServerEvent(
    "Purchase",
    {
      content_ids: data.content_ids,
      currency: data.currency || "BDT",
      value: data.value || 0,
      order_id: data.order_id,
    },
    eventId
  );
}

/**
 * Track a search event.
 */
export function trackSearch(searchString: string) {
  const eventId = generateEventId();
  trackEvent(
    "Search",
    {
      search_string: searchString,
    },
    eventId
  );

  sendServerEvent(
    "Search",
    {
      search_string: searchString,
    },
    eventId
  );
}

// ----- Server-side Conversions API Helper -----

/**
 * Send an event to Meta Conversions API via your Next.js API route.
 * Includes event_id for deduplication with browser pixel events.
 */
export async function sendServerEvent(
  eventName: string,
  params: Record<string, any>,
  eventId?: string
) {
  try {
    // Include stored user data + Meta cookies for better EMQ
    const metaCookies = getMetaCookies();

    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId: eventId || generateEventId(),
        eventTime: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        // User PII — sent with EVERY event for better matching
        email: params.email || storedUserData.email,
        phone: params.phone || storedUserData.phone,
        firstName: params.firstName || storedUserData.firstName,
        lastName: params.lastName || storedUserData.lastName,
        city: params.city || storedUserData.city,
        external_id: params.external_id || storedUserData.external_id,
        // Meta cookies — client-side backup in case server can't read them
        fbp: metaCookies.fbp,
        fbc: metaCookies.fbc,
        // Event-specific params
        ...params,
      }),
    });
  } catch (error) {
    // Silently fail — server event is a bonus, not critical
    console.warn("Meta CAPI event failed:", error);
  }
}
