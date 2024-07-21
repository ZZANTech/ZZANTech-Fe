import { BASE_URL } from "@/constants";
import { TKnowhow } from "@/types/knowhow.type";

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

export const getKnowhow = async (knowhowId: TKnowhow["tip_post_id"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/posts/${knowhowId}`);
  console.log(res);
  const knowhow = await res.json();
  console.log(knowhow);
  return knowhow;
};
