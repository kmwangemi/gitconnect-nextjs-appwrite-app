import { User, UserSession } from "@/types/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "somethingsecret";

interface DecodedToken {
  user: UserSession;
  iat?: number;
  exp?: number;
}

// generating token with 7 days expiry
export function generateToken(user: User) {
  return jwt.sign(
    {
      user: {
        userId: user?.$id,
        userName: user?.userName,
        avatarUrl: user?.avatarUrl,
      },
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
  } catch {
    // If token verification failed (e.g., invalid token or expired)
    throw new Error("Invalid or expired token");
  }
}

// Helper function to use in a layout component or middleware
export async function validateAndAuthenticateRequest() {
  const cookieStore = cookies(); // Access cookies in Next.js
  const token = cookieStore.get("authToken")?.value;
  try {
    const decodedToken = authenticateToken(token);
    // If valid, return the decoded token
    return { user: decodedToken?.user };
  } catch {
    return { user: null };
  }
}
