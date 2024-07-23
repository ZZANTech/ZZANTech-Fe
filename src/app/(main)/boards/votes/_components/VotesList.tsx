import { TVote } from "@/types/vote.type";
import VoteItem from "./VoteItem";

type VotesListProps = {
  votes: TVote[] | undefined;
};

function VotesList({ votes }: VotesListProps) {
  return <ul>{votes && votes.map((vote) => <VoteItem key={vote.vote_postId} vote={vote} />)}</ul>;
}

export default VotesList;
