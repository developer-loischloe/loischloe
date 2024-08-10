import React, { Suspense } from "react";
import { Metadata } from "next";
import OrderItem from "@/components/dashboard/orders/order";
import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";

// Metadata
export const metadata: Metadata = {
  title: "Order Details",
};

const page = ({ params: { orderId } }: { params: { orderId: string } }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl mb-5 font-bold">Order #{orderId}</h1>

      <Suspense fallback={<LoadingSpiner />}>
        <OrderItem orderId={orderId} />
      </Suspense>
    </div>
  );
};

export default page;
