import { getVotes } from "@/apis/votes";
import { TVotesResponse } from "@/types/vote.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const useVotesQuery = (sortOrder: string, voteId?: string, isMobile: boolean = false) => {
  return useInfiniteQuery<TVotesResponse, Error>({
    queryKey: ["votes", sortOrder, voteId, isMobile],
    queryFn: ({ pageParam = 0 }) => getVotes(sortOrder, pageParam as number, voteId, isMobile),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });
};

export default useVotesQuery;
