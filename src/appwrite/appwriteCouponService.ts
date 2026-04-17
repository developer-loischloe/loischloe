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

  // Mark coupon as used via server API. Pass "PENDING" as redeemedOrderId
  // to reserve the coupon before order creation; call again with the real
  // order id once the order document is saved.
  async redeemCoupon(couponDocId: string, redeemedOrderId: string) {
    const response = await fetch("/api/coupon", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ couponDocId, redeemedOrderId }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(
        `Failed to redeem coupon (${response.status}): ${text || "no body"}`
      );
    }

    return response.json();
  }

  // Release a previously reserved coupon so a failed order does not
  // consume the user's discount code.
  async releaseCoupon(couponDocId: string) {
    const response = await fetch("/api/coupon", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ couponDocId }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(
        `Failed to release coupon (${response.status}): ${text || "no body"}`
      );
    }

    return response.json();
  }
}

const appwriteCouponService = new AppwriteCouponService();
export default appwriteCouponService;
