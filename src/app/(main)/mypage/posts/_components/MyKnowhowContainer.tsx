"use client";

import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import { MOBILE_ITEMS_PER_PAGE, WEB_ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import useMyKnowhowsQuery from "@/stores/queries/knowhow/post/useMyKnowhowsQuery";
import { Tables } from "@/types/supabase";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";
import SkeletonKnowhowList from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowList";
import usePagination from "@/hooks/usePagination";
import useIsWideScreen from "@/hooks/useIsWideScreen";

type MyKnowhowContainerProps = {
  user: Tables<"users">;
};

function MyKnowhowContainer({ user }: MyKnowhowContainerProps) {
  const { isWideScreen } = useIsWideScreen();
  const { currentPage, handlePageChange } = usePagination();
  const itemsPerPage = isWideScreen ? WEB_ITEMS_PER_PAGE : MOBILE_ITEMS_PER_PAGE;
  const { data: knowhows, isPending } = useMyKnowhowsQuery(currentPage, itemsPerPage, user?.userId);
  const totalItems = knowhows?.[0]?.total_count ?? 0;

  return (
    <article>
      {isPending ? (
        <SkeletonKnowhowList />
      ) : knowhows && knowhows.length > 0 ? (
        <>
          <KnowhowList knowhows={knowhows} />
          {totalItems > itemsPerPage && (
            <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
          )}
        </>
      ) : (
        <NoPostsMessage type="myPosts" />
      )}
    </article>
  );
}

export default MyKnowhowContainer;
