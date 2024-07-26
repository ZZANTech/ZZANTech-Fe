import VoteItem from "@/app/(main)/boards/votes/_components/VoteItem";
import { TVote } from "@/types/vote.type";

type VotesListProps = {
  votes: TVote[] | undefined;
};

function VotesList({ votes }: VotesListProps) {
  return <ul>{votes && votes.map((vote) => <VoteItem key={vote.vote_postId} vote={vote} />)}</ul>;
}

export default VotesList;
