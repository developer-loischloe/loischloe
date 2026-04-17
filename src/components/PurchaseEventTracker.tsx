"use client";

/**
 * PurchaseEventTracker - fires Meta Pixel Purchase event on the order-received page.
 *
 * Fires both client-side pixel AND server-side CAPI with matching event_id
 * so Meta deduplicates them into a single conversion.
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
    if (hasFired.current) return;
    hasFired.current = true;

    const totalValue =
      order.paymentInformation?.total_price ||
      order.totalCost ||
      order.subTotal ||
      0;
    const items = order.orderItems || order.products || order.cartList || [];

    const contentIds = items
      .map(
        (item: any) =>
          item.product?.$id ||
          item.product?.id ||
          item.id ||
          item.$id ||
          item.productId ||
          ""
      )
      .filter(Boolean);

    const contentNames = items
      .map((item: any) => item.product?.name || item.name || item.title || "")
      .filter(Boolean)
      .join(", ");

    const contents = items.map((item: any) => ({
      id:
        item.product?.$id ||
        item.product?.id ||
        item.id ||
        item.$id ||
        item.productId ||
        "",
      quantity: item.quantity || 1,
      item_price:
        item.price || item.product?.sale_price || item.product?.price || 0,
    }));

    const numItems = items.reduce(
      (sum: number, item: any) => sum + (item.quantity || 1),
      0
    );

    // trackPurchase handles both client pixel + CAPI with dedup event_id
    trackPurchase({
      content_ids: contentIds,
      content_name: contentNames,
      content_type: "product",
      contents,
      currency: "BDT",
      value: totalValue,
      num_items: numItems,
      order_id: order.$id,
    });

    // Also fire a CAPI-specific call with customer PII for better match quality
    const shippingInfo = order.shippingInformation || order;
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Purchase",
        eventId: `purchase-${order.$id}`,
        eventTime: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        email: shippingInfo.email || order.email,
        phone: shippingInfo.phone || order.phone,
        firstName: (shippingInfo.name || order.name)?.split(" ")[0],
        lastName: (shippingInfo.name || order.name)
          ?.split(" ")
          .slice(1)
          .join(" "),
        city: shippingInfo.district || order.district || order.city,
        content_ids: contentIds,
        currency: "BDT",
        value: totalValue,
        order_id: order.$id,
      }),
    }).catch(() => {
      // Server event is a bonus — don't block user experience
    });
  }, [order]);

  return null;
}
