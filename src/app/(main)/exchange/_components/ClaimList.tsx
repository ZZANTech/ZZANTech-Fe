import ClaimItem from "@/app/(main)/exchange/_components/ClaimItem";
import { Tables } from "@/types/supabase";

type ClaimListProps = {
  claims: Tables<"gift_claims">[];
};
function ClaimList({ claims }: ClaimListProps) {
  return (
    <ul>
      {claims.map((claim) => (
        <ClaimItem key={claim.gift_id} claim={claim} />
      ))}
    </ul>
  );
}

export default ClaimList;
