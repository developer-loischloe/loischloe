class AppwriteCouponService {
  // Validate a coupon code via server API
  async validateCoupon(code: string) {
    try {
      const response = await fetch("/api/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.valid) {
        return {
          $id: data.docId,
          code: data.code,
          discount: data.discount,
        };
      }
      return null;
    } catch (error) {
      console.error("Error validating coupon:", error);
      return null;
    }
  }

  // Mark coupon as used via server API
  async redeemCoupon(couponDocId: string, redeemedOrderId: string) {
    try {
      const response = await fetch("/api/coupon", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ couponDocId, redeemedOrderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to redeem coupon");
      }

      return await response.json();
    } catch (error) {
      console.error("Error redeeming coupon:", error);
      throw error;
    }
  }
}

const appwriteCouponService = new AppwriteCouponService();
export default appwriteCouponService;
