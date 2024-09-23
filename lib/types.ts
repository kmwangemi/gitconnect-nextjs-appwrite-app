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

export interface PostData extends CommonData {
  content: string;
  userId: string;
}

export interface TrimmedUserData {
  $id: string;
  userName: string;
  avatarUrl: string | null;
}

export interface PostWithUser extends PostData {
  user: TrimmedUserData;
}

// User session interface (independent from CommonData)
export interface UserSession {
  userId: string;
  userName: string;
  avatarUrl?: string | null;
}
