import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteNewsletterService {
  async findSubscriber(email: string) {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteNewsletterCollection_Id,
        [Query.equal("email", email)]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createNewSubscriber(data: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteNewsletterCollection_Id,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteNewsletterService = new AppwriteNewsletterService();

export default appwriteNewsletterService;
