"use server";

import { databaseID, databases, ID, postCollectionID, userCollectionID } from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { PostWithRelatedData, PostWithUser } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: string): Promise<PostWithRelatedData> {
  const { user } = await validateAndAuthenticateRequest();
  if (!user) throw new Error("Unauthorized");
  const { content } = createPostSchema.parse({ content: input });
  const newPost = await databases.createDocument(
    databaseID,
    postCollectionID,
    ID.unique(),
    {
      content,
      userId: user?.userId,
    },
  );
  const userData = await databases.getDocument(
    databaseID,
    userCollectionID,
    user?.userId,
  );
  // Manually attach user data to the post
  const postWithUser = {
    ...newPost,
    user: {
      $id: userData.$id,
      userName: userData.userName,
      avatarUrl: userData.avatarUrl || null,
    },
    content,
    userId: user.userId,
  };
  return postWithUser;
}
