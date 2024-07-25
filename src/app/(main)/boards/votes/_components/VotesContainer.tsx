"use client";

import useVotesQuery from "@/stores/queries/useVotesQuery";
import Button from "@/components/Button/Button";
import VotesList from "./VotesList";

function VotesContainer() {
  const { data: votes } = useVotesQuery();
  return (
    <section>
      <Button href={"/boards/votes/write"}>새 글작성</Button>
      {/* 정렬 버튼 */}
      <VotesList votes={votes?.data} />
    </section>
  );
}

export default VotesContainer;
