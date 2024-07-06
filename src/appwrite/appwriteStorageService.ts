import { storage } from "./appwriteConfig";
import config from "@/config";

export class AppwriteStorageService {
  async getAllProductImage() {
    try {
      const response = await storage.listFiles(
        config.appwriteBucketId.product_image,
        []
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getFileView({
    bucket_id,
    file_id,
  }: {
    bucket_id: string;
    file_id: string;
  }) {
    try {
      const response = storage.getFileView(bucket_id, file_id);

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteStorageService = new AppwriteStorageService();

export default appwriteStorageService;
