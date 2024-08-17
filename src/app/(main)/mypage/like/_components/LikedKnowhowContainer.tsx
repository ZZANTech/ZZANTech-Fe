"use client";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import SkeletonKnowhowList from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowList";
import { WEB_ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";
import { useUserContext } from "@/provider/contexts/UserContext";
import useLikedKnowhowsQuery from "@/stores/queries/knowhow/post/useLikedKnowhowsQuery";
import usePagination from "@/hooks/usePagination";
import MobileHeader from "@/components/MobileHeader";

function LikedKnowhowContainer() {
  const { user } = useUserContext();
  const userId = user?.userId;
  const { currentPage, handlePageChange } = usePagination();
  const { data: knowhows, isPending } = useLikedKnowhowsQuery(currentPage, WEB_ITEMS_PER_PAGE, userId || "");
  const totalItems = knowhows ? knowhows[0]?.total_count || 0 : 0;

  return (
    <section>
      <MobileHeader title="좋아요 누른 글" />
      <h1 className="hidden md:block my-[63px] ml-2.5 text-[28px] font-semibold leading-9">좋아요 누른 글</h1>
      {isPending ? (
        <SkeletonKnowhowList />
      ) : knowhows && knowhows.length > 0 ? (
        <>
          <div className="mt-[31px] md:mt-0">
            <KnowhowList knowhows={knowhows} />
          </div>
          {totalItems > WEB_ITEMS_PER_PAGE && (
            <Pagination totalItems={totalItems} itemsPerPage={WEB_ITEMS_PER_PAGE} onPageChange={handlePageChange} />
          )}
        </>
      ) : (
        <NoPostsMessage type="likedPosts" />
      )}
    </section>
  );
}

export default LikedKnowhowContainer;
