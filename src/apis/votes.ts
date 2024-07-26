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
  const res = await fetch(`${BASE_URL}/api/votes/${voteId}`, { cache: "no-store" });
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
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "게시글 작성에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const vote = await res.json();
  return vote;
};

export const patchVote = async (updatedVote: Partial<Tables<"vote_posts">>) => {
  const res = await fetch(`${BASE_URL}/api/votes/${updatedVote.vote_postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedVote)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "게시글 수정에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const vote = await res.json();
  return vote;
};

export const deleteVote = async (voteId: Tables<"vote_posts">["vote_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/votes/${voteId}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "게시글 삭제에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const vote = await res.json();
  return vote;
};
