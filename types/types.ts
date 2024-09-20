export interface Users {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  $id: string;
  $permissions: string[];
  $createdAt: Date;
  $updatedAt: Date;
  $databaseId: string;
  $collectionId: string;
}
