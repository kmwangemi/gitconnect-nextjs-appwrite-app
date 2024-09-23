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
    // const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    // const pageSize = 10;
    const { user } = await validateAndAuthenticateRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const posts = await databases.listDocuments<PostData>(
      databaseID,
      postCollectionID,
      [
        Query.select(["$id", "content", "userId", "$createdAt"]), // Select specific fields
        Query.orderDesc("$createdAt"), // Order posts by `createdAt`
      ],
    );
    // Extract unique user IDs from posts
    const userIds = Array.from(
      new Set(posts.documents.map((post) => post.userId)),
    );
    // Fetch user data for those userIds
    const users = await databases.listDocuments<UserData>(
      databaseID,
      userCollectionID,
      [
        Query.equal("$id", userIds), // Fetch users whose IDs match userIds
      ],
    );
    const postsWithUsers: PostWithUser[] = posts.documents.map((post) => {
      const user = users.documents.find((user) => user.$id === post.userId);
      if (user) {
        return {
          ...post,
          user: {
            $id: user.$id,
            userName: user.userName,
            avatarUrl: user.avatarUrl || null,
          },
        };
      } else {
        throw new Error(`User with ID ${post.userId} not found`);
      }
    });
    console.log("postsWithUsers in the api--->", postsWithUsers);

    // const posts = await prisma.post.findMany({
    //   include: getPostDataInclude(user.id),
    //   orderBy: { createdAt: "desc" },
    //   take: pageSize + 1,
    //   cursor: cursor ? { id: cursor } : undefined,
    // });

    // const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    // const data: PostsPage = {
    //   posts: posts.slice(0, pageSize),
    //   nextCursor,
    // };
    return Response.json(postsWithUsers);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
