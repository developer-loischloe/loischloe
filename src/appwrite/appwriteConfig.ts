import config from "@/config";
import { Client, Account, Databases, Storage } from "appwrite";

const appwriteClient = new Client();

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export const account = new Account(appwriteClient);

export const databases = new Databases(appwriteClient);

export const storage = new Storage(appwriteClient);
