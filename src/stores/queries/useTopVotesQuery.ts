import { BASE_URL } from "@/constants";
import { TKnowhowLikesCountResponse } from "@/types/knowhow.type";
import { useQuery } from "@tanstack/react-query";

export const getTopVotes = async () => {
  const res = await fetch(`${BASE_URL}/api/votes/posts/top`);
  const data = await res.json();
  const votes = data.posts;

  return votes;
};

const useTopVotesQuery = () => {
  return useQuery<TKnowhowLikesCountResponse, Error>({
    queryKey: ["topVotes"],
    queryFn: getTopVotes
  });
};

export default useTopVotesQuery;
