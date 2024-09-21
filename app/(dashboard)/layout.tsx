import { validateAndAuthenticateRequest } from "@/lib/auth";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Validate and authenticate the request
  const session = await validateAndAuthenticateRequest();
  if (!session?.user) redirect("/login");
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
