import { getTopKnowhows } from "@/apis/knowhow";
import { TKnowhowsResponse } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useTopKnowhowQuery = () => {
  return useQuery<TKnowhowsResponse, Error>({
    queryKey: ["topKnowhows"],
    queryFn: getTopKnowhows
  });
};

export default useTopKnowhowQuery;
