"use client";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import { ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import { useUserContext } from "@/provider/contexts/UserContext";
import useLikedKnowhowsQuery from "@/stores/queries/useLikedKnowhowsQuery";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function LikedKnowhowContainer() {
  const { user } = useUserContext();
  const userId = user?.userId;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();

  const { data: knowhows } = useLikedKnowhowsQuery(currentPage, ITEMS_PER_PAGE, userId || "");

  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage !== pageFromParams) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams, currentPage]);

  return (
    <section>
      {knowhows && knowhows.length > 0 && (
        <>
          <Suspense>
            <KnowhowList knowhows={knowhows} />
            <Pagination
              totalItems={knowhows[0]?.total_count || 0}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </Suspense>
        </>
      )}
    </section>
  );
}

export default LikedKnowhowContainer;
