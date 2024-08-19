"use client";

import Divider from "@/app/(main)/boards/_components/Divider";
import KnowhowList from "@/app/(main)/boards/knowhow/_components/KnowhowList";
import Button from "@/components/Button";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import usePreviousKnowhowsQuery from "@/stores/queries/knowhow/post/usePreviousKnowhowsQuery";
import { TKnowhow } from "@/types/knowhow.type";

function ConditionalKnowhowContainer({ knowhowId }: { knowhowId: TKnowhow["knowhow_postId"] }) {
  const { isWideScreen } = useIsWideScreen();
  const limit = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePreviousKnowhowsQuery(knowhowId, limit);

  if (isWideScreen === null) return null;

  if (isWideScreen) return null;

  return (
    <>
      <Divider />
      {data && (
        <>
          <KnowhowList isDetailPage knowhows={data.pages.flatMap((page) => page.posts) || []} />
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} variant={"orange"}>
              {isFetchingNextPage ? "Loading" : "누르면 패치하는버튼"}
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default ConditionalKnowhowContainer;
