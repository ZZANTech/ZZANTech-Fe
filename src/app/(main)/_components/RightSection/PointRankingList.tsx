"use client";
import PointRankingItem from "@/app/(main)/_components/RightSection/PointRankingItem";
import SkeletonPointRankingItem from "@/app/(main)/_components/RightSection/SkeletonPointRankingItem";
import usePointRankingsQuery from "@/stores/queries/usePointRankingsQuery";

function PointRankingList() {
  const { data: rankings, isPending } = usePointRankingsQuery();

  return (
    <ul className="space-y-[10px] lg:space-y-3">
      {isPending
        ? Array.from({ length: 5 }).map((_, index) => <SkeletonPointRankingItem key={index} index={index} />)
        : rankings?.map((ranking, index) => <PointRankingItem key={ranking.userId} index={index} ranking={ranking} />)}
    </ul>
  );
}

export default PointRankingList;
