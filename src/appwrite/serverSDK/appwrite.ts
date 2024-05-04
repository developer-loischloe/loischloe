import { NextRequest } from "next/server";
import { Client, Account } from "node-appwrite";

import config from "@/config";
import { cookies } from "next/headers";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId)
    .setKey(config.appwrite_API_key);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createSessionClient(request: NextRequest) {
  const client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);

  const session = cookies().get("session");
  console.log(session);

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser(request: NextRequest) {
  try {
    const { account } = await createSessionClient(request);
    return await account.get();
  } catch (error) {
    return null;
  }
}
