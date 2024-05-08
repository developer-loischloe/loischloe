import React, { Suspense } from "react";
import Loader from "@/components/Shared/loading/Loader";
import OrderList from "@/components/dashboard/orders/OrderList";

const OrderListPage = ({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) => {
  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl mb-5 font-bold">Order List</h1>

      {/* Order List */}
      <Suspense key={(Math.random() * 1000).toString()} fallback={<Loader />}>
        <OrderList page={page} />
      </Suspense>
    </div>
  );
};

export default OrderListPage;
