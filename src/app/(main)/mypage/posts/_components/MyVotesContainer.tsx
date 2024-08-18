"use client";

import Pagination from "@/app/(main)/boards/knowhow/_components/Pagination";
import SkeletonVoteList from "@/app/(main)/boards/votes/_components/SkeletonVoteList";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import NoPostsMessage from "@/app/(main)/mypage/posts/_components/NoPostsMessage";
import useMyVotesQuery from "@/stores/queries/vote/post/useMyVotesQuery";
import { Tables } from "@/types/supabase";
import usePagination from "@/hooks/usePagination";
import useIsWideScreen from "@/hooks/useIsWideScreen";

type MyVotesContainerProps = {
  user: Tables<"users">;
};

const WEB_ITEMS_PER_PAGE = 8;
const MOBILE_ITEMS_PER_PAGE = 4;

function MyVotesContainer({ user }: MyVotesContainerProps) {
  const { currentPage, handlePageChange } = usePagination();
  const { data: votes, isPending } = useMyVotesQuery(currentPage, WEB_ITEMS_PER_PAGE, user?.userId);
  const totalItems = votes?.[0]?.total_count ?? 0;
  const { isWideScreen } = useIsWideScreen();
  const itemsPerPage = isWideScreen ? WEB_ITEMS_PER_PAGE : MOBILE_ITEMS_PER_PAGE;

  return (
    <article>
      {isPending ? (
        <SkeletonVoteList />
      ) : votes && votes.length > 0 ? (
        <>
          <VotesList votes={votes} />
          {totalItems > WEB_ITEMS_PER_PAGE && (
            <div className="mt-10 md:mt-[101px]">
              <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      ) : (
        <NoPostsMessage type="myPosts" />
      )}
    </article>
  );
}

export default MyVotesContainer;
