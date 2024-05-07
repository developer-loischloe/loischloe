import React, { Suspense } from "react";
import OrderItem from "@/components/dashboard/orders/order";
import Loader from "@/components/Shared/loading/Loader";

const page = ({ params: { orderId } }: { params: { orderId: string } }) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl mb-5 font-bold">Order #{orderId}</h1>

      <Suspense fallback={<Loader />}>
        <OrderItem orderId={orderId} />
      </Suspense>
    </div>
  );
};

export default page;
