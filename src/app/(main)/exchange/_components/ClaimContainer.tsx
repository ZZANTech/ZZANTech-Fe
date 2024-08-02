"use client";

import ClaimList from "@/app/(main)/exchange/_components/ClaimList";
import { useUserContext } from "@/provider/contexts/UserContext";
import useClaimsQuery from "@/stores/queries/useClaimsQuery";

function ClaimContainer() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";
  const { data: claims } = useClaimsQuery(userId);
  return (
    <article className="w-full">
      <h2>~상태</h2>
      {claims && <ClaimList claims={claims} />}
    </article>
  );
}

export default ClaimContainer;
