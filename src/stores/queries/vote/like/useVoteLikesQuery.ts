import { getVoteLikesData } from "@/apis/votes";
import { TVoteLikeCountsResponse } from "@/types/vote.type";
import { useQuery } from "@tanstack/react-query";

const useVoteLikesQuery = (
  voteId: number,
  initialVoteLikes: TVoteLikeCountsResponse,
  accessToken: string,
  refreshToken: string
) => {
  return useQuery<TVoteLikeCountsResponse, Error>({
    queryKey: ["voteLikes", { voteId }],
    queryFn: () => getVoteLikesData(voteId, accessToken, refreshToken),
    initialData: initialVoteLikes
  });
};

export default useVoteLikesQuery;
