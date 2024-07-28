import { getVotes } from "@/apis/votes";
import { TVotesResponse } from "@/types/vote.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useVotesQuery = (sortOrder: string) => {
  return useQuery<TVotesResponse, Error>({
    queryKey: ["votes", sortOrder],
    queryFn: () => getVotes(sortOrder),
    placeholderData: keepPreviousData
  });
};

export default useVotesQuery;
