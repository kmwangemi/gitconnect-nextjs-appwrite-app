import {
  databaseID,
  databases,
  profileCollectionID,
  Query,
  userCollectionID,
} from "@/appwrite/config";
import UserAvatar from "@/components/UserAvatar";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { TrimmedUserData, TrimmedUserProfileData } from "@/lib/types";
import { formatDate } from "date-fns";
import EditProfileButton from "./EditProfileButton";
import UserInfo from "./UserInfo";

interface PageProps {
  params: { userId: string };
}

const getUser = async (userId: string): Promise<TrimmedUserData> => {
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
    return user;
  } catch {
    throw new Error("User not found");
  }
};

const getUserProfile = async (
  userId: string,
): Promise<TrimmedUserProfileData> => {
  try {
    const response = await databases.listDocuments(
      databaseID,
      profileCollectionID,
      [Query.equal("userId", userId)],
    );
    // Appwrite returns documents in an array, we want the first one (or none if not found)
    const userProfileDocument = response.documents[0];
    if (!userProfileDocument) {
      throw new Error("User profile not found");
    }
    // Parse JSON fields (assuming they are stored as strings)
    const userProfile: TrimmedUserProfileData = {
      $id: userProfileDocument.$id,
      userId: userProfileDocument.userId,
      personalDetails: JSON.parse(userProfileDocument.personalDetails),
      education: JSON.parse(userProfileDocument.education),
      workExperience: JSON.parse(userProfileDocument.workExperience),
      githubRepositories: JSON.parse(userProfileDocument.githubRepositories),
    };
    return userProfile;
  } catch {
    throw new Error("User profile not found");
  }
};

const getUserWithProfile = async (
  userId: string,
): Promise<{ user: TrimmedUserData; profile: TrimmedUserProfileData }> => {
  try {
    // Fetch user and profile data concurrently
    const [user, profile] = await Promise.all([
      getUser(userId),
      getUserProfile(userId),
    ]);
    return { user, profile };
  } catch {
    throw new Error("Failed to fetch user data and profile");
  }
};

export default async function Page({ params: { userId } }: PageProps) {
  const { user: loggedInUser } = await validateAndAuthenticateRequest();
  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }
  const { user, profile } = await getUserWithProfile(userId);
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile
          user={user}
          profile={profile}
          loggedInUserId={loggedInUser.userId}
        />
        <UserInfo profile={profile} />
      </div>
    </main>
  );
}

interface UserProfileProps {
  user: TrimmedUserData;
  profile: TrimmedUserProfileData;
  loggedInUserId: string;
}

async function UserProfile({ user, profile, loggedInUserId }: UserProfileProps) {
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
            <h1 className="text-xl font-bold">{`${user?.firstName} ${user.lastName}`}</h1>
            <div className="text-muted-foreground">@{user.userName}</div>
          </div>
          <div>Member since {formatDate(user.$createdAt, "MMM d, yyyy")}</div>
        </div>
        {user.$id === loggedInUserId && <EditProfileButton profile={profile} />}
      </div>
    </div>
  );
}
