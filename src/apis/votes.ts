import { BASE_URL } from "@/constants";
import { TVotesResponse } from "@/types/vote.type";
import { TVote } from "@/types/vote.type";
import { Tables } from "@/types/supabase";

export const getVotes = async () => {
  const res = await fetch(`${BASE_URL}/api/votes/posts`);
  const votes: TVotesResponse = await res.json();
  return votes;
};

export const getVote = async (voteId: TVote["vote_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/votes/${voteId}`);
  const vote: TVote = await res.json();
  return vote;
};

export const postVote = async (newVote: Partial<Tables<"vote_posts">>) => {
  const res = await fetch(`${BASE_URL}/api/votes/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newVote)
  });
  const vote = await res.json();
  return vote;
};
