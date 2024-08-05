import { getVote } from "@/apis/votes";
import VoteContent from "@/app/(main)/boards/votes/[voteId]/_components/VoteContent";
import CommentsContainer from "@/app/(main)/boards/_components/Comments/CommentsContainer";
import NavButton from "@/app/(main)/boards/votes/[voteId]/_components/NavButton";
import { Metadata } from "next";

type VoteDetailPageProps = {
  params: { voteId: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params: { voteId } }: { params: { voteId: number } }): Promise<Metadata> {
  const vote = await getVote(voteId);
  return {
    title: vote.title,
    description: `ZZAN - ${vote.content}`
  };
}

export default async function VoteDetailPage({ params: { voteId } }: VoteDetailPageProps) {
  const vote = await getVote(voteId);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-7">
      <div className="flex items-center">
        <NavButton vote={vote} direction="prev" />
        <VoteContent vote={vote} />
        <NavButton vote={vote} direction="next" />
      </div>
      <CommentsContainer postId={voteId} board="vote" />
    </div>
  );
}
