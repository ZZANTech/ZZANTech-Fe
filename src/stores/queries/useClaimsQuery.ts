import { getClaims } from "@/apis/exchange";
import { Tables } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";

const useClaimsQuery = (userId: string) => {
  return useQuery({
    queryKey: ["claims", userId],
    queryFn: () => getClaims(userId)
    // enabled: !!userId
  });
};

export default useClaimsQuery;
