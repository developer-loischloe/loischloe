import Link from "next/link";

import appwriteOrderService from "@/appwrite/appwriteOrderService";
import ShippingInformation from "@/components/Order_received/ShippingInformation";
import OrderDetails from "@/components/Order_received/OrderDetails";
import { Button } from "@/components/ui/button";
import { getBdDate, getBdtime } from "@/lib/utils";

const OrderReceived = async ({
  params: { orderid },
}: {
  params: { orderid: string };
}) => {
  const order = await appwriteOrderService.getOrderDetails(orderid);

  return (
    <section>
      <div className="space-y-3">
        <div className="text-lg bg-green-100 p-3">
          Thank you. Your order has been received.
        </div>
        <h1 className="text-2xl">Order Id: {order.$id}</h1>

        <>
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
        </>

        <div className="space-y-5">
          <ShippingInformation order={order} />
          <OrderDetails order={order} />
        </div>
        <div>
          <Link href={"/"}>
            <Button>Back to home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderReceived;
