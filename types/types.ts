export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  avatarUrl: string;
  $id: string;
  $permissions: string[];
  $createdAt: Date;
  $updatedAt: Date;
  $databaseId: string;
  $collectionId: string;
}

export interface UserSession {
  userId: string;
  userName: string;
  avatarUrl?: string | null;
}
