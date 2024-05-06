import config from "@/config";
import { Client, Account, Databases, Storage } from "node-appwrite";

const appwriteServerClient = new Client();

appwriteServerClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId)
  .setKey(config.appwrite_API_key);

export const adminAccount = new Account(appwriteServerClient);

export const adminDatabases = new Databases(appwriteServerClient);

export const adminStorage = new Storage(appwriteServerClient);
