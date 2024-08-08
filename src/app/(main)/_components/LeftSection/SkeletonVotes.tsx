import React from "react";

function SkeletonVotes() {
  return (
    <div className="animate-pulse flex flex-col h-full">
      <div className="relative w-full pb-[75%] bg-gray-300 rounded-xl"></div>
      <div className="flex justify-between mt-2">
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="w-10 h-4 bg-gray-300 rounded ml-3"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonVotes;
