import { useQuery } from "@tanstack/react-query";
import { TUser } from "@/types/user.type";
import { fetchUser } from "@/apis/auth";

const useUserQuery = () => {
  return useQuery<TUser | null>({
    queryKey: ["user"],
    queryFn: fetchUser
  });
};
export default useUserQuery;
