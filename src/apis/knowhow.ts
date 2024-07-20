export const getKnowhows = async () => {
  const res = await fetch(`http://localhost:3000/api/knowhow/posts`);
  const knowhows = await res.json();
  console.log(knowhows);
  return knowhows;
};
