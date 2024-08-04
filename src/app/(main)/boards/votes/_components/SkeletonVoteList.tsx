import SkeletonVoteItem from "@/app/(main)/boards/votes/_components/SkeletonVoteItem";

function SkeletonVoteList() {
  return (
    <ul className="self-stretch justify-start items-center gap-9 flex flex-wrap">
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
