/**
 * Checkout & Purchase Tracking for loischloe.com.bd
 *
 * All functions fire both client pixel + CAPI with dedup event_id
 * via the unified helpers in meta-pixel.ts.
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
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerCity?: string;
}

/**
 * Call when the checkout page loads.
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
 * Call when the "Place Order" API call succeeds.
 * Fires both client pixel + CAPI with dedup.
 */
export async function onPurchaseComplete(order: OrderData) {
  const currency = order.currency || "BDT";

  // trackPurchase handles client + CAPI with matching event_id
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

  // Additional CAPI call with customer PII for better match quality
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Purchase",
        eventId: `purchase-${order.orderId}`,
        eventTime: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        email: order.customerEmail,
        phone: order.customerPhone,
        firstName: order.customerName?.split(" ")[0],
        lastName: order.customerName?.split(" ").slice(1).join(" "),
        city: order.customerCity,
        content_ids: order.items.map((item) => item.id),
        currency,
        value: order.totalValue,
        order_id: order.orderId,
      }),
    });
  } catch (error) {
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
