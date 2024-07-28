import { getVotes } from "@/apis/votes";
import { TVotesResponse } from "@/types/vote.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const useVotesQuery = (sortOrder: string) => {
  return useInfiniteQuery<TVotesResponse, Error>({
    queryKey: ["votes", sortOrder],
    queryFn: ({ pageParam = 0 }) => getVotes(sortOrder, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });
};

export default useVotesQuery;
