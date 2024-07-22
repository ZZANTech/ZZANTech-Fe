import { Tables } from "./supabase";

export type TKnowhowsResponse = {
  posts: TKnowhow[];
  totalItems: number;
};

export type TKnowhow = Tables<"knowhow_posts"> & {
  nickname: Tables<"users">["nickname"];
  likes_count: number;
  comments_count: number;
};
