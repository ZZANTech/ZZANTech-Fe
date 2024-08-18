"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function GradeTitleMobile() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };
  return (
    <div className="lg:hidden flex items-center justify-between my-4 w-full">
      <button onClick={handleClose}>
        <Image src="/icons/quiz/back.svg" alt="뒤로가기" width={24} height={24} className="mb-3" />
      </button>
      <h3 className="text-xl font-semibold mb-3 flex-1 text-center mr-3">등급제란?</h3>
    </div>
  );
}

export default GradeTitleMobile;
