function SkeletonKnowhowItem() {
  return (
    <li className="w-full h-[240px] border-b border-b-basic py-8">
      <div className="flex h-full w-full gap-9 relative px-0">
        <div className="flex w-full max-w-[805px] flex-col overflow-hidden">
          <div className="flex gap-3 items-center mb-4">
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="w-3/4 h-6 bg-gray-300 rounded mb-5 animate-pulse"></div>
          <div className="max-w-[805px] space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4 absolute bottom-0">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 w-[128px] h-[128px] bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </li>
  );
}

export default SkeletonKnowhowItem;
