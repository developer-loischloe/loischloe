// "use client";

import React from "react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, PencilLine, Trash2, X } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { format as dateFormat } from "date-fns";
import { UpdateOrderStatus } from "./UpdateOrderStatus";
import DeleteOrder from "./order/DeleteOrder";

const OrderItem = ({ order }: { order: any }) => {
  // console.log({ order });

  return (
    <TableRow>
      <TableCell>
        {order?.orderItems?.map((item: any) => {
          console.log({ item });

          return (
            <h5 key={item?.$id} className="line-clamp-1">
              {item?.product?.name}
            </h5>
          );
        })}
      </TableCell>
      <TableCell>
        {order?.orderItems?.map((item: any) => {
          console.log({ item });

          return (
            <div key={item?.$id} className="flex gap-2 items-center">
              <X size={12} />
              <div>{item?.quantity}</div>
            </div>
          );
        })}
      </TableCell>
      <TableCell>{order.$id}</TableCell>
      <TableCell className="text-center">
        {formatCurrency(order?.paymentInformation?.product_price)}
      </TableCell>
      <TableCell
        className={cn(
          order?.order_status === "processing" && "text-red-500",
          order?.order_status === "completed" && "text-green-500"
        )}
      >
        {order?.order_status}
      </TableCell>
      <TableCell>
        <time className="text-brand_primary">
          {dateFormat(order?.$createdAt, "MM-dd-yyyy")}
        </time>
      </TableCell>
      <TableCell className="flex justify-center">
        <div className="flex gap-5">
          <Link href={`/dashboard/orders/${order?.$id}`}>
            <Eye size={20} className="text-blue-500 cursor-pointer" />
          </Link>
          <UpdateOrderStatus orderId={order?.$id}>
            <PencilLine size={20} className="text-green-500 cursor-pointer" />
          </UpdateOrderStatus>

          <DeleteOrder orderId={order?.$id}>
            <Trash2 size={20} className="text-red-500 cursor-pointer" />
          </DeleteOrder>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrderItem;
