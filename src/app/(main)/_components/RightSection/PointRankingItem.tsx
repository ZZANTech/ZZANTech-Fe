import { Tables } from "@/types/supabase";
import Image from "next/image";

type PointRankingItemProps = {
  ranking: Tables<"users">;
  index: number;
};

const getRankText = (index: number) => {
  switch (index) {
    case 0:
      return "1위";
    case 1:
      return "2위";
    case 2:
      return "3위";
    case 3:
      return "4위";
    case 4:
      return "5위";
    default:
      return `${index + 1}위`;
  }
};
const getRankClass = (index: number) => {
  return index === 0 ? "bg-point text-white" : "bg-gray-900 text-white";
};

function PointRankingItem({ ranking, index }: PointRankingItemProps) {
  return (
    <li className="flex items-center justify-between min-w-full border rounded-xl mb-2 px-7 py-[6px] bg-[#F3F3F3] border-[#191A23] shadow-[0px_2px_0px_0px_#191A23]">
      <div className="flex items-center">
        <div className={`flex items-center justify-center mr-4 w-10 h-6 ${getRankClass(index)} rounded-[100px]`}>
          <span>{getRankText(index)}</span>
        </div>
        <div className="flex items-center">
          <Image src={ranking.badge_url || ""} alt="badge" width={24} height={24} className="mr-2" />
          <span className="text-sm text-[#262626]">{ranking.nickname}</span>
        </div>
      </div>
      <div className="ml-auto px-7 py-3">
        <span className="text-sm text-[#262626]">{ranking.total_point} Point</span>
      </div>
    </li>
  );
}

export default PointRankingItem;
