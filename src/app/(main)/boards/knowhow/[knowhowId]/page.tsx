import { getKnowhow } from "@/apis/knowhow";
import BlockedPost from "@/app/(main)/boards/_components/BlockedPost";
import CommentsContainer from "@/app/(main)/boards/_components/Comments/CommentsContainer";
import PostActions from "@/app/(main)/boards/knowhow/[knowhowId]/_components/PostActions";
import PostContent from "@/app/(main)/boards/knowhow/[knowhowId]/_components/PostContent";
import FlyingTikkle from "@/components/Loading/FlyingTikkle";
import MobileHeader from "@/components/MobileHeader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ConditionalKnowhowContainer = dynamic(
  () => import("@/app/(main)/boards/knowhow/_components/ConditionalKnowhowContainer"),
  {
    loading: () => <div className="h-[1490px]"></div>,
    ssr: false
  }
);

type KnowhowDetailPageProps = {
  params: { knowhowId: number };
};
export async function generateMetadata({ params: { knowhowId } }: KnowhowDetailPageProps): Promise<Metadata> {
  const knowhow = await getKnowhow(knowhowId);
  const textOnlyContent = knowhow.content.replace(/<[^>]+>/g, "");
  return {
    title: knowhow.title,
    description: `ZZAN - ${textOnlyContent}`
  };
}

async function KnowhowDetailPage({ params: { knowhowId } }: KnowhowDetailPageProps) {
  const knowhow = await getKnowhow(knowhowId);

  return (
    <main className="max-w-[922px] md:mt-9 mx-auto flex flex-col">
      <MobileHeader title="짠 노하우" />
      {knowhow.is_banned ? (
        <BlockedPost />
      ) : (
        <>
          <PostContent knowhow={knowhow} />
          <PostActions knowhow={knowhow} />
          <CommentsContainer postId={knowhowId} board="knowhow" />
          <ConditionalKnowhowContainer knowhowId={knowhowId} />
        </>
      )}
    </main>
  );
}

export default KnowhowDetailPage;
