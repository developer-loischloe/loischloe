import appwriteServerOrderService from "@/appwrite/serverSDK/appwriteServerOrderService";
import React from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import OrderItem from "./OrderItem";

const OrderList = async () => {
  const { getAllOrder } = appwriteServerOrderService;
  const orders = await getAllOrder({});

  console.log(orders);

  return (
    <ScrollArea className="w-[calc(100vw-40px)]">
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[250px]">Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="w-[150px] ">OrderId</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="min-w-[120px]">Order Status</TableHead>
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
  );
};

export default OrderList;
