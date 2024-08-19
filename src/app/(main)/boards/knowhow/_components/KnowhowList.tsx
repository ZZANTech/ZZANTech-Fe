import KnowhowItem from "@/app/(main)/boards/knowhow/_components/knowhowItem/KnowhowItem";
import { TKnowhow } from "@/types/knowhow.type";
import clsx from "clsx";

type knowhowListProps = {
  knowhows: TKnowhow[] | undefined;
  isDetailPage?: boolean;
};
//
function KnowhowList({ knowhows, isDetailPage = false }: knowhowListProps) {
  console.log(knowhows);
  return (
    <ul
      className={clsx(
        "flex flex-col border-t border-t-gray-900 mt-1.5 mb-10 md:mb-8", //
        isDetailPage && "border-t-0 mb-[65px]"
      )}
    >
      {knowhows?.map((knowhow) => <KnowhowItem isDetailPage key={knowhow.knowhow_postId} knowhow={knowhow} />)}
    </ul>
  );
}

export default KnowhowList;
