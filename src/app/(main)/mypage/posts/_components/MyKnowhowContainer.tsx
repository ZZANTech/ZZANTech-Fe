"use client";

import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import { ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import useMyKnowhowsQuery from "@/stores/queries/knowhow/post/useMyKnowhowsQuery";
import { Tables } from "@/types/supabase";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";
import SkeletonKnowhowList from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowList";
import usePagination from "@/hooks/usePagination";

type MyKnowhowContainerProps = {
  user: Tables<"users">;
};

function MyKnowhowContainer({ user }: MyKnowhowContainerProps) {
  const { currentPage, handlePageChange } = usePagination();
  const { data: knowhows, isPending } = useMyKnowhowsQuery(currentPage, ITEMS_PER_PAGE, user?.userId);
  const totalItems = knowhows?.[0]?.total_count ?? 0;

  return (
    <article>
      {isPending ? (
        <SkeletonKnowhowList />
      ) : knowhows && knowhows.length > 0 ? (
        <>
          <KnowhowList knowhows={knowhows} />
          {totalItems > ITEMS_PER_PAGE && (
            <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={totalItems} onPageChange={handlePageChange} />
          )}
        </>
      ) : (
        <NoPostsMessage type="myPosts" />
      )}
    </article>
  );
}

export default MyKnowhowContainer;
