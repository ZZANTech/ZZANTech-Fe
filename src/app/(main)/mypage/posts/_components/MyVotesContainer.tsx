"use client";

import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import SkeletonVoteList from "@/app/(main)/boards/votes/_components/SkeletonVoteList";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";
import useMyVotesQuery from "@/stores/queries/vote/post/useMyVotesQuery";
import { Tables } from "@/types/supabase";
import usePagination from "@/hooks/usePagination";

type MyVotesContainerProps = {
  user: Tables<"users">;
};

const ITEMS_PER_PAGE = 8;

function MyVotesContainer({ user }: MyVotesContainerProps) {
  const { currentPage, handlePageChange } = usePagination();
  const { data: votes, isPending } = useMyVotesQuery(currentPage, ITEMS_PER_PAGE, user?.userId);
  const totalItems = votes?.[0]?.total_count ?? 0;

  return (
    <article>
      {isPending ? (
        <SkeletonVoteList />
      ) : votes && votes.length > 0 ? (
        <>
          <VotesList votes={votes} />
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

export default MyVotesContainer;
