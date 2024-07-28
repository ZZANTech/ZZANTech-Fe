"use client";

import useTopKnowhowQuery from "@/stores/queries/useTopKnowhowQuery";

function TopKnowhows() {
  const { data } = useTopKnowhowQuery();
  data && console.log(data);
  return <></>;
}

export default TopKnowhows;
