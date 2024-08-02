import { formatTime } from "@/app/(main)/boards/_utils";
import { TClaim } from "@/types/exchange.type";
import { Tables } from "@/types/supabase";
import React from "react";

type ClaimItemProps = {
  claim: TClaim;
};

function ClaimItem({ claim }: ClaimItemProps) {
  const { formattedDate } = formatTime(claim.created_at);
  return (
    <li className="flex gap-2 w-full">
      <div className="text-info-red">{claim.gift_name}</div>
      <div className="text-blue-500">{claim.is_sent ? "완료" : "진행중"}</div>
      <div>{formattedDate}</div>
    </li>
  );
}

export default ClaimItem;
