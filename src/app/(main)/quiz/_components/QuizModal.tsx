"use client";

import { useRouter } from "next/navigation";
import React from "react";

function QuizModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };
  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 lg:pt-0 flex justify-start lg:justify-center items-start lg:items-center bg-white lg:bg-black lg:bg-opacity-20 lg:backdrop-blur-sm z-30"
    >
      <div className="w-full h-full lg:max-h-[492px] max-w-none lg:max-w-[600px] mx-0 lg:mx-4 border-none lg:border bg-white rounded-none lg:rounded-3xl">
        {children}
      </div>
    </div>
  );
}

export default QuizModal;
