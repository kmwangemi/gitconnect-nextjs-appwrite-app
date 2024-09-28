const config = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_API_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteUserCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  ),
  appwritePostCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID,
  ),
  appwriteLikeCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_LIKE_COLLECTION_ID,
  ),
  appwriteCommentCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID,
  ),
  appwriteProfileCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID,
  ),
};

export default config;
