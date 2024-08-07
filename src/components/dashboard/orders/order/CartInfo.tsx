import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

const CartInfo = ({ order }: { order: any }) => {
  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <Table className="w-full">
        <TableHeader className="w-full  overflow-hidden !rounded-lg">
          <TableRow className="bg-[#f1f1f17e] !rounded-lg hover:bg-[#f1f1f17e]  border-none">
            <TableHead className="font-bold !text-brand_default">
              Cart Info
            </TableHead>
            <TableHead className="font-bold !text-brand_default">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Subtotal:</TableCell>
            <TableCell className="font-semibold">
              {formatCurrency(order?.paymentInformation?.product_price)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Shipping:</TableCell>
            <TableCell className="font-semibold">
              {formatCurrency(order?.paymentInformation?.shipping_cost)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Discount:</TableCell>
            <TableCell className="font-semibold text-red-500">
              - {formatCurrency(order?.paymentInformation?.discount)}
            </TableCell>
          </TableRow>
          <TableRow className="font-bold text-brand_secondary">
            <TableCell>Total price:</TableCell>
            <TableCell className="">
              {formatCurrency(order?.paymentInformation?.total_price)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CartInfo;
