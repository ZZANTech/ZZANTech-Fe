export const getKnowhows = async (page: number, limit: number, sortOrder: string) => {
  const res = await fetch(`http://localhost:3000/api/knowhow/posts?page=${page}&limit=${limit}&sortOrder=${sortOrder}`);
  const knowhows = await res.json();
  console.log(knowhows);
  return knowhows;
};
