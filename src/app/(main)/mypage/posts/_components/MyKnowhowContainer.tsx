"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import { ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import useMyKnowhowsQuery from "@/stores/queries/useMyKnowhowsQuery";
import { Tables } from "@/types/supabase";

type MyKnowhowContainerProps = {
  user: Tables<"users">;
};

function MyKnowhowContainer({ user }: MyKnowhowContainerProps) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1", 10));

  const { data: knowhows } = useMyKnowhowsQuery(currentPage, ITEMS_PER_PAGE, user?.userId);
  const totalItems = knowhows?.[0]?.total_count ?? 1;

  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage !== pageFromParams) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams, currentPage]);

  return (
    <article>
      {knowhows && knowhows.length > 0 && <KnowhowList knowhows={knowhows} />}
      {knowhows && knowhows[0] && (
        <Suspense>
          <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={totalItems || 0} onPageChange={handlePageChange} />
        </Suspense>
      )}
    </article>
  );
}

export default MyKnowhowContainer;
