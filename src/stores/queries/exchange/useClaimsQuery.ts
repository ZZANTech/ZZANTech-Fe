import { getClaims } from "@/apis/exchange";
import { TClaimsResponse } from "@/types/exchange.type";
import { Tables } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";

const useClaimsQuery = (currentPage: number, itemsPerPage: number, userId: string) => {
  return useQuery<TClaimsResponse>({
    queryKey: ["claims", { userId }],
    queryFn: () => getClaims(currentPage, itemsPerPage, userId)
  });
};

export default useClaimsQuery;
