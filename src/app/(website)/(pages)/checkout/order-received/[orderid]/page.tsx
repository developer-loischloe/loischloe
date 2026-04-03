import Link from "next/link";

import appwriteOrderService from "@/appwrite/appwriteOrderService";
import ShippingInformation from "@/components/Order_received/ShippingInformation";
import OrderDetails from "@/components/Order_received/OrderDetails";
import PurchaseEventTracker from "@/components/PurchaseEventTracker";
import { Button } from "@/components/ui/button";
import { getBdDate, getBdtime } from "@/lib/utils";

const OrderReceived = async ({
  params: { orderid },
}: {
  params: { orderid: string };
}) => {
  const order = await appwriteOrderService.getOrderDetails(orderid);

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
