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
      <div className="w-dvw h-full lg:max-w-[500px] lg:max-h-[90vh] lg:mx-4 mx-0 border bg-white lg:rounded-3xl flex flex-col overflow-y-auto p-0 lg:p-4">
        {children}
      </div>
    </div>
  );
}

export default GradeModal;
