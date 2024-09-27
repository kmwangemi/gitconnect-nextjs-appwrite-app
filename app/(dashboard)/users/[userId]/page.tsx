import {
  databaseID,
  databases,
  Query,
  userCollectionID,
} from "@/appwrite/config";
import UserAvatar from "@/components/UserAvatar";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { TrimmedUserData } from "@/lib/types";
import { formatDate } from "date-fns";
import NodeCache from "node-cache"; // For caching
import EditProfileButton from "./EditProfileButton";
import UserInfo from "./UserInfo";

interface PageProps {
  params: { userId: string };
}

const myCache = new NodeCache();

const getUser = async (userId: string): Promise<TrimmedUserData> => {
  const cacheKey = `user-${userId}`;
  // Check if user data is in cache
  const cachedUser = myCache.get<TrimmedUserData>(cacheKey);
  if (cachedUser) {
    return cachedUser;
  }
  try {
    const response = await databases.listDocuments(
      databaseID,
      userCollectionID,
      [Query.equal("$id", userId)],
    );
    // Appwrite returns documents in an array, we want the first one (or none if not found)
    const userDocument = response.documents[0];
    if (!userDocument) {
      throw new Error("User not found");
    }
    // Map the document to a User object
    const user: TrimmedUserData = {
      $id: userDocument.$id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      userName: userDocument.userName,
      avatarUrl: userDocument.avatarUrl || "",
      $createdAt: userDocument.$createdAt,
      $updatedAt: userDocument.$updatedAt,
    };
    // Store the result in the cache
    myCache.set(cacheKey, user, 3600); // Cache for 1 hour
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("User not found");
  }
};

// export async function generateMetadata({
//   params: { username },
// }: PageProps): Promise<Metadata> {
//   const { user: loggedInUser } = await validateAndAuthenticateRequest();
//   if (!loggedInUser) return {};
//   const user = await getUser(username, loggedInUser.userId);
//   return {
//     title: `${user.displayName} (@${user.username})`,
//   };
// }

export default async function Page({ params: { userId } }: PageProps) {
  const { user: loggedInUser } = await validateAndAuthenticateRequest();
  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }
  const user = await getUser(userId);
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUserId={loggedInUser.userId} />
        <UserInfo userId={user.$id} />
      </div>
    </main>
  );
}

interface UserProfileProps {
  user: TrimmedUserData;
  loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  return (
    <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <UserAvatar
        avatarUrl={user?.avatarUrl}
        size={150}
        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
      />
      <div className="flex flex-wrap gap-2 sm:flex-nowrap">
        <div className="me-auto space-y-2">
          <div>
            <h1 className="text-xl font-bold">{user.firstName}</h1>
            <div className="text-muted-foreground">@{user.userName}</div>
          </div>
          <div>Member since {formatDate(user.$createdAt, "MMM d, yyyy")}</div>
        </div>
        {user.$id === loggedInUserId && <EditProfileButton user={user} />}
      </div>
    </div>
  );
}
