import VoteItem from "@/app/(main)/boards/votes/_components/VoteItem";
import { TVote } from "@/types/vote.type";
import { LegacyRef } from "react";

type VotesListProps = {
  votes: TVote[] | undefined;
  lastVoteElementRef?: LegacyRef<HTMLLIElement>;
  sortOrder?: string;
};

function VotesList({ votes, lastVoteElementRef, sortOrder }: VotesListProps) {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-9 rounded-[128px]">
      <ul className="w-full grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-[36px] sm:gap-y-[44px] md:grid-cols-3 lg:grid-cols-4">
        {votes?.map((vote, index) => {
          const isLastElement = votes.length === index + 1;
          return (
            <li ref={isLastElement ? lastVoteElementRef : null} key={vote.vote_postId}>
              <VoteItem vote={vote} sortOrder={sortOrder} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VotesList;
