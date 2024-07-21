import { getKnowhows } from "@/apis/knowhow";
import { TKnowhowsResponse } from "@/types/knowhow.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useKnowhowsQuery = (
  page: number,
  limit: number,
  sortOrder: string,
  selectedSearchOption: string,
  searchKeyword: string
) => {
  return useQuery<TKnowhowsResponse, Error>({
    queryKey: ["knowhows", { page, limit, sortOrder, selectedSearchOption, searchKeyword }],
    queryFn: () => getKnowhows(page, limit, sortOrder, selectedSearchOption, searchKeyword),
    placeholderData: keepPreviousData
  });
};

export default useKnowhowsQuery;
