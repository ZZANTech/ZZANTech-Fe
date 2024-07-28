"use client";

import useTopVotesQuery from "@/stores/queries/useTopVotesQuery";

function TopVotes() {
  const { data } = useTopVotesQuery();
  data && console.log(data);
  return <></>;
}

export default TopVotes;
