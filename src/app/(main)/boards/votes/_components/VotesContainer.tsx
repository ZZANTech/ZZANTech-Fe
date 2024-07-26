"use client";

import useVotesQuery from "@/stores/queries/useVotesQuery";
import Button from "@/components/Button/Button";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";

function VotesContainer() {
  const { data: votes, isLoading } = useVotesQuery();

  if (isLoading) {
    // 로딩 처리 어떻게 할 것?
    return <div>Loading...</div>;
  }
  return (
    <section>
      <Button href={"/boards/votes/write"}>새 글작성</Button>
      {/* 정렬 버튼 */}
      <VotesList votes={votes?.data} />
    </section>
  );
}

export default VotesContainer;
