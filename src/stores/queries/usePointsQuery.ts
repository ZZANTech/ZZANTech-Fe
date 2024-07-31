import { getPointsDetail } from "@/apis/point";
import { TPointsResponse } from "@/types/point.type";
import { useQuery } from "@tanstack/react-query";

const usePointsQuery = (userId: string) => {
  console.log("usePointsQuery userId: ", userId);

  return useQuery<TPointsResponse, Error>({
    queryKey: ["points", { userId }],
    queryFn: () => getPointsDetail(userId),
    enabled: !!userId
  });
};

export default usePointsQuery;
