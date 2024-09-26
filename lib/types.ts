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
  userName: string;
  avatarUrl: string | null;
}

export interface PostData extends CommonData {
  content: string;
  userId: string;
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

// export interface PostDataWithCursor {
//   posts: PostWithUser[];
//   nextCursor: string | null;
// }

export interface UserSession {
  userId: string;
  userName: string;
  avatarUrl?: string | null;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface CommentDataWithCursor {
  comments: PostWithRelatedData[];
  previousCursor: string | null;
}
