"use client";
import PointRankingItem from "@/app/(main)/_components/RightSection/PointRankingItem";
import usePointRankingsQuery from "@/stores/queries/usePointRankingsQuery";

function PointRankingList() {
  const { data: rankings } = usePointRankingsQuery();
  return <ul>{rankings?.map((ranking) => <PointRankingItem key={ranking.userId} ranking={ranking} />)}</ul>;
}

export default PointRankingList;
