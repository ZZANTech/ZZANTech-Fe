import BoardsPage from "../_components/BoardsPage";
import VotesContainer from "./_components/VotesContainer";

function VotesPage() {
  return (
    <div>
      <BoardsPage
        title="다른 사람의 소비를 구경해 보아요"
        description="소비 내역을 공유하고 함께 좋은 소비였는지 아쉬운 소비였는지 평가해 보아요"
      >
        <VotesContainer />
      </BoardsPage>
    </div>
  );
}

export default VotesPage;
