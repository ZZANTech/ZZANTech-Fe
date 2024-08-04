import { getKnowhow } from "@/apis/knowhow";
import { TKnowhow } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useKnowhowQuery = (knowhowId: TKnowhow["knowhow_postId"]) => {
  return useQuery({
    queryKey: ["knowhow", { knowhowId }],
    queryFn: () => getKnowhow(knowhowId)
  });
};

export default useKnowhowQuery;
