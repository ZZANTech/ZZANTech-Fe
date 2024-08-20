"use client";

import Divider from "@/app/(main)/boards/_components/Divider";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import { TVote } from "@/types/vote.type";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import useVotesQuery from "@/stores/queries/vote/post/useVotesQuery";
import { useCallback, useRef } from "react";

function ConditionalVoteContainer({ voteId }: { voteId: TVote["vote_postId"] }) {
  const { isWideScreen } = useIsWideScreen();
  const voteIdNum = String(voteId);
  const isMobile = !isWideScreen;
  const sortOrder = "latest";

  const { data, isLoading, fetchNextPage, hasNextPage } = useVotesQuery(sortOrder, voteIdNum, isMobile);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastVoteElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  if (isWideScreen === null || isWideScreen) return null;

  return (
    <>
      {data && data?.pages[0].data.length > 0 && (
        <>
          <Divider />
          <VotesList
            votes={data?.pages.flatMap((page) => page.data)}
            lastVoteElementRef={lastVoteElementRef}
            sortOrder={sortOrder}
          />
        </>
      )}
    </>
  );
}

export default ConditionalVoteContainer;
