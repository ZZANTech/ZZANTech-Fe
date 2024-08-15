import BoardDescription from "@/app/(main)/boards/_components/BoardDescription";
import VotesContainer from "@/app/(main)/boards/votes/_components/VotesContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 짠 소비구경",
  description: "다른 사람의 소비 내역을 구경하고 공유하며, 함께 좋은 소비인지 아쉬운 소비인지 평가해보세요."
};

function VotesPage() {
  return (
    <div className="w-[1120px] h-full flex-col justify-start items-start  inline-flex ">
      <BoardDescription
        title="다른 사람의 소비를 구경해 보아요"
        description="소비 내역을 공유하고 함께 좋은 소비였는지 아쉬운 소비였는지 평가해 보아요"
      >
        <VotesContainer />
      </BoardDescription>
    </div>
  );
}

export default VotesPage;
