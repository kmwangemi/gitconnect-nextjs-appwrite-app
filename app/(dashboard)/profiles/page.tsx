// import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import React from "react";
import ProfileCard from "./ProfileCard";

// Sample data for demonstration
const sampleUsers = [
  {
    name: "Jane Doe",
    title: "Full Stack Developer",
    avatar: "/api/placeholder/150/150",
    email: "jane.doe@example.com",
    location: "San Francisco, CA",
    bio: "Passionate about creating elegant solutions to complex problems.",
    education: [
      {
        degree: "M.S. Computer Science",
        school: "Stanford University",
        year: "2018-2020",
      },
    ],
    experience: [
      {
        title: "Senior Developer",
        company: "Tech Innovators Inc.",
        duration: "2020-Present",
      },
    ],
    githubRepos: [
      {
        name: "awesome-project",
        description: "A revolutionary open-source project",
        url: "#",
      },
    ],
  },
  {
    name: "John Smith",
    title: "UX Designer",
    avatar: "/api/placeholder/150/150",
    email: "john.smith@example.com",
    location: "New York, NY",
    bio: "Crafting intuitive and beautiful user experiences.",
    education: [
      {
        degree: "B.F.A. Graphic Design",
        school: "Rhode Island School of Design",
        year: "2015-2019",
      },
    ],
    experience: [
      {
        title: "Lead Designer",
        company: "Creative Solutions LLC",
        duration: "2019-Present",
      },
    ],
    githubRepos: [
      {
        name: "ux-patterns",
        description: "A collection of reusable UX patterns",
        url: "#",
      },
    ],
  },
];

export default function ProfileCardList() {
  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery({
  //   queryKey: ["post-feed", "for-you"],
  //   queryFn: ({ pageParam }) =>
  //     kyInstance
  //       .get(
  //         "/api/posts/for-you",
  //         pageParam ? { searchParams: { cursor: pageParam } } : {},
  //       )
  //       .json<PostWithRelatedDataAndCursor>(),
  //   initialPageParam: null as string | null,
  //   getNextPageParam: (lastPage) => lastPage.nextCursor,
  // });
  // const posts = data?.pages.flatMap((page) => page.posts) || [];
  // if (status === "pending") {
  //   return <PostsLoadingSkeleton />;
  // }
  // if (status === "success" && !posts.length && !hasNextPage) {
  //   return (
  //     <p className="text-center text-muted-foreground">
  //       No one has created a profile yet.
  //     </p>
  //   );
  // }
  // if (status === "error") {
  //   return (
  //     <p className="text-center text-destructive">
  //       An error occurred while loading profiles.
  //     </p>
  //   );
  // }
  return (
    // <InfiniteScrollContainer
    //   className="space-y-5"
    //   onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    // >
    //   {posts.map((post) => (
    //     <Post key={post.$id} post={post} />
    //   ))}
    //   {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    // </InfiniteScrollContainer>
    <main className="space-y-5 w-full">
      {sampleUsers.map((profile, index) => (
        <ProfileCard key={index} user={profile} />
      ))}
    </main>
  );
}
