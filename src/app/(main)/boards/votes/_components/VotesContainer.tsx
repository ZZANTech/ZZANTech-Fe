"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import useVotesQuery from "@/stores/queries/useVotesQuery";
import Button from "@/components/Button/Button";
import SortButtons from "@/app/(main)/boards/votes/_components/SortButtons";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import { useRouter } from "next/navigation";

function VotesContainer() {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("latest");

  const { data, isLoading, fetchNextPage, hasNextPage } = useVotesQuery(sortOrder);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleWriteClick = () => {
    router.push(`/boards/votes/write`);
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };

  const lastVoteElementRef = useCallback(
    (node: HTMLDivElement) => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Button onClick={handleWriteClick}>글쓰기</Button>
      <SortButtons sortOrder={sortOrder} handleSortOrderChange={handleSortOrderChange} />
      <VotesList
        votes={data?.pages.flatMap((page) => page.data)}
        lastVoteElementRef={lastVoteElementRef}
        sortOrder={sortOrder}
      />
    </section>
  );
}

export default VotesContainer;
