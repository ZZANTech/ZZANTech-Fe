import { getKnowhows, getMyKnowhows } from "@/apis/knowhow";
import { TKnowhow, TKnowhowsResponse } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useMyKnowhowsQuery = (page: number, limit: number, userId: Tables<"users">["userId"]) => {
  return useQuery<TKnowhow[], Error>({
    queryKey: ["knowhows", { page, limit, userId }],
    queryFn: () => getMyKnowhows(userId, page, limit),
    placeholderData: keepPreviousData
  });
};

export default useMyKnowhowsQuery;
