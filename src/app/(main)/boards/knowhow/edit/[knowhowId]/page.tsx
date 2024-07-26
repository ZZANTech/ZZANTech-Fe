import { getKnowhow } from "@/apis/knowhow";
import KnowhowEditor from "@/app/(main)/boards/knowhow/_components/KnowhowEditor";

async function KnowhowEditPage({ params: { knowhowId } }: { params: { knowhowId: number } }) {
  const knowhow = await getKnowhow(knowhowId);

  return (
    <>
      <KnowhowEditor previousContent={knowhow} />
    </>
  );
}

export default KnowhowEditPage;
