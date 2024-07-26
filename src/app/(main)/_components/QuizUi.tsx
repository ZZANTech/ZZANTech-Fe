import Image from "next/image";
import Link from "next/link";
import React from "react";

function QuizUi() {
  return (
    <div className="w-[360px] h-[250px] bg-gray-900 rounded-[20px] p-6 flex flex-col justify-between items-center">
      <section className="w-full flex justify-between items-center px-1">
        <div className="text-main">
          <p className="text-[20px]">오늘의 퀴즈 풀고</p>
          <p className="text-[20px]">포인트 받자!</p>
        </div>
        <section>
          <Image src="/icons/coins.png" alt="coin image" width={160} height={100} />
        </section>
      </section>
      <Link href="/quiz" passHref>
        <button className="w-[312px] h-[56px] bg-white font-semibold rounded-md">퀴즈풀기</button>
      </Link>
    </div>
  );
}

export default QuizUi;
