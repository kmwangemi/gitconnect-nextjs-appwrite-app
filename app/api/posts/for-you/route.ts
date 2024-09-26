/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  databaseID,
  databases,
  postCollectionID,
  userCollectionID,
  commentCollectionID,
  likeCollectionID,
  Query,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import {
  PostData,
  UserData,
  CommentData,
  LikeData,
  PostWithRelatedData,
} from "@/lib/types";
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
    // Extract post IDs
    const postIds = posts.documents.map((post) => post.$id);
    // Fetch likes for the corresponding posts
    const likes = await databases.listDocuments<LikeData>(
      databaseID,
      likeCollectionID,
      [
        Query.equal("postId", postIds), // Fetch likes for the current postIds
      ],
    );
    // Fetch comments for the corresponding posts
    const comments = await databases.listDocuments<CommentData>(
      databaseID,
      commentCollectionID,
      [
        Query.equal("postId", postIds), // Fetch comments for the current postIds
      ],
    );
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
              userName: postUser.userName,
              avatarUrl: postUser.avatarUrl || null,
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
    console.log('postsWithDetails--->', postsWithDetails);
    // Pagination logic: Determine the next cursor
    const nextCursor =
      posts.documents.length > pageSize ? posts.documents[pageSize].$id : null;
    // Return paginated posts with user, likes, and comments details
    return Response.json({
      posts: postsWithDetails.slice(0, pageSize), // Return only required number of posts
      nextCursor,
    });
  } catch (error) {
    console.error(
      "Error fetching posts with users, likes, and comments:",
      error,
    );
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
