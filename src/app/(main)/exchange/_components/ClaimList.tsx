import ClaimItem from "@/app/(main)/exchange/_components/ClaimItem";
import { TClaim } from "@/types/exchange.type";

type ClaimListProps = {
  claims: TClaim[];
};
function ClaimList({ claims }: ClaimListProps) {
  return (
    <ul className="flex flex-col gap-7 mt-8 min-h-40">
      {claims.map((claim) => (
        <ClaimItem key={claim.gift_id} claim={claim} />
      ))}
    </ul>
  );
}

export default ClaimList;
