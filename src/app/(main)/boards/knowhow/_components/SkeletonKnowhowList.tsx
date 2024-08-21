"use client";
import SkeletonKnowhowItem from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowItem";
import useIsWideScreen from "@/hooks/useIsWideScreen";

function SkeletonKnowhowList() {
  const { isWideScreen } = useIsWideScreen();
  const items = Array(isWideScreen ? 5 : 10).fill(null);

  return (
    <ul
      className="flex flex-col border-t border-t-basic mt-1.5 mb-10
    md:mb-8"
    >
      {items.map((_, index) => (
        <SkeletonKnowhowItem key={index} />
      ))}
    </ul>
  );
}

export default SkeletonKnowhowList;
