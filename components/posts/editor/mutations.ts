import { PostWithRelatedData, PostWithRelatedDataAndCursor } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./actions";
import { useToast } from "@/hooks/use-toast";

export function useSubmitPostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost: PostWithRelatedData) => {
      const queryFilter: QueryFilters = {
        queryKey: ["post-feed", "for-you"],
      };
      // Cancel any ongoing queries that match the query filter
      await queryClient.cancelQueries(queryFilter);
      queryClient.setQueriesData<
        InfiniteData<PostWithRelatedDataAndCursor, string | null>
      >(queryFilter, (oldData) => {
        if (!oldData) return;
        const firstPage = oldData?.pages[0];
        if (firstPage) {
          // Use the newPost returned from submitPost directly
          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                posts: [newPost, ...firstPage.posts], // Insert the new post at the top
                nextCursor: firstPage.nextCursor,
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      });
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
      toast({
        description: "Post created",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to post. Please try again.",
      });
    },
  });
  return mutation;
}
