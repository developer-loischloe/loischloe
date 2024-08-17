import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OverAllInventoryData } from "../page";

const OverAllInventoryDataPrintableComponent = ({
  inventoryData,
}: {
  inventoryData: OverAllInventoryData[];
}) => {
  return (
    <div className="border">
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px]">Product</TableHead>
            <TableHead className="text-center">Regular Price</TableHead>
            <TableHead className="text-center">Sale Price</TableHead>
            <TableHead className="text-center">Total Quantity</TableHead>
            <TableHead className="text-center  text-green-500">
              UnAllocated Quantity
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData?.map((inventory) => {
            return (
              <TableRow key={inventory?.id}>
                <TableCell className="font-medium">
                  <p className="">{inventory?.product_name}</p>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-center">{inventory?.product_price}</p>
                </TableCell>

                <TableCell className="font-medium">
                  <p className="text-center">{inventory?.product_sale_price}</p>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-center">{inventory?.product_quantity}</p>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-center text-green-500">
                    {inventory?.product_available_quantity}
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OverAllInventoryDataPrintableComponent;
