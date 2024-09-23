"use client";

import Post from "@/components/posts/Post";
import { PostWithUser } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
  const query = useQuery<PostWithUser[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const response = await fetch("/api/posts/for-you");
      if (!response.ok)
        throw new Error(`Request failed with status ${response.status}`);
      return response.json();
    },
  });
  if (query.status === "pending") {
    return <Loader2 className="mx-auto animate-spin" />;
  }
  if (query.status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }
  if (query.data.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }
  return (
    <>
      {query.data.map((post) => (
        <Post key={post.$id} post={post} />
      ))}
    </>
  );
}
