import PointRankingList from "@/app/(main)/_components/RightSection/PointRankingList";
import Image from "next/image";

function PointRankingContainer() {
  return (
    <section>
      <div className="flex items-center">
        <Image src="/icons/trophy.png" alt="trophy" width={24} height={24} className="mr-3" />
        <h3 className="text-xl font-semibold">포인트 랭킹 순위</h3>
      </div>
      <PointRankingList />
    </section>
  );
}

export default PointRankingContainer;
