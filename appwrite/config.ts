import config from "@/config/config";
import { Client, Account, Databases } from "appwrite";

const appwriteClient = new Client();

if (!config.appwriteProjectId) {
  throw new Error("Missing Appwrite Project ID");
}

if (!config.appwriteUrl) {
  throw new Error("Missing Appwrite URL");
}

if (!config.appwriteDatabaseId) {
  throw new Error("Missing Appwrite Database ID");
}

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

const account = new Account(appwriteClient);
const databases = new Databases(appwriteClient); // For interacting with databases
const databaseID = config.appwriteDatabaseId;
const userCollectionID = config.appwriteUserCollectionId;
const postCollectionID = config.appwritePostCollectionId;

export { ID, Query } from "appwrite";
export { account, databases, databaseID, userCollectionID, postCollectionID };
