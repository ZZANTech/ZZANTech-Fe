import { useInfiniteQuery } from "@tanstack/react-query";
import { TKnowhow, TPreviousKnowhowsData, TPreviousKnowhowsResponse } from "@/types/knowhow.type";
import { getPreviousKnowhows } from "@/apis/knowhow";

const usePreviousKnowhowsQuery = (knowhowId: TKnowhow["knowhow_postId"], limit: number) => {
  return useInfiniteQuery<
    TPreviousKnowhowsResponse,
    Error,
    TPreviousKnowhowsData,
    [string, { knowhowId: TKnowhow["knowhow_postId"]; limit: number }]
  >({
    queryKey: ["prevKnowhows", { knowhowId, limit }],
    queryFn: ({ pageParam = 0 }) => getPreviousKnowhows(knowhowId, limit, pageParam as number),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextOffset : undefined),
    initialPageParam: 0
  });
};

export default usePreviousKnowhowsQuery;
