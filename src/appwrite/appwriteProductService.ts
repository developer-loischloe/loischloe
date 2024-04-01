import { Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";
import { SearchParams } from "@/app/(pages)/products/(products)/page";

interface ProductSearchParams extends SearchParams {
  productPerPage: number;
}

export class AppwriteProductService {
  async getProductList({
    p_cat,
    c_cat,
    n_cat,
    keyword,
    page,
    productPerPage,
  }: ProductSearchParams) {
    try {
      if (p_cat) {
        let collectionId = "";
        let current_category = "";

        if (n_cat) {
          collectionId =
            config.appwriteCollectionId.category.nested_child_category;
          current_category = n_cat;
        } else if (c_cat) {
          collectionId = config.appwriteCollectionId.category.child_category;
          current_category = c_cat;
        } else {
          collectionId = config.appwriteCollectionId.category.parent_category;
          current_category = p_cat;
        }

        const response = await databases.listDocuments(
          config.appwriteDatabaseId,
          collectionId
        );

        let products = response.documents.find(
          (currCategory) => currCategory.slug === current_category
        )?.products;

        // console.log(response);

        return { total: products.length, documents: products };
      } else {
        let QueryArray = [];
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
      }
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
