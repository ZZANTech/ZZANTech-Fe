"use client";
import PointRankingItem from "@/app/(main)/_components/RightSection/PointRankingItem";
import SkeletonPointRankingItem from "@/app/(main)/_components/RightSection/SkeletonPointRankingItem";
import usePointRankingsQuery from "@/stores/queries/usePointRankingsQuery";

function PointRankingList() {
  const { data: rankings, isPending } = usePointRankingsQuery();

  if (isPending) {
    return (
      <ul className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonPointRankingItem key={index} />
        ))}
      </ul>
    );
  }
  return (
    <ul className="space-y-3">
      {rankings?.map((ranking, index) => <PointRankingItem key={ranking.userId} index={index} ranking={ranking} />)}
    </ul>
  );
}

export default PointRankingList;
