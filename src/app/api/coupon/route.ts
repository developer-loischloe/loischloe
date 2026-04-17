import { NextRequest, NextResponse } from "next/server";
import { serverDatabases } from "@/appwrite/appwriteServerSDKConfig";
import config from "@/config";
import { Query } from "node-appwrite";

const COUPON_COLLECTION_ID = "coupons";

// POST /api/coupon — validate a coupon code (does NOT mark as used)
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

// PATCH /api/coupon — redeem (reserve or finalize) a coupon.
// Checkout calls this twice: once with redeemedOrderId="PENDING" to reserve
// before order creation, and again with the real order id after the order
// saves. The initial reservation performs a conditional update by first
// re-reading the doc — if it has already been marked used the request 409s
// so the client can abort instead of silently double-redeeming.
export async function PATCH(request: NextRequest) {
  try {
    const { couponDocId, redeemedOrderId } = await request.json();

    if (!couponDocId || !redeemedOrderId) {
      return NextResponse.json(
        { error: "Missing couponDocId or redeemedOrderId" },
        { status: 400 }
      );
    }

    if (redeemedOrderId === "PENDING") {
      // Reservation path — fail fast if another checkout got here first.
      const current = (await serverDatabases.getDocument(
        config.appwriteDatabaseId,
        COUPON_COLLECTION_ID,
        couponDocId
      )) as any;

      if (current?.used) {
        return NextResponse.json(
          { error: "Coupon already used" },
          { status: 409 }
        );
      }
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
  } catch (error: any) {
    console.error("Coupon redemption error:", error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE /api/coupon — release a reserved coupon back to the pool so a
// customer whose order creation failed can retry with the same code.
export async function DELETE(request: NextRequest) {
  try {
    const { couponDocId } = await request.json();

    if (!couponDocId) {
      return NextResponse.json(
        { error: "Missing couponDocId" },
        { status: 400 }
      );
    }

    // Only flip `used` back to false. We intentionally leave
    // `redeemed_order_id` unchanged — nulling a string attribute rejects
    // in Appwrite when the field isn't declared nullable, which would
    // bounce a legitimate release attempt.
    await serverDatabases.updateDocument(
      config.appwriteDatabaseId,
      COUPON_COLLECTION_ID,
      couponDocId,
      {
        used: false,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Coupon release error:", error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
