import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

export class AppwriteInventoryService {
  // Utility
  async getAvailableQuantityByProductId(product_id: string) {
    try {
      // find product quantity
      const product = await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product,
        product_id,
        [Query.select(["product_quantity"])]
      );
      const totalProductQuantity = product?.product_quantity as number;

      // find all allocation quantity
      const allocationResponse = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_allocation,
        [
          Query.equal("product_id", product_id),
          Query.select(["quantity_allocated"]),
        ]
      );
      const totalProductAllocation = allocationResponse?.documents?.reduce(
        (acc, allocation) => acc + allocation?.quantity_allocated,
        0
      ) as number;

      const availableQuantity =
        totalProductQuantity - totalProductAllocation || 0;

      return availableQuantity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Inventory_Allocations
  async createProductAllocation(data: {
    product_id: string;
    store_id: string;
    quantity_allocated: number;
    product_name: string;
  }) {
    try {
      // Find inventoryId By productId and storeId
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory,
        [
          Query.equal("product_id", data.product_id),
          Query.equal("store_id", data.store_id),
          Query.select(["$id", "product_id", "store_id"]),
        ]
      );

      // Check inventory exist or not
      const inventoryExist =
        response?.documents[0]?.product_id === data.product_id &&
        response?.documents[0]?.store_id === data.store_id;

      if (inventoryExist) {
        // New Allocation with existing InventoryId
        const inventoryId = response.documents[0].$id;

        const allocationData = {
          product_id: data.product_id,
          store_id: data.store_id,
          quantity_allocated: data.quantity_allocated,
          product_name: data.product_name,
          inventory: inventoryId,
        };

        const allocationResponse = await databases.createDocument(
          config.appwriteDatabaseId,
          config.appwriteInventoryCollectionId.inventory_allocation,
          ID.unique(),
          allocationData
        );

        return allocationResponse;
      } else {
        // Create new Inventory
        const inventoryData = {
          product_id: data?.product_id,
          product_name: data?.product_name,
          product: data?.product_id,
          store_id: data?.store_id,
          storeDetails: data?.store_id,
        };

        const createInventoryResponse = await databases.createDocument(
          config.appwriteDatabaseId,
          config.appwriteInventoryCollectionId.inventory,
          ID.unique(),
          inventoryData
        );

        // New allocation with new InventoryId
        const allocationData = {
          product_id: data.product_id,
          store_id: data.store_id,
          quantity_allocated: data.quantity_allocated,
          product_name: data.product_name,
          inventory: createInventoryResponse.$id,
        };

        const allocationResponse = await databases.createDocument(
          config.appwriteDatabaseId,
          config.appwriteInventoryCollectionId.inventory_allocation,
          ID.unique(),
          allocationData
        );

        return allocationResponse;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Inventory
  async getInventory({
    page,
    resultPerPage,
    searchString,
    storeId,
    sort = "DESC",
  }: {
    page: string | number;
    resultPerPage: string | number;
    searchString: string;
    storeId: string;
    sort?: "ASC" | "DESC";
  }) {
    try {
      let QueryArray = [];

      // filter by storeId
      if (storeId) {
        QueryArray.push(Query.equal("store_id", storeId));
      }

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

  // Store
  async createStore(data: any) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_stores,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateStore({ id, data }: { id: string; data: any }) {
    try {
      const response = await databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_stores,
        id,
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteStore({ id }: { id: string }) {
    try {
      const response = await databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_stores,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAStoreId() {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_stores,
        [Query.select(["$id", "store_type"])]
      );

      const mainStoreId = response?.documents?.filter(
        (store) => store?.store_type === "main"
      )[0]?.$id;
      const storeId = mainStoreId || response?.documents[0]?.$id || null;

      return storeId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllStore({
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
        config.appwriteInventoryCollectionId.inventory_stores,
        QueryArray
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async isStoreExist(web_address: string) {
    try {
      let QueryArray = [];

      QueryArray.push(Query.equal("web_address", web_address));

      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_stores,
        QueryArray
      );

      return response.total != 0;
    } catch (error) {
      throw error;
    }
  }

  async getStoreDetails({ id }: { id: string }) {
    try {
      const response = await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_stores,
        id
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // sell
  async addStoreSell(data: {
    store_id: string;
    product_id: string;
    quantity_sold: number;
    inventory: string;
  }) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_sales,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // damage
  async addStoreDamage(data: {
    store_id: string;
    product_id: string;
    damage_reason: string;
    quantity_damaged: number;
    inventory: string;
  }) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_damages,
        ID.unique(),
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  // return
  async addStoreReturn(data: {
    store_id: string;
    product_id: string;
    return_reason: string;
    quantity_return: number;
    inventory: string;
    allocate_store_id: string;
    allocate_store_name: string;
  }) {
    try {
      const response = await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId.inventory_return,
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
        config.appwriteInventoryCollectionId.inventory_allocation,
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
        config.appwriteInventoryCollectionId.inventory_allocation,
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
