import { BASE_URL } from "@/constants";
import { TVotesResponse, TVoteWithNavigation } from "@/types/vote.type";
import { TVote } from "@/types/vote.type";
import { Tables } from "@/types/supabase";

export const getVotes = async (sortOrder: string, page: number) => {
  const res = await fetch(`${BASE_URL}/api/votes/posts?sortOrder=${sortOrder}&page=${page}`);
  const votes: TVotesResponse = await res.json();
  return votes;
};

export const getVote = async (voteId: number): Promise<TVoteWithNavigation> => {
  const res = await fetch(`${BASE_URL}/api/votes/${voteId}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch vote data");
  }
  const vote: TVoteWithNavigation = await res.json();
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

export const getVoteComments = async (voteId: TVote["vote_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/votes/${voteId}/comments`);
  const data = await res.json();
  const comments = data.comments;
  return comments;
};

export const postVoteComment = async (newComment: Partial<Tables<"vote_comments">>) => {
  const res = await fetch(`${BASE_URL}/api/votes/${newComment.vote_post_id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newComment)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "댓글 작성에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};

export const patchVoteComment = async (updatedComment: Partial<Tables<"vote_comments">>) => {
  const res = await fetch(`${BASE_URL}/api/votes/comments/${updatedComment.vote_commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedComment)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "댓글 수정에 실패했습니다.";
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data;
};

export const deleteVoteComment = async (commentId: Tables<"vote_comments">["vote_commentId"]) => {
  const res = await fetch(`${BASE_URL}/api/votes/comments/${commentId}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "댓글 삭제에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};

export const getVoteLikesData = async (voteId: TVote["vote_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/votes/${voteId}/like`);
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "해당 게시글의 투표 정보를 가져오는 데 실패했습니다";
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
