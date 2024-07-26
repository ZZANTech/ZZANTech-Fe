import VotesContainer from "@/app/(main)/boards/votes/_components/VotesContainer";

function VotesPage() {
  return (
    <div>
      <BoardsDescription
        title="다른 사람의 소비를 구경해 보아요"
        description="소비 내역을 공유하고 함께 좋은 소비였는지 아쉬운 소비였는지 평가해 보아요"
      >
        <VotesContainer />
      </BoardsDescription>
    </div>
  );
}

export default VotesPage;
