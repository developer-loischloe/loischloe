import { ID, Query } from "appwrite";
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

  async updateBlog({ id, blogData }: { id: string; blogData: any }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        id,
        blogData
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllBlog() {
    try {
      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getBlogBySlug(slug: string) {
    try {
      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        [Query.equal("slug", slug)]
      );

      return response.documents[0];
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.all_category
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteBlogService = new AppwriteBlogService();

export default appwriteBlogService;
