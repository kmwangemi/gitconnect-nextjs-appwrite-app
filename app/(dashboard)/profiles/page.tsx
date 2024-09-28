"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import React from "react";
import ProfileCard from "./ProfileCard";
import kyInstance from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { UserProfileDataAndCursor } from "@/lib/types";
import PostsLoadingSkeleton from "@/components/posts/PostLoadingSkeleton";

export default function ProfileCardList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["profiles"],
    queryFn: async ({ pageParam }) => {
      const response = await kyInstance
        .get(
          "/api/profiles",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<UserProfileDataAndCursor>();
      // Parse stringified JSON fields (e.g., personalDetails, education, etc.)
      const parsedProfiles = response.profiles.map((profile) => {
        return {
          ...profile,
          personalDetails: typeof profile.personalDetails === 'string' ? JSON.parse(profile.personalDetails) : profile.personalDetails,
          education: typeof profile.education === 'string' ? JSON.parse(profile.education) : profile.education,
          workExperience: typeof profile.workExperience === 'string' ? JSON.parse(profile.workExperience) : profile.workExperience,
          githubRepositories: typeof profile.githubRepositories === 'string' ? JSON.parse(profile.githubRepositories) : profile.githubRepositories,
        };
      });
      return { ...response, profiles: parsedProfiles };
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  const profiles = data?.pages.flatMap((page) => page.profiles) || [];
  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }
  if (status === "success" && !profiles.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has created a profile yet.
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading profiles.
      </p>
    );
  }
  return (
    <InfiniteScrollContainer
      className="w-full space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {profiles.map((profile) => (
        <ProfileCard key={profile?.$id} profile={profile} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
