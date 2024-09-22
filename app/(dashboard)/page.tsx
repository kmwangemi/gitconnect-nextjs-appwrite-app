import {
  databaseID,
  databases,
  postCollectionID,
  Query,
  userCollectionID,
} from "@/appwrite/config";
import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import { PostData, PostWithUser, UserData } from "@/lib/types";
// import TrendsSidebar from "@/components/TrendsSidebar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import FollowingFeed from "./FollowingFeed";
// import ForYouFeed from "./ForYouFeed";

export default async function Home() {
 
  async function getPostsWithUserData(): Promise<PostWithUser[]> {
    try {
      // Fetch posts, ordered by `createdAt`
      const posts = await databases.listDocuments<PostData>(
        databaseID,
        postCollectionID,
        [
          Query.select(["$id", "content", "userId", "$createdAt"]), // Select specific fields
          Query.orderDesc("$createdAt"), // Order posts by `createdAt`
        ],
      );
      console.log(posts);
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
      // Map users to posts by matching userId
      const postsWithUsers: PostWithUser[] = posts.documents.map((post) => {
        const user = users.documents.find((user) => user.$id === post.userId);
        if (user) {
          return {
            ...post,
            user: {
              id: user.$id,
              userName: user.userName,
              avatarUrl: user.avatarUrl || null,
            },
          };
        } else {
          throw new Error(`User with ID ${post.userId} not found`);
        }
      });
      return postsWithUsers;
    } catch (error) {
      console.error("Error fetching posts with users:", error);
      return [];
    }
  }
  // Call the function and log the results
  const posts = await getPostsWithUserData();
  console.log('posts--->', posts);
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.$id} post={post} />
        ))}
        {/* <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">For you</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs> */}
      </div>
      {/* <TrendsSidebar /> */}
    </main>
  );
}
