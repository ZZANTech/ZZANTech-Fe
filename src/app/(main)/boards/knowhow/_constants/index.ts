export type TOption = {
  value: string;
  label: string;
};

export const ITEMS_PER_PAGE = 5;

export const SORT_LATEST = "latest";
export const SORT_POPULAR = "popular";
export const SORT_OPTIONS = [
  { value: SORT_LATEST, label: "최신순" },
  { value: SORT_POPULAR, label: "좋아요순" }
];

export const SEARCH_AUTHOR = "author";
export const SEARCH_TITLECONTENT = "titleContent";
export const SEARCH_OPTIONS = [
  { value: SEARCH_TITLECONTENT, label: "제목+내용" },
  { value: SEARCH_AUTHOR, label: "작성자" }
];

export const MAX_CONTENT_LENGTH = 1000;
