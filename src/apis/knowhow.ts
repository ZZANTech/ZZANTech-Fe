import { BASE_URL } from "@/constants";
import { TKnowhow } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";

export const getKnowhows = async (
  page: number,
  limit: number,
  sortOrder: string,
  selectedSearchOption: string,
  searchKeyword: string
) => {
  const res = await fetch(
    `${BASE_URL}/api/knowhow?page=${page}&limit=${limit}&sortOrder=${sortOrder}&searchOption=${selectedSearchOption}&search=${searchKeyword}`
  );
  const knowhows = await res.json();
  return knowhows;
};

export const getKnowhow = async (knowhowId: TKnowhow["knowhow_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${knowhowId}`, {
    cache: "no-store"
  });
  const knowhow = await res.json();
  const knowhowPost: TKnowhow = knowhow.post;
  return knowhowPost;
};

export const postKnowhow = async (newKnowhow: Partial<Tables<"knowhow_posts">>) => {
  const res = await fetch(`${BASE_URL}/api/knowhow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newKnowhow)
  });
  const knowhows = await res.json();
  return knowhows;
};

export const patchKnowhow = async (updatedKnowhow: Partial<Tables<"knowhow_posts">>) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${updatedKnowhow.knowhow_postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedKnowhow)
  });
  const knowhows = await res.json();
  return knowhows;
};
export const deleteKnowhow = async (knowhowId: Tables<"knowhow_posts">["knowhow_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${knowhowId}`, {
    method: "DELETE"
  });
  const knowhows = await res.json();
  return knowhows;
};

export const getKnowhowComments = async (knowhowId: TKnowhow["knowhow_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${knowhowId}/comments`);
  const data = await res.json();
  const comments = data.comments;
  return comments;
};

export const postKnowhowComment = async (newComment: Partial<Tables<"knowhow_comments">>) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${newComment.knowhow_post_id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newComment)
  });

  const data = await res.json();
  return data;
};

export const patchKnowhowComment = async (updatedComment: Partial<Tables<"knowhow_comments">>) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/comments/${updatedComment.knowhow_commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedComment)
  });

  const data = await res.json();
  return data;
};
export const deleteKnowhowComment = async (commentId: Tables<"knowhow_comments">["knowhow_commentId"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/comments/${commentId}`, {
    method: "DELETE"
  });

  const data = await res.json();
  return data;
};

export const uploadImages = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/image`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }
  const urls = await res.json();
  return urls;
};
