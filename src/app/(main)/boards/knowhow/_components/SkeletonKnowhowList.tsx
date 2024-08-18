"use client";
import SkeletonKnowhowItem from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowItem";

function SkeletonKnowhowList() {
  return (
    <ul
      className="flex flex-col border-t border-t-basic mt-1.5 mb-10
    md:mb-8"
    >
      <SkeletonKnowhowItem />
      <SkeletonKnowhowItem />
      <SkeletonKnowhowItem />
      <SkeletonKnowhowItem />
      <SkeletonKnowhowItem />
      <div className="md:hidden">
        <SkeletonKnowhowItem />
        <SkeletonKnowhowItem />
        <SkeletonKnowhowItem />
        <SkeletonKnowhowItem />
        <SkeletonKnowhowItem />
      </div>
    </ul>
  );
}

export default SkeletonKnowhowList;
