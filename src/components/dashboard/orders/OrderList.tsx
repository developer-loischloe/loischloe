import React from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import appwriteServerOrderService from "@/appwrite/serverSDK/appwriteServerOrderService";
import OrderItem from "./OrderItem";
import { PaginationComponent } from "@/components/Shared/Pagination/PaginationComponent";

const OrderList = async ({ page }: { page: string }) => {
  const resultPerPage = 15;

  const { getAllOrder } = appwriteServerOrderService;
  const orders = await getAllOrder({ page, resultPerPage });

  return (
    <div>
      <ScrollArea className="w-[calc(100vw-40px)]">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[250px]">Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="w-[150px] ">OrderId</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="min-w-[120px]">Order Status</TableHead>
              <TableHead className="min-w-[120px]">Date</TableHead>

              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.documents.map((order: any) => (
              <OrderItem key={order.$id} order={order} />
            ))}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <br />
      {/* Pagination */}
      <PaginationComponent
        currentPageNumber={Number(page)}
        resultPerPage={resultPerPage}
        totalItems={orders.total}
        basePath={"/dashboard/orders"}
        extraSearchParams={{
          resultPerPage,
        }}
      />
    </div>
  );
};

export default OrderList;
