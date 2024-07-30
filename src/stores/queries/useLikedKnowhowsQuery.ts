import { getLikedKnowhows } from "@/apis/knowhow";
import { TKnowhow, TKnowhowsResponse } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useLikedKnowhowsQuery = (page: number, limit: number, userId: Tables<"users">["userId"]) => {
  return useQuery<TKnowhow[], Error>({
    queryKey: ["likedKnowhows", { page, limit, userId }],
    queryFn: () => getLikedKnowhows(userId, page, limit),
    placeholderData: keepPreviousData
  });
};

export default useLikedKnowhowsQuery;
