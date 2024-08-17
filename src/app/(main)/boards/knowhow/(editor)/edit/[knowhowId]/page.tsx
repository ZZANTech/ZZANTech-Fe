import { getKnowhow } from "@/apis/knowhow";
import KnowhowEditorContainer from "@/app/(main)/boards/knowhow/_components/KnowhowEditorContainer";

async function KnowhowEditPage({ params: { knowhowId } }: { params: { knowhowId: number } }) {
  const knowhow = await getKnowhow(knowhowId);

  return <KnowhowEditorContainer previousContent={knowhow} />;
}

export default KnowhowEditPage;
