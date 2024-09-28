/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  databaseID,
  databases,
  Query,
  userCollectionID,
} from "@/appwrite/config";
import { UserData } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;
    // Fetch users ordered by createdAt, with pagination using limit and cursor
    const userQuery: any[] = [
      Query.select([
        "$id",
        "firstName",
        "lastName",
        "email",
        "userName",
        "avatarUrl",
        "$createdAt",
      ]),
      Query.orderDesc("$createdAt"),
      Query.limit(pageSize + 1), // Fetch 1 extra post to check if there's a next page
    ];
    // Add cursor if provided
    if (cursor) {
      userQuery.push(Query.cursorAfter(cursor));
    }
    // Fetch users
    const users = await databases.listDocuments<UserData>(
      databaseID,
      userCollectionID,
      userQuery,
    );
    // Pagination logic: Determine the next cursor
    const nextCursor =
      users.documents.length > pageSize ? users.documents[pageSize].$id : null;
    // Return paginated users
    return Response.json({
      users: users.documents.slice(0, pageSize), // Return only required number of users
      nextCursor,
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
