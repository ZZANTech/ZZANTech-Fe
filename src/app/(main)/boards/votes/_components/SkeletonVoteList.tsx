import SkeletonVoteItem from "@/app/(main)/boards/votes/_components/SkeletonVoteItem";

function SkeletonVoteList() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[36px] gap-y-[44px]">
      <SkeletonVoteItem />
      <SkeletonVoteItem />
      <SkeletonVoteItem />
      <SkeletonVoteItem />
      <SkeletonVoteItem />
      <SkeletonVoteItem />
      <SkeletonVoteItem />
      <SkeletonVoteItem />
    </ul>
  );
}

export default SkeletonVoteList;
