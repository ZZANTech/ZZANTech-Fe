import { BASE_URL } from "@/constants";
import { TVotesResponse } from "@/types/vote.type";

export const getVotes = async () => {
  const res = await fetch(`${BASE_URL}/api/votes/posts`);
  const votes: TVotesResponse = await res.json();
  return votes;
};
