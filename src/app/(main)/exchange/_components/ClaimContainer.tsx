"use client";

import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import ClaimList from "@/app/(main)/exchange/_components/ClaimList";
import { ITEMS_PER_PAGE } from "@/app/(main)/exchange/_constants";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";
import FlyingTikkle from "@/components/Loading/FlyingTikkle";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import SmallLoadingSpinner from "@/components/Loading/SmallLoadinSpinner";
import useAlertModal from "@/hooks/useAlertModal";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import usePagination from "@/hooks/usePagination";
import { useUserContext } from "@/provider/contexts/UserContext";
import useClaimsQuery from "@/stores/queries/exchange/useClaimsQuery";

function ClaimContainer() {
  const { isWideScreen } = useIsWideScreen();
  const { user } = useUserContext();
  const { currentPage, handlePageChange } = usePagination();
  const { displayLoginAlert } = useAlertModal();
  const userId = user?.userId ?? "";
  const { data: claims, isPending } = useClaimsQuery(currentPage, ITEMS_PER_PAGE, userId);
  console.log(claims);
  const totalItems = claims?.totalCount ?? 0;
  console.log(totalItems);
  return (
    <article className="w-full md:max-w-[778px] ">
      <div className="flex h-[47px] justify-between border-b mb-[22px] md:mb-8 border-b-gray-900 text-[#000] font-semibold">
        <span className="   w-[87px] h-6 text-center">신청날짜</span>
        <span className="  w-[94px] md:w-[87px] text-center md:text-start h-6 ">상품명</span>
        <span className="  w-[104px] md:w-[87px] h-6 text-center md:text-start ">진행 상태</span>
      </div>

      {isPending ? (
        <FlyingTikkle />
      ) : claims && claims.data.length > 0 ? (
        <ClaimList claims={claims.data} />
      ) : (
        <NoPostsMessage type="claims" />
      )}

      {totalItems > ITEMS_PER_PAGE && (
        <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={totalItems} onPageChange={handlePageChange} />
      )}
    </article>
  );
}

export default ClaimContainer;
