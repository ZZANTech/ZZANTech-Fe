import VoteDescription from "@/app/(main)/boards/votes/_components/VoteDescription";
import VotesContainer from "@/app/(main)/boards/votes/_components/VotesContainer";
import { defaultOpenGraph } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 짠 소비구경",
  description: "다른 사람의 소비 내역을 구경하고 공유하며, 함께 좋은 소비인지 아쉬운 소비인지 평가해보세요.",
  openGraph: {
    ...defaultOpenGraph,
    title: "ZZAN - 짠 소비구경",
    url: "https://zzan-tech.com/boards/votes",
    description:
      "나의 알뜰한 소비를 평가받아보아요! 다른 사람의 소비도 평가하며 재미있게 절약을 실천하고, 포인트도 모아보세요!"
  }
};

function VotesPage() {
  return (
    <>
      <VoteDescription>
        <VotesContainer />
      </VoteDescription>
    </>
  );
}

export default VotesPage;
