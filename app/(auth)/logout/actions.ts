"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // Clear the cookie that holds the session
  const cookieStore = cookies();
  cookieStore.set("authToken", "", {
    path: "/",
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
  });
  return redirect("/login");
}

