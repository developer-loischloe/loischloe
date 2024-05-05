import { createSessionClient } from "@/appwrite/serverSDK/appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    console.log(user);

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
