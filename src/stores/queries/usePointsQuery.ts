import { useQuery } from "@tanstack/react-query";
import { TPoint } from "@/types/point.type";
import { getPointsDetail } from "@/apis/point";

const usePointsQuery = (userId: string) => {
  return useQuery<TPoint[], Error>({
    queryKey: ["points", { userId }],
    queryFn: () => getPointsDetail(userId),
    enabled: !!userId
  });
};

export default usePointsQuery;
