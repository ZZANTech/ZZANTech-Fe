import { getVoteComments } from "@/apis/votes";
import { TVoteCommentsResponse } from "@/types/vote.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const useVoteCommentsQuery = (voteId: number, pageSize: number, enabled: boolean) => {
  return useInfiniteQuery<TVoteCommentsResponse, Error>({
    queryKey: ["voteComments", { voteId }],
    queryFn: ({ pageParam = 1 }) => getVoteComments(voteId, pageParam as number, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    enabled
  });
};

export default useVoteCommentsQuery;
