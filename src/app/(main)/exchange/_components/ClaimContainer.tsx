"use client";

import ClaimList from "@/app/(main)/exchange/_components/ClaimList";
import { useUserContext } from "@/provider/contexts/UserContext";
import useClaimsQuery from "@/stores/queries/useClaimsQuery";

function ClaimContainer() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";
  const { data: claims } = useClaimsQuery(userId);
  claims && console.log(claims);
  return <article>{claims && <ClaimList claims={claims} />}</article>;
}

export default ClaimContainer;
