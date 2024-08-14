"use client";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import SkeletonKnowhowList from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowList";
import { ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";
import { useUserContext } from "@/provider/contexts/UserContext";
import useLikedKnowhowsQuery from "@/stores/queries/knowhow/post/useLikedKnowhowsQuery";
import { Suspense } from "react";
import usePagination from "@/hooks/usePagination";

function LikedKnowhowContainer() {
  const { user } = useUserContext();
  const userId = user?.userId;
  const { currentPage, handlePageChange } = usePagination();
  const { data: knowhows, isPending } = useLikedKnowhowsQuery(currentPage, ITEMS_PER_PAGE, userId || "");
  const totalItems = knowhows ? knowhows[0]?.total_count || 0 : 0;

  return (
    <section>
      <h1 className="my-[63px] ml-[11px] text-[28px] font-semibold leading-9">좋아요 누른 글</h1>
      {isPending ? (
        <SkeletonKnowhowList />
      ) : knowhows && knowhows.length > 0 ? (
        <>
          <Suspense>
            <KnowhowList knowhows={knowhows} />
            {totalItems > ITEMS_PER_PAGE && (
              <Pagination totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGE} onPageChange={handlePageChange} />
            )}
          </Suspense>
        </>
      ) : (
        <NoPostsMessage type="likedPosts" />
      )}
    </section>
  );
}

export default LikedKnowhowContainer;
