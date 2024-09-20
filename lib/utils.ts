import { Users } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import jwt from "jsonwebtoken";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generating token with 7 days expiry
export function generateToken(user: Users) {
  return jwt.sign(
    {
      userId: user?.$id,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "7d",
    },
  );
}
// token validation function
export function isTokenExpired(token: string) {
  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
    ) as { exp?: number };
    // Check the token expiration time
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp && currentTimestamp > decoded.exp) {
      // Token has expired
      return true;
    }
    // Token is still valid
    return false;
  } catch {
    // Token verification failed (e.g., invalid token or secret)
    return true;
  }
}
export function getUserIdFromToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET || "somethingsecret",
    ) as { userId?: string };
    if (decoded.userId) {
      return decoded.userId;
    }
    // The token doesn't contain a userId
    return null;
  } catch {
    // Token verification failed (e.g., invalid token or secret)
    return null;
  }
}
