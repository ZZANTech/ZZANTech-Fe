import { getKnowhow } from "@/apis/knowhow";
import CommentsContainer from "../../_components/Comments/CommentsContainer";
import PostContent from "./_components/PostContent";
import PostActions from "./_components/PostActions";

async function KnowhowDetailPage({ params: { knowhowId } }: { params: { knowhowId: number } }) {
  const knowhow = await getKnowhow(knowhowId);
  return (
    <main>
      <PostContent knowhow={knowhow} />
      <PostActions knowhowId={knowhowId} />
      <CommentsContainer postId={knowhowId} />
    </main>
  );
}

export default KnowhowDetailPage;
