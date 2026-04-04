import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";
import config from "@/config";

const COUPON_COLLECTION_ID = "coupons";

class AppwriteCouponService {
  // Create a coupon after combo purchase
  async createCoupon({
    code,
    discount,
    sourceOrderId,
  }: {
    code: string;
    discount: number;
    sourceOrderId: string;
  }) {
    try {
      return await databases.createDocument(
        config.appwriteDatabaseId,
        COUPON_COLLECTION_ID,
        ID.unique(),
        {
          code,
          discount,
          used: false,
          source_order_id: sourceOrderId,
          redeemed_order_id: "",
        }
      );
    } catch (error) {
      console.error("Error creating coupon:", error);
      throw error;
    }
  }

  // Validate a coupon code — returns coupon data if valid, null if invalid/used
  async validateCoupon(code: string) {
    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        COUPON_COLLECTION_ID,
        [Query.equal("code", code), Query.equal("used", false)]
      );

      if (response.documents.length > 0) {
        return response.documents[0];
      }
      return null;
    } catch (error) {
      console.error("Error validating coupon:", error);
      return null;
    }
  }

  // Mark coupon as used after order is placed
  async redeemCoupon(couponDocId: string, redeemedOrderId: string) {
    try {
      return await databases.updateDocument(
        config.appwriteDatabaseId,
        COUPON_COLLECTION_ID,
        couponDocId,
        {
          used: true,
          redeemed_order_id: redeemedOrderId,
        }
      );
    } catch (error) {
      console.error("Error redeeming coupon:", error);
      throw error;
    }
  }
}

const appwriteCouponService = new AppwriteCouponService();
export default appwriteCouponService;
