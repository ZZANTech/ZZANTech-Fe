import SkeletonKnowhowItem from "@/app/(main)/boards/knowhow/_components/SkeletonKnowhowItem";

function SkeletonKnowhowList() {
  return (
    <ul className="flex flex-col border-t border-t-basic mt-1.5 mb-[13px]">
      <SkeletonKnowhowItem />
      <SkeletonKnowhowItem />
      <SkeletonKnowhowItem />
      <SkeletonKnowhowItem />
      <SkeletonKnowhowItem />
    </ul>
  );
}

export default SkeletonKnowhowList;
