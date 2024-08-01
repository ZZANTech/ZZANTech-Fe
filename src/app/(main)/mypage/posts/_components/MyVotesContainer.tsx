"use clinet";

import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import { ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import useMyKnowhowsQuery from "@/stores/queries/useMyKnowhowsQuery";
import useMyVotesQuery from "@/stores/queries/useMyVotesQuery";
import { Tables } from "@/types/supabase";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type MyVotesContainerProps = {
  user: Tables<"users">;
};

function MyVotesContainer({ user }: MyVotesContainerProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();

  const { data: votes } = useMyVotesQuery(currentPage, ITEMS_PER_PAGE, user?.userId);
  const totalItems = votes && votes[0].total_count;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage !== pageFromParams) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams, currentPage]);

  return (
    <article>
      {votes && votes.length > 0 && <VotesList votes={votes} />}
      <Suspense>
        <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={totalItems || 0} onPageChange={handlePageChange} />
      </Suspense>
    </article>
  );
}

export default MyVotesContainer;
