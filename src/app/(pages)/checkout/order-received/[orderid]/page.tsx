"use client";
import appwriteOrderService from "@/appwrite/appwriteOrderService";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const OrderReceived = async ({
  params: { orderid },
}: {
  params: { orderid: string };
}) => {
  const order = await appwriteOrderService.getOrderDetails(orderid);
  console.log(order);

  return (
    <section>
      <div className="space-y-3">
        <div className="bg-green-100 p-3">
          Thank you. Your order has been received.
        </div>
        <h1 className="text-2xl">Order Id: {orderid}</h1>

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
