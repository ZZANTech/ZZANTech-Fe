import { BASE_URL } from "@/constants";
import { TKnowhow } from "@/types/knowhow.type";
import { createClient } from "@/utils/supabase/server";

export const getKnowhows = async (
  page: number,
  limit: number,
  sortOrder: string,
  selectedSearchOption: string,
  searchKeyword: string
) => {
  const res = await fetch(
    `${BASE_URL}/api/knowhow/posts?page=${page}&limit=${limit}&sortOrder=${sortOrder}&searchOption=${selectedSearchOption}&search=${searchKeyword}`
  );
  const knowhows = await res.json();
  return knowhows;
};

export const getKnowhow = async (knowhowId: TKnowhow["knowhow_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/posts/${knowhowId}`);
  const knowhow = await res.json();
  const knowhowPost: TKnowhow = knowhow.post;
  return knowhowPost;
};

export const getKnowhowComments = async (knowhowId: TKnowhow["knowhow_postId"]) => {
  console.log(knowhowId);
  const res = await fetch(`${BASE_URL}/api/knowhow/comments/${knowhowId}`);
  const data = await res.json();
  const comments = data.comments;
  return comments;
};
