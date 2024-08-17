import SkeletonVoteItem from "@/app/(main)/boards/votes/_components/SkeletonVoteItem";

function SkeletonVoteList() {
  return (
    <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-[36px] sm:gap-y-[44px] md:grid-cols-3 lg:grid-cols-4">
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
