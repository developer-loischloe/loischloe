import { Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteReviewService {
  async getAllReview({
    page = 1,
    resultPerPage = 10,
    sort = "DESC",
  }: {
    page?: string | number;
    resultPerPage?: string | number;
    sort?: "ASC" | "DESC";
  }) {
    const QueryArray = [];

    // sorting
    if (sort === "ASC") {
      QueryArray.push(Query.orderAsc("$createdAt"));
    } else {
      QueryArray.push(Query.orderDesc("$createdAt"));
    }

    // pagination
    if (resultPerPage) {
      QueryArray.push(Query.limit(Number(resultPerPage)));

      const skip = (Number(page) - 1) * Number(resultPerPage);
      if (skip) {
        QueryArray.push(Query.offset(skip));
      }
    }

    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product_review,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteReview(id: string) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product_review,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteReviewService = new AppwriteReviewService();

export default appwriteReviewService;
