"use client";
import PointRankingItem from "@/app/(main)/_components/RightSection/PointRankingItem";
import usePointRankingsQuery from "@/stores/queries/usePointRankingsQuery";

function PointRankingList() {
  const { data: rankings } = usePointRankingsQuery();
  return (
    <ul className="space-y-3">
      {rankings?.map((ranking, index) => <PointRankingItem key={ranking.userId} index={index} ranking={ranking} />)}
    </ul>
  );
}

export default PointRankingList;
