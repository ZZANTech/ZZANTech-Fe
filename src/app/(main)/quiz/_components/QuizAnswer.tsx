"use client";

import Button from "@/components/Button";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import { useEffect, useState } from "react";

type QuizAnswerProps = {
  isCorrect: boolean;
  explanation: string;
  onClose: () => void;
};

function QuizAnswer({ isCorrect, explanation, onClose }: QuizAnswerProps) {
  const { setHasTakenQuiz } = useUserContext();
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnClose = () => {
    setHasTakenQuiz(true);
    onClose();
  };
  return (
    <div className="flex flex-col justify-between relative w-full lg:h-full lg:min-h-[400px] lg:min-w-[400px]">
      {showAnimation ? (
        <div className="fixed lg:absolute inset-0 flex justify-center items-center">
          <Image
            src={isCorrect ? "/icons/quiz/animations_confetti.gif" : "/icons/quiz/animations_state_x.gif"}
            alt={isCorrect ? "correct answer animation" : "incorrect answer animation"}
            width={600}
            height={600}
            unoptimized
            className="max-w-full max-h-full lg:max-w-[400px] lg:max-h-[400px]"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-9 text-center mt-12 lg:mt-14 lg:mb-5">
            <Image
              src={isCorrect ? "/icons/quiz/state-o.png" : "/icons/quiz/state-x.png"}
              alt={isCorrect ? "정답입니다!" : "틀렸습니다."}
              width={354}
              height={76}
              className="mx-auto lg:animate-bounce w-[260px] h-[56px] lg:w-[354px] lg:h-[76px]"
            />
          </div>
          <div className="lg:mb-4 text-center">
            <div className="text-2xl font-bold">
              포인트 <span className="text-point">{isCorrect ? 5 : 1}점</span>을 획득하셨습니다!
            </div>
            <div className={`text-5xl my-8 lg:my-4 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "O" : "X"}
            </div>
            <div className="flex flex-col items-center justify-center px-[30px] lg:px-20 w-full max-w-3xl mx-auto mb-20 lg:mb-7">
              <div className="flex justify-center lg:items-start w-full">
                <p className="text-gray-700 text-xl font-semibold mr-2">해설:</p>
                <p className="text-gray-700 flex-1 text-left">{explanation}</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="black" size="large" onClick={handleOnClose}>
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizAnswer;
