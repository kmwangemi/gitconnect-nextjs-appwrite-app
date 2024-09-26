"use client";

import { useSession } from "@/app/(dashboard)/SessionProvider";
import { PostWithRelatedData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import PostMoreButton from "./PostMoreButton";
import LikeButton from "./LikeButton";
// import { useState } from "react";
// import Comments from "../comments/Comments";
// import { MessageSquare } from "lucide-react";

interface PostProps {
  post: PostWithRelatedData;
}

export default function Post({ post }: PostProps) {
  console.log("post--->", post);
  // const [showComments, setShowComments] = useState(false);
  const { user } = useSession();
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.$id}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.$id}`}
                className="block font-medium hover:underline"
              >
                {post.user.userName}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post?.$id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(new Date(post.$createdAt))}
            </Link>
          </div>
        </div>
        {post.user.$id === user.userId && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <div className="whitespace-pre-line break-words">{post.content}</div>
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton
            postId={post.$id}
            initialState={{
              likes: post.likes.count,
              isLikedByUser: post.likes.isLikedByUser,
            }}
          />
          {/* <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
          /> */}
        </div>
      </div>
      {/* {showComments && <Comments post={post} />} */}
    </article>
  );
}

// interface CommentButtonProps {
//   post: PostData;
//   onClick: () => void;
// }

// function CommentButton({ post, onClick }: CommentButtonProps) {
//   return (
//     <button onClick={onClick} className="flex items-center gap-2">
//       <MessageSquare className="size-5" />
//       <span className="text-sm font-medium tabular-nums">
//         {post._count.comments}{" "}
//         <span className="hidden sm:inline">comments</span>
//       </span>
//     </button>
//   );
// }
