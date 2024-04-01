import { Button } from "@/components/ui/button";
import React from "react";

const OrderReceived = ({
  params: { orderid },
}: {
  params: { orderid: string };
}) => {
  return (
    <section>
      <div className="space-y-3">
        <div className="bg-green-100 p-3">
          Thank you. Your order has been received.
        </div>
        <h1 className="text-2xl">Order Id: {orderid}</h1>

        <div>
          <Button></Button>
        </div>
      </div>
    </section>
  );
};

export default OrderReceived;
