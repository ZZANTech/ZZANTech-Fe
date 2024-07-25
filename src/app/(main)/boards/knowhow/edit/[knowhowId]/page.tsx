import { getKnowhow } from "@/apis/knowhow";
import KnowhowEditor from "../../_components/KnowhowEditor";
import { revalidatePath } from "next/cache";
import { Tables } from "@/types/supabase";

async function KnowhowEditPage({ params: { knowhowId } }: { params: { knowhowId: number } }) {
  const knowhow = await getKnowhow(knowhowId);

  const revalidateDetailPage = async (knowhowId: Tables<"knowhow_posts">["knowhow_postId"]) => {
    "use server";
    revalidatePath(`/boards/knowhow/${knowhowId}`, "page");
  };

  return (
    <>
      <KnowhowEditor revalidate={revalidateDetailPage} previousContent={knowhow} />
    </>
  );
}

export default KnowhowEditPage;
