import { useQuery } from "@tanstack/react-query";
import { getPointsDetail } from "@/apis/point";
import { Tables } from "@/types/supabase";
import { TPointResponse } from "@/types/point.type";

const usePointsQuery = (page: number, limit: number, userId: Tables<"users">["userId"]) => {
  return useQuery<TPointResponse, Error>({
    queryKey: ["points", { page, limit, userId }],
    queryFn: () => getPointsDetail(userId, page, limit),
    enabled: !!userId
  });
};

export default usePointsQuery;
