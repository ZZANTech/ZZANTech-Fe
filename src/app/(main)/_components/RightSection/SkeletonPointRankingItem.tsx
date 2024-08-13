import clsx from "clsx";
import React from "react";

function SkeletonPointRankingItem({ index }: { index: number }) {
  return (
    <li
      className={clsx(
        "flex items-center justify-between min-w-full rounded-xl mb-2 px-7 py-1 lg:py-[9px] bg-[#F3F3F3]",
        "border-0 lg:border lg:border-[#191A23] lg:shadow-[0px_2px_0px_0px_#191A23]",
        index >= 3 && "hidden lg:flex"
      )}
    >
      <div className="flex items-center animate-pulse">
        <div className="flex items-center justify-center mr-4 w-10 h-6 bg-gray-300 rounded-[100px]"></div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="ml-auto lg:py-3 px-1 py-2 animate-pulse">
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>
    </li>
  );
}

export default SkeletonPointRankingItem;
