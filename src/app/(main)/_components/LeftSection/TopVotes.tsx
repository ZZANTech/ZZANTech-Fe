"use client";

import useTopVotesQuery from "@/stores/queries/useTopVotesQuery";

function TopVotes() {
  const { data } = useTopVotesQuery();
  data && console.log(data);
  return (
    <>
      <h3>이번주 소비왕</h3>
      <div>{data?.map((vote) => <li key={vote.vote_postId}>{vote.title}</li>)}</div>
    </>
  );
}

export default TopVotes;
