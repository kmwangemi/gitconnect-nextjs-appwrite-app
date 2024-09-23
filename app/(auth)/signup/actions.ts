"use server";

import {
  databaseID,
  databases,
  ID,
  Query,
  userCollectionID,
} from "@/appwrite/config";
import { generateToken } from "@/lib/auth";
import { UserData } from "@/lib/types";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const { firstName, lastName, email, userName, password } =
      signUpSchema.parse(credentials);
    const existingEmail = await databases.listDocuments(
      databaseID,
      userCollectionID,
      [Query.equal("email", email)],
    );
    if (existingEmail.total > 0) {
      return {
        error: "Email already taken",
      };
    }
    const existingUserName = await databases.listDocuments(
      databaseID,
      userCollectionID,
      [Query.equal("userName", userName)],
    );
    if (existingUserName.total > 0) {
      return {
        error: "UserName already taken",
      };
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const response = await databases.createDocument(
      databaseID,
      userCollectionID,
      ID.unique(),
      {
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
      },
    );
    // Create a session for the newly registered user
    const jwtToken = generateToken(response as unknown as UserData);
    // Set JWT token in a cookie
    cookies().set("authToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
