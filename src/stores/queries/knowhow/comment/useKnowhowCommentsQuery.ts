import { getKnowhowComments } from "@/apis/knowhow";
import { TKnowhowCommentsResponse } from "@/types/knowhow.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const useKnowhowCommentsQuery = (knowhowId: number, pageSize: number, enabled: boolean) => {
  return useInfiniteQuery<TKnowhowCommentsResponse, Error>({
    queryKey: ["knowhowComments", { knowhowId }],
    queryFn: ({ pageParam = 1 }) => getKnowhowComments(knowhowId, pageParam as number, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    enabled
  });
};

export default useKnowhowCommentsQuery;
