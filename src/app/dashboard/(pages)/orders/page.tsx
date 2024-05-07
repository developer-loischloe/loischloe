import React, { Suspense } from "react";
import Loader from "@/components/Shared/loading/Loader";
import OrderList from "@/components/dashboard/orders/OrderList";

const OrderListPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl mb-5 font-bold">Order List</h1>

      <Suspense fallback={<Loader />}>
        <OrderList />
      </Suspense>
    </div>
  );
};

export default OrderListPage;
