import Image from "next/image";
import React from "react";
import clsx from "clsx";

type LoadingSpinnerProps = {
  isSubmitting?: boolean;
};

function LoadingSpinner({ isSubmitting = false }: LoadingSpinnerProps) {
  return (
    <div
      className={clsx("fixed inset-0 z-50 flex items-center justify-center", {
        "bg-black bg-opacity-20 pointer-events-auto select-none": isSubmitting,
        "pointer-events-none": !isSubmitting
      })}
    >
      <div className="relative w-28 h-28 pointer-events-none">
        <div className="absolute inset-0 border-[15px] border-orange-200 rounded-full pointer-events-none" />
        <Image
          src="/icons/Spiner.svg"
          alt="Loading Spinner"
          className="animate-spin pointer-events-none"
          width={112}
          height={112}
        />
      </div>
    </div>
  );
}

export default LoadingSpinner;
