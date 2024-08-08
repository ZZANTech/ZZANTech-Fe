import React from "react";

function SkeletonPointRankingItem() {
  return (
    <li className="flex items-center justify-between min-w-full border rounded-xl mb-2 px-7 py-[10px] bg-[#F3F3F3] border-[#191A23] shadow-[0px_2px_0px_0px_#191A23]">
      <div className="flex items-center animate-pulse">
        <div className="flex items-center justify-center mr-4 w-10 h-6 bg-gray-300 rounded-[100px]"></div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="ml-auto px-7 py-3 animate-pulse">
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>
    </li>
  );
}

export default SkeletonPointRankingItem;
