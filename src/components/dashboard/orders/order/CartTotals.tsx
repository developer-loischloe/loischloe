import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CartTotals = ({ order }: { order: any }) => {
  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <Table className="w-full">
        <TableHeader className="w-full  overflow-hidden">
          <TableRow className="bg-[#f1f1f1] !rounded-lg hover:bg-[#f1f1f1]  border-none">
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
            <TableCell>{order?.paymentInformation?.product_price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Shipping:</TableCell>
            <TableCell>{order?.paymentInformation?.shipping_cost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Total price:</TableCell>
            <TableCell>{order?.paymentInformation?.total_price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

// <div className="w-full bg-white p-5 rounded-lg">
//   <div className="bg-[#f1f1f17e] px-3 py-2 rounded-md flex justify-between">
//     <h5 className="font-bold">Cart Totals</h5>
//     <h5 className="font-bold">Price</h5>
//   </div>

//   <div>
//     <div></div>
//   </div>
// </div>
export default CartTotals;
