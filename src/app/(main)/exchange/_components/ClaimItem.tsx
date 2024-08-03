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
    <li className="flex justify-between gap-2 w-full  text-[#000]">
      <div>{formattedDate}</div>
      <div>{claim.gift_name}</div>
      <div
        className={`flex rounded-[50px] w-[100px] px-[10px] py-2 h-9 text-sm justify-center items-center text-basic ${claim.is_sent ? "bg-info-green" : "bg-info-yellow"}`}
      >
        {claim.is_sent ? "교환 완료" : "승인 대기"}
      </div>
    </li>
  );
}

export default ClaimItem;
