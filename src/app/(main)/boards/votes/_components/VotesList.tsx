import VoteItem from "@/app/(main)/boards/votes/_components/VoteItem";
import { TVote } from "@/types/vote.type";

type VotesListProps = {
  votes: TVote[] | undefined;
  lastVoteElementRef?: (node: HTMLDivElement) => void;
};

function VotesList({ votes, lastVoteElementRef, sortOrder }: VotesListProps & { sortOrder?: string }) {
  return (
    <div className="w-full rounded-[128px] flex-col justify-start items-start gap-9 flex flex-wrap">
      <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-[36px] sm:gap-y-[44px] md:grid-cols-3 lg:grid-cols-4">
        {votes?.map((vote, index) => {
          const isLastElement = votes.length === index + 1;
          return (
            <div ref={isLastElement ? lastVoteElementRef : null} key={vote.vote_postId}>
              <VoteItem vote={vote} sortOrder={sortOrder} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default VotesList;
