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
                        order.paymentInformation?.total_price ||
                        order.totalCost ||
                        order.subTotal ||
                        0;
        // The order from Appwrite uses "orderItems" with nested "product" objects
                const items = order.orderItems || order.products || order.cartList || [];

                // Extract content_ids using the Appwrite document $id (matches catalog feed <g:id>)
                const contentIds = items.map(
                        (item: any) =>
                                  item.product?.$id || item.product?.id || item.id || item.$id || item.productId || ""
                      ).filter(Boolean);

                const contentNames = items
          .map((item: any) => item.product?.name || item.name || item.title || "")
          .filter(Boolean)
          .join(", ");

                const contents = items.map((item: any) => ({
                        id: item.product?.$id || item.product?.id || item.id || item.$id || item.productId || "",
                        quantity: item.quantity || 1,
                        item_price: item.price || item.product?.sale_price || item.product?.price || 0,
                }));

                const numItems = items.reduce(
                        (sum: number, item: any) => sum + (item.quantity || 1),
                        0
                      );

                // 1. Fire client-side pixel Purchase event
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

                // 2. Fire server-side CAPI Purchase event for redundancy + better match quality
                const shippingInfo = order.shippingInformation || order;
        fetch("/api/meta-capi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                          eventName: "Purchase",
                          eventTime: Math.floor(Date.now() / 1000),
                          sourceUrl: window.location.href,
                          email: shippingInfo.email || order.email,
                          phone: shippingInfo.phone || order.phone,
                          firstName: (shippingInfo.name || order.name)?.split(" ")[0],
                          lastName: (shippingInfo.name || order.name)?.split(" ").slice(1).join(" "),
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

  // This component renders nothing — it only fires events
  return null;
}
