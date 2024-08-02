"use client";

import GiftList from "@/app/(main)/exchange/_components/GiftList";
import { Tables } from "@/types/supabase";

function GiftContainer({ gifts }: { gifts: Tables<"gifts">[] }) {
  return (
    <article>
      <h2>기프티콘~</h2>
      {gifts && <GiftList gifts={gifts} />}
    </article>
  );
}

export default GiftContainer;
