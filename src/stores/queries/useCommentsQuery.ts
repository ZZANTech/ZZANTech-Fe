import { getKnowhowComments } from "@/apis/knowhow";
import { TKnowhowComment } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useCommentsQuery = (knowhowId: number) => {
  return useQuery<TKnowhowComment[], Error>({
    queryKey: ["knowhowComments", { knowhowId }],
    queryFn: () => getKnowhowComments(knowhowId)
  });
};

export default useCommentsQuery;
