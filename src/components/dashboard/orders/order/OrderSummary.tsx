import React from "react";
import { cn, formatCurrency, getBdDate, getBdtime } from "@/lib/utils";

const OrderSummary = ({ order }: { order: any }) => {
  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <div className="mb-5">
        <h5 className="font-bold">Summary</h5>
      </div>

      <ul className="space-y-2">
        <li>
          <span className="text-brand_gray">Order Id: </span>
          <span>#{order?.$id}</span>
        </li>
        <li>
          <span className="text-brand_gray">Date: </span>
          <time className="text-brand_primary">
            {getBdDate(order?.$createdAt)}
          </time>
          <span> - </span>
          <time className="text-brand_primary">
            {getBdtime(order?.$createdAt)}
          </time>
        </li>
        <li>
          <span className="text-brand_gray">Order status: </span>
          <span
            className={cn(
              order?.order_status === "processing" && "text-red-500",
              order?.order_status === "completed" && "text-green-500"
            )}
          >
            {order?.order_status}
          </span>
        </li>
        <li>
          <span className="text-brand_gray">Total: </span>
          <span className="text-brand_secondary font-semibold">
            {formatCurrency(order?.paymentInformation?.total_price)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default OrderSummary;
