import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteUtilsService {
  async getUtils() {
    try {
      const response = await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUtils.collectionId,
        config.appwriteUtils.documentId
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteUtilsService = new AppwriteUtilsService();

export default appwriteUtilsService;
