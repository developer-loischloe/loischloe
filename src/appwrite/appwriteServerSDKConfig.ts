import config from "@/config";
import { Client, Users, Databases } from "node-appwrite";

const node_appwriteClient = new Client();

node_appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId)
  .setKey(config.appwrite_API_key);

export const users = new Users(node_appwriteClient);
export const serverDatabases = new Databases(node_appwriteClient);
