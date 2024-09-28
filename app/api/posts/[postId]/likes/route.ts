import {
  databases,
  databaseID,
  likeCollectionID,
  postCollectionID,
  ID,
  Query,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { LikeInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user: loggedInUser } = await validateAndAuthenticateRequest();
    if (!loggedInUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const existingPost = await databases.getDocument(
      databaseID,
      postCollectionID,
      postId,
    );
    if (!existingPost) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }
    // Get like count for the post
    const likeCount = await databases.listDocuments(
      databaseID,
      likeCollectionID,
      [Query.equal("postId", postId)],
    );
    // Check if the user liked the post
    const userLike = await databases.listDocuments(
      databaseID,
      likeCollectionID,
      [
        Query.equal("postId", postId),
        Query.equal("userId", loggedInUser.userId),
      ],
    );
    const data: LikeInfo = {
      likes: likeCount.total,
      isLikedByUser: userLike.total > 0,
    };
    return new Response(JSON.stringify(data));
  } catch {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function POST(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user: loggedInUser } = await validateAndAuthenticateRequest();
    if (!loggedInUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    // Check if the post exists
    const post = await databases.getDocument(
      databaseID,
      postCollectionID,
      postId,
    );
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }
    // Check if the user has already liked the post
    const existingLike = await databases.listDocuments(
      databaseID,
      likeCollectionID,
      [
        Query.equal("postId", postId),
        Query.equal("userId", loggedInUser.userId),
      ],
    );
    if (existingLike.total > 0) {
      return new Response();
    }
    // Create a new like
    await databases.createDocument(databaseID, likeCollectionID, ID.unique(), {
      postId,
      userId: loggedInUser.userId,
    });

    return new Response();
  } catch {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user: loggedInUser } = await validateAndAuthenticateRequest();
    if (!loggedInUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    // Check if the post exists
    const post = await databases.getDocument(
      databaseID,
      postCollectionID,
      postId,
    );
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }
    // Delete the like
    const existingLikes = await databases.listDocuments(
      databaseID,
      likeCollectionID,
      [
        Query.equal("postId", postId),
        Query.equal("userId", loggedInUser.userId),
      ],
    );
    if (existingLikes.total === 0) {
      return new Response();
    }
    const likeId = existingLikes.documents[0].$id;
    await databases.deleteDocument(databaseID, likeCollectionID, likeId);
    return new Response();
  } catch {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
