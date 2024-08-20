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

export const getTopKnowhows = async () => {
  const res = await fetch(`${BASE_URL}/api/knowhow/top`);
  const data = await res.json();
  const knowhows = data.posts;

  return knowhows;
};

export const getMyKnowhows = async (userId: Tables<"users">["userId"], page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/my/${userId}?page=${page}&limit=${limit}`);
  const data = await res.json();
  const knowhows = data.posts;

  return knowhows;
};
export const getLikedKnowhows = async (userId: Tables<"users">["userId"], page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/my/like/${userId}?page=${page}&limit=${limit}`);
  const data = await res.json();
  const knowhows = data.posts;

  return knowhows;
};

export const getPreviousKnowhows = async (
  knowhowId: Tables<"knowhow_posts">["knowhow_postId"],
  limit: number,
  offset: number
) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${knowhowId}/previous?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  const prevKnowhows = data;

  return prevKnowhows;
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
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "게시글 작성에 실패했습니다.";
    throw new Error(errorMessage);
  }
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
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "게시글 수정에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const knowhows = await res.json();
  return knowhows;
};
export const deleteKnowhow = async (knowhowId: Tables<"knowhow_posts">["knowhow_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${knowhowId}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "게시글 삭제에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const knowhows = await res.json();
  return knowhows;
};

export const getKnowhowComments = async (knowhowId: TKnowhow["knowhow_postId"], page: number, pageSize: number) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${knowhowId}/comments?page=${page}&pageSize=${pageSize}`);
  const data = await res.json();

  const nextPage = data.comments.length === pageSize ? page + 1 : null;

  return {
    comments: data.comments,
    totalCommentsCount: data.totalCommentsCount,
    nextPage: nextPage
  };
};

export const postKnowhowComment = async (newComment: Partial<Tables<"knowhow_comments">>) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${newComment.knowhow_post_id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newComment)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "댓글 작성에 실패했습니다.";
    throw new Error(errorMessage);
  }

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
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "댓글 수정에 실패했습니다.";
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data;
};
export const deleteKnowhowComment = async (commentId: Tables<"knowhow_comments">["knowhow_commentId"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/comments/${commentId}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    const errorData = await res.json();

    const errorMessage = errorData.error || "댓글 삭제에 실패했습니다.";
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};

export const getKnowhowLikesCount = async (knowhowId: TKnowhow["knowhow_postId"]) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${knowhowId}/like`);
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "좋아요 업데이트에 실패했습니다";
    throw new Error(errorMessage);
  }
  const data = await res.json();

  return data;
};

export const postKnowhowLike = async (likeData: Partial<Tables<"knowhow_likes">>) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${likeData.knowhow_post_id}/like`, {
    method: "POST",
    body: JSON.stringify(likeData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "좋아요 업데이트에 실패했습니다";
    throw new Error(errorMessage);
  }
  const data = await res.json();
  return data;
};
export const deleteKnowhowLike = async (likeData: Partial<Tables<"knowhow_likes">>) => {
  const res = await fetch(`${BASE_URL}/api/knowhow/${likeData.knowhow_post_id}/like`, {
    method: "DELETE",
    body: JSON.stringify(likeData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || "좋아요 업데이트에 실패했습니다";

    throw new Error(errorMessage);
  }
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
