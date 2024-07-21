export const getKnowhows = async (
  page: number,
  limit: number,
  sortOrder: string,
  selectedSearchOption: string,
  searchKeyword: string
) => {
  console.log(selectedSearchOption);
  console.log(searchKeyword);
  const res = await fetch(
    `http://localhost:3000/api/knowhow/posts?page=${page}&limit=${limit}&sortOrder=${sortOrder}&searchOption=${selectedSearchOption}&search=${searchKeyword}`
  );
  const knowhows = await res.json();
  console.log(knowhows);
  return knowhows;
};
