import { TVote } from "@/types/vote.type";
import { BASE_URL } from "@/constants";
import { Tables } from "@/types/supabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const getMyVotes = async (page: number, limit: number, userId: Tables<"users">["userId"]) => {
  const res = await fetch(`${BASE_URL}/api/votes/posts/my/${userId}?page=${page}&limit=${limit}`);
  const data = await res.json();
  const votes = data.posts;

  return votes;
};

const useMyVotesQuery = (page: number, limit: number, userId: Tables<"users">["userId"]) => {
  return useQuery<TVote[], Error>({
    queryKey: ["votes", { page, limit, userId }],
    queryFn: () => getMyVotes(page, limit, userId),
    placeholderData: keepPreviousData
  });
};

export default useMyVotesQuery;
