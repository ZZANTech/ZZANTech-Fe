"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";

const QuizUi = () => {
  const { hasTakenQuiz, isPending } = useUserContext();

  return (
    <div className="w-full h-[250px] bg-gray-900 rounded-[20px] px-6 py-7 flex flex-col justify-between items-center">
      <section className="w-full flex justify-between items-center px-1">
        <div className="text-main">
          {isPending ? (
            <div>
              <div className="animate-pulse w-[140px] h-[25px] bg-gray-700 rounded-md mb-2 mr-1"></div>
              <div className="animate-pulse w-[140px] h-[25px] bg-gray-700 rounded-md mb-2 mr-1"></div>
            </div>
          ) : (
            <div>
              <p className="text-xl">{hasTakenQuiz ? "이미 오늘의 퀴즈를" : "오늘의 퀴즈 풀고"}</p>
              <p className="text-xl">{hasTakenQuiz ? "풀었어요!" : "포인트 받자!"}</p>
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
        {isPending ? (
          <div></div>
        ) : hasTakenQuiz ? (
          <button className="w-[312px] h-[56px] font-semibold text-[#999999] rounded-md" disabled>
            내일 또 참여해 주세요!
          </button>
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
