import { Tables } from "@/types/supabase";
import React from "react";

type ClaimItemProps = {
  claim: Tables<"gift_claims">;
};

function ClaimItem({ claim }: ClaimItemProps) {
  return (
    <li>
      <div>{claim.gift_id}</div>
      <div>{claim.user_id}</div>
      <div>{claim.is_sent ? "Yes" : "No"}</div>
      <div>{claim.sent_at}</div>
    </li>
  );
}

export default ClaimItem;
