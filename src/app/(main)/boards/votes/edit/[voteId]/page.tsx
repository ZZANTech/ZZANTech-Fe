import { getVote } from "@/apis/votes";
import VoteWriteForm from "@/app/(main)/boards/votes/_components/VoteWriteForm";

async function VoteEditPage({ params: { voteId } }: { params: { voteId: number } }) {
  const vote = await getVote(voteId);

  return <VoteWriteForm previousContent={vote} />;
}

export default VoteEditPage;
