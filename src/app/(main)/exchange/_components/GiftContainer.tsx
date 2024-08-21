"use client";

import GiftList from "@/app/(main)/exchange/_components/GiftList";
import useGiftsQuery from "@/stores/queries/exchange/useGiftsQuery";

function GiftContainer() {
  const { data: gifts } = useGiftsQuery();
  return <article>{gifts && <GiftList gifts={gifts} />}</article>;
}

export default GiftContainer;
