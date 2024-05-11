import Link from "next/link";
import { format as dateFormat } from "date-fns";

import appwriteOrderService from "@/appwrite/appwriteOrderService";
import ShippingInformation from "@/components/Order_received/ShippingInformation";
import OrderDetails from "@/components/Order_received/OrderDetails";
import { Button } from "@/components/ui/button";

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
          {order?.ordered_at && (
            <span className="space-x-10">
              <time className="text-brand_primary">
                {dateFormat(order?.ordered_at, "MM-dd-yyyy")}
              </time>

              <time className="text-brand_primary">
                {dateFormat(order?.ordered_at, "h:mm a")}
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
