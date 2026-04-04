import { NextRequest, NextResponse } from "next/server";
import { serverDatabases } from "@/appwrite/appwriteServerSDKConfig";
import config from "@/config";
import { Query } from "node-appwrite";

const COUPON_COLLECTION_ID = "coupons";

// POST /api/coupon — validate a coupon code
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const normalizedCode = code.toUpperCase().trim();

    const response = await serverDatabases.listDocuments(
      config.appwriteDatabaseId,
      COUPON_COLLECTION_ID,
      [Query.equal("code", normalizedCode), Query.equal("used", false)]
    );

    if (response.documents.length > 0) {
      const coupon = response.documents[0] as any;
      return NextResponse.json({
        valid: true,
        code: coupon.code,
        discount: coupon.discount,
        docId: coupon.$id,
      });
    }

    return NextResponse.json(
      { valid: false, error: "Invalid or already used coupon code" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// PATCH /api/coupon — redeem a coupon
export async function PATCH(request: NextRequest) {
  try {
    const { couponDocId, redeemedOrderId } = await request.json();

    if (!couponDocId || !redeemedOrderId) {
      return NextResponse.json(
        { error: "Missing couponDocId or redeemedOrderId" },
        { status: 400 }
      );
    }

    await serverDatabases.updateDocument(
      config.appwriteDatabaseId,
      COUPON_COLLECTION_ID,
      couponDocId,
      {
        used: true,
        redeemed_order_id: redeemedOrderId,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Coupon redemption error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
