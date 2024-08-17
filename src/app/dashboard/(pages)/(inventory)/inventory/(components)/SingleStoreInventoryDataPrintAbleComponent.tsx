import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InventoryItem } from "../store/page";

const SingleStoreInventoryDataPrintAbleComponent = ({
  inventoryData,
}: {
  inventoryData: InventoryItem[];
}) => {
  return (
    <div className="border">
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px]">Product</TableHead>
            <TableHead className="text-center">Store Type</TableHead>
            <TableHead className="text-center">Total Allocation</TableHead>
            <TableHead className="text-center">Total Sell</TableHead>
            <TableHead className="text-center">Total Damage</TableHead>
            <TableHead className="text-center">Total Return</TableHead>
            <TableHead className="text-center">Stock</TableHead>
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
                  <p className="text-center">{inventory?.store?.store_type}</p>
                </TableCell>

                <TableCell className="font-medium">
                  <p className="text-center">
                    {inventory?.total_allocation_quantity}
                  </p>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-center">
                    {inventory?.total_sell_quantity}
                  </p>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-center">
                    {inventory?.total_damage_quantity}
                  </p>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-center">
                    {inventory?.total_return_quantity}
                  </p>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-center">{inventory?.available_quantity}</p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleStoreInventoryDataPrintAbleComponent;
