import KnowhowItem from "@/app/(main)/boards/knowhow/_components/KnowhowItem";
import { TKnowhow } from "@/types/knowhow.type";

type knowhowListProps = {
  knowhows: TKnowhow[] | undefined;
};

function KnowhowList({ knowhows }: knowhowListProps) {
  return (
    <ul className="flex flex-col gap-8 mt-10">
      {knowhows?.map((knowhow) => <KnowhowItem key={knowhow.knowhow_postId} knowhow={knowhow} />)}
    </ul>
  );
}

export default KnowhowList;
