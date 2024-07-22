import { getVotes } from "@/apis/votes";
import { TVotesResponse } from "@/types/vote.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useVotesQuery = () => {
  return useQuery<TVotesResponse>({
    queryKey: ["votes"],
    queryFn: () => getVotes(),
    placeholderData: keepPreviousData
  });
};

export default useVotesQuery;
