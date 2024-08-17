"use client";

import Divider from "@/app/(main)/boards/_components/Divider";
import KnowhowContainer from "@/app/(main)/boards/knowhow/_components/KnowhowContainer";
import useIsWideScreen from "@/hooks/useIsWideScreen";

function ConditionalKnowhowContainer() {
  const { isWideScreen } = useIsWideScreen();

  if (isWideScreen === null) return null;

  if (isWideScreen) return null;

  return (
    <>
      <Divider />
      <KnowhowContainer isDetailPage />
    </>
  );
}

export default ConditionalKnowhowContainer;
