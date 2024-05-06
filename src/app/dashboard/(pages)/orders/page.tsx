import appwriteServerOrderService from "@/appwrite/serverSDK/appwriteServerOrderService";
import React from "react";

const OrderListPage = async () => {
  const { getAllOrder } = appwriteServerOrderService;
  const response = await getAllOrder({});

  console.log(response);

  return <div>OrderList Page</div>;
};

export default OrderListPage;
