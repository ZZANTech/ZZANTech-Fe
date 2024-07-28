"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";

const QuizUi = () => {
  const { hasTakenQuiz, isLoading } = useUserContext();

  return (
    <div className="w-[360px] h-[250px] bg-gray-900 rounded-[20px] p-6 flex flex-col justify-between items-center">
      <section className="w-full flex justify-between items-center px-1">
        <div className="text-main w-[180px]">
          {isLoading ? (
            <div className=" w-[180px]">
              <div className="animate-pulse w-[160px] h-[25px] bg-gray-700 rounded-md mb-2 mr-1"></div>
              <div className="animate-pulse w-[160px] h-[25px] bg-gray-700 rounded-md mb-2 mr-1"></div>
              <div className="animate-pulse w-[160px] h-[25px] bg-gray-700 rounded-md mb-2 mr-1"></div>
            </div>
          ) : (
            <div className="w-[180px]">
              <p className="text-[20px]">{hasTakenQuiz ? "오늘의 퀴즈를" : "오늘의 퀴즈 풀고"}</p>
              <p className="text-[20px]">{hasTakenQuiz ? "이미 풀었습니다!" : "포인트 받자!"}</p>
            </div>
          )}
        </div>
        <section className="relative w-[160px] h-[100px]">
          <Image
            src="/icons/coins.png"
            alt="coin image"
            layout="fill"
            objectFit="contain"
            className="absolute inset-0"
          />
        </section>
      </section>
      <div className="w-[312px] h-[56px] flex items-center justify-center">
        {isLoading ? (
          <div></div>
        ) : hasTakenQuiz ? (
          <p className="text-main">내일 다시 도전하세요!</p>
        ) : (
          <Link href="/quiz" passHref>
            <button className="w-[312px] h-[56px] bg-white font-semibold rounded-md">퀴즈풀기</button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default QuizUi;
