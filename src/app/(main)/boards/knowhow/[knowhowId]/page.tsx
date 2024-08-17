import { getKnowhow } from "@/apis/knowhow";
import CommentsContainer from "@/app/(main)/boards/_components/Comments/CommentsContainer";
import PostActions from "@/app/(main)/boards/knowhow/[knowhowId]/_components/PostActions";
import PostContent from "@/app/(main)/boards/knowhow/[knowhowId]/_components/PostContent";
import MobileHeader from "@/components/MobileHeader";
import { Metadata } from "next";

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
    <main className="max-w-[922px] mt-9 mx-auto flex flex-col">
      <MobileHeader title="짠 노하우" />
      <PostContent knowhow={knowhow} />
      <PostActions knowhow={knowhow} />
      <CommentsContainer postId={knowhowId} board="knowhow" />
    </main>
  );
}

export default KnowhowDetailPage;
