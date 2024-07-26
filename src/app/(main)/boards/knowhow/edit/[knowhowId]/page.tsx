import { getKnowhow } from "@/apis/knowhow";
import KnowhowEditor from "../../_components/KnowhowEditor";
import { Tables } from "@/types/supabase";

async function KnowhowEditPage({ params: { knowhowId } }: { params: { knowhowId: number } }) {
  const knowhow = await getKnowhow(knowhowId);

  return (
    <>
      <KnowhowEditor previousContent={knowhow} />
    </>
  );
}

export default KnowhowEditPage;
