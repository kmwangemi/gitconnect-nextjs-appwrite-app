import { Button } from "@/components/ui/button";
import { validateAndAuthenticateRequest } from "@/lib/auth";
import { Bookmark, Home, Users } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateAndAuthenticateRequest();
  if (!user) return null;
  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Developers"
        asChild
      >
        <Link href="/developers">
          <Users />
          <span className="hidden lg:inline">Developers</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Profiles"
        asChild
      >
        <Link href="/profiles">
          <Bookmark />
          <span className="hidden lg:inline">Profiles</span>
        </Link>
      </Button>
    </div>
  );
}
