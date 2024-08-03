import Image from "next/image";
import React from "react";

function SmallLoadingSpinner() {
  const spinnerWrapperStyle = "relative w-28 h-28";
  const spinnerBorderStyle = "absolute inset-0 border-[15px] border-orange-200 rounded-full";

  return (
    <div className="flex items-center justify-center ">
      <div className={spinnerWrapperStyle}>
        <div className={spinnerBorderStyle} />
        <Image src="/icons/Spiner.svg" alt="Loading Spinner" className="animate-spin" width={112} height={112} />
      </div>
    </div>
  );
}

export default SmallLoadingSpinner;
