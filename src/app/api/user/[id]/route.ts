import { users } from "@/appwrite/appwriteServerSDKConfig";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const user: any = await users.get(id);
    const { avatar } = user?.prefs;
    return Response.json({
      user: {
        name: user.name,
        email: user.email,
        avatar: avatar || null,
      },
      message: "User found successfully",
    });
  } catch (error) {
    console.log("getUserById error: ", error);
    return Response.json({
      user: null,
      message: `User not found with this (${id}) id`,
    });
  }
}
