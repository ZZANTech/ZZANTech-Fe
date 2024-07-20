import { getKnowhows } from "@/apis/knowhow";
import { TKnowhow, TKnowhowsResponse } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useKnowhowsQuery = (page: number, limit: number, sortOrder: string) => {
  return useQuery<TKnowhowsResponse, Error>({
    queryKey: ["knowhows", { page, limit, sortOrder }],
    queryFn: () => getKnowhows(page, limit, sortOrder)
  });
};

export default useKnowhowsQuery;
