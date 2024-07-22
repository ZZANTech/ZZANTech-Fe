import { Tables } from "./supabase";

export type TVotesResponse = {
  posts: TVote[];
};

export type TVote = Tables<"vote_posts"> & {
  nickname: Tables<"users">["nickname"];
  votes_count: number;
  comments_count: number;
};
