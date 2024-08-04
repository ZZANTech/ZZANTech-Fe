import { getKnowhow } from "@/apis/knowhow";
import CommentsContainer from "@/app/(main)/boards/_components/Comments/CommentsContainer";
import PostActions from "@/app/(main)/boards/knowhow/[knowhowId]/_components/PostActions";
import PostContent from "@/app/(main)/boards/knowhow/[knowhowId]/_components/PostContent";

async function KnowhowDetailPage({ params: { knowhowId } }: { params: { knowhowId: number } }) {
  const knowhow = await getKnowhow(knowhowId);

  return (
    <main className="max-w-[922px] mt-9 mx-auto flex flex-col">
      <PostContent knowhow={knowhow} />
      <PostActions knowhow={knowhow} />
      <CommentsContainer postId={knowhowId} board="knowhow" />
    </main>
  );
}

export default KnowhowDetailPage;
