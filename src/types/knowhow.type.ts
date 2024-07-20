import { Tables } from "./supabase";

export type TKnowhow = Tables<"tip_posts"> & {
  nickname: Tables<"users">["nickname"];
  likesCount: number;
  commentsCount: number;
};
