import { TVote, TVotesResponse } from "@/types/vote.type";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVote } from "@/apis/votes";

const useVoteMutation = (revalidate?: (voteId: TVote["vote_postId"]) => void) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: addVote } = useMutation<TVotesResponse, Error, Partial<Tables<"vote_posts">>>({
    mutationFn: (newVote: TVote) => postVote(newVote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["votes"]
      });
      router.push("/boards/votes");
    }
  });

  return { addVote };
};

export default useVoteMutation;
