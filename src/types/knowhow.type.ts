import { Tables } from "@/types/supabase";

export type TKnowhowsResponse = {
  posts: TKnowhow[];
};

export type TKnowhow = Omit<Tables<"knowhow_posts">, "image_urls"> & {
  image_urls: string[];
  nickname?: Tables<"users">["nickname"];
  badge_url: Tables<"users">["badge_url"];
  likes_count?: number;
  comments_count?: number;
  total_count: number;
};

export type TKnowhowLikesCountResponse = {
  likeCount: number;
  isLiked: boolean;
};

export type TKnowhowComment = Tables<"knowhow_comments"> & {
  nickname?: Tables<"users">["nickname"];
  badge_url?: Tables<"users">["badge_url"];
};

export type TKnowhowCommentsResponse = {
  comments: TKnowhowComment[];
  totalCommentsCount: number;
  nextPage?: number | null;
};

export type TResponseStatus = {
  status: number;
  statusText: string;
};

export type TUpdateKnowhowLikeParams = {
  likeData: Partial<Tables<"knowhow_likes">>;
  likeCountData: TKnowhowLikesCountResponse;
};

export type TPreviousKnowhowsResponse = {
  posts: TKnowhow[];
  nextOffset: number;
  hasMore: boolean;
};

export type TPreviousKnowhowsData = {
  pageParams: number[];
  pages: TPreviousKnowhowsResponse[];
};
