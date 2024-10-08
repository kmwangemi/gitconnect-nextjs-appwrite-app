"use client";

import { TrimmedUserData } from "@/lib/types";
import Link from "next/link";
import { PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UserAvatar from "./UserAvatar";

interface UserTooltipProps extends PropsWithChildren {
  user: TrimmedUserData;
}

export default function UserTooltip({ children, user }: UserTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/users/${user?.userName}`}>
                <UserAvatar size={70} avatarUrl={user?.avatarUrl} />
              </Link>
            </div>
            <div>
              <Link href={`/users/${user?.$id}`}>
                <div className="text-lg font-semibold hover:underline">
                  {user?.userName}
                </div>
                <div className="text-muted-foreground">@{user?.userName}</div>
              </Link>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
