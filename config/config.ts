const config = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_API_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteUserCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  ),
};

export default config;
