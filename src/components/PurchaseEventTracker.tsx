"use client";

/**
 * PurchaseEventTracker - fires Meta Pixel Purchase event on the order-received page.
 *
 * This is a client component that fires once when the thank-you page mounts.
 * It sends both client-side pixel AND server-side CAPI Purchase events.
 *
 * Usage in the order-received server component:
 *   <PurchaseEventTracker order={order} />
 */

import { useEffect, useRef } from "react";
import { trackPurchase } from "@/lib/meta-pixel";

interface OrderProps {
  order: {
    $id: string;
    totalCost?: number;
    subTotal?: number;
    shippingCost?: number;
    name?: string;
    phone?: string;
    email?: string;
    district?: string;
    city?: string;
    products?: any[];
    cartList?: any[];
    [key: string]: any;
  };
}

export default function PurchaseEventTracker({ order }: OrderProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    // Only fire once per mount to prevent duplicate events
    if (hasFired.current) return;
    hasFired.current = true;

    const totalValue =
      order.totalCost || order.subTotal || 0;
    const items = order.products || order.cartList || [];

    // 1. Fire client-side pixel Purchase event
    trackPurchase({
      content_ids: items.map((item: any) => item.id || item.$id || item.productId || ""),
      content_name: items.map((item: any) => item.name || item.title || "").join(", "),
      content_type: "product",
      contents: items.map((item: any) => ({
        id: item.id || item.$id || item.productId || "",
        quantity: item.quantity || 1,
        item_price: item.price || item.salePrice || 0,
      })),
      currency: "BDT",
      value: totalValue,
      num_items: items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0),
      order_id: order.$id,
    });

    // 2. Fire server-side CAPI Purchase event for redundancy + better match quality
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Purchase",
        eventTime: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        email: order.email,
        phone: order.phone,
        firstName: order.name?.split(" ")[0],
        lastName: order.name?.split(" ").slice(1).join(" "),
        city: order.district || order.city,
        content_ids: items.map((item: any) => item.id || item.$id || item.productId || ""),
        currency: "BDT",
        value: totalValue,
        order_id: order.$id,
      }),
    }).catch(() => {
      // Server event is a bonus — don't block user experience
    });
  }, [order]);

  // This component renders nothing — it only fires events
  return null;
}
