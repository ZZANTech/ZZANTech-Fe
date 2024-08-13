"use client";

import Button from "@/components/Button";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

const QuizUi = () => {
  const { hasTakenQuiz, isPending } = useUserContext();

  return (
    <div className="w-full h-[120px] lg:h-[250px] bg-gray-900 rounded-[20px] px-6 py-7 flex flex-col justify-between items-center">
      <section className="w-full flex justify-between items-center px-1">
        <div className="text-main mt-[-40px]">
          {isPending ? (
            <div>
              <div className="animate-pulse w-[140px] h-[25px] bg-gray-700 rounded-md mb-2 mr-1"></div>
              <div className="animate-pulse w-[140px] h-[25px] bg-gray-700 rounded-md mb-2 mr-1"></div>
            </div>
          ) : (
            <div>
              {hasTakenQuiz ? (
                <div className="flex flex-col ">
                  <p className="text-base lg:text-xl">
                    <span className="text-main">이미 오늘의 </span>
                    <span className="text-white">퀴즈를</span>
                  </p>
                  <p className="text-base lg:text-xl">
                    <span className="text-main">풀었어요!</span>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="text-base lg:text-xl">
                    <span className="text-main">오늘의 퀴즈 </span>
                    <span className="text-white">풀고</span>
                  </p>
                  <p className="text-base lg:text-xl">
                    <span className="text-main">포인트</span> <span className="text-white">받자!</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative w-[91px] h-[68px] lg:w-[148px] lg:h-[128px]">
          <Image
            src="/icons/quiz/tiggle.svg"
            alt="coin image"
            width={148}
            height={128}
            className="absolute top-[-10px] right-3 lg:relative lg:top-[10px] lg:right-auto"
          />
        </div>
      </section>
      <div className="relative w-[312px] h-[56px] flex items-center justify-center">
        {isPending ? (
          <div></div>
        ) : hasTakenQuiz ? (
          <Button size="large" variant="white" weight="semibold" disabled className="text-gray-500">
            내일 또 참여해 주세요!
          </Button>
        ) : (
          <Button
            size="quizResponsive"
            weight="semibold"
            href="/quiz"
            className="py-1 px-2 absolute lg:relative lg:top-auto lg:right-auto top-[-25px] right-[-3px] rounded-[100px] lg:rounded-lg"
          >
            퀴즈풀기
          </Button>
        )}
      </div>
    </div>
  );
};
export default QuizUi;
