"use client";

import { useSession } from "@/app/(dashboard)/SessionProvider";
import { PostWithUser } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import PostMoreButton from "./PostMoreButton";
import LikeButton from "./LikeButton";

interface PostProps {
  post: PostWithUser;
}

export default function Post({ post }: PostProps) {
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
              // likes: post._count.likes,
              likes: post._count.likes,
              isLikedByUser: post.likes.some((like) => like.userId === user.id),
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
