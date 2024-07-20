import { TKnowhow } from "@/types/knowhow.type";
import KnowhowItem from "./KnowhowItem";

type knowhowListProps = {
  knowhows: TKnowhow[] | undefined;
};

function KnowhowList({ knowhows }: knowhowListProps) {
  return (
    <ul className="flex flex-col gap-8">
      {knowhows?.map((knowhow) => <KnowhowItem key={knowhow.tip_post_id} knowhow={knowhow} />)}
    </ul>
  );
}

export default KnowhowList;
