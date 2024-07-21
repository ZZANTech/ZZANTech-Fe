import BoardsPage from "../_components/BoardsPage";
import KnowhowContainer from "./_components/KnowhowContainer";

function KnowhowPage() {
  return (
    <BoardsPage
      title="짠 노하우를 공유해요!"
      description="특가 상품, 절약 노하우, 재테크 방법 짠-노하우를 공유해 보세요."
    >
      <KnowhowContainer />
    </BoardsPage>
  );
}

export default KnowhowPage;
