"use clinet";

import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import { ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import useMyKnowhowsQuery from "@/stores/queries/useMyKnowhowsQuery";
import useMyVotesQuery from "@/stores/queries/useMyVotesQuery";
import { Tables } from "@/types/supabase";
import { Suspense, useState } from "react";

type MyVotesContainerProps = {
  user: Tables<"users">;
};

function MyVotesContainer({ user }: MyVotesContainerProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: votes } = useMyVotesQuery(currentPage, 1, user?.userId);
  const totalItems = votes && votes[0].total_count;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <article>
      {votes && votes.length > 0 && <VotesList votes={votes} />}
      <Suspense>
        <Pagination itemsPerPage={1} totalItems={totalItems || 0} onPageChange={handlePageChange} />
      </Suspense>
    </article>
  );
}

export default MyVotesContainer;
