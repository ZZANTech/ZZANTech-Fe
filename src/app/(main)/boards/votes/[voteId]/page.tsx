import { getVote } from "@/apis/votes";
import VoteContent from "./_components/VoteContent";

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
