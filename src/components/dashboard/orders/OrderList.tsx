import React from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { PaginationComponent } from "@/components/Shared/Pagination/PaginationComponent";
import OrderItem from "./OrderItem";
import NotFoundComponent from "@/components/Shared/NotFoundComponent";
import appwriteOrderService from "@/appwrite/appwriteOrderService";

const OrderList = async ({
  page,
  resultPerPage,
}: {
  page: string;
  resultPerPage: string;
}) => {
  const { getAllOrder } = appwriteOrderService;
  const orders = await getAllOrder({ page, resultPerPage });

  if (orders.documents.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <div>
      <ScrollArea>
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[250px]">Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="w-[150px] text-center">OrderId</TableHead>
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
        resultPerPage={Number(resultPerPage)}
        totalItems={orders.total}
        basePath={"/dashboard/orders"}
      />
    </div>
  );
};

export default OrderList;
