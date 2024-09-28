interface CommonData {
  $id: string;
  $permissions: string[];
  $createdAt: string;
  $updatedAt: string;
  $databaseId: string;
  $collectionId: string;
}

export interface UserData extends CommonData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  avatarUrl?: string | null;
}

export interface TrimmedUserData {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatarUrl: string | null;
  $createdAt: string;
  $updatedAt: string;
}

export interface PostData extends CommonData {
  content: string;
  userId: string;
}

export interface TrimmedPostData {
  $id: string;
  userId: string;
  content: string;
}

export interface LikeData extends CommonData {
  userId: string;
  postId: string;
}

export interface CommentData extends CommonData {
  userId: string;
  postId: string;
  content: string;
}

export interface TrimmedCommentData {
  $id: string;
  userId: string;
  postId: string;
  content: string;
  $createdAt: string;
}

export interface PostWithUser extends PostData {
  user: TrimmedUserData;
}

interface CommentItems {
  $id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface PostWithRelatedData {
  content: string;
  userId: string;
  $id: string;
  $createdAt: string;
  user: TrimmedUserData;
  likes: {
    count: number;
    isLikedByUser: boolean;
  };
  comments: {
    count: number;
    items: CommentItems[];
  };
}

export interface PostWithRelatedDataAndCursor {
  posts: PostWithRelatedData[];
  nextCursor: string | null;
}

export interface UserDataAndCursor {
  users: UserData[];
  nextCursor: string | null;
}

// export interface PostDataWithCursor {
//   posts: PostWithUser[];
//   nextCursor: string | null;
// }

export interface UserSession {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatarUrl: string | null;
  $createdAt: string;
  $updatedAt: string;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface CommentWithRelatedData extends TrimmedCommentData {
  // userId: string;
  // postId: string;
  // content: string;
  user: TrimmedUserData;
  post: TrimmedPostData;

  // $id: string;
  // userId: string;
  // postId: string;
  // content: string;
  // $createdAt: string;
}

export interface CommentDataWithCursor {
  comments: CommentWithRelatedData[];
  previousCursor: string | null;
}

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface WorkExperience {
  company: string;
  position: string;
  year: string;
  responsibilities: string;
}

interface GithubRepository {
  name: string;
  url: string;
}

export interface UserProfileData extends CommonData {
  userId: string;
  personalDetails: PersonalDetails;
  education: Education[];
  workExperience: WorkExperience[];
  githubRepositories: GithubRepository[];
}

export interface TrimmedUserProfileData {
  $id: string;
  userId: string;
  personalDetails: PersonalDetails;
  education: Education[];
  workExperience: WorkExperience[];
  githubRepositories: GithubRepository[];
}
