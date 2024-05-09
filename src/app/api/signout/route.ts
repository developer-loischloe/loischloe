import { NextRequest, NextResponse } from "next/server";
import { createSessionAccountClient } from "@/appwrite/serverSDK/appwriteServerAccountClient";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { account } = await createSessionAccountClient();

  try {
    cookies().delete("session");
    await account.deleteSession("current");

    return NextResponse.json({
      success: true,
      msg: "You are successfully signed out.",
    });
  } catch (error: any) {
    console.log("Signout Error: ", error);

    return NextResponse.json({
      success: false,
      msg: error?.message || "Signout failed",
    });
  }
}
