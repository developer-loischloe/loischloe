import { Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteCategoryService {
  async getCategoryList() {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.category.parent_category,
        // [Query.select(["$id", "name", "slug"])]
        []
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteCategoryService = new AppwriteCategoryService();

export default appwriteCategoryService;
