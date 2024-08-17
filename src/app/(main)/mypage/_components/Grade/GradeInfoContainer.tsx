"use client";

import Image from "next/image";
import GradeInfo from "./GradeInfo";
import { useRouter } from "next/navigation";

function GradeInfoContainer() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="relative lg:px-4 lg:py-6 flex flex-col justify-start w-full h-full">
      {/* 작은 화면에서만 보이는 뒤로가기 버튼과 "등급제란?" */}
      <div className="lg:hidden flex items-center justify-between my-8">
        <button onClick={handleClose}>
          <Image src="/icons/quiz/back.svg" alt="뒤로가기" width={24} height={24} />
        </button>
        <h3 className="text-lg font-bold flex-grow text-center">등급제란?</h3>
      </div>

      {/*등급제 내용*/}
      <GradeInfo onClose={handleClose} />
    </div>
  );
}

export default GradeInfoContainer;
