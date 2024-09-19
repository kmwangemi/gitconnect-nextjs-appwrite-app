"use server";

import { account } from "@/appwrite/config";
import { loginSchema, LoginValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(credentials);
    // Use Appwrite's account login method
    const session = await account.createSession(username, password);
    console.log("Logged in successfully:", session);

    // Query the users by email
    // const existingUser = await account.list([`email=${email}`]);

    // const existingUser = await prisma.user.findFirst({
    //   where: {
    //     username: {
    //       equals: username,
    //       mode: "insensitive",
    //     },
    //   },
    // });

    // if (!existingUser || !existingUser.passwordHash) {
    //   return {
    //     error: "Incorrect username or password",
    //   };
    // }

    // const validPassword = await verify(existingUser.passwordHash, password, {
    //   memoryCost: 19456,
    //   timeCost: 2,
    //   outputLen: 32,
    //   parallelism: 1,
    // });

    // if (!validPassword) {
    //   return {
    //     error: "Incorrect username or password",
    //   };
    // }

    // const session = await lucia.createSession(existingUser.id, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies().set(
    //   sessionCookie.name,
    //   sessionCookie.value,
    //   sessionCookie.attributes,
    // );

    return redirect("/");
  } catch (error: unknown) {
    console.error(error);
    if (isRedirectError(error)) throw error;
    // Handle specific Appwrite error codes (for example: invalid credentials)
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 401) {
      return {
        error: "Incorrect email or password.",
      };
    }
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}