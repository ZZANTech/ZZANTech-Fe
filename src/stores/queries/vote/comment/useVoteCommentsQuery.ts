import { getVoteComments } from "@/apis/votes";
import { TVoteComment } from "@/types/vote.type";
import { useQuery } from "@tanstack/react-query";

const useVoteCommentsQuery = (voteId: number) => {
  return useQuery<TVoteComment[], Error>({
    queryKey: ["voteComments", { voteId }],
    queryFn: () => getVoteComments(voteId)
  });
};

export default useVoteCommentsQuery;
