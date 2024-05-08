import React from "react";
import { format as dateFormat } from "date-fns";
import { formatCurrency } from "@/lib/utils";

const getCurrentBdTime = () => {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const offset = +6; // UTC of USA Eastern Time Zone is -05.00
  const usa = utc + 3600000 * offset;
  const usaTimeNow = new Date(usa).toLocaleString();

  return usaTimeNow;
};
console.log(getCurrentBdTime());

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
            {dateFormat(order?.$createdAt, "MM-dd-yyyy")}
          </time>
          {/* <span> - </span>
          <time className="text-brand_primary">
            {dateFormat(order?.$createdAt, "h:mm:ss a")}
          </time> */}
        </li>
        <li>
          <span className="text-brand_gray">Total: </span>
          <span className="text-red-500 font-semibold">
            {formatCurrency(order?.paymentInformation?.total_price)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default OrderSummary;
