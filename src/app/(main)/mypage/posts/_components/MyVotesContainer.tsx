"use client";

import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import SkeletonVoteList from "@/app/(main)/boards/votes/_components/SkeletonVoteList";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";
import useMyVotesQuery from "@/stores/queries/useMyVotesQuery";
import { Tables } from "@/types/supabase";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type MyVotesContainerProps = {
  user: Tables<"users">;
};
const ITEMS_PER_PAGE = 8;
function MyVotesContainer({ user }: MyVotesContainerProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();

  const { data: votes, isPending } = useMyVotesQuery(currentPage, ITEMS_PER_PAGE, user?.userId);
  const totalItems = votes?.[0]?.total_count ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
    if (currentPage !== pageFromParams) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams]);

  return (
    <article>
      {isPending ? (
        <SkeletonVoteList />
      ) : votes && votes.length > 0 ? (
        <>
          <VotesList votes={votes} />
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

export default MyVotesContainer;
