import { getVote, getVoteLikesData } from "@/apis/votes";
import VoteContent from "@/app/(main)/boards/votes/[voteId]/_components/VoteContent";
import CommentsContainer from "@/app/(main)/boards/_components/Comments/CommentsContainer";
import NavButton from "@/app/(main)/boards/votes/[voteId]/_components/NavButton";
import MobileHeader from "@/components/MobileHeader";
import { Metadata } from "next";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value || "";
  const accessToken = cookieStore.get("access_token")?.value || "";

  if (!refreshToken || !accessToken) {
    console.error("토큰이 없습니다");
  }

  const [vote, voteLikes] = await Promise.all([getVote(voteId), getVoteLikesData(voteId, accessToken, refreshToken)]);

  return (
    <>
      <MobileHeader title="짠 소비 구경" />
      <div className="flex flex-col justify-center items-center gap-[23px] mt-3 md:mt-[77px] w-full">
        <section className="flex items-center w-full max-w-[904px]">
          <NavButton vote={vote} direction="prev" />
          <VoteContent vote={vote} initialVoteLikes={voteLikes} accessToken={accessToken} refreshToken={refreshToken} />
          <NavButton vote={vote} direction="next" />
        </section>
        <CommentsContainer postId={voteId} board="vote" />
      </div>
    </>
  );
}
