import { getKnowhowComments, getKnowhowLikesCount } from "@/apis/knowhow";
import { TKnowhowComment, TKnowhowLikesCountResponse } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useKnowhowLikesCountQuery = (knowhowId: number) => {
  return useQuery<TKnowhowLikesCountResponse, Error>({
    queryKey: ["knowhowLikes", { knowhowId }],
    queryFn: () => getKnowhowLikesCount(knowhowId)
  });
};

export default useKnowhowLikesCountQuery;
