import GiftItem from "@/app/(main)/exchange/_components/GiftItem";
import { Tables } from "@/types/supabase";

type GiftListProps = {
  gifts: Tables<"gifts">[];
};

function GiftList({ gifts }: GiftListProps) {
  return (
    <ul
      className="
    grid grid-cols-2 gap-4 gap-y-6 h-full
    md:grid-cols-3 md:gap-x-[15px] md:gap-y-8
    lg:grid-cols-4
    "
    >
      {gifts.map((gift) => (
        <GiftItem key={gift.giftId} gift={gift} />
      ))}
    </ul>
  );
}

export default GiftList;
