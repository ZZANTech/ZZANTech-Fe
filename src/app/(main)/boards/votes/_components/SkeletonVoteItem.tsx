function SkeletonVoteItem() {
  return (
    <li>
      <div className="w-[253px] h-[310px] flex-col justify-start items-center inline-flex transform transition-transform duration-300 ease-out hover:-translate-y-2 rounded-xl overflow-hidden shadow-lg">
        <div className="relative w-[252px] h-[155px] bg-gray-300 animate-pulse"></div>
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start p-3 bg-gray-100 gap-2 flex">
          <div className="self-stretch h-[59px] bg-gray-300 animate-pulse"></div>
          <div className="w-16 h-4 bg-gray-300 animate-pulse mt-2"></div>
        </div>
        <div className="h-11 self-stretch grow shrink basis-0 px-2 bg-gray-200 justify-center items-center gap-3 flex">
          <div className="h-4 w-full bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </li>
  );
}

export default SkeletonVoteItem;
