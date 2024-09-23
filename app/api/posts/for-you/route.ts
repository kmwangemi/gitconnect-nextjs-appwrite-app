/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  databaseID,
  databases,
  postCollectionID,
  Query,
  userCollectionID,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { PostData, PostWithUser, UserData } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;
    // Validate and authenticate user
    const { user } = await validateAndAuthenticateRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Fetch posts ordered by createdAt, with pagination using limit and cursor
    const postQuery: any[] = [
      Query.select(["$id", "content", "userId", "$createdAt"]),
      Query.orderDesc("$createdAt"),
      Query.limit(pageSize + 1), // Fetch 1 extra post to check if there's a next page
    ];
    // Add cursor if provided
    if (cursor) {
      postQuery.push(Query.cursorAfter(cursor));
    }
    // Fetch the posts from Appwrite
    const posts = await databases.listDocuments<PostData>(
      databaseID,
      postCollectionID,
      postQuery,
    );
    // Extract unique user IDs from posts
    const userIds = Array.from(
      new Set(posts.documents.map((post) => post.userId)),
    );
    // Fetch user data for the corresponding userIds
    const users = await databases.listDocuments<UserData>(
      databaseID,
      userCollectionID,
      [
        Query.equal("$id", userIds), // Fetch users whose IDs match userIds
      ],
    );
    // Map users to posts
    const postsWithUsers: PostWithUser[] = posts.documents.map((post) => {
      const postUser = users.documents.find((user) => user.$id === post.userId);
      if (postUser) {
        return {
          ...post,
          user: {
            $id: postUser.$id,
            userName: postUser.userName,
            avatarUrl: postUser.avatarUrl || null,
          },
        };
      } else {
        throw new Error(`User with ID ${post.userId} not found`);
      }
    });
    // Pagination logic: Determine the next cursor
    const nextCursor =
      posts.documents.length > pageSize ? posts.documents[pageSize].$id : null;
    // Return paginated posts and next cursor
    return Response.json({
      posts: postsWithUsers.slice(0, pageSize), // Return only required number of posts
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching posts with users:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
