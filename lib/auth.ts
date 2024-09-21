import { Users } from "@/types/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "somethingsecret";

interface DecodedToken {
  userId: string; // Add any other fields you store in your JWT payload
  exp?: number;
}

// generating token with 7 days expiry
export function generateToken(user: Users) {
  return jwt.sign(
    {
      userId: user?.$id,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

// Verify token and check expiration
export function authenticateToken(token: string | undefined) {
  if (!token) {
    // If no token is provided, user is not authenticated
    throw new Error("No token provided");
  }
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    // Check if the token has an expiration time and if it has expired
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp && currentTimestamp > decoded.exp) {
      throw new Error("Token has expired");
    }
    // Return decoded token if valid and not expired
    return decoded;
  } catch (error) {
    console.log("toke error--->", error);
    // If token verification failed (e.g., invalid token or expired)
    throw new Error("Invalid or expired token");
  }
}

// Helper function to use in a layout component or middleware
export async function validateAndAuthenticateRequest() {
  const cookieStore = cookies(); // Access cookies in Next.js
  const token = cookieStore.get("authToken")?.value;
  console.log("authToken-->", token);
  try {
    const decodedToken = authenticateToken(token);
    // If valid, return the decoded token
    return { user: decodedToken.userId };
  } catch (error) {
    console.log("error-->", error);
    throw new Error("Authentication failed");
  }
}

// token validation function
// export function isTokenExpired(token: string) {
//   try {
//     // Verify the token and decode its payload
//     const decoded = jwt.verify(token, JWT_SECRET) as { exp?: number };
//     // Check the token expiration time
//     const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
//     if (decoded.exp && currentTimestamp > decoded.exp) {
//       // Token has expired
//       return true;
//     }
//     // Token is still valid
//     return false;
//   } catch {
//     // Token verification failed (e.g., invalid token or secret)
//     return true;
//   }
// }
// export function getUserIdFromToken(token: string) {
//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.NEXT_PUBLIC_JWT_SECRET || "somethingsecret",
//     ) as { userId?: string };
//     if (decoded.userId) {
//       return decoded.userId;
//     }
//     // The token doesn't contain a userId
//     return null;
//   } catch {
//     // Token verification failed (e.g., invalid token or secret)
//     return null;
//   }
// }
