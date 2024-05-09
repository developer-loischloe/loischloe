import { NextRequest, NextResponse } from "next/server";
import { createAdminAccountClient } from "@/appwrite/serverSDK/appwriteServerAccountClient";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { account } = await createAdminAccountClient();
  const { email, password } = await request.json();

  try {
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    return NextResponse.json({
      success: true,
      msg: "You are successfully signed in.",
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({
      success: false,
      msg: error?.message || "Signin failed",
    });
  }
}
