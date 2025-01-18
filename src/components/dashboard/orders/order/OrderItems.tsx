import React from "react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const OrderItems = ({ order }: { order: any }) => {
  return (
    <div className="w-full bg-white p-5 rounded-lg space-y-5">
      <div className="bg-[#f1f1f17e] px-3 py-2 rounded-md">
        <h5 className="font-bold">Order Items</h5>
      </div>
      <div className="space-y-5">
        {order?.orderItems?.map((item: any) => (
          <div
            key={item?.$id}
            className="bg-[#f1f1f17e] px-3 py-2 rounded-md flex justify-between gap-10 lg:gap-20"
          >
            <div className="flex-1">
              <p className="text-sm text-brand_gray mb-1">
                <span>Product name</span>
              </p>
              <Link
                href={`/products/${item?.product?.slug}`}
                className="hover:text-brand_primary transition-all"
              >
                <h5 className="font-medium">{item?.product?.name}</h5>
              </Link>
            </div>

            <div className="w-[80px] flex flex-col items-center">
              <p className="text-sm text-brand_gray mb-1">
                <span>Quantity</span>
              </p>
              <h5 className="font-medium">{item?.quantity}</h5>
            </div>

            <div className="w-[100px] flex flex-col items-center">
              <p className="text-sm text-brand_gray mb-1">
                <span>Price</span>
              </p>
              <h5 className="font-medium">{formatCurrency(item?.price)}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
