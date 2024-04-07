import { Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";
import { SearchParams } from "@/app/(pages)/products/(products)/page";

interface ProductSearchParams extends SearchParams {
  productPerPage: number;
}

export class AppwriteProductService {
  async getProductList({
    p_category,
    c_category,
    n_category,
    keyword,
    page,
    productPerPage,
  }: ProductSearchParams) {
    try {
      let QueryArray = [];

      if (n_category) {
        QueryArray.push(Query.search("nested_child_category", n_category));
      } else if (c_category) {
        QueryArray.push(Query.search("child_category", c_category));
      } else if (p_category) {
        QueryArray.push(Query.search("parent_category", p_category));
      }

      if (keyword) {
        QueryArray.push(Query.search("name", keyword));
      }

      if (productPerPage) {
        QueryArray.push(Query.limit(Number(productPerPage)));

        const skip = (Number(page) - 1) * Number(productPerPage);
        if (skip) {
          QueryArray.push(Query.offset(skip));
        }
      }

      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProductDetails(slug: string) {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        [Query.equal("slug", [slug])]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getFeaturedProducts() {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        [
          Query.equal("featured", [true]),
          Query.orderDesc("$createdAt"),
          Query.limit(10),
        ]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getRelatedProductsByCategory(parent_category: string) {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        [Query.search("parent_category", parent_category), Query.limit(10)]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getMustEssentialsProductsByIds(productIDS: string[]) {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        []
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteProductService = new AppwriteProductService();

export default appwriteProductService;
