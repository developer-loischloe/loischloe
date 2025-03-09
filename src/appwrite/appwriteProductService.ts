import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";
import { SearchParams } from "@/app/(website)/(pages)/products/(all-products)/page";
import { Models } from "node-appwrite";

export class AppwriteProductService {
  async createProduct(data: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct({ id, data }: { id: string; data: any }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        id,
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductIdAndNameAndPrice() {
    try {
      let QueryArray = [];

      // Filter
      QueryArray.push(Query.notEqual("parent_category", "offer"));
      // Select attribute
      QueryArray.push(Query.select(["$id", "name", "sale_price"]));

      QueryArray.push(Query.limit(5000));

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

  async getAllProductbyExcludeParentCategory({
    parent_category,
  }: {
    parent_category: string;
  }) {
    try {
      let QueryArray = [];

      // Filter
      QueryArray.push(Query.notEqual("parent_category", parent_category));

      QueryArray.push(Query.limit(5000));

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

  async getProductList({
    p_category,
    c_category,
    n_category,
    keyword,
    page,
    resultPerPage,
    sort = "DESC",
    filterPublishProduct = true,
  }: SearchParams & {
    sort?: "ASC" | "DESC";
    filterPublishProduct?: boolean;
  }) {
    try {
      let QueryArray = [];

      // filter published or not
      if (filterPublishProduct) {
        QueryArray.push(Query.equal("Published", [true]));
      }

      // sorting
      if (sort === "ASC") {
        QueryArray.push(Query.orderAsc("$createdAt"));
      } else {
        QueryArray.push(Query.orderDesc("$createdAt"));
      }

      // search by keyword
      if (keyword) {
        QueryArray.push(Query.search("name", keyword));
      }

      // search by category
      if (n_category) {
        QueryArray.push(Query.search("nested_child_category", n_category));
      } else if (c_category) {
        QueryArray.push(Query.search("child_category", c_category));
      } else if (p_category) {
        QueryArray.push(Query.search("parent_category", p_category));
      }

      // apply order when searchparams is empty
      if (!QueryArray.length) {
        QueryArray.push(Query.orderDesc("nested_child_category"));
      }

      // pagination
      if (resultPerPage) {
        QueryArray.push(Query.limit(Number(resultPerPage)));

        const skip = (Number(page) - 1) * Number(resultPerPage);
        if (skip) {
          QueryArray.push(Query.offset(skip));
        }
      }

      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        QueryArray
      );

      const updatedProductResponse = await this.updateProductSalePriceByDiscount(response)

      return updatedProductResponse;
    } catch (error) {
      throw error;
    }
  }

  async getProductDetails({
    slug,
    filterPublishProduct = true,
  }: {
    slug: string;
    filterPublishProduct?: boolean;
  }) {
    let QueryArray = [];

    // filter published or not
    if (filterPublishProduct) {
      QueryArray.push(Query.equal("Published", [true]));
    }

    QueryArray.push(Query.equal("slug", [slug]));

    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        QueryArray
      );

      const updatedProductResponse = await this.updateProductSalePriceByDiscount(response)

      return updatedProductResponse;
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
          Query.equal("Published", [true]),
          Query.equal("featured", [true]),
          Query.orderDesc("$createdAt"),
          Query.limit(20),
        ]
      );

      const updatedProductResponse = await this.updateProductSalePriceByDiscount(response)

      return updatedProductResponse;
    } catch (error) {
      throw error;
    }
  }

  async getHotProducts() {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        [
          Query.equal("Published", [true]),
          Query.equal("hot_product", [true]),
          Query.orderDesc("$createdAt"),
          Query.limit(20),
        ]
      );

      const updatedProductResponse = await this.updateProductSalePriceByDiscount(response)

      return updatedProductResponse;
    } catch (error) {
      throw error;
    }
  }

  async getRelatedProductsByCategory(child_category: string) {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        [
          Query.equal("Published", [true]),
          Query.search("child_category", child_category),
          Query.limit(10),
        ]
      );

      const updatedProductResponse = await this.updateProductSalePriceByDiscount(response)

      return updatedProductResponse;
    } catch (error) {
      throw error;
    }
  }



  async getProductsByIds(productIDS: string[]) {
    try {
      const productsPromise = productIDS.map((id) => {
        return databases.getDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId.product,
          id
        );
      });

      const products = await Promise.all(productsPromise);

      const updatedProductResponse = await appwriteProductService.updateProductSalePriceByDiscount({ documents: products, total: products.length })

      return updatedProductResponse.documents;
    } catch (error) {
      throw error;
    }
  }

  async getOfferProducts() {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        [
          Query.equal("Published", [true]),
          Query.search("parent_category", "offer"),
        ]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPreOrderProducts() {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        [Query.equal("Published", [true]), Query.equal("pre_order", [true])]
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct({ productId }: { productId: string }) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        productId
      );

      return response;
    } catch (error) {
      throw error;
    }
  }


  // Update Sale price by Discount
  async updateProductSalePriceByDiscount(response: Models.DocumentList<Models.Document>) {
    try {
      const { discount_percentage } = await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUtils.collectionId,
        config.appwriteUtils.documentId,
        [Query.select(["discount_percentage"])]
      );

      if (discount_percentage <= 0) {
        return response;
      }

      const updatedProducts = response?.documents?.map((product: any) => {
        // modify sale_price
        if (product?.parent_category !== "offer") {
          const discountAmount = Math.floor((discount_percentage / 100) * product?.price)
          const sale_price = product?.price - discountAmount;

          product.sale_price = sale_price
        }

        return product
      })

      return { ...response, documents: updatedProducts }
    } catch (error) {
      throw error;
    }
  }
}

const appwriteProductService = new AppwriteProductService();

export default appwriteProductService;
