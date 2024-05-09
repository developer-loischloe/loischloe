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

const CartTotals = ({ order }: { order: any }) => {
  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <Table className="w-full">
        <TableHeader className="w-full  overflow-hidden !rounded-lg">
          <TableRow className="bg-[#f1f1f17e] !rounded-lg hover:bg-[#f1f1f17e]  border-none">
            <TableHead className="font-bold !text-brand_default">
              Cart Totals
            </TableHead>
            <TableHead className="font-bold !text-brand_default">
              Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Subtotal:</TableCell>
            <TableCell className="font-bold">
              {formatCurrency(order?.paymentInformation?.product_price)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Shipping:</TableCell>
            <TableCell className="font-bold">
              {formatCurrency(order?.paymentInformation?.shipping_cost)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Total price:</TableCell>
            <TableCell className="text-red-500 font-bold">
              {formatCurrency(order?.paymentInformation?.total_price)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CartTotals;
