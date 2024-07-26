import { Tables } from "@/types/supabase";

export type TVotesResponse = {
  data: TVote[];
};

export type TVote = Tables<"vote_posts"> & {
  nickname?: Tables<"users">["nickname"];
  votes_count?: number;
  comments_count?: number;
};
