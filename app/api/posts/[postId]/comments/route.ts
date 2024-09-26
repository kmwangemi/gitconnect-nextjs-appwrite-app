import { databases, databaseID, commentCollectionID, Query } from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { CommentDataWithCursor, CommentWithRelatedData } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 5;
    const { user } = await validateAndAuthenticateRequest();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    // Define the queries to retrieve comments for the specific post
    const queries = [
      Query.equal("postId", postId),
      Query.limit(pageSize + 1), // Fetch one extra to check if we have more
      Query.orderAsc("$createdAt"),
    ];
    if (cursor) {
      queries.push(Query.cursorAfter(cursor)); // Use cursor for pagination
    }
    // Fetch comments from Appwrite database
    const commentResponse = await databases.listDocuments(
      databaseID,
      commentCollectionID,
      queries,
    );
    const comments = commentResponse.documents as unknown as CommentWithRelatedData[];
    // Determine if there are more comments (if we fetched more than the page size)
    const previousCursor = comments.length > pageSize ? comments[0].$id : null;
    // Prepare the response, removing the extra comment used for pagination check
    const data: CommentDataWithCursor = {
      comments: comments.length > pageSize ? comments.slice(1) : comments,
      previousCursor,
    };
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}