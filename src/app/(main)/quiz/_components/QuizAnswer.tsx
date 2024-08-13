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
    <div className="p-8 flex flex-col justify-between relative w-full h-full min-h-[400px] min-w-[400px]">
      {showAnimation ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={isCorrect ? "/icons/quiz/animations_confetti.gif" : "/icons/quiz/animations_state_x.gif"}
            alt={isCorrect ? "correct answer animation" : "incorrect answer animation"}
            width={600}
            height={600}
            unoptimized
          />
        </div>
      ) : (
        <div className="py-10">
          <section className="mb-5 text-center">
            <Image
              src={isCorrect ? "/icons/quiz/state-o.png" : "/icons/quiz/state-x.png"}
              alt={isCorrect ? "정답입니다!" : "틀렸습니다."}
              width={354}
              height={76}
              className="mx-auto animate-bounce"
            />
          </section>
          <section className="mb-4 text-center">
            <div className="text-2xl mb-4 font-bold">
              포인트 <span className="text-point">{isCorrect ? 5 : 1}점</span>을 획득하셨습니다!
            </div>
            <div className={`text-5xl mb-4 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "O" : "X"}
            </div>
            <div className="flex flex-col items-center justify-center px-20 w-full max-w-3xl mx-auto">
              <div className="flex items-start w-full">
                <p className="text-gray-700 text-xl font-semibold mr-2">해설:</p>
                <p className="text-gray-700 flex-1 text-left">{explanation}</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="black" size="large" onClick={handleOnClose}>
                확인
              </Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default QuizAnswer;
