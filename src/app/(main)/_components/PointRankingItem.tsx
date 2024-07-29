import { Tables } from "@/types/supabase";
import Image from "next/image";

type PointRankingItemProps = {
  ranking: Tables<"users">;
};

function PointRankingItem({ ranking }: PointRankingItemProps) {
  return (
    <li className="flex gap-2">
      <Image src={ranking.badge_url || ""} alt="badge" width={24} height={24} />
      <span>{ranking.nickname}</span>
      <span>{ranking.total_point}</span>
    </li>
  );
}

export default PointRankingItem;
