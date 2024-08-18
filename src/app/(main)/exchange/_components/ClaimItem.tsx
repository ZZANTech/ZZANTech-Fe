import { formatTime } from "@/app/(main)/boards/_utils";
import Button from "@/components/Button";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import { TClaim } from "@/types/exchange.type";
import React from "react";

type ClaimItemProps = {
  claim: TClaim;
};

function ClaimItem({ claim }: ClaimItemProps) {
  const { isWideScreen } = useIsWideScreen();
  const { formattedDate } = formatTime(claim.created_at);
  return (
    <li className="flex items-center justify-between gap-2 w-full text-sm   text-[#000]">
      <div className="md:text-base w-[65px] md:w-auto">{formattedDate}</div>
      <div className="md:text-base text-center w-[125px] md:w-auto">{claim.gift_name}</div>
      <Button
        className="p-0 cursor-default text-gray-900"
        size={isWideScreen ? "medium" : "small"}
        variant={claim.is_sent ? "green" : "yellow"}
      >
        {claim.is_sent ? "교환 완료" : "승인 대기"}
      </Button>
    </li>
  );
}

export default ClaimItem;
