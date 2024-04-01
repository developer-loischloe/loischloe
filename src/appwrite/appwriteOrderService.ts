import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteOrderService {
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
}

const appwriteOrderService = new AppwriteOrderService();

export default appwriteOrderService;
