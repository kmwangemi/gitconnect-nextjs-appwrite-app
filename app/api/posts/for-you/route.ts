/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  commentCollectionID,
  databaseID,
  databases,
  likeCollectionID,
  postCollectionID,
  Query,
  userCollectionID,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import {
  CommentData,
  LikeData,
  PostData,
  PostWithRelatedData,
  UserData,
} from "@/lib/types";
import { Models } from "appwrite";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;
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
    // Fetch posts from Appwrite
    const posts = await databases.listDocuments<PostData>(
      databaseID,
      postCollectionID,
      postQuery,
    );
    if (posts.documents.length === 0) {
      // Return early if no posts exist
      return Response.json({ posts: [], nextCursor: null });
    }
    // Extract unique user IDs from posts
    const userIds = Array.from(
      new Set(posts.documents.map((post) => post.userId)),
    );
    // Fetch user data only if there are userIds
    let users: Models.DocumentList<UserData> = { total: 0, documents: [] };
    if (userIds.length > 0) {
      users = await databases.listDocuments<UserData>(
        databaseID,
        userCollectionID,
        [Query.equal("$id", userIds)], // Fetch users whose IDs match userIds
      );
    }
    // Extract post IDs
    const postIds = posts.documents.map((post) => post.$id);
    // Fetch likes
    let likes: Models.DocumentList<LikeData> = { total: 0, documents: [] };
    if (postIds.length > 0) {
      likes = await databases.listDocuments<LikeData>(
        databaseID,
        likeCollectionID,
        [Query.equal("postId", postIds)],
      );
    }
    // Fetch comments
    let comments: Models.DocumentList<CommentData> = {
      total: 0,
      documents: [],
    };
    if (postIds.length > 0) {
      comments = await databases.listDocuments<CommentData>(
        databaseID,
        commentCollectionID,
        [Query.equal("postId", postIds)],
      );
    }
    // Map users, likes, and comments to posts
    const postsWithDetails: PostWithRelatedData[] = posts.documents.map(
      (post) => {
        const postUser = users.documents.find(
          (user) => user.$id === post.userId,
        );
        // Get likes for this post
        const postLikes = likes.documents.filter(
          (like) => like.postId === post.$id,
        );
        const likeCount = postLikes.length;
        const isLikedByUser = !!postLikes.find(
          (like) => like.userId === user.userId,
        );
        // Get comments for this post
        const postComments = comments.documents.filter(
          (comment) => comment.postId === post.$id,
        );
        const commentCount = postComments.length;
        if (postUser) {
          return {
            ...post,
            user: {
              $id: postUser.$id,
              firstName: postUser.firstName,
              lastName: postUser.lastName,
              email: postUser.email,
              userName: postUser.userName,
              avatarUrl: postUser.avatarUrl || null,
              $createdAt: postUser.$createdAt,
              $updatedAt: postUser.$updatedAt,
            },
            likes: {
              count: likeCount,
              isLikedByUser,
            },
            comments: {
              count: commentCount,
              items: postComments.map((comment) => ({
                $id: comment.$id,
                userId: comment.userId,
                content: comment.content,
                createdAt: comment.$createdAt,
              })),
            },
          };
        } else {
          throw new Error(`User with ID ${post.userId} not found`);
        }
      },
    );
    // Pagination logic: Determine the next cursor
    const nextCursor =
      posts.documents.length > pageSize ? posts.documents[pageSize].$id : null;
    // Return paginated posts with user, likes, and comments details
    return Response.json({
      posts: postsWithDetails.slice(0, pageSize), // Return only required number of posts
      nextCursor,
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
