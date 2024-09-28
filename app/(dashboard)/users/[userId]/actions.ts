"use server";

import {
  databaseID,
  databases,
  profileCollectionID,
  Query,
} from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);
  const jsonifiedValues = {
    personalDetails: JSON.stringify(values.personalDetails),
    education: JSON.stringify(values.education),
    workExperience: JSON.stringify(values.workExperience),
    githubRepositories: JSON.stringify(values.githubRepositories),
  };
  const { user } = await validateAndAuthenticateRequest();
  if (!user) throw new Error("Unauthorized");
  try {
    // Query to find the profile document by userId
    const response = await databases.listDocuments(
      databaseID,
      profileCollectionID,
      [Query.equal("userId", user.userId)], // Find the document where userId equals the authenticated user's ID
    );
    const userProfileDocument = response.documents[0]; // We expect only one document, so take the first one
    if (!userProfileDocument) {
      throw new Error("User profile not found");
    }
    // Update the found document by its ID
    const updatedUserDocument = await databases.updateDocument(
      databaseID,
      profileCollectionID,
      userProfileDocument.$id, // Use the document's ID for updating
      jsonifiedValues, // The data to update
    );
    return updatedUserDocument;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
}
