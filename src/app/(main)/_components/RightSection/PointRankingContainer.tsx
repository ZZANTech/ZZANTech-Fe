import PointRankingList from "@/app/(main)/_components/RightSection/PointRankingList";
import Image from "next/image";

function PointRankingContainer() {
  return (
    <section>
      <div className="flex items-center mb-4">
        <Image src="/icons/trophy.png" alt="trophy" width={24} height={24} className="mr-3" />
        <h3 className="text-xl font-semibold">오늘의 포인트 랭킹</h3>
      </div>
      <div>
        <PointRankingList />
      </div>
    </section>
  );
}

export default PointRankingContainer;
