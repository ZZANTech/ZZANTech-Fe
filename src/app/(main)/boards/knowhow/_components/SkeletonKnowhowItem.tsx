"use client";

function SkeletonKnowhowItem() {
  return (
    <li className="w-full h-[140px] md:h-[240px] border-b border-b-basic py-5 md:py-8">
      <div className="flex h-full w-full gap-4 md:gap-9 relative px-0">
        <div className="flex w-full flex-col overflow-hidden max-w-[63%] md:max-w-[805px]">
          <div className="flex gap-3 items-center mb-2.5 md:mb-4">
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse md:w-24"></div>
            </div>
            <div className="w-12 h-4 bg-gray-300 rounded animate-pulse md:w-16"></div>
          </div>
          <div className="w-full h-4 bg-gray-300 rounded mb-2.5 md:mb-5 md:w-3/4 md:h-6 animate-pulse"></div>
          <div className="hidden md:block max-w-[805px] space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4 absolute bottom-0">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="h-full flex items-center md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:right-0">
          <div className="w-[100px] h-[100px] bg-gray-300 rounded-lg animate-pulse md:w-[128px] md:h-[128px]"></div>
        </div>
      </div>
    </li>
  );
}

export default SkeletonKnowhowItem;
