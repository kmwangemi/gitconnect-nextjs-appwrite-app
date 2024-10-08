"use server";

import {
  databaseID,
  databases,
  Query,
  userCollectionID,
} from "@/appwrite/config";
import { generateToken } from "@/lib/auth";
import { UserData } from "@/lib/types";
import { loginSchema, LoginValues } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const { email, password } = loginSchema.parse(credentials);
    const existingEmail = await databases.listDocuments(
      databaseID,
      userCollectionID,
      [Query.equal("email", email)],
    );
    if (existingEmail.total === 0) {
      return {
        error: "Incorrect email or password",
      };
    }
    const isValidPassword = bcrypt.compareSync(
      password,
      existingEmail.documents[0].password,
    );
    if (!isValidPassword) {
      return {
        error: "Incorrect email or password",
      };
    }
    // Create a session for the login
    const jwtToken = generateToken(existingEmail.documents[0] as UserData);
    // Set JWT token in a cookie
    cookies().set("authToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return redirect("/");
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
