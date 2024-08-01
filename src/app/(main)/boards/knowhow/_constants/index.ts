export type TOption = {
  value: string;
  label: string;
};

export const ITEMS_PER_PAGE = 5;

export const SORT_LATEST = "latest";
export const SORT_POPULAR = "popular";
export const SORT_OPTIONS = [
  { value: SORT_LATEST, label: "최신 순" },
  { value: SORT_POPULAR, label: "좋아요 순" }
];

export const SEARCH_AUTHOR = "author";
export const SEARCH_TITLECONTENT = "titleContent";
export const SEARCH_OPTIONS = [
  { value: SEARCH_TITLECONTENT, label: "제목+내용" },
  { value: SEARCH_AUTHOR, label: "작성자" }
];

export const KNOWHOW = "knowhow";
export const VOTES = "votes";

export const MY_POSTS_FILTER_OPTION = [
  { value: VOTES, label: "짠-소비구경" },
  { value: KNOWHOW, label: "짠-노하우" }
];

export const GIFTS = "gifts";
export const CLAIM = "claim";

export const EXCHANGE_FILTER_OPTION = [
  { value: GIFTS, label: "기프티콘" },
  { value: CLAIM, label: "ㅁㄴㅇ상태" }
];

export const MAX_CONTENT_LENGTH = 1000;
