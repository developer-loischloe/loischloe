import config from "@/config";

import { ID, Query } from "node-appwrite";
import { adminDatabases } from "./appwriteServerConfig";

export class AppwriteServerOrderService {
  async createOrder(data: any) {
    try {
      const response = await adminDatabases.createDocument(
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

  async getAllOrder({
    page = 1,
    resultPerPage = 10,
  }: {
    page?: string | number;
    resultPerPage?: number;
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

      const response = await adminDatabases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.order,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getOrderDetails(orderId: string) {
    try {
      const response = await adminDatabases.getDocument(
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

const appwriteServerOrderService = new AppwriteServerOrderService();

export default appwriteServerOrderService;
