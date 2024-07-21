import { getKnowhows } from "@/apis/knowhow";
import { TKnowhow, TKnowhowsResponse } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useKnowhowsQuery = (
  page: number,
  limit: number,
  sortOrder: string,
  selectedSearchOption: string,
  searchKeyword: string
) => {
  console.log(selectedSearchOption);
  console.log(searchKeyword);
  return useQuery<TKnowhowsResponse, Error>({
    queryKey: ["knowhows", { page, limit, sortOrder, selectedSearchOption, searchKeyword }],
    queryFn: () => getKnowhows(page, limit, sortOrder, selectedSearchOption, searchKeyword)
  });
};

export default useKnowhowsQuery;
