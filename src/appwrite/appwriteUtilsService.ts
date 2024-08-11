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

  async updatefreeGiftEnable({ enable }: { enable: boolean }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteUtils.collectionId,
        config.appwriteUtils.documentId,
        { free_gift_enable: enable }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteUtilsService = new AppwriteUtilsService();

export default appwriteUtilsService;
