import { Tables } from "./supabase";

export type TKnowhowsResponse = {
  posts: TKnowhow[];
  totalItems: number;
};

export type TKnowhow = Tables<"tip_posts"> & {
  nickname: Tables<"users">["nickname"];
  commentsCount: number;
};
