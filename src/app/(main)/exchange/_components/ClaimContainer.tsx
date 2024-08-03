"use client";

import SmallLoadingSpinner from "@/components/Loading/SmallLoadinSpinner";
import { useUserContext } from "@/provider/contexts/UserContext";
import useClaimsQuery from "@/stores/queries/useClaimsQuery";
import dynamic from "next/dynamic";

const ClaimList = dynamic(() => import("@/app/(main)/exchange/_components/ClaimList"), {
  loading: () => (
    <div className="mt-40">
      <SmallLoadingSpinner />
    </div>
  ),
  ssr: false
});

function ClaimContainer() {
  const { user } = useUserContext();
  const userId = user?.userId ?? "";
  const { data: claims } = useClaimsQuery(userId);
  return (
    <article className=" max-w-[755px] w-full">
      <div className="flex justify-between text-[#000] font-semibold">
        <span className="w-[87px] h-6 text-center">신청날짜</span>
        <span className="w-[87px] h-6 text-center">상품명</span>
        <span className="w-[87px] h-6 text-center">진행 상태</span>
      </div>
      <div className="mt-[22px] w-full h-[1px] bg-basic"></div>
      {claims && <ClaimList claims={claims} />}
    </article>
  );
}

export default ClaimContainer;
