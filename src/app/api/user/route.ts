import { createSessionAccountClient } from "@/appwrite/serverSDK/appwriteServerAccountClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { account } = await createSessionAccountClient();
    const user = await account.get();

    return NextResponse.json(
      { success: true, user },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false },
      {
        status: 400,
      }
    );
  }
}
