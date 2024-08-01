"use client";

import GiftList from "@/app/(main)/exchange/_components/GiftList";
import useGiftsQuery from "@/stores/queries/useGiftsQuery";

function GiftContainer() {
  const { data: gifts } = useGiftsQuery();
  return (
    <article>
      <h2>기프티콘~</h2>
      {gifts && <GiftList gifts={gifts} />}
    </article>
  );
}

export default GiftContainer;
