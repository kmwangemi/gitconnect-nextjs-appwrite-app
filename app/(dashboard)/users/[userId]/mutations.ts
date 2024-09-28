import { useToast } from "@/hooks/use-toast";
import { TrimmedUserProfileData } from "@/lib/types";
import { UpdateUserProfileValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "./actions";

// Helper function to transform Appwrite Document to TrimmedUserProfileData
function transformToTrimmedUserProfileData(
  document: Models.Document,
): TrimmedUserProfileData {
  return {
    $id: document.$id,
    userId: document.userId,
    personalDetails: JSON.parse(document.personalDetails),
    education: JSON.parse(document.education),
    workExperience: JSON.parse(document.workExperience),
    githubRepositories: JSON.parse(document.githubRepositories),
  };
}

export function useUpdateProfileMutation() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: UpdateUserProfileValues) => {
      const updatedDocument = await updateUserProfile(values);
      return transformToTrimmedUserProfileData(updatedDocument);
    },
    onSuccess: async (updatedUser: TrimmedUserProfileData) => {
      // Invalidate and refetch profile query
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      // Update posts query data
      queryClient.setQueriesData(
        { queryKey: ["posts"] },
        (oldData: TrimmedUserProfileData[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((post) => {
            if (post.$id === updatedUser.$id) {
              return {
                ...post,
                ...updatedUser,
              };
            }
            return post;
          });
        },
      );
      // Update user query data if it exists
      queryClient.setQueryData(["user", updatedUser.userId], updatedUser);
      router.refresh();
      toast({
        description: "Profile updated successfully",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to update profile. Please try again.",
      });
    },
  });
  return mutation;
}
