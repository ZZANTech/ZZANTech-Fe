import { getKnowhows } from "@/apis/knowhow";
import { TKnowhow } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useKnowhowsQuery = () => {
  return useQuery<TKnowhow[], Error>({
    queryKey: ["knowhows"],
    queryFn: getKnowhows
  });
};

export default useKnowhowsQuery;
