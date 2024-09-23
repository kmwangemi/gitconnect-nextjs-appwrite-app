"use server";

import {
  databaseID,
  databases,
  postCollectionID,
  userCollectionID,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";

export async function deletePost(postId: string) {
  const { user } = await validateAndAuthenticateRequest();
  if (!user) throw new Error("Unauthorized");
  // Fetch the post by its ID
  const post = await databases.getDocument(
    databaseID,
    postCollectionID,
    postId,
  );
  if (!post) throw new Error("Post not found");
  // Ensure the post belongs to the authenticated user
  if (post.userId !== user.userId) throw new Error("Unauthorized");
  // Fetch the user details associated with the post
  const postUser = await databases.getDocument(
    databaseID,
    userCollectionID,
    post.userId,
  );
  // Delete the post
  await databases.deleteDocument(databaseID, postCollectionID, postId);
  // Return the deleted post along with the associated user details
  return {
    ...post, // Post details
    user: {
      $id: postUser.$id,
      userName: postUser.userName,
      avatarUrl: postUser.avatarUrl || null,
    },
  };
}
