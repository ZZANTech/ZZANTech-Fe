"use client";

import useVotesQuery from "@/stores/queries/useVotesQuery";
import Button from "@/components/Button/Button";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";

function VotesContainer() {
  const { data: votes, isLoading } = useVotesQuery();
  const { user } = useUserContext();
  const router = useRouter();

  const handleWriteClick = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/boards/votes/write");
    }
  };

  if (isLoading) {
    // 로딩 처리 어떻게 할 것?
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Button onClick={handleWriteClick}>글쓰기</Button>
      {/* 정렬 버튼 */}
      <VotesList votes={votes?.data} />
    </section>
  );
}

export default VotesContainer;
