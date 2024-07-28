import VoteItem from "@/app/(main)/boards/votes/_components/VoteItem";
import { TVote } from "@/types/vote.type";

type VotesListProps = {
  votes: TVote[] | undefined;
};

function VotesList({ votes }: VotesListProps) {
  return (
    // 한 줄에 카드를 세 개까지만 보여주는 문제
    <ul className="self-stretch justify-start items-center gap-9 flex flex-wrap">
      {votes && votes.map((vote) => <VoteItem key={vote.vote_postId} vote={vote} />)}
    </ul>
  );
}

export default VotesList;
