"use server";

import {
  databaseID,
  databases,
  ID,
  postCollectionID,
  userCollectionID,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { PostWithRelatedData } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: string): Promise<PostWithRelatedData> {
  const { user } = await validateAndAuthenticateRequest();
  if (!user) throw new Error("Unauthorized");
  // Validate the post content
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
  // Fetch full user data from the user collection
  const userData = await databases.getDocument(
    databaseID,
    userCollectionID,
    user?.userId,
  );
  // Attach user data and initialize likes and comments
  const postWithDetails: PostWithRelatedData = {
    ...newPost,
    content: newPost.content,
    userId: newPost.userId,
    user: {
      $id: userData.$id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      userName: userData.userName,
      avatarUrl: userData.avatarUrl || null,
      $createdAt: userData.$createdAt,
      $updatedAt: userData.$updatedAt,
    },
    likes: {
      count: 0,
      isLikedByUser: false,
    },
    comments: {
      count: 0,
      items: [],
    },
  };
  return postWithDetails;
}