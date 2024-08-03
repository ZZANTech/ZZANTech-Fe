import KnowhowItem from "@/app/(main)/boards/knowhow/_components/knowhowItem/KnowhowItem";
import { TKnowhow } from "@/types/knowhow.type";

type knowhowListProps = {
  knowhows: TKnowhow[] | undefined;
};

function KnowhowList({ knowhows }: knowhowListProps) {
  return (
    <ul className="flex flex-col border-t border-t-basic mt-1.5 mb-[13px]">
      {knowhows?.map((knowhow) => <KnowhowItem key={knowhow.knowhow_postId} knowhow={knowhow} />)}
    </ul>
  );
}

export default KnowhowList;
