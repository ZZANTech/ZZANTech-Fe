import { getVoteLikesData } from "@/apis/votes";
import { TVoteLikeCountsResponse } from "@/types/vote.type";
import { useQuery } from "@tanstack/react-query";

const useVoteLikesQuery = (voteId: number) => {
  return useQuery<TVoteLikeCountsResponse[], Error>({
    queryKey: ["voteLikes", { voteId }],
    queryFn: () => getVoteLikesData(voteId)
  });
};

export default useVoteLikesQuery;
