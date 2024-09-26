"use server";

import {
  databases,
  databaseID,
  commentCollectionID,
  ID,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { createCommentSchema } from "@/lib/validation";

export async function submitComment({
  post,
  content,
}: {
  post: { id: string; userId: string };
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
      postId: post.id,
      userId: user.userId,
    },
  );
  return comment;
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