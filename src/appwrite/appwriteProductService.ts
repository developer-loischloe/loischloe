import { Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";
import { SearchParams } from "@/app/(pages)/products/(products)/page";

interface ProductSearchParams extends SearchParams {
  productPerPage: number;
}

export class AppwriteProductService {
  async getProductList({
    category,
    keyword,
    page,
    productPerPage,
  }: ProductSearchParams) {
    try {
      let QueryArray = [];
      if (category) {
        QueryArray.push(Query.search("categories", category));
      }
      if (keyword) {
        QueryArray.push(Query.search("name", keyword));
      }

      if (productPerPage) {
        QueryArray.push(Query.limit(productPerPage));
      }

      if (page) {
        const skip = (Number(page) - 1) * productPerPage;

        QueryArray.push(Query.offset(skip));
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
        [Query.equal("featured", [true]), Query.limit(10)]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getRelatedProductsByCategory(categories: string[]) {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.category.child_category,
        [Query.equal("slug", categories), Query.limit(10)]
      );
      const productIDS: string[] = [];
      return response.documents
        .map((categories) => {
          return categories.products;
        })
        .reduce((acc, products) => {
          return [...acc, ...products];
        }, [])
        .filter((product: any) => {
          const productExist = productIDS.find((id) => id === product.$id);

          if (productExist) {
            return false;
          } else {
            productIDS.push(product.$id);
            return true;
          }
        })
        .slice(0, 5);
    } catch (error) {
      throw error;
    }
  }
}

const appwriteProductService = new AppwriteProductService();

export default appwriteProductService;
