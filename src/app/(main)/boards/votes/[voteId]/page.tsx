import { getVote } from "@/apis/votes";
import VoteContent from "@/app/(main)/boards/votes/[voteId]/_components/VoteContent";

async function VoteDetailPage({ params: { voteId } }: { params: { voteId: number } }) {
  const vote = await getVote(voteId);

  return (
    <main>
      <VoteContent vote={vote} />
      {/* ActionNav */}
      {/* CommentsContainer */}
    </main>
  );
}

export default VoteDetailPage;
