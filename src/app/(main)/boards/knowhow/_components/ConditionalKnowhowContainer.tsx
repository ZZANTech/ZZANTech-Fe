"use client";

import Divider from "@/app/(main)/boards/_components/Divider";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import Button from "@/components/Button";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import usePreviousKnowhowsQuery from "@/stores/queries/knowhow/post/usePreviousKnowhowsQuery";
import { TKnowhow } from "@/types/knowhow.type";
import Image from "next/image";
import arrowDown from "/public/icons/filter/arrow_down.svg";

function ConditionalKnowhowContainer({ knowhowId }: { knowhowId: TKnowhow["knowhow_postId"] }) {
  const { isWideScreen } = useIsWideScreen();
  const limit = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePreviousKnowhowsQuery(knowhowId, limit);
  if (isWideScreen === null) return null;

  if (isWideScreen) return null;

  return (
    <>
      {data && data?.pages[0].posts.length > 0 && (
        <>
          <Divider />
          <KnowhowList isDetailPage knowhows={data.pages.flatMap((page) => page.posts) || []} />
          {hasNextPage && (
            <Button
              className="text-gray-900 text-sm gap-3"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              fullWidth
              size={"small"}
              variant={"white"}
            >
              {isFetchingNextPage ? (
                <span className="text-gray-400">로딩중...</span>
              ) : (
                <>
                  <span>더 보기</span> <Image src={arrowDown} alt="화살표" width={20} height={20} />
                </>
              )}
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default ConditionalKnowhowContainer;
