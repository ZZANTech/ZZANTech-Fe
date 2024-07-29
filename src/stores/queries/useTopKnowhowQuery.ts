import { getTopKnowhows } from "@/apis/knowhow";
import { TKnowhow, TKnowhowsResponse } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useTopKnowhowQuery = () => {
  return useQuery<TKnowhow[], Error>({
    queryKey: ["topKnowhows"],
    queryFn: getTopKnowhows
  });
};

export default useTopKnowhowQuery;
