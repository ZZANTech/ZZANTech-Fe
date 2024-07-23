import { getKnowhowComments } from "@/apis/knowhow";
import { TKnowhowComment } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

const useKnowhowCommentsQuery = (knowhowId: number) => {
  return useQuery<TKnowhowComment[], Error>({
    queryKey: ["knowhowComments", { knowhowId }],
    queryFn: () => getKnowhowComments(knowhowId)
  });
};

export default useKnowhowCommentsQuery;
