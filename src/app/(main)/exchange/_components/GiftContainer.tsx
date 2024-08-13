"use client";

import GiftList from "@/app/(main)/exchange/_components/GiftList";
import useGiftsQuery from "@/stores/queries/exchange/useGiftsQuery";

function GiftContainer() {
  const { data: gifts, isPending } = useGiftsQuery();
  return (
    <article>
      {gifts && <GiftList gifts={gifts} />}
      {isPending && <div className="bg-red-200 h-[1708px]"></div>}
    </article>
  );
}

export default GiftContainer;
