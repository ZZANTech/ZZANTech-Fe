import { getKnowhow } from "@/apis/knowhow";
import KnowhowEditor from "../../_components/KnowhowEditor";

async function KnowhowEditPage({ params: { knowhowId } }: { params: { knowhowId: number } }) {
  const knowhow = await getKnowhow(knowhowId);
  console.log(knowhow);

  return (
    <>
      <KnowhowEditor previousContent={knowhow} />
    </>
  );
}

export default KnowhowEditPage;
