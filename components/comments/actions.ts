"use server";

import {
  databases,
  databaseID,
  commentCollectionID,
  ID,
  userCollectionID,
  postCollectionID,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { CommentWithRelatedData, PostWithRelatedData } from "@/lib/types";
import { createCommentSchema } from "@/lib/validation";

export async function submitComment({
  post,
  content,
}: {
  post: CommentWithRelatedData;
  content: string;
}) {
  const { user } = await validateAndAuthenticateRequest();
  if (!user) throw new Error("Unauthorized");
  const { content: contentValidated } = createCommentSchema.parse({ content });
  const comment = await databases.createDocument(
    databaseID,
    commentCollectionID,
    ID.unique(),
    {
      content: contentValidated,
      postId: post.$id,
      userId: user.userId,
    },
  );
  // Fetch the user data associated with the comment
  const userData = await databases.getDocument(
    databaseID,
    userCollectionID,
    user.userId,
  );
  // Fetch the post data associated with the comment
  const postData = await databases.getDocument(
    databaseID,
    postCollectionID,
    post.$id,
  );
  // Return the comment with the associated user and post data
  console.log("comments--->", {
    ...comment,
    user: {
      $id: userData.$id,
      userName: userData.userName,
      avatarUrl: userData.avatarUrl || null,
    },
    post: {
      $id: postData.$id,
      content: postData.content,
      userId: postData.userId,
    },
  });
  return {
    ...comment,
    user: {
      $id: userData.$id,
      userName: userData.userName,
      avatarUrl: userData.avatarUrl || null,
    },
    post: {
      $id: postData.$id,
      content: postData.content,
      userId: postData.userId,
    },
  };
}

export async function deleteComment(id: string) {
  const { user } = await validateAndAuthenticateRequest();
  if (!user) throw new Error("Unauthorized");
  const existingComment = await databases.getDocument(
    databaseID,
    commentCollectionID,
    id,
  );
  if (!existingComment) throw new Error("Comment not found");
  if (existingComment.userId !== user.userId) throw new Error("Unauthorized");
  // Delete the comment
  await databases.deleteDocument(databaseID, commentCollectionID, id);
  return existingComment;
}