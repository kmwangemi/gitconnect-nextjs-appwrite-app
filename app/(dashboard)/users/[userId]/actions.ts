"use server";

import { databaseID, databases } from "@/appwrite/config";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);
  const { user } = await validateAndAuthenticateRequest();
  if (!user) throw new Error("Unauthorized");
  // Update the user's profile in Appwrite database
  try {
    const updatedUserDocument = await databases.updateDocument(
      databaseID,
      "[COLLECTION_ID]", // Your Appwrite User Collection ID
      user.userId, // User ID from Appwrite session
      validatedValues, // The data to update
    );
    const updatedUser = updatedUserDocument;
    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
}
