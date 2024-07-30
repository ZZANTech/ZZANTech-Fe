import { Tables } from "@/types/supabase";

export type TVotesResponse = {
  data: TVote[];
  nextPage?: number | null;
};

export type TVote = Tables<"vote_posts"> & {
  nickname?: Tables<"users">["nickname"];
  votes_count?: number;
  comments_count?: number;
  total_count?: number;
};

export type TVoteLikeCountsResponse = {
  totalVoteCount: number;
  upvoteCount: number;
  downvoteCount: number;
  userLikeStatus: boolean | null;
};

export type TVoteWithNavigation = TVote & {
  prevVoteId?: number | null;
  nextVoteId?: number | null;
};

export type TVoteComment = Tables<"vote_comments"> & {
  nickname?: Tables<"users">["nickname"];
};
