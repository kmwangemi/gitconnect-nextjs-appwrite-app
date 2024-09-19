import config from "@/config/config";
import { Client, Account } from "appwrite";

const appwriteClient = new Client();

if (!config.appwriteProjectId) {
  throw new Error("Missing Appwrite Project ID");
}

if (!config.appwriteUrl) {
  throw new Error("Missing Appwrite URL");
}

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export const account = new Account(appwriteClient);

export { ID } from "appwrite";