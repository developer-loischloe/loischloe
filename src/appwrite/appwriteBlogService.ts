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

  async deleteBlog({ blogId }: { blogId: string }) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        blogId
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllBlog({
    page,
    resultPerPage,
  }: {
    page: string;
    resultPerPage: string;
  }) {
    try {
      let QueryArray = [];

      // pagination
      if (resultPerPage) {
        QueryArray.push(Query.limit(Number(resultPerPage)));

        const skip = (Number(page) - 1) * Number(resultPerPage);
        if (skip) {
          QueryArray.push(Query.offset(skip));
        }
      }

      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getFeaturedBlog() {
    try {
      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        [Query.equal("featured", true)]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getRecentBlog({
    page,
    resultPerPage,
  }: {
    page: string;
    resultPerPage: string;
  }) {
    try {
      let QueryArray = [];

      // pagination
      if (resultPerPage) {
        QueryArray.push(Query.limit(Number(resultPerPage)));

        const skip = (Number(page) - 1) * Number(resultPerPage);
        if (skip) {
          QueryArray.push(Query.offset(skip));
        }
      }

      // filter recent post
      QueryArray.push(Query.notEqual("featured", true));

      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // single blog
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

  async createBlogCategory(category: string) {
    try {
      const response = await databases.createDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.all_category,
        ID.unique(),
        { name: category }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getBlogByCategories(categories: string[]) {
    try {
      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        [Query.equal("categories", categories)]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getBlogByCategory(category: string) {
    try {
      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        [Query.search("categories", category)]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getBlogBytag(tag: string) {
    try {
      const response = await databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        [Query.search("tags", tag)]
      );

      return response;
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
