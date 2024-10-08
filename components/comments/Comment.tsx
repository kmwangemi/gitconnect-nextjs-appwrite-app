import { useSession } from "@/app/(dashboard)/SessionProvider";
import { PostWithRelatedData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import CommentMoreButton from "./CommentMoreButton";

interface CommentProps {
  comment: PostWithRelatedData;
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useSession();
  return (
    <div className="group/comment flex gap-3 py-3">
      <span className="hidden sm:inline">
        <UserTooltip user={comment?.user}>
          <Link href={`/users/${comment?.user?.userName}`}>
            <UserAvatar avatarUrl={comment?.user?.avatarUrl} size={40} />
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className="flex items-center gap-1 text-sm">
          <UserTooltip user={comment?.user}>
            <Link
              href={`/users/${comment?.user?.userName}`}
              className="font-medium hover:underline"
            >
              {comment?.user?.userName}
            </Link>
          </UserTooltip>
          <span className="text-muted-foreground">
            {formatRelativeDate(new Date(comment?.$createdAt))}
          </span>
        </div>
        <div>{comment?.content}</div>
      </div>
      {comment?.user?.$id === user?.userId && (
        <CommentMoreButton
          comment={{...comment, postId: comment.$id}}
          className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
        />
      )}
    </div>
  );
}