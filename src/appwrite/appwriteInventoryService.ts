import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteInventoryService {
  // Inventory
  async getInventory({
    page,
    resultPerPage,
    searchString,
    sort = "DESC",
  }: {
    page: string | number;
    resultPerPage: string | number;
    searchString: string;
    sort?: "ASC" | "DESC";
  }) {
    try {
      let QueryArray = [];

      // sorting
      if (sort === "ASC") {
        QueryArray.push(Query.orderAsc("$createdAt"));
      } else {
        QueryArray.push(Query.orderDesc("$createdAt"));
      }

      // search
      if (searchString) {
        QueryArray.push(Query.search("product_name", searchString));
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
        config.appwriteInventoryCollectionId.inventory,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createNewInventory(data: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateInventory({ id, data }: { id: string; data: any }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory,
        id,
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteInventory({ id }: { id: string }) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // Retail Shop
  async createRetailShop(data: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateRetailShop({ id, data }: { id: string; data: any }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop,
        id,
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteRetailShop({ id }: { id: string }) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllRetailShop({
    page,
    resultPerPage,
    sort = "DESC",
  }: {
    page: string | number;
    resultPerPage: string | number;
    sort?: "ASC" | "DESC";
  }) {
    let QueryArray = [];

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
        config.appwriteInventoryCollectionId.inventory_retail_shop,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllShopIdAndName() {
    try {
      let QueryArray = [];

      // Select attribute
      QueryArray.push(Query.select(["$id", "shop_name"]));

      QueryArray.push(Query.limit(5000));

      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async isRetailShopExist(website: string) {
    try {
      let QueryArray = [];

      QueryArray.push(Query.equal("website", website));

      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop,
        QueryArray
      );

      return response.total != 0;
    } catch (error) {
      throw error;
    }
  }

  async getRetailShopDetails({ id }: { id: string }) {
    try {
      const response = await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // Retail Shop Item
  async addRetailShopItem(data: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop_item,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateRetailShopItem({ id, data }: { id: string; data: any }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop_item,
        id,
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteRetailShopItem({ id }: { id: string }) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_retail_shop_item,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const appwriteInventoryService = new AppwriteInventoryService();

export default appwriteInventoryService;
