import ClaimItem from "@/app/(main)/exchange/_components/ClaimItem";
import { TClaim } from "@/types/exchange.type";
import { Tables } from "@/types/supabase";

type ClaimListProps = {
  claims: TClaim[];
};
function ClaimList({ claims }: ClaimListProps) {
  return (
    <ul className="">
      {claims.map((claim) => (
        <ClaimItem key={claim.gift_id} claim={claim} />
      ))}
    </ul>
  );
}

export default ClaimList;
