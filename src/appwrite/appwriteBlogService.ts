import { ID } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteBlogService {
  async createBlog(blogData: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        ID.unique(),
        blogData
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteBlogService = new AppwriteBlogService();

export default appwriteBlogService;
