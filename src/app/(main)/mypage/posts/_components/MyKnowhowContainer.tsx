"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import SkeletonKnowhowList from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowList"; // 스켈레톤 컴포넌트
import { ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import useMyKnowhowsQuery from "@/stores/queries/useMyKnowhowsQuery";
import { Tables } from "@/types/supabase";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";

type MyKnowhowContainerProps = {
  user: Tables<"users">;
};

function MyKnowhowContainer({ user }: MyKnowhowContainerProps) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1", 10));

  const { data: knowhows, isPending } = useMyKnowhowsQuery(currentPage, ITEMS_PER_PAGE, user?.userId);
  const totalItems = knowhows?.[0]?.total_count ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage !== pageFromParams) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams]);

  return (
    <article>
      {isPending ? (
        <SkeletonKnowhowList />
      ) : knowhows && knowhows.length > 0 ? (
        <>
          <KnowhowList knowhows={knowhows} />
          {totalPages > 1 && (
            <Suspense>
              <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={totalItems} onPageChange={handlePageChange} />
            </Suspense>
          )}
        </>
      ) : (
        <NoPostsMessage />
      )}
    </article>
  );
}

export default MyKnowhowContainer;
