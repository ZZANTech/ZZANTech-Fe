import { Tables } from "@/types/supabase";

export type TKnowhowsResponse = {
  posts: TKnowhow[];
};

export type TKnowhow = Omit<Tables<"knowhow_posts">, "image_urls"> & {
  image_urls: string[];
  nickname?: Tables<"users">["nickname"];
  likes_count?: number;
  comments_count?: number;
  total_count: number;
};

export type TKnowhowComment = Tables<"knowhow_comments"> & {
  nickname?: Tables<"users">["nickname"];
};

export type TResponseStatus = {
  status: number;
  statusText: string;
};
