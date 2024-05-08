"use server";
import appwriteServerOrderService from "@/appwrite/serverSDK/appwriteServerOrderService";

const { updateOrderStatus, deleteOrder } = appwriteServerOrderService;

export const updateOrderStatusServerAction = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const response = await updateOrderStatus({ orderId, status });
  return response;
};

export const deleteOrderServerAction = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const response = await deleteOrder({ orderId });
  return response;
};
