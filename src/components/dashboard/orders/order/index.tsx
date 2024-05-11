import React from "react";
import OrderItems from "@/components/dashboard/orders/order/OrderItems";
import CartTotals from "@/components/dashboard/orders/order/CartTotals";
import OrderSummary from "@/components/dashboard/orders/order/OrderSummary";
import OrderShippingAddress from "@/components/dashboard/orders/order/OrderShippingAddress";

import OrderPaymentMethod from "./OrderPaymentMethod";
import appwriteOrderService from "@/appwrite/appwriteOrderService";

const OrderItem = async ({ orderId }: { orderId: string }) => {
  const { getOrderDetails } = appwriteOrderService;
  const order = await getOrderDetails(orderId);

  console.log(order);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <div className="flex-1 flex flex-col gap-5">
        <OrderItems order={order} />
        <CartTotals order={order} />
      </div>
      <div className="md:max-w-[300px] lg:max-w-full lg:min-w-[350px] flex flex-col gap-5">
        <OrderSummary order={order} />
        <OrderShippingAddress order={order} />
        <OrderPaymentMethod order={order} />
      </div>
    </div>
  );
};

export default OrderItem;
