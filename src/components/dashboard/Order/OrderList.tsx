import appwriteServerOrderService from "@/appwrite/serverSDK/appwriteServerOrderService";
import React from "react";

const OrderList = async () => {
  const { getAllOrder } = appwriteServerOrderService;
  const response = await getAllOrder({});

  console.log(response);

  return <div>OrderList</div>;
};

export default OrderList;
