"use client";

import useTopKnowhowQuery from "@/stores/queries/useTopKnowhowQuery";

function TopKnowhows() {
  const { data } = useTopKnowhowQuery();
  data && console.log(data);
  return (
    <>
      <h3>Best 짠노하우</h3>
      <div>{data?.map((knowhow) => <li key={knowhow.knowhow_postId}>{knowhow.title}</li>)}</div>
    </>
  );
}

export default TopKnowhows;
