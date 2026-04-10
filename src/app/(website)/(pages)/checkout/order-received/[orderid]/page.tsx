import Link from "next/link";

import appwriteOrderService from "@/appwrite/appwriteOrderService";
import { serverDatabases } from "@/appwrite/appwriteServerSDKConfig";
import config from "@/config";
import { ID, Query } from "node-appwrite";
import ShippingInformation from "@/components/Order_received/ShippingInformation";
import OrderDetails from "@/components/Order_received/OrderDetails";
import PurchaseEventTracker from "@/components/PurchaseEventTracker";
import { Button } from "@/components/ui/button";
import { getBdDate, getBdtime } from "@/lib/utils";

const COMBO_SLUGS = ["glam-on-the-go", "hydra-lip-duo", "boishakhi-bundle"];

const OrderReceived = async ({
  params: { orderid },
}: {
  params: { orderid: string };
}) => {
  const order = await appwriteOrderService.getOrderDetails(orderid);

  // Check if any order item is a combo product
  const hasCombo = order?.orderItems?.some((item: any) =>
    COMBO_SLUGS.includes(item?.product?.slug)
  );

  // Generate unique coupon for combo buyers
  let couponCode = "";
  if (hasCombo) {
    // Use last 4-6 chars of order ID for a shorter code
    const shortId = orderid.slice(-6).toUpperCase();
    couponCode = `500GIFT${shortId}`;

    // Check if coupon already exists for this order (idempotent)
    try {
      const existing = await serverDatabases.listDocuments(
        config.appwriteDatabaseId,
        "coupons",
        [Query.equal("code", couponCode)]
      );

      if (existing.documents.length === 0) {
        await serverDatabases.createDocument(
          config.appwriteDatabaseId,
          "coupons",
          ID.unique(),
          {
            code: couponCode,
            discount: 500,
            used: false,
            source_order_id: orderid,
            redeemed_order_id: "",
          }
        );
      }
    } catch (error: any) {
      console.error("Error creating coupon:", error);
    }
  }

  return (
    <div>
      <section className="space-y-5">
        {/* Meta Pixel Purchase Event - fires once when this page loads */}
        <PurchaseEventTracker order={order} />

        <div className="text-lg bg-green-100 p-3">
          Thank you. Your order has been received.
        </div>

        <div>
          <p className="text-xl">
            Order Id: <span className="text-brand_secondary">#{order.$id}</span>
          </p>
          <div>
            <span>Date</span>: <span></span>
            {order?.$createdAt && (
              <span className="space-x-10">
                <time className="text-brand_primary">
                  {getBdDate(order?.$createdAt)}
                </time>

                <time className="text-brand_primary">
                  {getBdtime(order?.$createdAt)}
                </time>
              </span>
            )}
          </div>
        </div>

        {/* Combo Coupon Reward */}
        {hasCombo && (
          <div className="border-2 border-dashed border-green-400 bg-green-50 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              <h3 className="text-lg font-bold text-green-800">
                You&apos;ve unlocked a reward!
              </h3>
            </div>
            <p className="text-sm text-green-700">
              As a thank you for purchasing a combo deal, enjoy{" "}
              <span className="font-bold">৳500 OFF</span> on your next order!
            </p>
            <div className="bg-white border border-green-300 rounded-lg px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#636e72] uppercase tracking-wide">
                  Your Coupon Code
                </p>
                <p className="text-2xl font-bold tracking-widest text-brand_secondary">
                  {couponCode}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">৳500 OFF</p>
                <p className="text-xs text-[#636e72]">Next order</p>
              </div>
            </div>
            <p className="text-xs text-[#636e72]">
              Enter this code at checkout to redeem your discount.
            </p>
          </div>
        )}

        <ShippingInformation order={order} />

        <OrderDetails order={order} />

        <div>
          <Link href={"/"}>
            <Button>Back to home</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OrderReceived;
