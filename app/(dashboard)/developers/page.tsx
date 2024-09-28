"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/posts/PostLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { UserDataAndCursor } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import DeveloperCard from "./DeveloperCard";

export default function DeveloperCardList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/users",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<UserDataAndCursor>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  const users = data?.pages.flatMap((page) => page.users) || [];
  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }
  if (status === "success" && !users.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No users has been created yet.
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading users.
      </p>
    );
  }
  return (
    <InfiniteScrollContainer
      className="space-y-5 w-full"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {users.map((user) => (
        <DeveloperCard key={user?.$id} user={user} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
