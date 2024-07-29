"use client";

import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import { ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import useMyKnowhowsQuery from "@/stores/queries/useMyKnowhowsQuery";
import { Tables } from "@/types/supabase";
import { useState } from "react";

type MyKnowhowContainerProps = {
  user: Tables<"users">;
};

function MyKnowhowContainer({ user }: MyKnowhowContainerProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: knowhows } = useMyKnowhowsQuery(currentPage, ITEMS_PER_PAGE, user?.userId);
  const totalItems = knowhows && knowhows[0].total_count;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <article>
      {knowhows && knowhows.length > 0 && <KnowhowList knowhows={knowhows} />}
      <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={totalItems || 0} onPageChange={handlePageChange} />
    </article>
  );
}

export default MyKnowhowContainer;
