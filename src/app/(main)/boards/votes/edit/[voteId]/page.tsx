import { getVote } from "@/apis/votes";
import MobileHeader from "@/components/MobileHeader";
import VoteWriteForm from "@/app/(main)/boards/votes/_components/VoteWriteForm";

async function VoteEditPage({ params: { voteId } }: { params: { voteId: number } }) {
  const vote = await getVote(voteId);

  return (
    <>
      <MobileHeader title="글쓰기" />
      <VoteWriteForm previousContent={vote} />
    </>
  );
}

export default VoteEditPage;
