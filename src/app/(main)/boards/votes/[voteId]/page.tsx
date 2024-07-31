import { getVote } from "@/apis/votes";
import VoteContent from "@/app/(main)/boards/votes/[voteId]/_components/VoteContent";
import ActionNav from "@/app/(main)/boards/votes/[voteId]/_components/ActionNav";
import CommentsContainer from "@/app/(main)/boards/_components/Comments/CommentsContainer";

type VoteDetailPageProps = {
  params: { voteId: number };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function VoteDetailPage({ params: { voteId }, searchParams }: VoteDetailPageProps) {
  const vote = await getVote(voteId);

  return (
    <main>
      <VoteContent vote={vote} />
      <ActionNav vote={vote} />
      <CommentsContainer postId={voteId} board="vote" />
    </main>
  );
}
