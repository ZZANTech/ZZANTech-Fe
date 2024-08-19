"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import useVotesQuery from "@/stores/queries/vote/post/useVotesQuery";
import Button from "@/components/Button/Button";
import SortButtons from "@/app/(main)/boards/votes/_components/SortButtons";
import VotesList from "@/app/(main)/boards/votes/_components/VotesList";
import SkeletonVoteList from "@/app/(main)/boards/votes/_components/SkeletonVoteList";
import Image from "next/image";

function VotesContainer() {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("latest");
  const [isHovered, setIsHovered] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage } = useVotesQuery(sortOrder);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleWriteClick = () => {
    router.push(`/boards/votes/write`);
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };

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

  return (
    <section className="w-full flex flex-col gap-3 md:gap-6">
      <div className="flex justify-between items-end">
        <SortButtons sortOrder={sortOrder} handleSortOrderChange={handleSortOrderChange} />
        <Button
          onClick={handleWriteClick}
          variant="main"
          size="medium"
          weight="semibold"
          className="gap-2.5 hidden md:flex justify-center items-center"
        >
          <Image src="/icons/mypage/pencil_white.png" width={20} height={20} alt="글쓰기 아이콘" className="w-5 h-5" />
          글쓰기
        </Button>
      </div>

      {isLoading ? (
        <SkeletonVoteList />
      ) : (
        <VotesList
          votes={data?.pages.flatMap((page) => page.data)}
          lastVoteElementRef={lastVoteElementRef}
          sortOrder={sortOrder}
        />
      )}

      <button
        onClick={handleWriteClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-20 right-8 md:hidden"
      >
        <Image
          src={isHovered ? "/icons/vote/vote_write_button_hover.png" : "/icons/vote/vote_write_button.png"}
          width={52}
          height={52}
          alt="글쓰기 아이콘"
        />
      </button>
    </section>
  );
}

export default VotesContainer;
