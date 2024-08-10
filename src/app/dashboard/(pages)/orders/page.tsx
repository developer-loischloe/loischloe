import React, { Suspense } from "react";
import { Metadata } from "next";
import OrderList from "@/components/dashboard/orders/OrderList";
import ResultPerPage from "@/components/dashboard/orders/ResultPerPage";
import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";

// Metadata
export const metadata: Metadata = {
  title: "Orders",
};

const OrderListPage = ({
  searchParams: { page = "1", resultPerPage = "10" },
}: {
  searchParams: { page: string; resultPerPage: string };
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl mb-5 font-bold">Order List</h1>

      {/* Top */}
      <div className="w-full flex justify-end mb-5">
        <ResultPerPage
          basePath={"/dashboard/orders"}
          resultPerPage={resultPerPage}
          extraSearchParams={{
            page,
          }}
        />
      </div>

      {/* Order List */}
      <Suspense
        key={(Math.random() * 1000).toString()}
        fallback={<LoadingSpiner />}
      >
        <OrderList page={page} resultPerPage={resultPerPage} />
      </Suspense>
    </div>
  );
};

export default OrderListPage;
