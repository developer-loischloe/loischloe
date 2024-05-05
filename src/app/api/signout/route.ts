import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/appwrite/serverSDK/appwrite";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { account } = await createSessionClient();

  try {
    cookies().delete("session");
    await account.deleteSession("current");

    return NextResponse.json({ success: true, msg: "Signout complete" });
  } catch (error: any) {
    console.log("Signout Error: ", error);

    return NextResponse.json({
      success: false,
      msg: error?.message || "Signout failed",
    });
  }
}
