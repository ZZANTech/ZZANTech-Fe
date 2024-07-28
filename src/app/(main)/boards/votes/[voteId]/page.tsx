import { getVote } from "@/apis/votes";
import VoteContent from "@/app/(main)/boards/votes/[voteId]/_components/VoteContent";
import ActionNav from "@/app/(main)/boards/votes/[voteId]/_components/ActionNav";

async function VoteDetailPage({ params: { voteId } }: { params: { voteId: number } }) {
  const vote = await getVote(voteId);

  return (
    <main>
      <VoteContent vote={vote} />
      <ActionNav vote={vote} />
      {/* CommentsContainer */}
    </main>
  );
}

export default VoteDetailPage;
