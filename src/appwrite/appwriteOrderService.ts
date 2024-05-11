import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteOrderService {
  async getAllOrder({
    page = 1,
    resultPerPage = 10,
  }: {
    page?: string | number;
    resultPerPage?: string | number;
  }) {
    try {
      const QueryArray = [];

      // pagination
      if (resultPerPage) {
        QueryArray.push(Query.limit(Number(resultPerPage)));

        const skip = (Number(page) - 1) * Number(resultPerPage);
        if (skip) {
          QueryArray.push(Query.offset(skip));
        }
      }

      // sorting
      QueryArray.push(Query.orderDesc("$createdAt"));

      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createOrder(data: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getOrderDetails(orderId: string) {
    try {
      const response = await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        orderId
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        orderId,
        {
          order_status: status,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder({ orderId }: { orderId: string }) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        orderId
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteOrderService = new AppwriteOrderService();

export default appwriteOrderService;
