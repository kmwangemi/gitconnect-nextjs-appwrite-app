"use server";

import { databaseID, databases, ID, postCollectionID } from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: string) {
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
  return newPost;
}
