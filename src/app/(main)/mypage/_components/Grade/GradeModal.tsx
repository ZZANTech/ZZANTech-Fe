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
      className="fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-20 backdrop-blur-sm"
    >
      <div className="w-dvw h-dvh max-w-[500px] max-h-[778px] mx-4 md:mx-0 border bg-white rounded-3xl flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default GradeModal;
