/**
 * Checkout & Purchase Tracking for loischloe.com.bd
 *
 * This module provides the functions you need to call at each step
 * of the checkout flow. Add these calls to your existing checkout code.
 *
 * THE KEY FIX: The Purchase event must fire BOTH client-side (pixel)
 * AND server-side (CAPI) when the order API returns success.
 */

import {
  trackInitiateCheckout,
  trackPurchase,
  trackEvent,
} from "@/lib/meta-pixel";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  orderId: string;
  items: CartItem[];
  totalValue: number;
  currency?: string;
  // Customer info for server-side CAPI
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerCity?: string;
}

/**
 * Call this when the checkout page loads or when the user
 * navigates to the checkout page.
 */
export function onCheckoutPageLoad(items: CartItem[]) {
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  trackInitiateCheckout({
    content_ids: items.map((item) => item.id),
    contents: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    })),
    currency: "BDT",
    value: totalValue,
    num_items: items.reduce((sum, item) => sum + item.quantity, 0),
  });
}

/**
 * CRITICAL: Call this when the "Place Order" API call succeeds.
 *
 * This fires BOTH:
 * 1. Client-side pixel Purchase event
 * 2. Server-side CAPI Purchase event (via /api/meta-capi)
 *
 * Example usage in your checkout form handler:
 *
 *   const handlePlaceOrder = async (formData) => {
 *     const response = await fetch('/api/orders', { ... });
 *     const order = await response.json();
 *
 *     if (response.ok) {
 *       // FIRE PURCHASE EVENT HERE
 *       await onPurchaseComplete({
 *         orderId: order.id,
 *         items: cartItems,
 *         totalValue: cartTotal,
 *         customerName: formData.name,
 *         customerPhone: formData.phone,
 *         customerEmail: formData.email,
 *         customerCity: formData.district,
 *       });
 *
 *       // Then redirect or show success message
 *     }
 *   };
 */
export async function onPurchaseComplete(order: OrderData) {
  const currency = order.currency || "BDT";

  // 1. Fire client-side pixel event
  trackPurchase({
    content_ids: order.items.map((item) => item.id),
    content_name: order.items.map((item) => item.name).join(", "),
    content_type: "product",
    contents: order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    })),
    currency,
    value: order.totalValue,
    num_items: order.items.reduce((sum, item) => sum + item.quantity, 0),
    order_id: order.orderId,
  });

  // 2. Fire server-side CAPI event for redundancy
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Purchase",
        eventTime: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        // Customer data for better matching
        email: order.customerEmail,
        phone: order.customerPhone,
        firstName: order.customerName?.split(" ")[0],
        lastName: order.customerName?.split(" ").slice(1).join(" "),
        city: order.customerCity,
        // Event data
        content_ids: order.items.map((item) => item.id),
        currency,
        value: order.totalValue,
        order_id: order.orderId,
      }),
    });
  } catch (error) {
    // Server event is a bonus — don't block the user flow
    console.warn("Server-side Purchase event failed:", error);
  }
}

/**
 * Call when user adds payment info (optional, improves funnel tracking).
 */
export function onAddPaymentInfo(totalValue: number) {
  trackEvent("AddPaymentInfo", {
    currency: "BDT",
    value: totalValue,
  });
}
