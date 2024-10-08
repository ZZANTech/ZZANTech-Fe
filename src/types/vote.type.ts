import { Tables } from "@/types/supabase";

export type TVotesResponse = {
  data: TVote[];
  nextPage?: number | null;
};

export type TVote = Tables<"vote_posts"> & {
  nickname?: Tables<"users">["nickname"];
  badge_url?: Tables<"users">["badge_url"];
  votes_count?: number;
  comments_count?: number;
  total_count?: number;
};

export type TVoteLikeCountsResponse = {
  totalVoteCount: number;
  upvoteCount: number;
  downvoteCount: number;
  userLikeStatus: "up_vote" | "down_vote" | null;
};

export type TVoteWithNavigation = TVote & {
  prevVoteId?: number | null;
  nextVoteId?: number | null;
};

export type TVoteComment = Tables<"vote_comments"> & {
  nickname?: Tables<"users">["nickname"];
  badge_url?: Tables<"users">["badge_url"];
};

export type TVoteCommentsResponse = {
  comments: TVoteComment[];
  totalCommentsCount: number;
  nextPage?: number | null;
};
