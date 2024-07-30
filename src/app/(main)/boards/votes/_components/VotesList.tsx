import VoteItem from "@/app/(main)/boards/votes/_components/VoteItem";
import { TVote } from "@/types/vote.type";

type VotesListProps = {
  votes: TVote[] | undefined;
  lastVoteElementRef?: (node: HTMLDivElement) => void;
};

function VotesList({ votes, lastVoteElementRef, sortOrder }: VotesListProps & { sortOrder?: string }) {
  return (
    // 한 줄에 카드를 세 개까지만 보여주는 문제
    <ul className="self-stretch justify-start items-center gap-9 flex flex-wrap">
      {votes?.map((vote, index) => {
        const isLastElement = votes.length === index + 1;
        return (
          <div ref={isLastElement ? lastVoteElementRef : null} key={vote.vote_postId}>
            <VoteItem vote={vote} sortOrder={sortOrder} />
          </div>
        );
      })}
    </ul>
  );
}

export default VotesList;
