/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  databaseID,
  databases,
  profileCollectionID,
  Query,
} from "@/appwrite/config";
import { UserProfileData } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;
    // Fetch profiles ordered by createdAt, with pagination using limit and cursor
    const userQuery: any[] = [
      Query.select([
        "$id",
        "userId",
        "personalDetails",
        "education",
        "workExperience",
        "githubRepositories",
        "$createdAt",
      ]),
      Query.orderDesc("$createdAt"),
      Query.limit(pageSize + 1), // Fetch 1 extra post to check if there's a next page
    ];
    // Add cursor if provided
    if (cursor) {
      userQuery.push(Query.cursorAfter(cursor));
    }
    // Fetch profiles
    const profiles = await databases.listDocuments<UserProfileData>(
      databaseID,
      profileCollectionID,
      userQuery,
    );
    // Pagination logic: Determine the next cursor
    const nextCursor =
      profiles.documents.length > pageSize
        ? profiles.documents[pageSize].$id
        : null;
    // Return paginated profiles
    return Response.json({
      profiles: profiles.documents.slice(0, pageSize), // Return only required number of profiles
      nextCursor,
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
