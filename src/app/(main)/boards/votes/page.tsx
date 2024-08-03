import BoardDescription from "@/app/(main)/boards/_components/BoardDescription";
import VotesContainer from "@/app/(main)/boards/votes/_components/VotesContainer";

function VotesPage() {
  return (
    <div className="w-[1120px] h-[2296px] flex-col justify-start items-start gap-6 inline-flex">
      <BoardDescription
        title="다른 사람의 소비를 구경해 보아요"
        description="소비 내역을 공유하고 함께 좋은 소비였는지 아쉬운 소비였는지 평가해 보아요"
        board="vote"
      >
        <VotesContainer />
      </BoardDescription>
    </div>
  );
}

export default VotesPage;
