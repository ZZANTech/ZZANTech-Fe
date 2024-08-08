function SkeletonKnowhow() {
  return (
    <div className="my-2 transition duration-300 ease-in-out hover:scale-105">
      <div className="relative rounded-xl overflow-hidden h-40 bg-gray-300 animate-pulse">
        <div className="absolute bottom-5 left-0 pl-5 w-full">
          <div className="h-6 bg-gray-400 rounded mb-2 w-2/3" />
          <div className="h-4 bg-gray-400 rounded w-1/5 " />
        </div>
      </div>
    </div>
  );
}

export default SkeletonKnowhow;
