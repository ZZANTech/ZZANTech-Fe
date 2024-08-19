import VoteDescription from "@/app/(main)/boards/votes/_components/VoteDescription";
import VotesContainer from "@/app/(main)/boards/votes/_components/VotesContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 짠 소비구경",
  description: "다른 사람의 소비 내역을 구경하고 공유하며, 함께 좋은 소비인지 아쉬운 소비인지 평가해보세요."
};

function VotesPage() {
  return (
    <VoteDescription>
      <VotesContainer />
    </VoteDescription>
  );
}

export default VotesPage;
