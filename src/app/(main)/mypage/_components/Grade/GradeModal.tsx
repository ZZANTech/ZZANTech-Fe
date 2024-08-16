"use client";

import { useRouter } from "next/navigation";
import React from "react";

function GradeModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };
  return (
    <div
      onClick={handleBackdropClick}
      className="fixed left-0 top-0 right-0 bottom-0 flex justify-start lg:justify-center items-start lg:items-center bg-white lg:bg-black lg:bg-opacity-20 lg:backdrop-blur-sm overflow-y-auto mb-20 lg:mb-0"
    >
      <div className="max-w-none lg:w-dvw lg:h-dvh lg:max-w-[500px] mx-4 md:mx-0 border-none lg:border bg-white rouned-none lg:rounded-3xl flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default GradeModal;
