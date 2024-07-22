import { BASE_URL } from "@/constants";

export const getVotes = async () => {
  const res = await fetch(`${BASE_URL}/api/votes/posts`);
  const votes = await res.json();
  return votes;
};
