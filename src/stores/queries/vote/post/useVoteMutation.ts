import { TVotesResponse } from "@/types/vote.type";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVote, patchVote, deleteVote } from "@/apis/votes";
import { revalidateRoute } from "@/utils/revalidation";

const useVoteMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: addVote } = useMutation<TVotesResponse, Error, Partial<Tables<"vote_posts">>>({
    mutationFn: (newVote) => postVote(newVote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["votes"]
      });
      router.push("/boards/votes");
    }
  });

  const { mutateAsync: updateVote } = useMutation<TVotesResponse, Error, Partial<Tables<"vote_posts">>>({
    mutationFn: (updatedVote) => patchVote(updatedVote),
    onSuccess: (status, updatedVote) => {
      queryClient.invalidateQueries({
        queryKey: ["votes"]
      });
      revalidateRoute(`/boards/votes/${updatedVote.vote_postId}`, "page");
      router.push(`/boards/votes/${updatedVote.vote_postId}`);
    }
  });

  const { mutateAsync: removeVote } = useMutation<TVotesResponse, Error, Tables<"vote_posts">["vote_postId"]>({
    mutationFn: (voteId) => deleteVote(voteId),
    onSuccess: (status, voteId) => {
      queryClient.invalidateQueries({
        queryKey: ["votes"]
      });
      router.push("/boards/votes");
    }
  });

  return { addVote, updateVote, removeVote };
};

export default useVoteMutation;
