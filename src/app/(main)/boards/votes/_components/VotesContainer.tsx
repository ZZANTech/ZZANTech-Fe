"use client";

import useVotesQuery from "@/store/queries/useVotesQuery";
import VotesList from "./VotesList";

function VotesContainer() {
  const { data: votes } = useVotesQuery();
  return (
    <section>
      {/* 글쓰기 버튼 */}
      {/* 정렬 버튼 */}
      <VotesList votes={votes?.data} />
    </section>
  );
}

export default VotesContainer;
