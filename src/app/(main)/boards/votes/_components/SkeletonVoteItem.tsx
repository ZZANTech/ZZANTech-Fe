function SkeletonVoteItem() {
  return (
    <li className="w-full">
      <div className="w-full h-[374px] md:h-[310px] flex flex-col justify-start items-center transform transition-transform duration-300 ease-out rounded-xl overflow-hidden shadow-lg">
        <div className="relative w-full h-[220px] md:h-[155px] bg-gray-300 animate-pulse"></div>
        <div className="flex flex-col justify-start items-start p-3 bg-gray-100 gap-2 grow w-full">
          <div className="w-full h-[59px] bg-gray-300 animate-pulse"></div>
          <div className="w-1/3 h-4 bg-gray-300 animate-pulse mt-2"></div>
        </div>
        <div className="flex items-center justify-start h-11 w-full px-2 bg-gray-200 gap-3">
          <div className="w-1/4 h-4 bg-gray-300 animate-pulse"></div>
          <div className="w-1/4 h-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </li>
  );
}

export default SkeletonVoteItem;
