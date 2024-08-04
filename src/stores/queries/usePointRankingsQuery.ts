import { getRanking } from "@/apis/ranking";
import { Tables } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";

const usePointRankingsQuery = () => {
  return useQuery<Tables<"users">[], Error>({
    queryKey: ["pointRankings"],
    queryFn: getRanking
  });
};

export default usePointRankingsQuery;
